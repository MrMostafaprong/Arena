import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ArenaId,
  AvatarConfig,
  ChatMessage,
  LeaderboardEntry,
  OnlineFighterSnapshot,
  OnlineRoomSummary,
  WeaponId,
} from '../types/game';

export interface OnlineDamageEvent {
  attackerId: string;
  targetId: string;
  damage: number;
  critical: boolean;
  hp: number;
  knockX: number;
  knockZ: number;
}

export interface OnlineVfxEvent {
  playerId: string;
  kind: string;
  x: number;
  z: number;
  color: string;
  radius: number;
}

export function useMultiplayerSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const damageListenerRef = useRef<((ev: OnlineDamageEvent) => void) | null>(null);
  const vfxListenerRef = useRef<((ev: OnlineVfxEvent) => void) | null>(null);

  const [connected, setConnected] = useState(false);
  const [playerId, setPlayerId] = useState<string>('');
  const [onlinePlayers, setOnlinePlayers] = useState(1);
  const [rooms, setRooms] = useState<OnlineRoomSummary[]>([]);
  const [activeRoom, setActiveRoom] = useState<OnlineRoomSummary | null>(null);
  const [roomFighters, setRoomFighters] = useState<OnlineFighterSnapshot[]>([]);
  const [roomError, setRoomError] = useState<string>('');
  const [koAnnouncement, setKoAnnouncement] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [worldMessages, setWorldMessages] = useState<ChatMessage[]>([]);
  const [roomMessages, setRoomMessages] = useState<ChatMessage[]>([]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = (await res.json()) as { leaderboard: LeaderboardEntry[] };
        setLeaderboard(data.leaderboard || []);
      }
    } catch {
      // Offline fallback handled cleanly
    }
  }, []);

  const reportLeaderboard = useCallback(
    async (payload: { id: string; name: string; rating: number; wins: number; weaponId: WeaponId }) => {
      try {
        const res = await fetch('/api/leaderboard/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = (await res.json()) as { leaderboard: LeaderboardEntry[] };
          setLeaderboard(data.leaderboard || []);
        }
      } catch {
        // Ignore transient failure
      }
    },
    []
  );

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${proto}//${window.location.host}/ws/arena`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setRoomError('');
    };

    ws.onmessage = (event) => {
      let msg: Record<string, unknown>;
      try {
        msg = JSON.parse(String(event.data));
      } catch {
        return;
      }

      const type = String(msg.type || '');
      if (type === 'connected') {
        setPlayerId(String(msg.playerId || ''));
        setRooms((msg.rooms as OnlineRoomSummary[]) || []);
        setOnlinePlayers(Number(msg.onlinePlayers) || 1);
        if (Array.isArray(msg.worldHistory)) {
          setWorldMessages(msg.worldHistory as ChatMessage[]);
        }
      } else if (type === 'rooms:list') {
        setRooms((msg.rooms as OnlineRoomSummary[]) || []);
        setOnlinePlayers(Number(msg.onlinePlayers) || 1);
      } else if (type === 'room:joined') {
        setRoomError('');
        setActiveRoom(msg.room as OnlineRoomSummary);
        setRoomFighters((msg.fighters as OnlineFighterSnapshot[]) || []);
        if (Array.isArray(msg.roomHistory)) {
          setRoomMessages(msg.roomHistory as ChatMessage[]);
        }
      } else if (type === 'room:state') {
        setActiveRoom(msg.room as OnlineRoomSummary);
        setRoomFighters((msg.fighters as OnlineFighterSnapshot[]) || []);
      } else if (type === 'player:delta') {
        const updated = msg.fighter as OnlineFighterSnapshot;
        if (!updated) return;
        setRoomFighters((prev) => {
          const exists = prev.some((f) => f.id === updated.id);
          if (!exists) return [...prev, updated];
          return prev.map((f) => (f.id === updated.id ? updated : f));
        });
      } else if (type === 'player:left') {
        const leftId = String(msg.playerId || '');
        setRoomFighters((prev) => prev.filter((f) => f.id !== leftId));
      } else if (type === 'player:damaged') {
        damageListenerRef.current?.({
          attackerId: String(msg.attackerId || ''),
          targetId: String(msg.targetId || ''),
          damage: Number(msg.damage) || 0,
          critical: Boolean(msg.critical),
          hp: Number(msg.hp) || 0,
          knockX: Number(msg.knockX) || 0,
          knockZ: Number(msg.knockZ) || 0,
        });
      } else if (type === 'player:vfx') {
        vfxListenerRef.current?.({
          playerId: String(msg.playerId || ''),
          kind: String(msg.kind || 'slash'),
          x: Number(msg.x) || 0,
          z: Number(msg.z) || 0,
          color: String(msg.color || '#F59E0B'),
          radius: Number(msg.radius) || 4,
        });
      } else if (type === 'player:ko') {
        const killerName = String(msg.killerName || '');
        const victimName = String(msg.victimName || '');
        setKoAnnouncement(`${killerName} أطاح بـ ${victimName}!`);
        window.setTimeout(() => setKoAnnouncement(''), 2800);
      } else if (type === 'chat:message') {
        const chatMsg = msg.message as ChatMessage | undefined;
        if (!chatMsg || !chatMsg.id) return;
        if (chatMsg.channel === 'room') {
          setRoomMessages((prev) => {
            if (prev.some((m) => m.id === chatMsg.id)) return prev;
            const next = [...prev, chatMsg];
            return next.length > 60 ? next.slice(-60) : next;
          });
        } else {
          setWorldMessages((prev) => {
            if (prev.some((m) => m.id === chatMsg.id)) return prev;
            const next = [...prev, chatMsg];
            return next.length > 60 ? next.slice(-60) : next;
          });
        }
      } else if (type === 'room:left') {
        setActiveRoom(null);
        setRoomFighters([]);
        setRoomMessages([]);
      } else if (type === 'room:error') {
        setRoomError(String(msg.message || 'تعذر الانضمام إلى الغرفة'));
      }
    };

    ws.onclose = () => {
      setConnected(false);
      reconnectTimer.current = window.setTimeout(connect, 2500);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connect();
    fetchLeaderboard();
    return () => {
      if (reconnectTimer.current) window.clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect, fetchLeaderboard]);

  const send = useCallback((payload: unknown) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  const refreshRooms = useCallback(() => {
    send({ type: 'rooms:list' });
  }, [send]);

  const createRoom = useCallback(
    (params: { roomName: string; arenaId: ArenaId; avatar: AvatarConfig; maxHp: number; weaponLevel: number }) => {
      setRoomError('');
      send({ type: 'room:create', ...params });
    },
    [send]
  );

  const joinRoom = useCallback(
    (params: { codeOrId: string; avatar: AvatarConfig; maxHp: number; weaponLevel: number }) => {
      setRoomError('');
      send({ type: 'room:join', ...params });
    },
    [send]
  );

  const leaveRoom = useCallback(() => {
    send({ type: 'room:leave' });
    setActiveRoom(null);
    setRoomFighters([]);
    setRoomMessages([]);
  }, [send]);

  const sendChatMessage = useCallback(
    (
      channel: 'world' | 'room',
      text: string,
      senderName: string,
      senderRank: string,
      isQuick = false
    ) => {
      const clean = text.trim();
      if (!clean) return;
      send({
        type: 'chat:send',
        channel,
        text: clean.slice(0, 180),
        senderName,
        senderRank,
        isQuick,
      });
    },
    [send]
  );

  const sendPlayerState = useCallback(
    (state: Record<string, unknown>) => {
      send({ type: 'player:state', ...state });
    },
    [send]
  );

  const sendPlayerHit = useCallback(
    (payload: { targetId: string; damage: number; critical: boolean; knockX: number; knockZ: number }) => {
      send({ type: 'player:hit', ...payload });
    },
    [send]
  );

  const sendPlayerVfx = useCallback(
    (payload: { kind: string; x: number; z: number; color: string; radius: number }) => {
      send({ type: 'player:vfx', ...payload });
    },
    [send]
  );

  const setCombatListeners = useCallback(
    (
      onDamage: ((ev: OnlineDamageEvent) => void) | null,
      onVfx: ((ev: OnlineVfxEvent) => void) | null
    ) => {
      damageListenerRef.current = onDamage;
      vfxListenerRef.current = onVfx;
    },
    []
  );

  return {
    connected,
    playerId,
    onlinePlayers,
    rooms,
    activeRoom,
    roomFighters,
    roomError,
    koAnnouncement,
    leaderboard,
    worldMessages,
    roomMessages,
    refreshRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    sendChatMessage,
    sendPlayerState,
    sendPlayerHit,
    sendPlayerVfx,
    setCombatListeners,
    fetchLeaderboard,
    reportLeaderboard,
  };
}
