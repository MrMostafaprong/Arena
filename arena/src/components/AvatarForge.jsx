import { useState } from "react";
import { Check, Crown, Dices, Minus, Plus, Radar, RotateCcw, Wand2 } from "lucide-react";
import {
  ARMOR_SWATCHES,
  DEFAULT_AVATAR,
  EXCLUSIVE_TITLES,
  GEAR_ITEMS,
  GLOW_SWATCHES,
  SKIN_TONES,
  STAT_DEFINITIONS,
  computeFighterDerivedStats
} from "../data/gameCatalog";
import { AvatarPreview3D } from "./AvatarPreview3D";
import { StatsRadarChart } from "./StatsRadarChart";
import { SkillNetworkAndFusionPanel } from "./SkillNetworkAndFusionPanel";
const HEAD_OPTIONS = [
  { id: "spiky_hair", label: "\u0634\u0639\u0631 \u0645\u0642\u0627\u062A\u0644 \u062D\u0627\u062F" },
  { id: "knight_helm", label: "\u062E\u0648\u0630\u0629 \u0627\u0644\u0641\u0627\u0631\u0633" },
  { id: "shadow_hood", label: "\u063A\u0637\u0627\u0621 \u0627\u0644\u0638\u0644" },
  { id: "war_crown", label: "\u062A\u0627\u062C \u0627\u0644\u062D\u0631\u0628" },
  { id: "tech_visor", label: "\u0642\u0646\u0627\u0639 \u0628\u0635\u0631\u064A \u0639\u0635\u0631\u064A" },
  { id: "horned_helm", label: "\u062E\u0648\u0630\u0629 \u0627\u0644\u0642\u0631\u0648\u0646" },
  { id: "phoenix_crest", label: "\u062A\u0627\u062C \u0627\u0644\u0639\u0646\u0642\u0627\u0621 \u0627\u0644\u0645\u062C\u0646\u0651\u062D" },
  { id: "void_mask", label: "\u0642\u0646\u0627\u0639 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0645\u0636\u064A\u0621" },
  { id: "royal_crown_helm", label: "\u062E\u0648\u0630\u0629 \u0627\u0644\u0639\u0631\u0634 \u0627\u0644\u0645\u0644\u0643\u064A\u0629" }
];
const ARMOR_OPTIONS = [
  { id: "tunic", label: "\u062F\u0631\u0639 \u062E\u0641\u064A\u0641 \u0645\u0631\u0646" },
  { id: "plate", label: "\u062F\u0631\u0639 \u0635\u0641\u0627\u0626\u062D \u0641\u0648\u0644\u0627\u0630\u064A" },
  { id: "mystic", label: "\u0631\u062F\u0627\u0621 \u0627\u0644\u0637\u0627\u0642\u0629" },
  { id: "titan_mail", label: "\u062F\u0631\u0639 \u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629 \u0627\u0644\u062B\u0642\u064A\u0644" },
  { id: "nomad_cloak", label: "\u0632\u064A \u0645\u062D\u0627\u0631\u0628 \u0627\u0644\u0635\u062D\u0631\u0627\u0621" },
  { id: "dragon_scale", label: "\u062D\u0631\u0627\u0634\u0641 \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0639\u0629" },
  { id: "arcane_robe", label: "\u0639\u0628\u0627\u0621\u0629 \u0627\u0644\u0633\u0627\u062D\u0631 \u0627\u0644\u0645\u0644\u0643\u064A\u0629" },
  { id: "paladin_aegis", label: "\u062F\u0631\u0639 \u0627\u0644\u062D\u0627\u0631\u0633 \u0627\u0644\u0645\u0628\u0627\u0631\u0643" }
];
const BACK_GEAR_OPTIONS = [
  { id: "none", label: "\u0628\u062F\u0648\u0646 \u0625\u0636\u0627\u0641\u0627\u062A" },
  { id: "battle_cape", label: "\u0639\u0628\u0627\u0621\u0629 \u0627\u0644\u0645\u0639\u0631\u0643\u0629" },
  { id: "energy_wings", label: "\u0623\u062C\u0646\u062D\u0629 \u0637\u0627\u0642\u0629" },
  { id: "back_scabbard", label: "\u063A\u0645\u062F \u0633\u064A\u0641 \u062E\u0644\u0641\u064A" },
  { id: "flame_halo", label: "\u0647\u0627\u0644\u0629 \u0637\u0627\u0642\u0629 \u062F\u0648\u0651\u0627\u0631\u0629" },
  { id: "frost_wings", label: "\u0623\u062C\u0646\u062D\u0629 \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0628\u0644\u0648\u0631\u064A\u0629" },
  { id: "war_banner", label: "\u0631\u0627\u064A\u0629 \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u062E\u0644\u0641\u064A\u0629" },
  { id: "arcane_orbit", label: "\u0645\u062F\u0627\u0631 \u062C\u0648\u0627\u0647\u0631 \u0633\u062D\u0631\u064A\u0629" }
];
const AURA_OPTIONS = [
  { id: "none", label: "\u0628\u062F\u0648\u0646 \u0647\u0627\u0644\u0629", color: "#475569" },
  { id: "ember_sparks", label: "\u0634\u0631\u0631 \u0627\u0644\u0644\u0647\u0628 \u0627\u0644\u0645\u062A\u0637\u0627\u064A\u0631", color: "#F97316" },
  { id: "frost_mist", label: "\u0636\u0628\u0627\u0628 \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0645\u0636\u064A\u0621", color: "#38BDF8" },
  { id: "royal_gold", label: "\u0648\u0647\u062C \u0627\u0644\u0630\u0647\u0628 \u0627\u0644\u0645\u0644\u0643\u064A", color: "#F59E0B" },
  { id: "void_pulse", label: "\u0646\u0628\u0636 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0623\u0631\u062C\u0648\u0627\u0646\u064A", color: "#A855F7" }
];
const CLASS_PRESETS = [
  {
    id: "berserker",
    label: "\u0645\u0628\u0627\u0631\u0632 \u0647\u062C\u0648\u0645\u064A",
    desc: "\u062F\u0631\u0639 \u062D\u0631\u0627\u0634\u0641 \u0627\u0644\u062A\u0646\u064A\u0646 + \u062E\u0648\u0630\u0629 \u0627\u0644\u0642\u0631\u0648\u0646 + \u0647\u0627\u0644\u0629 \u0644\u0647\u0628",
    patch: {
      title: "\u0646\u0635\u0644 \u0627\u0644\u0639\u0627\u0635\u0641\u0629",
      build: "balanced",
      headStyle: "horned_helm",
      armorStyle: "dragon_scale",
      backGear: "back_scabbard",
      auraStyle: "ember_sparks",
      primaryColor: "#991B1B",
      secondaryColor: "#C9841A",
      helmetColor: "#2B3442",
      accentColor: "#F59E0B",
      eyeGlow: "#F59E0B"
    }
  },
  {
    id: "archmage",
    label: "\u0633\u0627\u062D\u0631 \u0627\u0644\u0628\u0631\u0642 \u0648\u0627\u0644\u0646\u0627\u0631",
    desc: "\u0639\u0628\u0627\u0621\u0629 \u0627\u0644\u0633\u0627\u062D\u0631 + \u0642\u0646\u0627\u0639 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 + \u0645\u062F\u0627\u0631 \u0633\u062D\u0631\u064A",
    patch: {
      title: "\u0633\u064A\u062F \u0627\u0644\u062A\u0639\u0627\u0648\u064A\u0630",
      build: "agile",
      headStyle: "void_mask",
      armorStyle: "arcane_robe",
      backGear: "arcane_orbit",
      auraStyle: "void_pulse",
      primaryColor: "#5B21B6",
      secondaryColor: "#1D4E7A",
      helmetColor: "#181D24",
      accentColor: "#A855F7",
      eyeGlow: "#38BDF8"
    }
  },
  {
    id: "paladin",
    label: "\u062F\u0627\u0639\u0645 \u0627\u0644\u0646\u0648\u0631",
    desc: "\u062A\u0627\u062C \u0627\u0644\u0639\u0646\u0642\u0627\u0621 + \u062F\u0631\u0639 \u0627\u0644\u062D\u0627\u0631\u0633 \u0627\u0644\u0645\u0628\u0627\u0631\u0643 + \u0623\u062C\u0646\u062D\u0629 \u0637\u0627\u0642\u0629",
    patch: {
      title: "\u062D\u0627\u0645\u0644 \u0627\u0644\u0646\u0648\u0631",
      build: "balanced",
      headStyle: "phoenix_crest",
      armorStyle: "paladin_aegis",
      backGear: "energy_wings",
      auraStyle: "royal_gold",
      primaryColor: "#0F6A52",
      secondaryColor: "#CFC6B6",
      helmetColor: "#C9841A",
      accentColor: "#10B981",
      eyeGlow: "#FDE047"
    }
  },
  {
    id: "guardian",
    label: "\u062D\u0627\u0645\u064A \u0627\u0644\u062D\u0635\u0646",
    desc: "\u0628\u0646\u064A\u0629 \u0639\u0645\u0644\u0627\u0642\u0629 + \u062E\u0648\u0630\u0629 \u0627\u0644\u0639\u0631\u0634 + \u0631\u0627\u064A\u0629 \u0627\u0644\u0642\u062A\u0627\u0644",
    patch: {
      title: "\u062C\u062F\u0627\u0631 \u0627\u0644\u062D\u062F\u064A\u062F",
      build: "heavy",
      headStyle: "royal_crown_helm",
      armorStyle: "titan_mail",
      backGear: "war_banner",
      auraStyle: "frost_mist",
      primaryColor: "#1D4E7A",
      secondaryColor: "#C9841A",
      helmetColor: "#2B3442",
      accentColor: "#38BDF8",
      eyeGlow: "#38BDF8"
    }
  }
];
const BUILD_OPTIONS = [
  { id: "agile", label: "\u0631\u0634\u064A\u0642", effect: "+\u0633\u0631\u0639\u0629 \u0648\u062D\u0631\u0643\u0629 \xB7 -\u0635\u062D\u0629 \u0637\u0641\u064A\u0641\u0629" },
  { id: "balanced", label: "\u0645\u062A\u0648\u0627\u0632\u0646", effect: "\u062A\u0648\u0627\u0632\u0646 \u0634\u0627\u0645\u0644 \u0641\u064A \u0643\u0644 \u0627\u0644\u0645\u0639\u0627\u0631\u0643" },
  { id: "heavy", label: "\u0639\u0645\u0644\u0627\u0642", effect: "+45 \u0635\u062D\u0629 \xB7 +5 \u0636\u0631\u0631 \xB7 \u0623\u0628\u0637\u0623 \u0642\u0644\u064A\u0644\u0627\u064B" }
];
const RANDOM_NAMES = [
  "\u0635\u0642\u0631 \u0627\u0644\u0631\u0645\u0627\u062F",
  "\u0643\u0631\u064A\u0645 \u0627\u0644\u0646\u0635\u0644",
  "\u0646\u0648\u0631 \u0627\u0644\u0635\u0627\u0639\u0642\u0629",
  "\u0641\u0627\u0631\u0633 \u0627\u0644\u063A\u0633\u0642",
  "\u0631\u064A\u0627\u0646 \u0627\u0644\u0628\u0631\u0643\u0627\u0646",
  "\u0633\u0644\u0645\u0649 \u0627\u0644\u0639\u0627\u0635\u0641\u0629",
  "\u0645\u0627\u0644\u0643 \u0627\u0644\u062C\u0644\u064A\u062F"
];
export const AvatarForge = ({
  profile,
  onSaveAvatar,
  onEquipTitle,
  onAllocateStat,
  onUnlockOrEquipPower,
  onUnlockNextSkillSlot,
  onUpgradePower,
  onUnlockNetworkNode,
  onFusePowers,
  onStartCombat
}) => {
  const [draft, setDraft] = useState(() => ({
    ...profile.avatar,
    powerSlots: [...profile.avatar.powerSlots],
    stats: { ...profile.avatar.stats }
  }));
  const [tab, setTab] = useState("body");
  const [powerSlotTarget, setPowerSlotTarget] = useState(0);
  const [previewAct, setPreviewAct] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const syncedDraft = {
    ...draft,
    weaponId: profile.avatar.weaponId,
    powerId: profile.avatar.powerId,
    secondaryPowerId: profile.avatar.secondaryPowerId,
    powerSlots: profile.avatar.powerSlots,
    stats: profile.avatar.stats
  };
  const weaponLv = profile.weaponLevels[syncedDraft.weaponId] || 1;
  const derived = computeFighterDerivedStats(syncedDraft, weaponLv, profile.equippedGear);
  const equippedSamanList = ["relic", "armor_core", "boots"].map((slot) => profile.equippedGear[slot] ? GEAR_ITEMS[profile.equippedGear[slot]] : null).filter(Boolean);
  const showToast = (msg) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(""), 2600);
  };
  const handleSave = () => {
    const cleanName = syncedDraft.name.trim() || "\u0628\u0637\u0644 \u0627\u0644\u0645\u064A\u062F\u0627\u0646";
    const next = { ...syncedDraft, name: cleanName.slice(0, 22) };
    setDraft(next);
    onSaveAvatar(next);
    showToast("\u062A\u0645 \u062D\u0641\u0638 \u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0623\u0641\u062A\u0627\u0631 \u0628\u0646\u062C\u0627\u062D!");
  };
  const handleApplyPreset = (preset) => {
    const next = {
      ...syncedDraft,
      ...preset.patch
    };
    setDraft(next);
    onSaveAvatar(next);
    showToast(`\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0642\u0627\u0644\u0628 \xAB${preset.label}\xBB \u0628\u0646\u062C\u0627\u062D!`);
  };
  const handleRandomize = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const next = {
      ...syncedDraft,
      name: pick(RANDOM_NAMES),
      build: pick(["agile", "balanced", "heavy"]),
      heightScale: Number((0.9 + Math.random() * 0.24).toFixed(2)),
      shoulderScale: Number((0.9 + Math.random() * 0.3).toFixed(2)),
      skinTone: pick(SKIN_TONES).color,
      headStyle: pick(HEAD_OPTIONS).id,
      helmetColor: pick(ARMOR_SWATCHES).color,
      eyeGlow: pick(GLOW_SWATCHES).color,
      armorStyle: pick(ARMOR_OPTIONS).id,
      primaryColor: pick(ARMOR_SWATCHES).color,
      secondaryColor: pick(ARMOR_SWATCHES).color,
      accentColor: pick(GLOW_SWATCHES).color,
      backGear: pick(BACK_GEAR_OPTIONS).id,
      auraStyle: pick(AURA_OPTIONS).id
    };
    setDraft(next);
    onSaveAvatar(next);
    showToast("\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0623\u0641\u062A\u0627\u0631 \u0639\u0634\u0648\u0627\u0626\u064A \u062C\u062F\u064A\u062F!");
  };
  const handleResetScratch = () => {
    const fresh = {
      ...DEFAULT_AVATAR,
      name: "\u0645\u0642\u0627\u062A\u0644 \u062C\u062F\u064A\u062F",
      headStyle: "spiky_hair",
      armorStyle: "tunic",
      backGear: "none",
      auraStyle: "none",
      weaponId: syncedDraft.weaponId,
      powerId: syncedDraft.powerId,
      secondaryPowerId: syncedDraft.secondaryPowerId,
      powerSlots: syncedDraft.powerSlots,
      stats: syncedDraft.stats
    };
    setDraft(fresh);
    onSaveAvatar(fresh);
    showToast("\u062A\u0645\u062A \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0623\u0641\u062A\u0627\u0631 \u0644\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0645\u0646 \u0627\u0644\u0635\u0641\u0631.");
  };
  return <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E6B85C]/20 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F1F5F9]">
            ورشة بناء الأفتار والسمات الثماني
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            شخصيات ملساء بمفاصل كاملة · 8 سمات بمخطط راداري حي · 4 مهارات قتالية نشطة [Q] [R] [Z] [X].
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
    type="button"
    onClick={handleRandomize}
    className="px-3.5 py-2 text-xs font-semibold text-[#F1F5F9] bg-[#162138] hover:bg-[#1E2C49] border border-[#E6B85C]/25 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
  >
            <Dices className="w-4 h-4 text-[#E6B85C]" />
            <span>توليد عشوائي</span>
          </button>
          <button
    type="button"
    onClick={handleResetScratch}
    className="px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-[#F1F5F9] bg-[#121B2D]/90 border border-white/10 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
  >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بدء من الصفر</span>
          </button>
          <button
    type="button"
    onClick={handleSave}
    className="px-4 py-2 text-xs font-bold text-[#0A0F1A] bg-[#E6B85C] hover:bg-[#F5D076] rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md shadow-[#E6B85C]/15 transition-colors"
  >
            <Check className="w-4 h-4" />
            <span>حفظ الأفتار</span>
          </button>
        </div>
      </div>

      {feedback && <div className="px-4 py-2.5 text-sm text-[#FDE68A] bg-[#1B1914] border border-[#E6B85C]/45 rounded-lg">
          {feedback}
        </div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {
    /* 3D Interactive Studio Preview */
  }
        <section className="lg:col-span-5 flex flex-col isekai-panel rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A101E]/60">
            <span className="font-display font-bold text-sm text-[#F1F5F9]">
              معاينة ثلاثية الأبعاد 360°
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#0A0F1A] rounded-md border border-white/10">
              {[
    { id: "idle", label: "\u0648\u0642\u0641\u0629" },
    { id: "attack", label: "\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0633\u0644\u0627\u062D" },
    { id: "power", label: "\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0642\u0648\u0629" }
  ].map((act) => <button
    key={act.id}
    type="button"
    onClick={() => setPreviewAct(act.id)}
    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${previewAct === act.id ? "bg-[#1D2B44] text-[#E6B85C]" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
                  {act.label}
                </button>)}
            </div>
          </div>

          <AvatarPreview3D
    avatar={syncedDraft}
    weaponLevel={weaponLv}
    previewAction={previewAct}
    caption="اسحب أفقياً لتدوير الأفتار وفحص المفاصل الملساء والدروع"
    className="flex-1 min-h-[340px]"
  />

          <div className="p-4 border-t border-white/10 bg-[#0B111E] space-y-3">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#141F35] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">الصحة</div>
                <div className="font-mono-num text-sm font-semibold text-[#F1F5F9]">{derived.maxHp}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141F35] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">الضرر</div>
                <div className="font-mono-num text-sm font-semibold text-[#E6B85C]">{derived.attackDamage}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141F35] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">السرعة</div>
                <div className="font-mono-num text-sm font-semibold text-[#38BDF8]">{derived.moveSpeed}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141F35] border border-white/5">
                <div className="text-[11px] text-[#94A3B8]">الدفاع</div>
                <div className="font-mono-num text-sm font-semibold text-[#10B981]">
                  {Math.round(derived.armorReduction * 100)}%
                </div>
              </div>
            </div>

            {equippedSamanList.length > 0 && <div className="text-[11px] text-[#CBD5E1] flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[#E6B85C] font-semibold">السامان النشط:</span>
                <span>{equippedSamanList.map((g) => g.name).join(" \xB7 ")}</span>
              </div>}

            <button
    type="button"
    onClick={() => {
      handleSave();
      onStartCombat();
    }}
    className="w-full py-2.5 text-sm font-bold text-[#0A0F1A] bg-gradient-to-r from-[#E6B85C] to-[#F5D076] hover:brightness-105 rounded-xl transition-all cursor-pointer shadow-md"
  >
              حفظ ودخول الساحة بهذا الأفتار
            </button>
          </div>
        </section>

        {
    /* Customization Controls Studio */
  }
        <section className="lg:col-span-7 isekai-panel rounded-2xl flex flex-col">
          {
    /* Segmented 5 Forge Tabs */
  }
          <div className="flex items-center gap-1.5 p-2 border-b border-white/10 bg-[#0A101E]/60 overflow-x-auto no-scrollbar">
            {[
    { id: "body", label: "1. \u0627\u0644\u0642\u0648\u0627\u0644\u0628 \u0648\u0627\u0644\u062C\u0633\u062F" },
    { id: "head", label: "2. \u0627\u0644\u0631\u0623\u0633 \u0648\u0627\u0644\u062E\u0648\u0630\u0629" },
    { id: "armor", label: "3. \u0627\u0644\u062F\u0631\u0639 \u0648\u0627\u0644\u0647\u0627\u0644\u0629" },
    { id: "stats", label: "4. \u0627\u0644\u0633\u0645\u0627\u062A \u0648\u0627\u0644\u0631\u0627\u062F\u0627\u0631" },
    { id: "powers", label: `5. \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0634\u0628\u0643\u0629 (${profile.unlockedSkillSlots}/4)` }
  ].map((t) => <button
    key={t.id}
    type="button"
    onClick={() => setTab(t.id)}
    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${tab === t.id ? "bg-[#1D2B44] text-[#E6B85C] border border-[#E6B85C]/35" : "text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
                {t.label}
                {t.id === "stats" && profile.unspentStatPoints > 0 && <span className="font-mono-num text-xs text-[#E6B85C] mr-1.5">
                    (+{profile.unspentStatPoints})
                  </span>}
              </button>)}
          </div>

          <div className="p-5 sm:p-6 space-y-6 flex-1">
            {tab === "body" && <>
                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#E6B85C] flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>قوالب تخصص سريعة (مظهر وأسلوب جاهز)</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {CLASS_PRESETS.map((pr) => <button
    key={pr.id}
    type="button"
    onClick={() => handleApplyPreset(pr)}
    className="p-3 rounded-lg border border-white/10 bg-[#0B1220] hover:border-[#E6B85C] text-right transition-colors cursor-pointer"
  >
                        <div className="font-display text-xs font-bold text-[#F1F5F9]">{pr.label}</div>
                        <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">{pr.desc}</div>
                      </button>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-[#CBD5E1]">اسم المقاتل</span>
                    <input
    type="text"
    maxLength={22}
    value={draft.name}
    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
    className="w-full px-3.5 py-2.5 text-sm bg-[#0A0F1A] border border-white/15 rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#E6B85C]"
    placeholder="اكتب اسم أفتارك"
  />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium text-[#CBD5E1]">اللقب القتالي</span>
                    <input
    type="text"
    maxLength={24}
    value={draft.title}
    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
    className="w-full px-3.5 py-2.5 text-sm bg-[#0A0F1A] border border-white/15 rounded-lg text-[#F1F5F9] focus:outline-none focus:border-[#E6B85C]"
    placeholder="مثال: صائد العمالقة"
  />
                  </label>
                </div>

                {
    /* Unlocked Exclusive Titles Quick Selector */
  }
                <div className="space-y-2 p-3.5 rounded-xl bg-[#0B1220] border border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#E6B85C] flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      <span>الألقاب الحصرية المفتوحة ({profile.unlockedTitles.length})</span>
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">اضغط للتجهيز الفوري</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXCLUSIVE_TITLES.map((t) => {
    const unlocked = profile.unlockedTitles.includes(t.label);
    const active = draft.title === t.label;
    return <button
      key={t.id}
      type="button"
      disabled={!unlocked}
      title={unlocked ? `${t.source}` : `\u0645\u0642\u0641\u0644 \u2014 ${t.source}`}
      onClick={() => {
        if (!unlocked) return;
        setDraft((prev) => ({ ...prev, title: t.label }));
        onEquipTitle?.(t.label);
        showToast(`\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0644\u0642\u0628 \xAB${t.label}\xBB!`);
      }}
      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${active ? "bg-[#E6B85C] text-[#0A0F1A] border-[#FDE68A] cursor-pointer" : unlocked ? "bg-[#152038] hover:bg-[#1E2E50] text-[#E2E8F0] border-white/15 cursor-pointer" : "bg-[#090E1A] text-[#475569] border-white/5 opacity-60 cursor-not-allowed"}`}
    >
                          {t.label}
                        </button>;
  })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">البنية الجسدية (تؤثر على الشكل والأداء)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BUILD_OPTIONS.map((b) => <button
    key={b.id}
    type="button"
    onClick={() => setDraft({ ...draft, build: b.id })}
    className={`p-3.5 rounded-lg border text-right transition-colors cursor-pointer ${draft.build === b.id ? "bg-[#18253C] border-[#E6B85C]" : "bg-[#0B1220] border-white/10 hover:border-white/25"}`}
  >
                        <div className="font-display font-bold text-sm text-[#F1F5F9]">{b.label}</div>
                        <div className="text-xs text-[#94A3B8] mt-1">{b.effect}</div>
                      </button>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9AA6B8]">الطول ثلاثي الأبعاد</span>
                      <span className="font-mono-num text-[#F2F4F8]">{Math.round(draft.heightScale * 100)}%</span>
                    </div>
                    <input
    type="range"
    min={0.86}
    max={1.16}
    step={0.02}
    value={draft.heightScale}
    onChange={(e) => setDraft({ ...draft, heightScale: parseFloat(e.target.value) })}
    className="w-full forge-slider"
  />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9AA6B8]">عرض الأكتاف والكتلة</span>
                      <span className="font-mono-num text-[#F2F4F8]">{Math.round(draft.shoulderScale * 100)}%</span>
                    </div>
                    <input
    type="range"
    min={0.86}
    max={1.24}
    step={0.02}
    value={draft.shoulderScale}
    onChange={(e) => setDraft({ ...draft, shoulderScale: parseFloat(e.target.value) })}
    className="w-full forge-slider"
  />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">لون البشرة / خامة الجسد (8 خامات)</span>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TONES.map((tone) => <button
    key={tone.id}
    type="button"
    onClick={() => setDraft({ ...draft, skinTone: tone.color })}
    title={tone.label}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${draft.skinTone === tone.color ? "border-[#E6B85C] bg-[#18253C] text-[#F1F5F9]" : "border-white/10 bg-[#0B1220] text-[#CBD5E1] hover:border-white/25"}`}
  >
                        <span
    className="w-4 h-4 rounded-sm border border-white/20 shrink-0"
    style={{ backgroundColor: tone.color }}
  />
                        <span>{tone.label}</span>
                      </button>)}
                  </div>
                </div>
              </>}

            {tab === "head" && <>
                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">
                    تصميم الرأس والخوذة ثلاثية الأبعاد (9 أنماط)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {HEAD_OPTIONS.map((h) => <button
    key={h.id}
    type="button"
    onClick={() => setDraft({ ...draft, headStyle: h.id })}
    className={`p-3 rounded-lg border text-xs sm:text-sm font-medium text-right transition-colors cursor-pointer ${draft.headStyle === h.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#0B1220] border-white/10 text-[#CBD5E1] hover:border-white/25"}`}
  >
                        {h.label}
                      </button>)}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">لون الخوذة أو الشعر</span>
                  <div className="flex flex-wrap gap-2">
                    {ARMOR_SWATCHES.map((sw) => <button
    key={sw.color}
    type="button"
    onClick={() => setDraft({ ...draft, helmetColor: sw.color })}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${draft.helmetColor === sw.color ? "border-[#E6B85C] bg-[#18253C] text-[#F1F5F9]" : "border-white/10 bg-[#0B1220] text-[#CBD5E1]"}`}
  >
                        <span className="w-4 h-4 rounded-sm border border-white/20" style={{ backgroundColor: sw.color }} />
                        <span>{sw.label}</span>
                      </button>)}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">توهّج العيون / القناع</span>
                  <div className="flex flex-wrap gap-2">
                    {GLOW_SWATCHES.map((sw) => <button
    key={sw.color}
    type="button"
    onClick={() => setDraft({ ...draft, eyeGlow: sw.color })}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${draft.eyeGlow === sw.color ? "border-[#E6B85C] bg-[#18253C] text-[#F1F5F9]" : "border-white/10 bg-[#0B1220] text-[#CBD5E1]"}`}
  >
                        <span className="w-4 h-4 rounded-sm border border-white/20" style={{ backgroundColor: sw.color }} />
                        <span>{sw.label}</span>
                      </button>)}
                  </div>
                </div>
              </>}

            {tab === "armor" && <>
                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">طراز الدرع الرئيسي (8 أنماط فخمة)</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {ARMOR_OPTIONS.map((ar) => <button
    key={ar.id}
    type="button"
    onClick={() => setDraft({ ...draft, armorStyle: ar.id })}
    className={`p-3 rounded-lg border text-xs font-medium text-right transition-colors cursor-pointer ${draft.armorStyle === ar.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#0B1220] border-white/10 text-[#CBD5E1] hover:border-white/25"}`}
  >
                        {ar.label}
                      </button>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-[#9AA6B8]">اللون الأساسي للدرع</span>
                    <div className="flex flex-wrap gap-2">
                      {ARMOR_SWATCHES.map((sw) => <button
    key={sw.color}
    type="button"
    title={sw.label}
    onClick={() => setDraft({ ...draft, primaryColor: sw.color })}
    className={`w-8 h-8 rounded-md border-2 cursor-pointer ${draft.primaryColor === sw.color ? "border-[#F59E0B] scale-110" : "border-white/15"}`}
    style={{ backgroundColor: sw.color }}
  />)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-[#9AA6B8]">لون الزخارف والكتافيات</span>
                    <div className="flex flex-wrap gap-2">
                      {ARMOR_SWATCHES.map((sw) => <button
    key={sw.color}
    type="button"
    title={sw.label}
    onClick={() => setDraft({ ...draft, secondaryColor: sw.color })}
    className={`w-8 h-8 rounded-md border-2 cursor-pointer ${draft.secondaryColor === sw.color ? "border-[#F59E0B] scale-110" : "border-white/15"}`}
    style={{ backgroundColor: sw.color }}
  />)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#9AA6B8]">لون نواة الطاقة والأجنحة</span>
                  <div className="flex flex-wrap gap-2">
                    {GLOW_SWATCHES.map((sw) => <button
    key={sw.color}
    type="button"
    title={sw.label}
    onClick={() => setDraft({ ...draft, accentColor: sw.color })}
    className={`w-8 h-8 rounded-md border-2 cursor-pointer ${draft.accentColor === sw.color ? "border-white scale-110" : "border-white/15"}`}
    style={{ backgroundColor: sw.color }}
  />)}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">عتاد الظهر ثلاثي الأبعاد (8 إضافات)</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BACK_GEAR_OPTIONS.map((bg) => <button
    key={bg.id}
    type="button"
    onClick={() => setDraft({ ...draft, backGear: bg.id })}
    className={`p-2.5 rounded-lg border text-xs font-semibold text-right transition-colors cursor-pointer ${draft.backGear === bg.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#0B1220] border-white/10 text-[#CBD5E1] hover:border-white/25"}`}
  >
                        {bg.label}
                      </button>)}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-medium text-[#CBD5E1]">هالة الأفتار الفاخرة</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AURA_OPTIONS.map((au) => <button
    key={au.id}
    type="button"
    onClick={() => setDraft({ ...draft, auraStyle: au.id })}
    className={`p-2.5 rounded-lg border text-xs font-semibold text-right flex items-center gap-2 transition-colors cursor-pointer ${draft.auraStyle === au.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#0B1220] border-white/10 text-[#CBD5E1] hover:border-white/25"}`}
  >
                        <span
    className="w-3 h-3 rounded-sm shrink-0"
    style={{ backgroundColor: au.color }}
  />
                        <span>{au.label}</span>
                      </button>)}
                  </div>
                </div>
              </>}

            {tab === "stats" && <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                    <Radar className="w-4 h-4 text-[#38BDF8]" />
                    <span>السمات الثماني والمخطط الراداري للأفتار</span>
                  </h3>
                  <span className="px-3 py-1 rounded-lg bg-[#1A1A2C] border border-[#E6B85C]/40 text-xs text-[#E6B85C] font-bold">
                    نقاط متاحة: <span className="font-mono-num text-sm">{profile.unspentStatPoints}</span>
                  </span>
                </div>

                {
    /* Live 8-Axis Radar + Combat Summary */
  }
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0B1220] border border-white/10 rounded-xl p-4">
                  <div className="md:col-span-6">
                    <StatsRadarChart stats={profile.avatar.stats} />
                  </div>
                  <div className="md:col-span-6 space-y-2.5 text-xs">
                    <div className="font-display font-bold text-sm text-[#E6B85C]">
                      تأثير السمات على أدائك الفعلي
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">قوة القدرات</div>
                        <div className="font-mono-num font-bold text-[#A855F7] mt-0.5">{derived.powerScale}x</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">سرعة الضرب</div>
                        <div className="font-mono-num font-bold text-[#E6B85C] mt-0.5">{derived.attackSpeedMult}x</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">تقليص التبريد</div>
                        <div className="font-mono-num font-bold text-[#38BDF8] mt-0.5">{Math.round(derived.cooldownReduction * 100)}%</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">شحن الطاقة</div>
                        <div className="font-mono-num font-bold text-[#2DD4BF] mt-0.5">{derived.energyRegen}/ث</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">الضربة الحاسمة</div>
                        <div className="font-mono-num font-bold text-[#FDE047] mt-0.5">{derived.critChance}%</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#121C30] border border-white/5">
                        <div className="text-[#94A3B8]">مضاعف الغنائم</div>
                        <div className="font-mono-num font-bold text-[#10B981] mt-0.5">{derived.lootMultiplier}x</div>
                      </div>
                    </div>
                  </div>
                </div>

                {
    /* 8 Attribute Allocation Cards */
  }
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STAT_DEFINITIONS.map((st) => {
    const val = profile.avatar.stats[st.key] || 1;
    return <div
      key={st.key}
      className="p-3.5 rounded-xl bg-[#0B1220] border border-white/10 flex items-center justify-between gap-3"
    >
                        <div className="min-w-0">
                          <div className="text-sm font-bold flex items-center gap-2" style={{ color: st.color }}>
                            <span>{st.label}</span>
                          </div>
                          <div className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{st.desc}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
      type="button"
      disabled={val <= 1}
      onClick={() => onAllocateStat(st.key, -1)}
      className="w-7 h-7 rounded bg-[#19253D] hover:bg-[#233454] disabled:opacity-35 flex items-center justify-center text-[#F1F5F9] cursor-pointer"
    >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono-num w-6 text-center text-sm font-bold text-[#F8FAFC]">
                            {val}
                          </span>
                          <button
      type="button"
      disabled={profile.unspentStatPoints <= 0}
      onClick={() => onAllocateStat(st.key, 1)}
      className="w-7 h-7 rounded bg-[#E6B85C] hover:bg-[#F5D076] disabled:opacity-35 flex items-center justify-center text-[#0A0F1A] cursor-pointer"
    >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>;
  })}
                </div>
              </div>}

            {tab === "powers" && <SkillNetworkAndFusionPanel
    profile={profile}
    powerSlotTarget={powerSlotTarget}
    onSelectSlotTarget={setPowerSlotTarget}
    onUnlockOrEquipPower={onUnlockOrEquipPower}
    onUnlockNextSkillSlot={onUnlockNextSkillSlot}
    onUpgradePower={onUpgradePower}
    onUnlockNetworkNode={onUnlockNetworkNode}
    onFusePowers={onFusePowers}
    onNotify={showToast}
    onTriggerPreviewPower={() => setPreviewAct("power")}
  />}
          </div>
        </section>
      </div>
    </main>;
};
