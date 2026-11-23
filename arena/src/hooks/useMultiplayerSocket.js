import { useCallback, useEffect, useRef, useState } from "react";
import { RIVAL_CHAMPIONS } from "../data/gameCatalog";
const SERVER_URL_STORAGE_KEY = "maydan_custom_server_url";
const LOCAL_CHAT_STORAGE_KEY = "maydan_local_world_chat_v1";
const BROADCAST_CHANNEL_NAME = "maydan_etheria_local_net";
function isLikelyStaticHost(hostname) {
  const h = hostname.toLowerCase();
  return h.endsWith("github.io") || h.endsWith("pages.dev") || h.endsWith("netlify.app") || h.endsWith("vercel.app") || h.endsWith("surge.sh");
}
function normalizeServerBaseUrl(rawUrl) {
  const clean = rawUrl.trim().replace(/\/+$/, "");
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean) || /^wss?:\/\//i.test(clean)) {
    return clean;
  }
  return `https://${clean}`;
}
function buildDefaultStaticLeaderboard(playerEntry) {
  const base = RIVAL_CHAMPIONS.map((c) => ({
    id: c.id,
    name: c.name,
    rating: c.rating,
    wins: c.wins,
    weaponId: c.avatar.weaponId,
    rankTitle: c.rankTitle,
    championId: c.id
  }));
  if (playerEntry) {
    base.push({
      id: playerEntry.id,
      name: playerEntry.name,
      rating: playerEntry.rating,
      wins: playerEntry.wins,
      weaponId: playerEntry.weaponId,
      rankTitle: playerEntry.rankTitle,
      isLiveUser: true
    });
  }
  return base.sort((a, b) => b.rating - a.rating);
}
function loadLocalWorldChat() {
  try {
    const raw = localStorage.getItem(LOCAL_CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-40) : [];
  } catch {
    return [];
  }
}
function saveLocalWorldChat(messages) {
  try {
    localStorage.setItem(LOCAL_CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
  }
}
export function useMultiplayerSocket() {
  const wsRef = useRef(null);
  const broadcastRef = useRef(null);
  const reconnectTimer = useRef(null);
  const retryCountRef = useRef(0);
  const damageListenerRef = useRef(null);
  const vfxListenerRef = useRef(null);
  const [customServerUrl, setCustomServerUrlState] = useState(() => {
    try {
      return localStorage.getItem(SERVER_URL_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [connected, setConnected] = useState(false);
  const [connectionMode, setConnectionMode] = useState("connecting");
  const [playerId, setPlayerId] = useState("local_hero");
  const [onlinePlayers, setOnlinePlayers] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [roomFighters, setRoomFighters] = useState([]);
  const [roomError, setRoomError] = useState("");
  const [koAnnouncement, setKoAnnouncement] = useState("");
  const [leaderboard, setLeaderboard] = useState(() => buildDefaultStaticLeaderboard());
  const [worldMessages, setWorldMessages] = useState(loadLocalWorldChat);
  const [roomMessages, setRoomMessages] = useState([]);
  const resolveHttpBase = useCallback(
    (overrideUrl) => {
      if (typeof window === "undefined") return "";
      const custom = normalizeServerBaseUrl(overrideUrl ?? customServerUrl);
      if (custom) {
        return custom.replace(/^ws/i, "http");
      }
      const envUrl = normalizeServerBaseUrl(String(import.meta.env.VITE_MULTIPLAYER_URL || ""));
      if (envUrl) {
        return envUrl.replace(/^ws/i, "http");
      }
      if (!isLikelyStaticHost(window.location.hostname)) {
        return window.location.origin;
      }
      return "";
    },
    [customServerUrl]
  );
  const fetchLeaderboard = useCallback(
    async (overrideUrl) => {
      const base = resolveHttpBase(overrideUrl);
      if (!base) {
        setLeaderboard((prev) => prev.length > 0 ? prev : buildDefaultStaticLeaderboard());
        return;
      }
      try {
        const res = await fetch(`${base}/api/leaderboard`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.leaderboard) && data.leaderboard.length > 0) {
            setLeaderboard(data.leaderboard);
            return;
          }
        }
      } catch {
      }
      setLeaderboard((prev) => prev.length > 0 ? prev : buildDefaultStaticLeaderboard());
    },
    [resolveHttpBase]
  );
  const reportLeaderboard = useCallback(
    async (payload) => {
      const base = resolveHttpBase();
      if (base && connectionMode === "live_server") {
        try {
          const res = await fetch(`${base}/api/leaderboard/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const data = await res.json();
            setLeaderboard(data.leaderboard || []);
            return;
          }
        } catch {
        }
      }
      setLeaderboard(buildDefaultStaticLeaderboard(payload));
    },
    [resolveHttpBase, connectionMode]
  );
  const connect = useCallback(
    (overrideUrl) => {
      if (typeof window === "undefined") return;
      if (reconnectTimer.current) {
        window.clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        wsRef.current.close();
        wsRef.current = null;
      }
      const httpBase = resolveHttpBase(overrideUrl);
      if (!httpBase) {
        setConnected(false);
        setConnectionMode("static_local");
        setLeaderboard((prev) => prev.length > 0 ? prev : buildDefaultStaticLeaderboard());
        return;
      }
      const wsUrl = `${httpBase.replace(/^http/i, "ws")}/ws/arena`;
      setConnectionMode("connecting");
      let ws;
      try {
        ws = new WebSocket(wsUrl);
      } catch {
        setConnected(false);
        setConnectionMode("static_local");
        return;
      }
      wsRef.current = ws;
      ws.onopen = () => {
        retryCountRef.current = 0;
        setConnected(true);
        setConnectionMode("live_server");
        setRoomError("");
      };
      ws.onmessage = (event) => {
        let msg;
        try {
          msg = JSON.parse(String(event.data));
        } catch {
          return;
        }
        const type = String(msg.type || "");
        if (type === "connected") {
          setPlayerId(String(msg.playerId || ""));
          setRooms(msg.rooms || []);
          setOnlinePlayers(Number(msg.onlinePlayers) || 1);
          if (Array.isArray(msg.worldHistory)) {
            setWorldMessages(msg.worldHistory);
          }
        } else if (type === "rooms:list") {
          setRooms(msg.rooms || []);
          setOnlinePlayers(Number(msg.onlinePlayers) || 1);
        } else if (type === "room:joined") {
          setRoomError("");
          setActiveRoom(msg.room);
          setRoomFighters(msg.fighters || []);
          if (Array.isArray(msg.roomHistory)) {
            setRoomMessages(msg.roomHistory);
          }
        } else if (type === "room:state") {
          setActiveRoom(msg.room);
          setRoomFighters(msg.fighters || []);
        } else if (type === "player:delta") {
          const updated = msg.fighter;
          if (!updated) return;
          setRoomFighters((prev) => {
            const exists = prev.some((f) => f.id === updated.id);
            if (!exists) return [...prev, updated];
            return prev.map((f) => f.id === updated.id ? updated : f);
          });
        } else if (type === "player:left") {
          const leftId = String(msg.playerId || "");
          setRoomFighters((prev) => prev.filter((f) => f.id !== leftId));
        } else if (type === "player:damaged") {
          damageListenerRef.current?.({
            attackerId: String(msg.attackerId || ""),
            targetId: String(msg.targetId || ""),
            damage: Number(msg.damage) || 0,
            critical: Boolean(msg.critical),
            hp: Number(msg.hp) || 0,
            knockX: Number(msg.knockX) || 0,
            knockZ: Number(msg.knockZ) || 0
          });
        } else if (type === "player:vfx") {
          vfxListenerRef.current?.({
            playerId: String(msg.playerId || ""),
            kind: String(msg.kind || "slash"),
            x: Number(msg.x) || 0,
            z: Number(msg.z) || 0,
            color: String(msg.color || "#F59E0B"),
            radius: Number(msg.radius) || 4
          });
        } else if (type === "player:ko") {
          const killerName = String(msg.killerName || "");
          const victimName = String(msg.victimName || "");
          setKoAnnouncement(`${killerName} \u0623\u0637\u0627\u062D \u0628\u0640 ${victimName}!`);
          window.setTimeout(() => setKoAnnouncement(""), 2800);
        } else if (type === "chat:message") {
          const chatMsg = msg.message;
          if (!chatMsg || !chatMsg.id) return;
          if (chatMsg.channel === "room") {
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
        } else if (type === "room:left") {
          setActiveRoom(null);
          setRoomFighters([]);
          setRoomMessages([]);
        } else if (type === "room:error") {
          setRoomError(String(msg.message || "\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0625\u0644\u0649 \u0627\u0644\u063A\u0631\u0641\u0629"));
        }
      };
      ws.onclose = () => {
        setConnected(false);
        const hasExplicitServer = Boolean((overrideUrl ?? customServerUrl).trim() || import.meta.env.VITE_MULTIPLAYER_URL);
        const maxRetries = hasExplicitServer ? 2 : 1;
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current += 1;
          reconnectTimer.current = window.setTimeout(() => connect(overrideUrl), 2400);
        } else {
          setConnectionMode("static_local");
        }
      };
      ws.onerror = () => {
        ws.close();
      };
    },
    [resolveHttpBase, customServerUrl]
  );
  useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
    const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    broadcastRef.current = bc;
    bc.onmessage = (ev) => {
      const data = ev.data;
      if (!data || data.type !== "chat:message" || !data.message?.id) return;
      const chatMsg = data.message;
      if (chatMsg.channel === "room") {
        setRoomMessages((prev) => prev.some((m) => m.id === chatMsg.id) ? prev : [...prev, chatMsg].slice(-60));
      } else {
        setWorldMessages((prev) => {
          if (prev.some((m) => m.id === chatMsg.id)) return prev;
          const next = [...prev, chatMsg].slice(-60);
          saveLocalWorldChat(next);
          return next;
        });
      }
    };
    return () => {
      bc.close();
      broadcastRef.current = null;
    };
  }, []);
  useEffect(() => {
    connect();
    fetchLeaderboard();
    return () => {
      if (reconnectTimer.current) window.clearTimeout(reconnectTimer.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [connect, fetchLeaderboard]);
  const setCustomServerUrl = useCallback(
    (rawUrl) => {
      const trimmed = rawUrl.trim();
      setCustomServerUrlState(trimmed);
      try {
        if (trimmed) {
          localStorage.setItem(SERVER_URL_STORAGE_KEY, trimmed);
        } else {
          localStorage.removeItem(SERVER_URL_STORAGE_KEY);
        }
      } catch {
      }
      retryCountRef.current = 0;
      connect(trimmed);
      fetchLeaderboard(trimmed);
    },
    [connect, fetchLeaderboard]
  );
  const send = useCallback((payload) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);
  const refreshRooms = useCallback(() => {
    send({ type: "rooms:list" });
  }, [send]);
  const createRoom = useCallback(
    (params) => {
      setRoomError("");
      if (!connected) {
        setRoomError("\u0627\u0644\u063A\u0631\u0641 \u0627\u0644\u0623\u0648\u0646\u0644\u0627\u064A\u0646 \u062A\u062D\u062A\u0627\u062C \u062E\u0627\u062F\u0645 WebSocket \u0646\u0634\u0637\u0627\u064B. \u064A\u0645\u0643\u0646\u0643 \u0636\u0628\u0637 \u0631\u0627\u0628\u0637 \u0627\u0644\u062E\u0627\u062F\u0645 \u0623\u062F\u0646\u0627\u0647 \u0623\u0648 \u062E\u0648\u0636 \u0627\u0644\u0646\u0632\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0635\u0646\u0641\u0629 \u0645\u062D\u0644\u064A\u0627\u064B.");
        return;
      }
      send({ type: "room:create", ...params });
    },
    [connected, send]
  );
  const joinRoom = useCallback(
    (params) => {
      setRoomError("");
      if (!connected) {
        setRoomError("\u0627\u0644\u063A\u0631\u0641 \u0627\u0644\u0623\u0648\u0646\u0644\u0627\u064A\u0646 \u062A\u062D\u062A\u0627\u062C \u062E\u0627\u062F\u0645 WebSocket \u0646\u0634\u0637\u0627\u064B.");
        return;
      }
      send({ type: "room:join", ...params });
    },
    [connected, send]
  );
  const leaveRoom = useCallback(() => {
    send({ type: "room:leave" });
    setActiveRoom(null);
    setRoomFighters([]);
    setRoomMessages([]);
  }, [send]);
  const sendChatMessage = useCallback(
    (channel, text, senderName, senderRank, isQuick = false) => {
      const clean = text.trim().slice(0, 180);
      if (!clean) return;
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        send({
          type: "chat:send",
          channel,
          text: clean,
          senderName,
          senderRank,
          isQuick
        });
        return;
      }
      const localMsg = {
        id: `lmsg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        channel,
        senderId: playerId || "local_hero",
        senderName,
        senderRank,
        text: clean,
        timestamp: Date.now(),
        isQuick
      };
      if (channel === "room") {
        setRoomMessages((prev) => [...prev, localMsg].slice(-60));
      } else {
        setWorldMessages((prev) => {
          const next = [...prev, localMsg].slice(-60);
          saveLocalWorldChat(next);
          return next;
        });
      }
      try {
        broadcastRef.current?.postMessage({ type: "chat:message", message: localMsg });
      } catch {
      }
    },
    [playerId, send]
  );
  const sendPlayerState = useCallback(
    (state) => {
      send({ type: "player:state", ...state });
    },
    [send]
  );
  const sendPlayerHit = useCallback(
    (payload) => {
      send({ type: "player:hit", ...payload });
    },
    [send]
  );
  const sendPlayerVfx = useCallback(
    (payload) => {
      send({ type: "player:vfx", ...payload });
    },
    [send]
  );
  const setCombatListeners = useCallback(
    (onDamage, onVfx) => {
      damageListenerRef.current = onDamage;
      vfxListenerRef.current = onVfx;
    },
    []
  );
  return {
    connected,
    connectionMode,
    customServerUrl,
    setCustomServerUrl,
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
    reportLeaderboard
  };
}
