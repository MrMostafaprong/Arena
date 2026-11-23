import { useState } from "react";
import {
  ArrowUpCircle,
  Check,
  Gift,
  Lock,
  Shield,
  Sparkles,
  Swords,
  Trash2
} from "lucide-react";
import {
  CONSUMABLE_LIST,
  GEAR_ITEMS,
  GEAR_LIST,
  WEAPONS,
  WEAPON_LIST,
  computeFighterDerivedStats
} from "../data/gameCatalog";
import { AvatarPreview3D } from "./AvatarPreview3D";
const ROLE_LABELS = {
  melee: "\u0642\u062A\u0627\u0644 \u0642\u0631\u064A\u0628",
  magic: "\u0633\u062D\u0631",
  support: "\u062F\u0639\u0645 \u0648\u0627\u0633\u062A\u0634\u0641\u0627\u0621",
  defense: "\u062F\u0641\u0627\u0639 \u0648\u062F\u0631\u0639"
};
const GEAR_SLOTS = [
  { slot: "relic", title: "\u062A\u0645\u064A\u0645\u0629 / \u062E\u0627\u062A\u0645" },
  { slot: "armor_core", title: "\u0646\u0648\u0627\u0629 \u0627\u0644\u062F\u0631\u0639" },
  { slot: "boots", title: "\u062D\u0630\u0627\u0621 \u0648\u0642\u0641\u0627\u0632" }
];
export const ArmoryView = ({
  profile,
  onUnlockOrEquip,
  onUpgradeWeapon,
  onUnlockOrEquipGear,
  onUnequipGear,
  onBuyConsumable,
  onBuyChest
}) => {
  const [shopTab, setShopTab] = useState("weapons");
  const [roleFilter, setRoleFilter] = useState("all");
  const [gearFilter, setGearFilter] = useState("all");
  const [inspectedId, setInspectedId] = useState(profile.avatar.weaponId);
  const [previewAct, setPreviewAct] = useState("attack");
  const [notice, setNotice] = useState("");
  const inspected = WEAPONS[inspectedId];
  const isUnlocked = profile.unlockedWeapons.includes(inspectedId);
  const isEquipped = profile.avatar.weaponId === inspectedId;
  const level = profile.weaponLevels[inspectedId] || 1;
  const upgradeCost = level * 220;
  const scaledDmg = Math.round(inspected.damage * (1 + (level - 1) * 0.16));
  const scaledHeavy = Math.round(inspected.heavyDamage * (1 + (level - 1) * 0.16));
  const weaponLvEquipped = profile.weaponLevels[profile.avatar.weaponId] || 1;
  const derivedWithGear = computeFighterDerivedStats(
    profile.avatar,
    weaponLvEquipped,
    profile.equippedGear
  );
  const filteredWeapons = roleFilter === "all" ? WEAPON_LIST : WEAPON_LIST.filter((w) => w.role === roleFilter);
  const filteredGear = gearFilter === "all" ? GEAR_LIST : GEAR_LIST.filter((g) => g.slot === gearFilter);
  const showNotice = (msg) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(""), 2600);
  };
  return <main className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E6B85C]/20 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F1F5F9]">
            المتجر والترسانة والسامان
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            اختر سلاحك من 12 نوعاً (قتال قريب، سحر، دعم، دفاع)، جهّز 3 خانات سامان، وتزوّد بالجرعات والصناديق.
          </p>
        </div>
        <div className="text-sm text-[#CBD5E1] flex flex-wrap items-center gap-3 bg-[#101829]/85 border border-[#E6B85C]/20 rounded-xl px-4 py-2">
          <span>
            الذهب: <strong className="font-mono-num text-[#E6B85C]">{profile.gold}</strong>
          </span>
          <span aria-hidden="true" className="text-[#475569]">·</span>
          <span>
            الجواهر: <strong className="font-mono-num text-[#38BDF8]">{profile.gems}</strong>
          </span>
          <span aria-hidden="true" className="text-[#475569]">·</span>
          <span>
            شارات النقابة: <strong className="font-mono-num text-[#10B981]">{profile.guildMarks}</strong>
          </span>
        </div>
      </div>

      {
    /* Store Main Tabs */
  }
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        {[
    { id: "weapons", label: `1. \u0645\u062A\u062C\u0631 \u0627\u0644\u0623\u0633\u0644\u062D\u0629 (${WEAPON_LIST.length})` },
    { id: "gear", label: `2. \u0645\u062A\u062C\u0631 \u0627\u0644\u0633\u0627\u0645\u0627\u0646 \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A (${GEAR_LIST.length})` },
    { id: "consumables", label: "3. \u0627\u0644\u062C\u0631\u0639\u0627\u062A \u0648\u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642" }
  ].map((t) => <button
    key={t.id}
    type="button"
    onClick={() => setShopTab(t.id)}
    className={`px-4 py-2 text-sm font-bold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${shopTab === t.id ? "bg-[#E6B85C] text-[#0A0F1A] border-[#F5D076] shadow-md shadow-[#E6B85C]/15" : "bg-[#121B2D]/90 text-[#CBD5E1] border-white/10 hover:text-[#F1F5F9]"}`}
  >
            {t.label}
          </button>)}
      </div>

      {notice && <div className="px-4 py-2.5 text-sm text-[#FDE68A] bg-[#1B1914] border border-[#E6B85C]/45 rounded-lg">
          {notice}
        </div>}

      {
    /* TAB 1: WEAPONS */
  }
      {shopTab === "weapons" && <div className="space-y-5">
          {
    /* Role Filters */
  }
          <div className="flex flex-wrap items-center gap-2">
            {[
    { id: "all", label: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0644\u062D\u0629" },
    { id: "melee", label: "\u0642\u062A\u0627\u0644 \u0642\u0631\u064A\u0628 \u0648\u0642\u0648\u0633" },
    { id: "magic", label: "\u0623\u0633\u0644\u062D\u0629 \u0627\u0644\u0633\u062D\u0631" },
    { id: "support", label: "\u0623\u0633\u0644\u062D\u0629 \u0627\u0644\u062F\u0639\u0645 \u0648\u0627\u0644\u0627\u0633\u062A\u0634\u0641\u0627\u0621" },
    { id: "defense", label: "\u0623\u0633\u0644\u062D\u0629 \u0627\u0644\u062F\u0641\u0627\u0639 \u0648\u0627\u0644\u062F\u0631\u0639" }
  ].map((rf) => <button
    key={rf.id}
    type="button"
    onClick={() => setRoleFilter(rf.id)}
    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${roleFilter === rf.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#121B2D]/90 border-white/10 text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
                {rf.label}
              </button>)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {
    /* Live 3D Weapon Showcase */
  }
            <section className="lg:col-span-5 flex flex-col bg-[#121B2D]/90 backdrop-blur-md border border-[#E6B85C]/20 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0D1422]/60">
                <div>
                  <h2 className="font-display text-base font-bold text-[#F1F5F9]">
                    {inspected.name}
                  </h2>
                  <p className="text-xs text-[#94A3B8]">
                    {inspected.category} · المستوى <span className="font-mono-num">{level}/5</span>
                  </p>
                </div>
                <button
    type="button"
    onClick={() => setPreviewAct((a) => a === "attack" ? "idle" : "attack")}
    className="px-3 py-1.5 text-xs font-semibold text-[#F1F5F9] bg-[#18253C] hover:bg-[#223454] border border-[#E6B85C]/25 rounded-md cursor-pointer transition-colors"
  >
                  {previewAct === "attack" ? "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062D\u0631\u0643\u0629" : "\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0636\u0631\u0628\u0629"}
                </button>
              </div>

              <AvatarPreview3D
    avatar={{ ...profile.avatar, weaponId: inspectedId }}
    weaponLevel={level}
    previewAction={previewAct}
    className="flex-1 min-h-[300px]"
  />

              <div className="p-5 border-t border-white/10 bg-[#0D1422] space-y-4">
                <p className="text-xs text-[#CBD5E1] leading-relaxed">{inspected.description}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#8F9BAE]">التخصص القتالي</span>
                    <span className="font-semibold text-[#38BDF8]">
                      {ROLE_LABELS[inspected.role]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F9BAE]">الضرر الأساسي</span>
                    <span className="font-mono-num font-semibold text-[#F2F4F8]">{scaledDmg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F9BAE]">مهارة السلاح ({inspected.heavySkillName})</span>
                    <span className="font-mono-num font-semibold text-[#F59E0B]">{scaledHeavy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F9BAE]">سرعة الهجوم / المدى</span>
                    <span className="font-mono-num text-[#F2F4F8]">
                      {inspected.attackSpeed} ض/ث · {inspected.range}م
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F9BAE]">إضافة الضربة الحاسمة</span>
                    <span className="font-mono-num text-[#10B981]">+{inspected.critBonus}%</span>
                  </div>
                  {inspected.armorBonus ? <div className="flex justify-between">
                      <span className="text-[#8F9BAE]">مكافأة الدرع وتقليل الضرر</span>
                      <span className="font-mono-num text-[#60A5FA]">
                        +{Math.round(inspected.armorBonus * 100)}%
                      </span>
                    </div> : null}
                  {inspected.healOnHitPct ? <div className="flex justify-between">
                      <span className="text-[#8F9BAE]">استشفاء عند كل إصابة</span>
                      <span className="font-mono-num text-[#10B981]">
                        +{Math.round(inspected.healOnHitPct * 100)}% صحة
                      </span>
                    </div> : null}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
    type="button"
    onClick={() => {
      const res = onUnlockOrEquip(inspectedId);
      showNotice(res.message);
    }}
    className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${isEquipped ? "bg-[#172B29] text-[#10B981] border border-[#10B981]/30" : "bg-[#E6B85C] hover:bg-[#F5D076] text-[#0A0F1A]"}`}
  >
                    {isEquipped ? <>
                        <Check className="w-4 h-4" />
                        <span>سلاحك النشط</span>
                      </> : isUnlocked ? <>
                        <Swords className="w-4 h-4" />
                        <span>تجهيز السلاح</span>
                      </> : <>
                        <Lock className="w-4 h-4" />
                        <span>
                          شراء ({inspected.costGold} ذهب
                          {inspected.costGems > 0 ? ` + ${inspected.costGems} \u062C\u0648\u0647\u0631\u0629` : ""})
                        </span>
                      </>}
                  </button>

                  {isUnlocked && level < 5 && <button
    type="button"
    onClick={() => {
      const res = onUpgradeWeapon(inspectedId);
      showNotice(res.message);
    }}
    className="py-2.5 px-4 text-xs font-bold text-[#F1F5F9] bg-[#18253C] hover:bg-[#223454] border border-white/15 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
  >
                      <ArrowUpCircle className="w-4 h-4 text-[#E6B85C]" />
                      <span>ترقية ({upgradeCost} ذهب)</span>
                    </button>}
                </div>
              </div>
            </section>

            {
    /* 12-Weapon Grid */
  }
            <section className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              {filteredWeapons.map((w) => {
    const unlocked = profile.unlockedWeapons.includes(w.id);
    const equipped = profile.avatar.weaponId === w.id;
    const selected = inspectedId === w.id;
    const lv = profile.weaponLevels[w.id] || 1;
    const dmg = Math.round(w.damage * (1 + (lv - 1) * 0.16));
    return <button
      key={w.id}
      type="button"
      onClick={() => setInspectedId(w.id)}
      className={`p-4 rounded-xl border text-right transition-colors flex flex-col justify-between gap-3 cursor-pointer ${selected ? "bg-[#18253C] border-[#E6B85C]" : "bg-[#121B2D]/90 border-white/10 hover:border-[#E6B85C]/40"}`}
    >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-base font-bold text-[#F1F5F9]">
                          {w.name}
                        </span>
                        <span className="text-xs font-mono-num text-[#94A3B8]">
                          {unlocked ? `\u0645${lv}` : `${w.costGold} \u0630\u0647\u0628${w.costGems > 0 ? ` + ${w.costGems}\u062C` : ""}`}
                        </span>
                      </div>
                      <div className="text-xs text-[#94A3B8]">
                        {ROLE_LABELS[w.role]} · {w.isRanged ? "\u0628\u0639\u064A\u062F \u0627\u0644\u0645\u062F\u0649" : "\u0642\u062A\u0627\u0644 \u0642\u0631\u064A\u0628"}
                        {equipped ? " \xB7 \u0645\u064F\u062C\u0647\u064E\u0651\u0632 \u0627\u0644\u0622\u0646" : ""}
                      </div>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed pt-1">{w.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-[#94A3B8] block text-[11px]">الضرر</span>
                          <span className="font-mono-num font-semibold text-[#E6B85C]">{dmg}</span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[11px]">السرعة</span>
                          <span className="font-mono-num font-semibold text-[#F1F5F9]">
                            {w.attackSpeed}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block text-[11px]">المدى</span>
                          <span className="font-mono-num font-semibold text-[#38BDF8]">{w.range}م</span>
                        </div>
                      </div>
                    </div>
                  </button>;
  })}
            </section>
          </div>
        </div>}

      {
    /* TAB 2: GEAR / SAMAN SHOP */
  }
      {shopTab === "gear" && <div className="space-y-6">
          {
    /* Equipped Saman Slots + Derived Stats */
  }
          <section className="bg-[#121B2D]/90 backdrop-blur-md border border-[#E6B85C]/20 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold text-[#F1F5F9]">
                  خانات السامان المُجهَّزة حالياً
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  تجمع هذه الخانات الثلاث مع عتاد الأفتار لرفع الصحة والضرر والسرعة والدرع مباشرة.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span>
                  الصحة: <strong className="font-mono-num text-[#F1F5F9]">{derivedWithGear.maxHp}</strong>
                </span>
                <span>
                  الهجوم: <strong className="font-mono-num text-[#E6B85C]">{derivedWithGear.attackDamage}</strong>
                </span>
                <span>
                  السرعة: <strong className="font-mono-num text-[#38BDF8]">{derivedWithGear.moveSpeed}</strong>
                </span>
                <span>
                  الدفاع: <strong className="font-mono-num text-[#10B981]">{Math.round(derivedWithGear.armorReduction * 100)}%</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {GEAR_SLOTS.map(({ slot, title }) => {
    const gId = profile.equippedGear[slot];
    const gear = gId ? GEAR_ITEMS[gId] : null;
    return <div
      key={slot}
      className="p-4 rounded-lg bg-[#0D1422] border border-white/10 flex items-center justify-between gap-3"
    >
                    <div className="space-y-1">
                      <div className="text-[11px] text-[#94A3B8]">{title}</div>
                      {gear ? <>
                          <div className="font-display text-sm font-bold text-[#F1F5F9]">
                            {gear.name}
                          </div>
                          <div className="text-xs text-[#CBD5E1]">{gear.description}</div>
                        </> : <div className="text-xs text-[#64748B]">خانة فارغة — اختر سامان من المتجر</div>}
                    </div>
                    {gear && <button
      type="button"
      onClick={() => onUnequipGear(slot)}
      title="إزالة القطعة"
      className="p-2 rounded-md bg-[#18253C] hover:bg-[#2A1A1D] text-[#CBD5E1] hover:text-[#FCA5A5] border border-white/10 shrink-0 cursor-pointer"
    >
                        <Trash2 className="w-4 h-4" />
                      </button>}
                  </div>;
  })}
            </div>
          </section>

          {
    /* Slot Filters */
  }
          <div className="flex flex-wrap items-center gap-2">
            {[
    { id: "all", label: "\u0643\u0644 \u0627\u0644\u0633\u0627\u0645\u0627\u0646" },
    { id: "relic", label: "\u0627\u0644\u062A\u0645\u0627\u0626\u0645 \u0648\u0627\u0644\u062E\u0648\u0627\u062A\u0645" },
    { id: "armor_core", label: "\u0623\u0646\u0648\u064A\u0629 \u0627\u0644\u062F\u0631\u0639" },
    { id: "boots", label: "\u0627\u0644\u0623\u062D\u0630\u064A\u0629 \u0648\u0627\u0644\u0642\u0641\u0627\u0632\u0627\u062A" }
  ].map((gf) => <button
    key={gf.id}
    type="button"
    onClick={() => setGearFilter(gf.id)}
    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${gearFilter === gf.id ? "bg-[#18253C] border-[#E6B85C] text-[#F1F5F9]" : "bg-[#121B2D]/90 border-white/10 text-[#94A3B8] hover:text-[#F1F5F9]"}`}
  >
                {gf.label}
              </button>)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredGear.map((g) => {
    const unlocked = profile.unlockedGear.includes(g.id);
    const equipped = profile.equippedGear[g.slot] === g.id;
    return <div
      key={g.id}
      className={`p-5 rounded-xl border flex flex-col justify-between gap-4 ${equipped ? "bg-[#18253C] border-[#E6B85C]" : "bg-[#121B2D]/90 border-white/10"}`}
    >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold" style={{ color: g.accentColor }}>
                        {g.slotLabel}
                      </span>
                      <Shield className="w-4 h-4" style={{ color: g.accentColor }} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#F1F5F9]">{g.name}</h3>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{g.description}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono-num text-[#CBD5E1] pt-1">
                      {g.hpBonus > 0 && <span>+{g.hpBonus} صحة</span>}
                      {g.dmgBonus > 0 && <span className="text-[#E6B85C]">+{g.dmgBonus} هجوم</span>}
                      {g.speedBonus > 0 && <span className="text-[#38BDF8]">+{g.speedBonus} سرعة</span>}
                      {g.armorBonus > 0 && <span className="text-[#10B981]">+{Math.round(g.armorBonus * 100)}% درع</span>}
                      {g.critBonus > 0 && <span className="text-[#FDE047]">+{g.critBonus}% حاسمة</span>}
                      {g.pwrScaleBonus > 0 && <span className="text-[#C084FC]">+{Math.round(g.pwrScaleBonus * 100)}% قدرة</span>}
                    </div>
                  </div>

                  <button
      type="button"
      onClick={() => {
        const res = onUnlockOrEquipGear(g.id);
        showNotice(res.message);
      }}
      className={`w-full py-2.5 px-4 text-xs font-bold rounded-lg transition-colors cursor-pointer ${equipped ? "bg-[#172B29] text-[#10B981] border border-[#10B981]/30" : unlocked ? "bg-[#1D2B44] hover:bg-[#273A5C] text-[#F1F5F9]" : "bg-[#E6B85C] hover:bg-[#F5D076] text-[#0A0F1A]"}`}
    >
                    {equipped ? "\u0645\u064F\u062C\u0647\u064E\u0651\u0632 \u0641\u064A \u0627\u0644\u062E\u0627\u0646\u0629" : unlocked ? "\u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0633\u0627\u0645\u0627\u0646" : g.costGems > 0 ? `\u0634\u0631\u0627\u0621 (${g.costGold} \u0630\u0647\u0628 + ${g.costGems} \u062C\u0648\u0647\u0631\u0629)` : `\u0634\u0631\u0627\u0621 (${g.costGold} \u0630\u0647\u0628)`}
                  </button>
                </div>;
  })}
          </div>
        </div>}

      {
    /* TAB 3: CONSUMABLES & CHESTS */
  }
      {shopTab === "consumables" && <div className="space-y-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONSUMABLE_LIST.map((item) => {
    const count = profile.consumables[item.id] || 0;
    return <div
      key={item.id}
      className="p-5 rounded-xl bg-[#121B2D]/90 border border-white/10 flex flex-col justify-between gap-4"
    >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base font-bold text-[#F1F5F9]">
                        {item.name}
                      </span>
                      <span
      className="font-mono-num text-sm font-bold"
      style={{ color: item.color }}
    >
                        مخزونك: {count}
                      </span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <button
      type="button"
      onClick={() => {
        const res = onBuyConsumable(item.id, 1);
        showNotice(res.message);
      }}
      className="flex-1 py-2.5 px-3 text-xs font-bold text-[#0A0F1A] bg-[#E6B85C] hover:bg-[#F5D076] rounded-lg cursor-pointer"
    >
                      شراء ×1 ({item.costGold} ذهب)
                    </button>
                    <button
      type="button"
      onClick={() => {
        const res = onBuyConsumable(item.id, 3);
        showNotice(res.message);
      }}
      className="py-2.5 px-3 text-xs font-bold text-[#F1F5F9] bg-[#18253C] hover:bg-[#223454] border border-white/10 rounded-lg cursor-pointer"
    >
                      ×3 ({item.costGold * 3} ذهب)
                    </button>
                  </div>
                </div>;
  })}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-[#121B2D]/90 border border-[#E6B85C]/25 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E6B85C]">
                  <Gift className="w-5 h-5" />
                  <h3 className="font-display text-base font-bold text-[#F1F5F9]">
                    صندوق المحارب (لديك: {profile.warriorChests})
                  </h3>
                </div>
                <p className="text-xs text-[#CBD5E1]">
                  يحتوي على ذهب وجواهر ونقطة قوة إضافية لتطوير أفتارك (تُفتح من قسم المهام والتحديات).
                </p>
              </div>
              <button
    type="button"
    onClick={() => {
      const ok = onBuyChest("warrior");
      showNotice(ok ? "\u062A\u0645 \u0634\u0631\u0627\u0621 \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u062D\u0627\u0631\u0628!" : "\u062A\u062D\u062A\u0627\u062C 260 \u0630\u0647\u0628\u0627\u064B.");
    }}
    className="px-4 py-2.5 text-xs font-bold text-[#0A0F1A] bg-[#E6B85C] hover:bg-[#F5D076] rounded-lg whitespace-nowrap cursor-pointer"
  >
                شراء (260 ذهب)
              </button>
            </div>

            <div className="p-5 rounded-xl bg-[#121B2D]/90 border border-[#38BDF8]/25 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-display text-base font-bold text-[#F1F5F9]">
                    الصندوق الأسطوري (لديك: {profile.mythicChests})
                  </h3>
                </div>
                <p className="text-xs text-[#CBD5E1]">
                  يمنح جواهر كثيرة ونقطتي قوة إضافيتين لبناء مقاتل أسطوري.
                </p>
              </div>
              <button
    type="button"
    onClick={() => {
      const ok = onBuyChest("mythic");
      showNotice(ok ? "\u062A\u0645 \u0634\u0631\u0627\u0621 \u0627\u0644\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A!" : "\u062A\u062D\u062A\u0627\u062C 18 \u062C\u0648\u0647\u0631\u0629.");
    }}
    className="px-4 py-2.5 text-xs font-bold text-[#0A0F1A] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-lg whitespace-nowrap cursor-pointer"
  >
                شراء (18 جوهرة)
              </button>
            </div>
          </section>
        </div>}
    </main>;
};
