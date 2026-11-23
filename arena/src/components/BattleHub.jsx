import { useState } from "react";
import {
  Award,
  BookOpen,
  Camera,
  Compass,
  Cpu,
  Flame,
  Lock,
  Maximize2,
  Monitor,
  Radar,
  Shield,
  Smartphone,
  Sparkles,
  Swords,
  Users,
  Volume2,
  VolumeX
} from "lucide-react";
import {
  ARENAS,
  ARENA_LIST,
  OVERWORLD_MAP,
  POWERS,
  WEAPONS,
  computeFighterDerivedStats,
  getRankLabel,
  xpForNextLevel
} from "../data/gameCatalog";
import { AvatarPreview3D } from "./AvatarPreview3D";
import { StatsRadarChart } from "./StatsRadarChart";
const MODES = [
  {
    id: "unified_clash",
    title: "\u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u0645\u0648\u062D\u062F: \u0648\u062D\u0648\u0634 + \u0623\u0628\u0637\u0627\u0644",
    subtitle: "\u062F\u0645\u062C \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u062D\u0631 \u0645\u0639 \u063A\u0627\u0631\u0627\u062A \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u0646\u0632\u0627\u0644 \u0627\u0644\u0623\u0628\u0637\u0627\u0644 \u0641\u064A \u0645\u0639\u0631\u0643\u0629 \u0648\u0627\u062D\u062F\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629.",
    meta: "\u0645\u0648\u062C\u0627\u062A \u0648\u062D\u0648\u0634 \xB7 \u0623\u0628\u0637\u0627\u0644 \u0645\u0646\u0627\u0641\u0633\u0648\u0646 \xB7 \u0646\u0642\u0627\u0637 \u062A\u0635\u0646\u064A\u0641 + \u063A\u0646\u0627\u0626\u0645 \u0645\u0636\u0627\u0639\u0641\u0629"
  },
  {
    id: "monster_raid",
    title: "\u063A\u0627\u0631\u0629 \u0627\u0644\u0632\u0639\u064A\u0645 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629",
    subtitle: "\u0645\u0648\u062C\u0627\u062A \u0645\u062A\u0635\u0627\u0639\u062F\u0629 \u062A\u062E\u062A\u0628\u0631 \u0645\u0647\u0627\u0631\u0627\u062A\u0643 \u0627\u0644\u0623\u0631\u0628\u0639 \u0636\u062F \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0648\u062D\u0648\u0634 \u062D\u062A\u0649 \u0627\u0644\u0632\u0639\u0645\u0627\u0621.",
    meta: "\u062A\u062D\u062F\u064A PvE \u0645\u0631\u0643\u0632 \xB7 \u062C\u0648\u0627\u0647\u0631 \u0648\u0635\u0646\u0627\u062F\u064A\u0642 \u0623\u0633\u0637\u0648\u0631\u064A\u0629"
  },
  {
    id: "pvp_ranked",
    title: "\u0646\u0632\u0627\u0644 \u0627\u0644\u0623\u0628\u0637\u0627\u0644 1 \u0636\u062F 1",
    subtitle: "\u0645\u0628\u0627\u0631\u0632\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0631\u0641\u0639 \u062A\u0635\u0646\u064A\u0641\u0643 \u0641\u064A \u0633\u0644\u0645 \u0646\u0642\u0627\u0628\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627.",
    meta: "\u062A\u062D\u062F\u064A PvP \u0645\u0635\u0646\u0641 \xB7 +34 \u062A\u0635\u0646\u064A\u0641 \u0639\u0646\u062F \u0627\u0644\u0641\u0648\u0632"
  },
  {
    id: "pvp_local",
    title: "\u0645\u0628\u0627\u0631\u0632\u0629 \u0645\u062D\u0644\u064A\u0629 1 \u0636\u062F 1",
    subtitle: "\u0644\u0627\u0639\u0628\u0627\u0646 \u0639\u0644\u0649 \u0646\u0641\u0633 \u0627\u0644\u062C\u0647\u0627\u0632 \u2014 \u0627\u0644\u0623\u0641\u0636\u0644 \u0645\u0646 3 \u062C\u0648\u0644\u0627\u062A.",
    meta: "\u0644\u0639\u0628 \u0645\u0634\u062A\u0631\u0643 \u0641\u0648\u0631\u064A \xB7 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0645\u0632\u062F\u0648\u062C\u0629"
  }
];
const QUALITY_OPTIONS = [
  { id: "eco", label: "\u0627\u0642\u062A\u0635\u0627\u062F\u064A" },
  { id: "balanced", label: "\u0645\u062A\u0648\u0627\u0632\u0646" },
  { id: "high", label: "\u0639\u0627\u0644\u064A" },
  { id: "ultra", label: "\u0641\u0627\u0626\u0642" },
  { id: "mythic", label: "\u0623\u0633\u0637\u0648\u0631\u064A" }
];
const CAMERA_OPTIONS = [
  { id: "third_person", label: "\u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u062B\u0627\u0644\u062B" },
  { id: "over_shoulder", label: "\u062E\u0644\u0641 \u0627\u0644\u0643\u062A\u0641" },
  { id: "isometric_3d", label: "\u0625\u064A\u0632\u0648\u0645\u062A\u0631\u064A 3D" },
  { id: "side_fighter", label: "\u062C\u0627\u0646\u0628\u064A \u0642\u062A\u0627\u0644\u064A" },
  { id: "top_tactical", label: "\u0639\u0644\u0648\u064A \u062A\u0643\u062A\u064A\u0643\u064A" },
  { id: "cinematic_free", label: "\u0633\u064A\u0646\u0645\u0627\u0626\u064A \u062D\u0631" }
];
const SKILL_KEYS = ["Q", "R", "Z", "X"];
export const BattleHub = ({
  profile,
  selectedArena,
  selectedMode,
  onlinePlayers,
  onSelectArena,
  onSelectMode,
  onStartCombat,
  onNavigate,
  onOpenStory,
  onChangeQuality,
  onChangeCamera,
  onChangeDeviceMode,
  onToggleLandscape,
  onToggleSound
}) => {
  const [previewAct, setPreviewAct] = useState("idle");
  const [heroPanelMode, setHeroPanelMode] = useState("avatar");
  const [imgErrors, setImgErrors] = useState({});
  const arena = ARENAS[selectedArena];
  const weapon = WEAPONS[profile.avatar.weaponId];
  const equippedGearCount = Object.values(profile.equippedGear).filter(Boolean).length;
  const weaponLv = profile.weaponLevels[profile.avatar.weaponId] || 1;
  const derived = computeFighterDerivedStats(profile.avatar, weaponLv, profile.equippedGear);
  const nextXp = xpForNextLevel(profile.level);
  const xpPct = Math.min(100, Math.round(profile.xp / nextXp * 100));
  return <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-9">
      {
    /* Compact Isekai Guild Profile & Engine Bar */
  }
      <section className="isekai-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <div>
            <span className="text-[#94A3B8]">المستوى </span>
            <span className="font-mono-num font-bold text-[#F8FAFC]">{profile.level}</span>
            <span className="text-[#475569] mx-2">·</span>
            <span className="text-[#94A3B8]">الرتبة </span>
            <span className="font-bold text-[#E6B85C]">{getRankLabel(profile.rating)}</span>
            <span className="font-mono-num text-xs text-[#94A3B8] mr-1.5">({profile.rating})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-[#162136] rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#38BDF8] to-[#E6B85C]" style={{ width: `${xpPct}%` }} />
            </div>
            <span className="font-mono-num text-xs text-[#94A3B8]">
              {profile.xp}/{nextXp} XP
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm md:hidden">
            <span>
              <span className="text-[#94A3B8]">ذهب: </span>
              <span className="font-mono-num font-bold text-[#E6B85C]">{profile.gold}</span>
            </span>
            <span>
              <span className="text-[#94A3B8]">جواهر: </span>
              <span className="font-mono-num font-bold text-[#38BDF8]">{profile.gems}</span>
            </span>
            <span>
              <span className="text-[#94A3B8]">أوسمة: </span>
              <span className="font-mono-num font-bold text-[#10B981]">{profile.guildMarks}</span>
            </span>
          </div>
        </div>

        {
    /* Device Switcher, 5 Quality Tiers, 6 Camera Modes & Story Replay */
  }
        <div className="flex flex-wrap items-center gap-2">
          <button
    type="button"
    onClick={onOpenStory}
    className="px-3 py-1.5 text-xs font-semibold text-[#FDE68A] bg-[#1A1A2E] hover:bg-[#232542] border border-[#E6B85C]/35 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
  >
            <BookOpen className="w-3.5 h-3.5 text-[#E6B85C]" />
            <span>سِفر البداية</span>
          </button>

          <div
    className="flex items-center gap-1 p-1 bg-[#0B1220] border border-[#E6B85C]/30 rounded-lg"
    role="group"
    aria-label="تحويل وضع اللعب بين الهاتف والحاسوب"
  >
            <button
    type="button"
    onClick={() => onChangeDeviceMode("desktop")}
    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${profile.deviceMode === "desktop" ? "bg-[#E6B85C] text-[#0A0F1A]" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
              <Monitor className="w-3.5 h-3.5" />
              <span>حاسوب</span>
            </button>
            <button
    type="button"
    onClick={() => onChangeDeviceMode("mobile")}
    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${profile.deviceMode === "mobile" ? "bg-[#E6B85C] text-[#0A0F1A]" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
              <Smartphone className="w-3.5 h-3.5" />
              <span>هاتف</span>
            </button>
          </div>

          {profile.deviceMode === "mobile" && onToggleLandscape && <button
    type="button"
    onClick={() => onToggleLandscape(!profile.landscapeLocked)}
    title="فتح القتال بالوضع الأفقي الكامل تلقائياً"
    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${profile.landscapeLocked ? "bg-[#38BDF8] text-[#0A0F1A] border-[#BAE6FD]" : "bg-[#0B1220] text-[#7DD3FC] border-[#38BDF8]/35 hover:bg-[#132138]"}`}
  >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{profile.landscapeLocked ? "\u0623\u0641\u0642\u064A \u062A\u0644\u0642\u0627\u0626\u064A: \u0645\u0641\u0639\u0644" : "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0623\u0641\u0642\u064A"}</span>
            </button>}

          <div className="flex items-center gap-1 px-2 py-1 bg-[#0B1220] border border-white/10 rounded-lg">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <select
    aria-label="جودة الرسوم والأداء"
    value={profile.quality}
    onChange={(e) => onChangeQuality(e.target.value)}
    className="bg-transparent text-xs font-semibold text-[#F1F5F9] focus:outline-none cursor-pointer pr-1"
  >
              {QUALITY_OPTIONS.map((q) => <option key={q.id} value={q.id} className="bg-[#0D1422] text-[#F1F5F9]">
                  الجودة: {q.label}
                </option>)}
            </select>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 bg-[#0B1220] border border-white/10 rounded-lg">
            <Camera className="w-3.5 h-3.5 text-[#E6B85C] shrink-0" />
            <select
    aria-label="زاوية الكاميرا ثلاثية الأبعاد"
    value={profile.cameraView}
    onChange={(e) => onChangeCamera(e.target.value)}
    className="bg-transparent text-xs font-semibold text-[#F1F5F9] focus:outline-none cursor-pointer pr-1"
  >
              {CAMERA_OPTIONS.map((c) => <option key={c.id} value={c.id} className="bg-[#0D1422] text-[#F1F5F9]">
                  الكاميرا: {c.label}
                </option>)}
            </select>
          </div>

          <button
    type="button"
    onClick={onToggleSound}
    aria-label={profile.soundEnabled ? "\u0643\u062A\u0645 \u0627\u0644\u0635\u0648\u062A" : "\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0635\u0648\u062A"}
    className="p-2 bg-[#0B1220] border border-white/10 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
  >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </section>

      {
    /* Main 2-Column Hero Split */
  }
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {
    /* Right Column (in RTL): Setup & Launch */
  }
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[#38BDF8] flex flex-wrap items-center gap-2">
              <span>محرك 3D ناعم بدون WebGL2 (5 مستويات جودة · 6 زوايا عرض)</span>
              <span className="text-[#475569]">·</span>
              <span className="text-[#E6B85C]">
                {profile.deviceMode === "mobile" ? "\u0647\u0627\u062A\u0641 (\u0645\u064F\u062D\u0633\u064E\u0651\u0646 \u0644\u0644\u0648\u0636\u0639 \u0627\u0644\u0623\u0641\u0642\u064A)" : "\u062D\u0627\u0633\u0648\u0628 (\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0641\u0648\u0631\u064A\u0629)"}
              </span>
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight text-[#F8FAFC] max-w-2xl">
              ميثاق إيثيريا: قاتل، اعمل في النقابة، وافتح القارة
            </h1>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-xl">
              قارة أساسية مفتوحة بقطر 14,000 متر تعمل ببث الخريطة الحي 100× (تضم 9 أقاليم و5 شخصيات مسالمة وعقود عمل وتجارة)، إلى جانب 6 ساحات معارك كبرى و8 سمات مع مخطط راداري وشبكة مهارات ودمج.
            </p>
          </div>

          {
    /* Mode Selector */
  }
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-[#F1F5F9]">
                اختر نمط ساحة القتال
              </h2>
              <button
    type="button"
    onClick={() => onNavigate("pvp")}
    className="text-xs font-medium text-[#E6B85C] hover:text-[#F5D076] transition-colors flex items-center gap-1.5 cursor-pointer"
  >
                <Users className="w-3.5 h-3.5" />
                <span>غرف التنافس المباشر أونلاين ({onlinePlayers} متصل)</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODES.map((m) => {
    const active = selectedMode === m.id;
    return <button
      key={m.id}
      type="button"
      onClick={() => onSelectMode(m.id)}
      className={`text-right p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${active ? "bg-[#17243D] border-[#E6B85C] text-[#F8FAFC] shadow-[0_0_24px_-8px_rgba(230,184,92,0.35)]" : "isekai-card text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-[#F1F5F9]"}`}
    >
                    <div>
                      <div className="font-display text-base font-bold text-[#F8FAFC] mb-1">
                        {m.title}
                      </div>
                      <p className="text-xs leading-relaxed text-[#94A3B8]">{m.subtitle}</p>
                    </div>
                    <p className="text-[11px] font-medium text-[#E6B85C] pt-1.5 border-t border-white/5">
                      {m.meta}
                    </p>
                  </button>;
  })}
            </div>
          </div>

          {
    /* Active 4-Skill Loadout Summary & Primary CTAs */
  }
          <div className="pt-1 space-y-4">
            <div className="isekai-card rounded-xl p-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>
                    المقاتل: <strong className="text-[#F8FAFC]">{profile.avatar.name}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    السلاح: <strong className="text-[#E6B85C]">{weapon.name} (م{weaponLv})</strong>
                  </span>
                  <span>·</span>
                  <span>
                    السامان: <strong className="text-[#10B981]">{equippedGearCount}/3</strong>
                  </span>
                </div>
                <button
    type="button"
    onClick={() => onNavigate("forge")}
    className="text-[#38BDF8] hover:text-[#7DD3FC] font-semibold cursor-pointer"
  >
                  تخصيص الخانات والشبكة ({profile.unlockedSkillSlots}/4)
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {profile.avatar.powerSlots.map((pId, idx) => {
    const pw = POWERS[pId];
    const isUnlockedSlot = idx < profile.unlockedSkillSlots;
    return <div
      key={`${pId}_${idx}`}
      className={`px-2.5 py-1.5 rounded-lg border flex items-center justify-between gap-1.5 text-[11px] ${isUnlockedSlot ? "bg-[#0A101E] border-white/15" : "bg-[#070B14] border-white/5 opacity-60"}`}
    >
                      <span className="truncate font-semibold text-[#F1F5F9] flex items-center gap-1">
                        {!isUnlockedSlot && <Lock className="w-3 h-3 text-[#F59E0B] shrink-0" />}
                        <span className="truncate">{isUnlockedSlot ? pw?.name : "\u062E\u0627\u0646\u0629 \u0645\u0642\u0641\u0644\u0629"}</span>
                      </span>
                      <span className="font-mono-num font-bold text-[#E6B85C] shrink-0">
                        [{SKILL_KEYS[idx]}]
                      </span>
                    </div>;
  })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
    type="button"
    onClick={() => onStartCombat(selectedMode, selectedArena)}
    className="min-h-[46px] px-7 py-3 text-base font-bold system-btn-primary rounded-xl transition-all flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
  >
                <Swords className="w-5 h-5" />
                <span>انطلق إلى الساحة</span>
              </button>

              <button
    type="button"
    onClick={() => onStartCombat("world_explore", selectedArena)}
    className="min-h-[46px] px-5 py-3 text-sm font-bold text-[#0A0F1A] bg-[#38BDF8] hover:bg-[#7DD3FC] border border-[#BAE6FD]/50 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
  >
                <Compass className="w-4 h-4" />
                <span>دخول عالم إيثيريا (14,000م)</span>
              </button>

              <button
    type="button"
    onClick={() => onNavigate("forge")}
    className="min-h-[46px] px-4 py-3 text-sm font-semibold text-[#F1F5F9] bg-[#121B2D] hover:bg-[#1A263E] border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
  >
                الأفتار والسمات
                {profile.unspentStatPoints > 0 && <span className="font-mono-num text-[#E6B85C] mr-2">
                    (+{profile.unspentStatPoints})
                  </span>}
              </button>

              <button
    type="button"
    onClick={() => onNavigate("armory")}
    className="min-h-[46px] px-4 py-3 text-sm font-semibold text-[#F1F5F9] bg-[#121B2D] hover:bg-[#1A263E] border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
  >
                المتجر والسامان
              </button>
            </div>
          </div>
        </div>

        {
    /* Left Column (in RTL): Live Interactive 3D Avatar + 8-Stat Radar Toggle */
  }
        <div className="lg:col-span-5 flex flex-col isekai-panel rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6B85C]/20 bg-[#0A101E]/60">
            <div>
              <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                {profile.avatar.name}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {profile.avatar.title} · {heroPanelMode === "avatar" ? "\u0627\u0633\u062D\u0628 \u0644\u062A\u062F\u0648\u064A\u0631 \u0627\u0644\u0645\u062C\u0633\u0651\u0645 360\xB0" : "\u0631\u0627\u062F\u0627\u0631 \u0627\u0644\u0633\u0645\u0627\u062A \u0627\u0644\u062B\u0645\u0627\u0646\u064A"}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
    type="button"
    onClick={() => setHeroPanelMode((m) => m === "avatar" ? "radar" : "avatar")}
    className={`px-2.5 py-1 text-xs font-semibold rounded-md border flex items-center gap-1 cursor-pointer transition-colors ${heroPanelMode === "radar" ? "bg-[#E6B85C] text-[#0A0F1A] border-[#FDE68A]" : "bg-[#0A0F1A] text-[#38BDF8] border-[#38BDF8]/30 hover:bg-[#142038]"}`}
  >
                <Radar className="w-3.5 h-3.5" />
                <span>{heroPanelMode === "avatar" ? "\u0627\u0644\u0631\u0627\u062F\u0627\u0631" : "\u0627\u0644\u0623\u0641\u062A\u0627\u0631"}</span>
              </button>

              {heroPanelMode === "avatar" && <div className="flex items-center gap-1 p-1 bg-[#0A0F1A] rounded-lg border border-white/10">
                  {[
    { id: "idle", label: "\u0648\u0642\u0641\u0629" },
    { id: "attack", label: "\u0647\u062C\u0648\u0645" },
    { id: "power", label: "\u0642\u0648\u0629" }
  ].map((act) => <button
    key={act.id}
    type="button"
    onClick={() => setPreviewAct(act.id)}
    className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${previewAct === act.id ? "bg-[#22324F] text-[#F8FAFC]" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
                      {act.label}
                    </button>)}
                </div>}
            </div>
          </div>

          {heroPanelMode === "avatar" ? <AvatarPreview3D
    avatar={profile.avatar}
    weaponLevel={weaponLv}
    previewAction={previewAct}
    className="flex-1 min-h-[300px] lg:min-h-[350px]"
  /> : <div className="flex-1 min-h-[300px] lg:min-h-[350px] bg-[#0B1220]/70 flex flex-col items-center justify-center p-4">
              <StatsRadarChart stats={profile.avatar.stats} compact />
              <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] mt-1">
                <span>سرعة الضرب: <strong className="font-mono-num text-[#E6B85C]">{derived.attackSpeedMult}x</strong></span>
                <span>·</span>
                <span>تقليص التبريد: <strong className="font-mono-num text-[#38BDF8]">{Math.round(derived.cooldownReduction * 100)}%</strong></span>
                <span>·</span>
                <span>مضاعف الغنائم: <strong className="font-mono-num text-[#10B981]">{derived.lootMultiplier}x</strong></span>
              </div>
            </div>}

          <div className="grid grid-cols-4 divide-x divide-x-reverse divide-white/10 border-t border-[#E6B85C]/20 bg-[#0B111E]">
            <div className="p-3 text-center">
              <div className="text-[11px] text-[#94A3B8]">الصحة</div>
              <div className="font-mono-num text-sm font-semibold text-[#F8FAFC] mt-0.5">
                {derived.maxHp}
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="text-[11px] text-[#94A3B8]">الهجوم</div>
              <div className="font-mono-num text-sm font-semibold text-[#E6B85C] mt-0.5">
                {derived.attackDamage}
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="text-[11px] text-[#94A3B8]">السرعة</div>
              <div className="font-mono-num text-sm font-semibold text-[#38BDF8] mt-0.5">
                {derived.moveSpeed}
              </div>
            </div>
            <div className="p-3 text-center">
              <div className="text-[11px] text-[#94A3B8]">الدفاع</div>
              <div className="font-mono-num text-sm font-semibold text-[#10B981] mt-0.5">
                {Math.round(derived.armorReduction * 100)}%
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* Full-Width 4-Column KPI Progress Strip */
  }
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="isekai-card rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#94A3B8]">الوحوش المهزومة</p>
            <p className="font-mono-num text-2xl font-semibold text-[#F8FAFC] mt-1">
              {profile.totalKills}
            </p>
          </div>
          <Flame className="w-5 h-5 text-[#E6B85C]" />
        </div>
        <div className="isekai-card rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#94A3B8]">أقاليم إيثيريا المكتشفة</p>
            <p className="font-mono-num text-2xl font-semibold text-[#38BDF8] mt-1">
              {profile.discoveredRegions.length}/9
            </p>
          </div>
          <Compass className="w-5 h-5 text-[#38BDF8]" />
        </div>
        <div className="isekai-card rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#94A3B8]">أوسمة النقابة</p>
            <p className="font-mono-num text-2xl font-semibold text-[#E6B85C] mt-1">
              {profile.guildMarks}
            </p>
          </div>
          <Award className="w-5 h-5 text-[#E6B85C]" />
        </div>
        <div className="isekai-card rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#94A3B8]">صناديق جاهزة للفتح</p>
            <p className="font-mono-num text-2xl font-semibold text-[#10B981] mt-1">
              {profile.warriorChests + profile.mythicChests}
            </p>
          </div>
          <button
    type="button"
    onClick={() => onNavigate("rewards")}
    className="text-xs font-semibold text-[#E6B85C] hover:text-[#F5D076] cursor-pointer"
  >
            فتح والعقود
          </button>
        </div>
      </section>

      {
    /* Main 100x Larger Overworld Open Continent Showcase Card */
  }
      <section className="isekai-panel rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 relative min-h-[240px] bg-[#0D1422]">
          <img
    src={OVERWORLD_MAP.imagePath}
    alt={OVERWORLD_MAP.name}
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover"
  />
          <div className="absolute inset-0 bg-gradient-to-l from-[#10182A] via-[#10182A]/45 to-transparent" />
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#080D18]/85 border border-[#E6B85C]/35 text-[11px] font-bold text-[#E6B85C]">
            100× توسّع · 9 أحجار انتقال سريع [M]
          </div>
        </div>
        <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#38BDF8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E6B85C]" />
                <span>الخريطة الأساسية المفتوحة · قطر 14,000 متر (بث المقاطع الحي)</span>
              </span>
              <span className="font-mono-num text-[#E6B85C]">
                الأقاليم: {profile.discoveredRegions.length}/9 · المقاطع: {profile.exploredChunks.length} · الكنوز: {profile.openedWorldChests.length}/12
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              {OVERWORLD_MAP.name}
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {OVERWORLD_MAP.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {OVERWORLD_MAP.componentsSummary.map((item, idx) => <div key={idx} className="bg-[#0B1220] border border-white/10 rounded-lg p-3 space-y-1">
                <div className="font-display font-bold text-[#E6B85C]">{item.title}</div>
                <p className="text-[#94A3B8] leading-snug">{item.detail}</p>
              </div>)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-[#94A3B8]">
              تفاعل <strong className="font-mono-num text-[#F8FAFC]">[G]</strong> لجمع الأعشاب والمعادن، التعاقد مع الشخصيات المسالمة الخمس، واضغط{" "}
              <strong className="font-mono-num text-[#38BDF8]">[M]</strong> للانتقال السريع.
            </span>
            <button
    type="button"
    onClick={() => onStartCombat("world_explore", selectedArena)}
    className="min-h-[44px] px-6 py-2.5 text-sm font-bold text-[#0A0F1A] bg-gradient-to-r from-[#E6B85C] to-[#F5D076] hover:brightness-105 rounded-xl flex items-center gap-2 whitespace-nowrap cursor-pointer"
  >
              <Compass className="w-4 h-4" />
              <span>دخول عالم إيثيريا الآن</span>
            </button>
          </div>
        </div>
      </section>

      {
    /* 6 Enlarged 3D Battle Arenas Selection + Component Clarity */
  }
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
              ساحات المعارك الست الكبرى وتضاريسها التكتيكية
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              6 ساحات قتال موسّعة بقطر 96–120م تضم منصات مرتفعة (+12% ضرر)، بقع حمم وجليد ورون، محاريب دعم، ومهام ميدانية حية.
            </p>
          </div>
          <div className="text-xs text-[#94A3B8] flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#E6B85C]" />
            <span>
              الساحة المختارة: <strong className="text-[#F8FAFC]">{arena.name}</strong> (قطر{" "}
              <span className="font-mono-num text-[#E6B85C]">{Math.round(arena.radius * 2)}م</span>)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARENA_LIST.map((item) => {
    const isSelected = selectedArena === item.id;
    const bonusPct = Math.round((item.rewardMultiplier - 1) * 100);
    return <button
      key={item.id}
      type="button"
      onClick={() => onSelectArena(item.id)}
      className={`group text-right rounded-xl overflow-hidden border transition-all flex flex-col cursor-pointer ${isSelected ? "border-[#E6B85C] bg-[#17243D] shadow-[0_0_24px_-8px_rgba(230,184,92,0.35)]" : "isekai-card hover:border-[#38BDF8]/40"}`}
    >
                <div className="relative aspect-video w-full overflow-hidden bg-[#1B2230]">
                  {!imgErrors[item.id] ? <img
      src={item.imagePath}
      alt={item.name}
      referrerPolicy="no-referrer"
      onError={() => setImgErrors((prev) => ({ ...prev, [item.id]: true }))}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    /> : <div
      className="w-full h-full flex items-center justify-center text-sm font-display font-bold text-white/80"
      style={{
        background: `linear-gradient(135deg, ${item.skyMid}, ${item.skyHorizon})`
      }}
    >
                      {item.name}
                    </div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B101D]/95 via-[#0B101D]/30 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-sm text-white">{item.name}</span>
                    <span className="font-mono-num text-[#E6B85C] font-semibold">
                      {bonusPct > 0 ? `+${bonusPct}% \u063A\u0646\u0627\u0626\u0645` : "\u0642\u064A\u0627\u0633\u064A"}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <p className="text-xs text-[#9AA6B8] leading-relaxed">{item.description}</p>
                  <div className="text-[11px] text-[#7B889C] flex flex-wrap items-center gap-x-2 gap-y-1 pt-1.5 border-t border-white/5">
                    <span className="text-[#E6B85C] font-mono-num">قطر {Math.round(item.radius * 2)}م</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.platforms.length} منصات</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.terrainZones.length} تضاريس</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.shrines.length} محاريب</span>
                  </div>
                </div>
              </button>;
  })}
        </div>

        {
    /* Selected Arena Detailed Map & 3D Component Breakdown */
  }
        <div className="isekai-panel rounded-2xl p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#0B1220] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="w-full flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5 font-semibold text-[#F8FAFC]">
                <Compass className="w-3.5 h-3.5 text-[#E6B85C]" />
                خريطة تضاريس الساحة
              </span>
              <span className="font-mono-num">نصف القطر {arena.radius}م</span>
            </div>

            <svg
    viewBox={`${-(arena.radius + 4)} ${-(arena.radius + 4)} ${(arena.radius + 4) * 2} ${(arena.radius + 4) * 2}`}
    className="w-48 h-48 overflow-visible"
    aria-label={`\u0645\u062E\u0637\u0637 \u0633\u0627\u062D\u0629 ${arena.name}`}
  >
              <circle cx={0} cy={0} r={arena.radius + 2.2} fill={arena.platformWall} stroke="rgba(255,255,255,0.08)" strokeWidth={0.9} />
              <circle cx={0} cy={0} r={arena.radius} fill={arena.floorMain} stroke={arena.floorTrim} strokeWidth={1.1} />
              <circle cx={0} cy={0} r={arena.radius * 0.65} fill="none" stroke={arena.floorTrim} strokeOpacity={0.25} strokeWidth={0.6} strokeDasharray="2 2" />
              <circle cx={0} cy={0} r={arena.radius * 0.32} fill={arena.floorAlt} stroke={arena.floorTrim} strokeOpacity={0.35} strokeWidth={0.6} />

              {arena.terrainZones.map((tz) => <g key={tz.id} transform={`translate(${tz.x}, ${tz.z})`}>
                  <circle r={tz.radius} fill={tz.color} fillOpacity={0.25} stroke={tz.color} strokeWidth={0.6} strokeDasharray="1.8 1.4" />
                </g>)}

              {arena.platforms.map((pl) => <g key={pl.id} transform={`translate(${pl.x}, ${pl.z})`}>
                  <circle r={pl.radius} fill={pl.color} stroke={pl.trimColor} strokeWidth={0.8} />
                </g>)}

              {arena.arches.map((arch, idx) => <g key={idx} transform={`translate(${arch.x}, ${arch.z}) rotate(${arch.rotY * 180 / Math.PI})`}>
                  <rect
    x={-arch.width / 2}
    y={-1.2}
    width={arch.width}
    height={2.4}
    rx={0.6}
    fill={arena.pillarAccent}
    fillOpacity={0.85}
  />
                </g>)}

              {arena.pillars.map((p, idx) => <circle
    key={idx}
    cx={p.x}
    cy={p.z}
    r={Math.max(1.8, p.radius)}
    fill={arena.pillarColor}
    stroke={arena.pillarAccent}
    strokeWidth={0.7}
  />)}

              {arena.shrines.map((s) => <g key={s.id} transform={`translate(${s.x}, ${s.z})`}>
                  <circle r={3.4} fill={s.color} fillOpacity={0.22} />
                  <circle r={1.8} fill={s.color} stroke="#FFFFFF" strokeWidth={0.45} />
                </g>)}

              <circle cx={0} cy={0} r={1.3} fill="#F2F4F8" fillOpacity={0.85} />
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10B981]" /> استشفاء
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> طاقة / صقيع
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#E6B85C]" /> غضب / مرتفع
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                  مكونات ساحة «{arena.name}»
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">{arena.subtitle}</p>
              </div>
              <div className="text-xs text-[#94A3B8]">
                مكافآت الساحة:{" "}
                <strong className="text-[#E6B85C] font-mono-num">
                  +{Math.round((arena.rewardMultiplier - 1) * 100)}% غنائم وذهب
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {arena.componentsSummary.map((comp, i) => <div
    key={i}
    className="bg-[#0B1220] border border-white/10 rounded-lg p-4 space-y-1.5"
  >
                  <div className="font-display text-sm font-bold text-[#E6B85C]">{comp.title}</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{comp.detail}</p>
                </div>)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#94A3B8]">
              <span>
                التضاريس الخاصة:{" "}
                <strong className="text-[#F8FAFC]">
                  {arena.terrainZones.map((t) => t.label).join(" \xB7 ") || "\u0633\u0627\u062D\u0629 \u0645\u062A\u0648\u0627\u0632\u0646\u0629"}
                </strong>
              </span>
              <span className="font-mono-num text-[#10B981]">
                {arena.platforms.length} منصات مرتفعة · {arena.pillars.length} أعمدة · قطر {Math.round(arena.radius * 2)}م
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>;
};
