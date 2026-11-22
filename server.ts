import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import type {
  ArenaId,
  AvatarConfig,
  ChatMessage,
  LeaderboardEntry,
  OnlineFighterSnapshot,
  OnlineRoomSummary,
  WeaponId,
} from './src/types/game';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

interface ServerPlayer {
  id: string;
  ws: WebSocket;
  roomId: string | null;
  snapshot: OnlineFighterSnapshot;
  lastHitSentAt: number;
  lastChatSentAt: number;
}

interface ServerRoom {
  id: string;
  code: string;
  name: string;
  arenaId: ArenaId;
  hostName: string;
  maxPlayers: number;
  players: Map<string, ServerPlayer>;
  messages: ChatMessage[];
  createdAt: number;
}

const rooms = new Map<string, ServerRoom>();
const players = new Map<string, ServerPlayer>();
const worldChatHistory: ChatMessage[] = [];

function pushWorldChat(msg: ChatMessage) {
  worldChatHistory.push(msg);
  if (worldChatHistory.length > 50) {
    worldChatHistory.shift();
  }
}

function broadcastAll(payload: unknown) {
  for (const p of players.values()) {
    sendJson(p.ws, payload);
  }
}

const leaderboard: LeaderboardEntry[] = [
  {
    id: 'champ_omar',
    name: 'عمر الأسطوري',
    rankTitle: 'الأسطوري',
    rating: 1920,
    wins: 94,
    weaponId: 'dragon_spear',
    championId: 'champ_omar',
  },
  {
    id: 'champ_sara',
    name: 'سارة الشمس',
    rankTitle: 'البلاتيني',
    rating: 1680,
    wins: 68,
    weaponId: 'solar_bow',
    championId: 'champ_sara',
  },
  {
    id: 'champ_khalid',
    name: 'خالد الصاعقة',
    rankTitle: 'الذهبي',
    rating: 1460,
    wins: 47,
    weaponId: 'storm_hammer',
    championId: 'champ_khalid',
  },
  {
    id: 'champ_layla',
    name: 'ليلى الظل',
    rankTitle: 'الفضي',
    rating: 1240,
    wins: 29,
    weaponId: 'shadow_daggers',
    championId: 'champ_layla',
  },
  {
    id: 'champ_zaid',
    name: 'زيد العاصف',
    rankTitle: 'البرونزي',
    rating: 1050,
    wins: 14,
    weaponId: 'vanguard_sword',
    championId: 'champ_zaid',
  },
];

function getRankTitle(rating: number): string {
  if (rating >= 1850) return 'الأسطوري';
  if (rating >= 1600) return 'البلاتيني';
  if (rating >= 1350) return 'الذهبي';
  if (rating >= 1120) return 'الفضي';
  return 'البرونزي';
}

function generateRoomCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(10 + Math.random() * 89);
  return `${a}${b}-${num}`;
}

function getRoomSummaries(): OnlineRoomSummary[] {
  return Array.from(rooms.values())
    .filter((r) => r.players.size > 0)
    .map((r) => ({
      id: r.id,
      code: r.code,
      name: r.name,
      arenaId: r.arenaId,
      playerCount: r.players.size,
      maxPlayers: r.maxPlayers,
      hostName: r.hostName,
      status: r.players.size >= 2 ? 'fighting' : 'open',
    }));
}

function sendJson(ws: WebSocket, payload: unknown) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function broadcastRoom(room: ServerRoom, payload: unknown, excludeId?: string) {
  for (const [pid, p] of room.players.entries()) {
    if (excludeId && pid === excludeId) continue;
    sendJson(p.ws, payload);
  }
}

function broadcastRoomState(room: ServerRoom) {
  const fighters = Array.from(room.players.values()).map((p) => p.snapshot);
  broadcastRoom(room, {
    type: 'room:state',
    room: {
      id: room.id,
      code: room.code,
      name: room.name,
      arenaId: room.arenaId,
      playerCount: room.players.size,
      maxPlayers: room.maxPlayers,
      hostName: room.hostName,
      status: room.players.size >= 2 ? 'fighting' : 'open',
    },
    fighters,
  });
}

function leaveCurrentRoom(player: ServerPlayer) {
  if (!player.roomId) return;
  const room = rooms.get(player.roomId);
  player.roomId = null;
  if (!room) return;
  room.players.delete(player.id);
  if (room.players.size === 0) {
    rooms.delete(room.id);
  } else {
    broadcastRoom(room, { type: 'player:left', playerId: player.id });
    broadcastRoomState(room);
  }
}

function spawnPositionForIndex(idx: number): { x: number; z: number; yaw: number } {
  const angle = (idx * Math.PI * 2) / 4 + Math.PI / 4;
  return {
    x: Math.cos(angle) * 6.5,
    z: Math.sin(angle) * 6.5,
    yaw: Math.atan2(-Math.cos(angle), -Math.sin(angle)),
  };
}

function upsertLeaderboard(entry: {
  id: string;
  name: string;
  rating: number;
  wins: number;
  weaponId: WeaponId;
}) {
  const cleanName = String(entry.name || 'مقاتل').slice(0, 24);
  const existing = leaderboard.find((l) => l.id === entry.id);
  if (existing) {
    existing.name = cleanName;
    existing.rating = Math.max(800, Math.min(4000, Math.round(entry.rating)));
    existing.wins = Math.max(0, Math.round(entry.wins));
    existing.weaponId = entry.weaponId;
    existing.rankTitle = getRankTitle(existing.rating);
  } else {
    leaderboard.push({
      id: entry.id,
      name: cleanName,
      rankTitle: getRankTitle(entry.rating),
      rating: Math.max(800, Math.min(4000, Math.round(entry.rating))),
      wins: Math.max(0, Math.round(entry.wins)),
      weaponId: entry.weaponId,
      isLiveUser: true,
    });
  }
  leaderboard.sort((a, b) => b.rating - a.rating);
  if (leaderboard.length > 30) {
    leaderboard.length = 30;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/rooms', (_req, res) => {
    res.json({ rooms: getRoomSummaries(), onlinePlayers: players.size });
  });

  app.get('/api/leaderboard', (_req, res) => {
    res.json({ leaderboard });
  });

  app.post('/api/leaderboard/report', (req, res) => {
    const body = req.body as {
      id?: string;
      name?: string;
      rating?: number;
      wins?: number;
      weaponId?: WeaponId;
    };
    if (!body || !body.id || !body.name || typeof body.rating !== 'number') {
      res.status(400).json({ error: 'بيانات غير مكتملة' });
      return;
    }
    upsertLeaderboard({
      id: String(body.id).slice(0, 40),
      name: String(body.name).slice(0, 24),
      rating: body.rating,
      wins: typeof body.wins === 'number' ? body.wins : 0,
      weaponId: body.weaponId || 'vanguard_sword',
    });
    res.json({ leaderboard });
  });

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws/arena' });

  wss.on('connection', (ws) => {
    const playerId = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    const defaultSnap: OnlineFighterSnapshot = {
      id: playerId,
      name: 'مقاتل',
      avatar: {
        name: 'مقاتل',
        title: 'مبارز',
        build: 'balanced',
        heightScale: 1,
        shoulderScale: 1,
        skinTone: '#D6A57C',
        headStyle: 'knight_helm',
        helmetColor: '#2B3442',
        eyeGlow: '#F59E0B',
        armorStyle: 'plate',
        primaryColor: '#2B3442',
        secondaryColor: '#C9841A',
        accentColor: '#F59E0B',
        backGear: 'battle_cape',
        auraStyle: 'none',
        weaponId: 'vanguard_sword',
        powerId: 'inferno_nova',
        secondaryPowerId: 'holy_sanctuary',
        powerSlots: ['inferno_nova', 'holy_sanctuary', 'thunder_strike', 'shadow_blink'],
        stats: { str: 6, agi: 5, vit: 6, int: 5, def: 5, dex: 5, spr: 5, lck: 4 },
      },
      weaponLevel: 1,
      x: 0,
      y: 0,
      z: 0,
      yaw: 0,
      hp: 200,
      maxHp: 200,
      energy: 100,
      animState: 'idle',
      animTimer: 0,
      comboStep: 0,
      shieldActive: false,
      overdriveActive: false,
      kills: 0,
    };

    const serverPlayer: ServerPlayer = {
      id: playerId,
      ws,
      roomId: null,
      snapshot: defaultSnap,
      lastHitSentAt: 0,
      lastChatSentAt: 0,
    };

    players.set(playerId, serverPlayer);
    sendJson(ws, {
      type: 'connected',
      playerId,
      rooms: getRoomSummaries(),
      onlinePlayers: players.size,
      worldHistory: worldChatHistory,
    });

    ws.on('message', (raw) => {
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(String(raw));
      } catch {
        return;
      }

      const type = String(msg.type || '');

      if (type === 'rooms:list') {
        sendJson(ws, { type: 'rooms:list', rooms: getRoomSummaries(), onlinePlayers: players.size });
        return;
      }

      if (type === 'room:create') {
        leaveCurrentRoom(serverPlayer);
        const arenaId = (msg.arenaId as ArenaId) || 'obsidian_citadel';
        const avatar = (msg.avatar as AvatarConfig) || serverPlayer.snapshot.avatar;
        const maxHp = Math.max(120, Math.min(600, Number(msg.maxHp) || 220));
        const weaponLevel = Math.max(1, Math.min(5, Number(msg.weaponLevel) || 1));
        const roomName = String(msg.roomName || `ساحة ${avatar.name}`).slice(0, 32);

        const roomId = `room_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`;
        const code = generateRoomCode();
        const spawn = spawnPositionForIndex(0);

        serverPlayer.snapshot = {
          ...serverPlayer.snapshot,
          name: avatar.name || 'مقاتل',
          avatar,
          weaponLevel,
          x: spawn.x,
          y: 0,
          z: spawn.z,
          yaw: spawn.yaw,
          hp: maxHp,
          maxHp,
          energy: 100,
          animState: 'idle',
          kills: 0,
        };

        const room: ServerRoom = {
          id: roomId,
          code,
          name: roomName,
          arenaId,
          hostName: avatar.name || 'مقاتل',
          maxPlayers: 4,
          players: new Map([[playerId, serverPlayer]]),
          messages: [
            {
              id: `sys_${Date.now().toString(36)}`,
              channel: 'room',
              roomCode: code,
              senderId: 'system',
              senderName: 'النظام',
              senderRank: 'مشرف',
              text: `تم فتح غرفة ${roomName} (رمز الانضمام: ${code})`,
              isSystem: true,
              timestamp: Date.now(),
            },
          ],
          createdAt: Date.now(),
        };

        rooms.set(roomId, room);
        serverPlayer.roomId = roomId;

        sendJson(ws, {
          type: 'room:joined',
          playerId,
          room: {
            id: room.id,
            code: room.code,
            name: room.name,
            arenaId: room.arenaId,
            playerCount: room.players.size,
            maxPlayers: room.maxPlayers,
            hostName: room.hostName,
            status: 'open',
          },
          fighters: [serverPlayer.snapshot],
          roomHistory: room.messages,
        });
        return;
      }

      if (type === 'room:join') {
        const codeOrId = String(msg.codeOrId || '').trim().toUpperCase();
        const targetRoom = Array.from(rooms.values()).find(
          (r) => r.code.toUpperCase() === codeOrId || r.id.toUpperCase() === codeOrId
        );
        if (!targetRoom) {
          sendJson(ws, { type: 'room:error', message: 'لم يتم العثور على الغرفة. تحقق من الرمز.' });
          return;
        }
        if (targetRoom.players.size >= targetRoom.maxPlayers) {
          sendJson(ws, { type: 'room:error', message: 'الغرفة ممتلئة حالياً.' });
          return;
        }

        leaveCurrentRoom(serverPlayer);
        const avatar = (msg.avatar as AvatarConfig) || serverPlayer.snapshot.avatar;
        const maxHp = Math.max(120, Math.min(600, Number(msg.maxHp) || 220));
        const weaponLevel = Math.max(1, Math.min(5, Number(msg.weaponLevel) || 1));
        const spawn = spawnPositionForIndex(targetRoom.players.size);

        serverPlayer.snapshot = {
          ...serverPlayer.snapshot,
          name: avatar.name || 'مقاتل',
          avatar,
          weaponLevel,
          x: spawn.x,
          y: 0,
          z: spawn.z,
          yaw: spawn.yaw,
          hp: maxHp,
          maxHp,
          energy: 100,
          animState: 'idle',
          kills: 0,
        };

        targetRoom.players.set(playerId, serverPlayer);
        serverPlayer.roomId = targetRoom.id;

        const fighters = Array.from(targetRoom.players.values()).map((p) => p.snapshot);
        const joinChat: ChatMessage = {
          id: `sys_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 5)}`,
          channel: 'room',
          roomCode: targetRoom.code,
          senderId: 'system',
          senderName: 'النظام',
          senderRank: 'مشرف',
          text: `انضم ${serverPlayer.snapshot.name} إلى ساحة الغرفة.`,
          isSystem: true,
          timestamp: Date.now(),
        };
        targetRoom.messages.push(joinChat);
        if (targetRoom.messages.length > 50) targetRoom.messages.shift();

        sendJson(ws, {
          type: 'room:joined',
          playerId,
          room: {
            id: targetRoom.id,
            code: targetRoom.code,
            name: targetRoom.name,
            arenaId: targetRoom.arenaId,
            playerCount: targetRoom.players.size,
            maxPlayers: targetRoom.maxPlayers,
            hostName: targetRoom.hostName,
            status: targetRoom.players.size >= 2 ? 'fighting' : 'open',
          },
          fighters,
          roomHistory: targetRoom.messages,
        });
        broadcastRoomState(targetRoom);
        broadcastRoom(targetRoom, { type: 'chat:message', message: joinChat }, playerId);
        return;
      }

      if (type === 'room:leave') {
        leaveCurrentRoom(serverPlayer);
        sendJson(ws, { type: 'room:left' });
        return;
      }

      if (type === 'player:state') {
        if (!serverPlayer.roomId) return;
        const room = rooms.get(serverPlayer.roomId);
        if (!room) return;
        if (serverPlayer.snapshot.hp <= 0) return;

        serverPlayer.snapshot.x = Math.max(-65, Math.min(65, Number(msg.x) || 0));
        serverPlayer.snapshot.y = Math.max(0, Math.min(10, Number(msg.y) || 0));
        serverPlayer.snapshot.z = Math.max(-65, Math.min(65, Number(msg.z) || 0));
        serverPlayer.snapshot.yaw = Number(msg.yaw) || 0;
        serverPlayer.snapshot.animState = (msg.animState as OnlineFighterSnapshot['animState']) || 'idle';
        serverPlayer.snapshot.animTimer = Number(msg.animTimer) || 0;
        serverPlayer.snapshot.comboStep = Number(msg.comboStep) || 0;
        serverPlayer.snapshot.shieldActive = Boolean(msg.shieldActive);
        serverPlayer.snapshot.overdriveActive = Boolean(msg.overdriveActive);
        serverPlayer.snapshot.energy = Math.max(0, Math.min(100, Number(msg.energy) || 0));

        broadcastRoom(
          room,
          {
            type: 'player:delta',
            fighter: serverPlayer.snapshot,
          },
          playerId
        );
        return;
      }

      if (type === 'player:hit') {
        if (!serverPlayer.roomId) return;
        const room = rooms.get(serverPlayer.roomId);
        if (!room) return;
        const now = Date.now();
        if (now - serverPlayer.lastHitSentAt < 140) return;
        serverPlayer.lastHitSentAt = now;

        const targetId = String(msg.targetId || '');
        const target = room.players.get(targetId);
        if (!target || target.id === playerId || target.snapshot.hp <= 0 || serverPlayer.snapshot.hp <= 0) {
          return;
        }

        const rawDamage = Math.max(5, Math.min(115, Number(msg.damage) || 20));
        const isCritical = Boolean(msg.critical);
        const knockX = Math.max(-8, Math.min(8, Number(msg.knockX) || 0));
        const knockZ = Math.max(-8, Math.min(8, Number(msg.knockZ) || 0));
        const finalDamage = target.snapshot.shieldActive ? Math.round(rawDamage * 0.35) : Math.round(rawDamage);

        target.snapshot.hp = Math.max(0, target.snapshot.hp - finalDamage);
        broadcastRoom(room, {
          type: 'player:damaged',
          attackerId: playerId,
          targetId,
          damage: finalDamage,
          critical: isCritical,
          hp: target.snapshot.hp,
          knockX,
          knockZ,
        });

        if (target.snapshot.hp <= 0) {
          serverPlayer.snapshot.kills += 1;
          broadcastRoom(room, {
            type: 'player:ko',
            killerId: playerId,
            killerName: serverPlayer.snapshot.name,
            victimId: targetId,
            victimName: target.snapshot.name,
            killerKills: serverPlayer.snapshot.kills,
          });

          // Respawn defeated fighter after 2.6 seconds so online arena stays lively
          setTimeout(() => {
            const liveRoom = rooms.get(room.id);
            if (!liveRoom) return;
            const liveTarget = liveRoom.players.get(targetId);
            if (!liveTarget) return;
            const spawn = spawnPositionForIndex(Math.floor(Math.random() * 4));
            liveTarget.snapshot.hp = liveTarget.snapshot.maxHp;
            liveTarget.snapshot.x = spawn.x;
            liveTarget.snapshot.z = spawn.z;
            liveTarget.snapshot.animState = 'idle';
            broadcastRoomState(liveRoom);
          }, 2600);
        }
        return;
      }

      if (type === 'player:vfx') {
        if (!serverPlayer.roomId) return;
        const room = rooms.get(serverPlayer.roomId);
        if (!room) return;
        broadcastRoom(
          room,
          {
            type: 'player:vfx',
            playerId,
            kind: String(msg.kind || 'slash'),
            x: Number(msg.x) || 0,
            z: Number(msg.z) || 0,
            color: String(msg.color || '#F59E0B'),
            radius: Math.max(1, Math.min(12, Number(msg.radius) || 4)),
          },
          playerId
        );
        return;
      }

      if (type === 'chat:send') {
        const now = Date.now();
        if (now - serverPlayer.lastChatSentAt < 450) return;
        const text = String(msg.text || '').trim().slice(0, 180);
        if (!text) return;
        serverPlayer.lastChatSentAt = now;

        const requestedChannel = msg.channel === 'room' ? 'room' : 'world';
        const senderName = String(msg.senderName || serverPlayer.snapshot.name || 'مقاتل').slice(0, 24);
        const senderRank = String(msg.senderRank || 'مغامر').slice(0, 18);
        const isQuick = Boolean(msg.isQuick);

        if (requestedChannel === 'room' && serverPlayer.roomId) {
          const room = rooms.get(serverPlayer.roomId);
          if (!room) return;
          const chatMsg: ChatMessage = {
            id: `msg_${now.toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
            channel: 'room',
            roomCode: room.code,
            senderId: playerId,
            senderName,
            senderRank,
            text,
            isQuick,
            timestamp: now,
          };
          room.messages.push(chatMsg);
          if (room.messages.length > 50) room.messages.shift();
          broadcastRoom(room, { type: 'chat:message', message: chatMsg });
        } else {
          const chatMsg: ChatMessage = {
            id: `msg_${now.toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
            channel: 'world',
            senderId: playerId,
            senderName,
            senderRank,
            text,
            isQuick,
            timestamp: now,
          };
          pushWorldChat(chatMsg);
          broadcastAll({ type: 'chat:message', message: chatMsg });
        }
      }
    });

    ws.on('close', () => {
      leaveCurrentRoom(serverPlayer);
      players.delete(playerId);
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Maydan Al-Abtal server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
