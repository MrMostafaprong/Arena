import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, Users, Wifi, WifiOff, X, Zap } from "lucide-react";
import { QUICK_CHAT_PHRASES, getRankLabel } from "../data/gameCatalog";
export const SystemChatPanel = ({
  playerName,
  playerRating,
  connected,
  connectionMode,
  activeRoom,
  worldMessages,
  roomMessages,
  onSendChat,
  compact = false,
  onClose
}) => {
  const [channel, setChannel] = useState(activeRoom ? "room" : "world");
  const [draft, setDraft] = useState("");
  const feedRef = useRef(null);
  const effectiveMode = connectionMode || (connected ? "live_server" : "static_local");
  const chatReady = connected || effectiveMode === "static_local";
  useEffect(() => {
    if (activeRoom) {
      setChannel("room");
    } else if (channel === "room") {
      setChannel("world");
    }
  }, [activeRoom, channel]);
  const activeList = channel === "room" ? roomMessages : worldMessages;
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [activeList.length, channel]);
  const senderRank = getRankLabel(playerRating);
  const handleSend = (e) => {
    e?.preventDefault();
    const clean = draft.trim();
    if (!clean || !chatReady) return;
    if (channel === "room" && !activeRoom) return;
    onSendChat(channel, clean, playerName, senderRank, false);
    setDraft("");
  };
  const handleQuick = (phrase) => {
    if (!chatReady) return;
    if (channel === "room" && !activeRoom) return;
    onSendChat(channel, phrase, playerName, senderRank, true);
  };
  return <div
    className={`system-window rounded-xl flex flex-col overflow-hidden ${compact ? "w-full max-w-md max-h-[94%]" : "w-full"}`}
  >
      {
    /* Header */
  }
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-[#070B16]/75 flex items-center justify-between gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <MessageSquare className="w-4 h-4 shrink-0" style={{ color: "var(--sys-primary)" }} />
          <div className="min-w-0">
            <h3 className="font-display text-sm sm:text-base font-bold text-[#F8FAFC] truncate">
              نظام التواصل المباشر بين اللاعبين
            </h3>
            <div className="flex items-center gap-1.5 text-[11px]">
              {connected ? <span className="flex items-center gap-1 text-[#10B981]">
                  <Wifi className="w-3 h-3" /> متصل بالخادم الحي
                </span> : effectiveMode === "connecting" ? <span className="flex items-center gap-1 text-[#F59E0B]">
                  <WifiOff className="w-3 h-3" /> جارٍ الفحص والاتصال...
                </span> : <span className="flex items-center gap-1 text-[#38BDF8]">
                  <Wifi className="w-3 h-3" /> بث محلي نشط (بدون خادم)
                </span>}
              {activeRoom && <>
                  <span className="text-[#475569]">·</span>
                  <span className="font-mono-num text-[#E6B85C] truncate">
                    غرفة {activeRoom.code}
                  </span>
                </>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {
    /* Channel Switcher */
  }
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#080D18] border border-white/10">
            <button
    type="button"
    onClick={() => setChannel("world")}
    className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer whitespace-nowrap ${channel === "world" ? "system-btn-primary" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
              العالم
            </button>
            <button
    type="button"
    disabled={!activeRoom}
    onClick={() => setChannel("room")}
    title={activeRoom ? "\u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u063A\u0631\u0641\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629" : "\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u063A\u0631\u0641\u0629 \u0623\u0648\u0644\u0627\u064B \u0644\u062A\u0641\u0639\u064A\u0644 \u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u063A\u0631\u0641\u0629"}
    className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors flex items-center gap-1 whitespace-nowrap ${!activeRoom ? "opacity-40 text-[#64748B] cursor-not-allowed" : channel === "room" ? "system-btn-primary cursor-pointer" : "text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"}`}
  >
              <Users className="w-3 h-3" />
              <span>الغرفة</span>
            </button>
          </div>

          {onClose && <button
    type="button"
    onClick={onClose}
    aria-label="إغلاق الدردشة"
    className="min-w-[36px] min-h-[36px] p-1.5 rounded-lg bg-[#141E33] hover:bg-[#1E2C4A] text-[#F1F5F9] flex items-center justify-center cursor-pointer"
  >
              <X className="w-4 h-4" />
            </button>}
        </div>
      </div>

      {
    /* Messages Feed */
  }
      <div
    ref={feedRef}
    className={`flex-1 overflow-y-auto p-3 space-y-2 bg-[#060A13]/65 ${compact ? "min-h-[90px] max-h-[165px]" : "min-h-[210px] max-h-[280px]"}`}
  >
        {activeList.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-center py-6 text-xs text-[#94A3B8] gap-1.5">
            <Sparkles className="w-5 h-5" style={{ color: "var(--sys-primary)" }} />
            <span>
              {channel === "room" ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0631\u0633\u0627\u0626\u0644 \u0641\u064A \u0627\u0644\u063A\u0631\u0641\u0629 \u0628\u0639\u062F \u2014 \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0623\u0648 \u0623\u0631\u0633\u0644 \u062A\u062D\u064A\u0629!" : "\u0628\u062B \u0627\u0644\u0639\u0627\u0644\u0645 \u062C\u0627\u0647\u0632 \u2014 \u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062D\u0627\u0631\u0628\u064A \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0648\u0627\u062F\u0639\u064F\u0647\u0645 \u0644\u0644\u063A\u0631\u0641!"}
            </span>
          </div> : activeList.map((msg) => {
    const isSelf = msg.senderName === playerName;
    const timeLabel = new Date(msg.timestamp).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit"
    });
    return <div
      key={msg.id}
      className={`p-2.5 rounded-lg border text-xs space-y-1 ${isSelf ? "bg-[#121F38]/85 border-[var(--sys-primary)]/40" : "bg-[#0C1322]/90 border-white/10"}`}
    >
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
      className="font-display font-bold truncate"
      style={{ color: isSelf ? "var(--sys-accent)" : "var(--sys-primary)" }}
    >
                      {msg.senderName}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#080D18] border border-white/10 text-[10px] text-[#CBD5E1] shrink-0">
                      {msg.senderRank}
                    </span>
                    {msg.isQuick && <span className="inline-flex items-center gap-0.5 text-[10px] text-[#10B981] shrink-0">
                        <Zap className="w-2.5 h-2.5" /> سريعة
                      </span>}
                  </div>
                  <span className="font-mono-num text-[10px] text-[#64748B] shrink-0">
                    {timeLabel}
                  </span>
                </div>
                <p className="text-[#F1F5F9] leading-relaxed break-words">{msg.text}</p>
              </div>;
  })}
      </div>

      {
    /* Quick Phrases Strip (Zero-pill rectangular Manhwa buttons) */
  }
      <div className="px-3 py-1.5 border-t border-white/10 bg-[#080D18]/85 flex flex-wrap gap-1 shrink-0">
        {QUICK_CHAT_PHRASES.map((phrase) => <button
    key={phrase}
    type="button"
    disabled={!chatReady || channel === "room" && !activeRoom}
    onClick={() => handleQuick(phrase)}
    className="px-2 py-1 text-[10px] sm:text-[11px] font-semibold rounded-md bg-[#111A2E] hover:bg-[#192846] disabled:opacity-40 text-[#CBD5E1] hover:text-[#F8FAFC] border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
  >
            {phrase}
          </button>)}
      </div>

      {
    /* Message Input Bar */
  }
      <form
    onSubmit={handleSend}
    className="p-2.5 sm:p-3 border-t border-white/10 bg-[#070B16] flex items-center gap-2 shrink-0"
  >
        <input
    type="text"
    value={draft}
    maxLength={180}
    disabled={!chatReady || channel === "room" && !activeRoom}
    onChange={(e) => setDraft(e.target.value)}
    placeholder={channel === "room" ? "\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u0629 \u0633\u0631\u064A\u0639\u0629 \u0644\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u063A\u0631\u0641\u0629..." : "\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u0629 \u0641\u064A \u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629..."}
    className="flex-1 min-h-[42px] px-3 py-2 text-xs sm:text-sm bg-[#0D1526] border border-white/15 rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[var(--sys-primary)]"
  />
        <button
    type="submit"
    disabled={!chatReady || !draft.trim() || channel === "room" && !activeRoom}
    className="min-h-[42px] px-4 py-2 text-xs font-bold system-btn-primary disabled:opacity-40 rounded-lg flex items-center gap-1.5 shrink-0 cursor-pointer"
  >
          <Send className="w-3.5 h-3.5" />
          <span>إرسال</span>
        </button>
      </form>
    </div>;
};
