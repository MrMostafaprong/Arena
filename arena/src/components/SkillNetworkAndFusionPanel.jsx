import { useState } from "react";
import {
  ArrowUpCircle,
  Award,
  Coins,
  Flame,
  Gem,
  GitMerge,
  Lock,
  Network,
  Sparkles,
  Unlock
} from "lucide-react";
import {
  CORE_POWER_LIST,
  FUSION_POWER_LIST,
  POWERS,
  SKILL_NETWORK_NODES,
  SKILL_SLOT_UNLOCK_COSTS,
  computeSkillNetworkBonuses
} from "../data/gameCatalog";
const SKILL_SLOT_META = [
  { index: 0, keyLabel: "Q", title: "\u0627\u0644\u062E\u0627\u0646\u0629 1", color: "#38BDF8" },
  { index: 1, keyLabel: "R", title: "\u0627\u0644\u062E\u0627\u0646\u0629 2", color: "#C084FC" },
  { index: 2, keyLabel: "Z", title: "\u0627\u0644\u062E\u0627\u0646\u0629 3", color: "#10B981" },
  { index: 3, keyLabel: "X", title: "\u0627\u0644\u062E\u0627\u0646\u0629 4", color: "#F59E0B" }
];
const BRANCH_COLORS = {
  core: "#E6B85C",
  fury: "#F97316",
  haste: "#38BDF8",
  ether: "#10B981",
  fusion: "#C084FC"
};
export const SkillNetworkAndFusionPanel = ({
  profile,
  powerSlotTarget,
  onSelectSlotTarget,
  onUnlockOrEquipPower,
  onUnlockNextSkillSlot,
  onUpgradePower,
  onUnlockNetworkNode,
  onFusePowers,
  onNotify,
  onTriggerPreviewPower
}) => {
  const [subTab, setSubTab] = useState("slots");
  const [selectedNodeId, setSelectedNodeId] = useState("node_core_awakening");
  const netBonuses = computeSkillNetworkBonuses(profile.unlockedNetworkNodes);
  const nextLockedSlot = profile.unlockedSkillSlots < 4 ? profile.unlockedSkillSlots + 1 : null;
  const nextSlotCost = nextLockedSlot ? SKILL_SLOT_UNLOCK_COSTS[nextLockedSlot] : null;
  const selectedNode = SKILL_NETWORK_NODES.find((n) => n.id === selectedNodeId) || SKILL_NETWORK_NODES[0];
  const allEquippablePowers = [
    ...CORE_POWER_LIST,
    ...FUSION_POWER_LIST.filter((fp) => profile.unlockedPowers.includes(fp.id))
  ];
  return <div className="space-y-5">
      {
    /* Header & Economy Bar */
  }
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
        <div>
          <h3 className="font-display text-base font-bold text-[#F8FAFC] flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: "var(--sys-accent)" }} />
            <span>نظام المهارات: التخصيص والتطوير والشبكة والدمج</span>
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            تبدأ بخانة نشطة واحدة [Q] — افتح الخانات [R] [Z] [X] تدريجياً، وطوّر شبكة المهارات وادمج القوى.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono-num">
          <span className="flex items-center gap-1 text-[#E6B85C]">
            <Coins className="w-3.5 h-3.5" /> {profile.gold}
          </span>
          <span className="flex items-center gap-1 text-[#38BDF8]">
            <Gem className="w-3.5 h-3.5" /> {profile.gems}
          </span>
          <span className="flex items-center gap-1 text-[#10B981]">
            <Award className="w-3.5 h-3.5" /> {profile.guildMarks} وسام
          </span>
        </div>
      </div>

      {
    /* Sub-Navigation */
  }
      <div className="grid grid-cols-3 gap-2">
        {[
    { id: "slots", label: `\u0627\u0644\u062E\u0627\u0646\u0627\u062A \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631 (${profile.unlockedSkillSlots}/4)`, icon: Sparkles },
    {
      id: "network",
      label: `\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A (${profile.unlockedNetworkNodes.length}/${SKILL_NETWORK_NODES.length})`,
      icon: Network
    },
    { id: "fusion", label: `\u062F\u0645\u062C \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A (${FUSION_POWER_LIST.length})`, icon: GitMerge }
  ].map((st) => {
    const Icon = st.icon;
    const active = subTab === st.id;
    return <button
      key={st.id}
      type="button"
      onClick={() => setSubTab(st.id)}
      className={`min-h-[42px] px-2.5 py-2 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${active ? "system-btn-primary" : "system-card text-[#CBD5E1] hover:text-[#F8FAFC]"}`}
    >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{st.label}</span>
            </button>;
  })}
      </div>

      {
    /* SUB-TAB 1: ACTIVE SLOTS + PROGRESSIVE UNLOCKER + POWER UPGRADING */
  }
      {subTab === "slots" && <div className="space-y-4">
          {
    /* 4-Slot Selector with Lock Indicators */
  }
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SKILL_SLOT_META.map((slot) => {
    const isUnlocked = slot.index < profile.unlockedSkillSlots;
    const equippedPower = POWERS[profile.avatar.powerSlots[slot.index]];
    const equippedLv = equippedPower ? profile.powerLevels[equippedPower.id] || 1 : 1;
    const isSelected = powerSlotTarget === slot.index;
    return <button
      key={slot.index}
      type="button"
      onClick={() => {
        if (isUnlocked) {
          onSelectSlotTarget(slot.index);
        } else {
          onNotify(`\u0627\u0644\u062E\u0627\u0646\u0629 ${slot.index + 1} [${slot.keyLabel}] \u0645\u0642\u0641\u0644\u0629 \u2014 \u0627\u0641\u062A\u062D\u0647\u0627 \u0645\u0646 \u0627\u0644\u0634\u0631\u064A\u0637 \u0628\u0627\u0644\u0623\u0633\u0641\u0644 \u0623\u0648\u0644\u0627\u064B.`);
        }
      }}
      className={`p-3 rounded-xl border text-right transition-all ${!isUnlocked ? "bg-[#080D18]/80 border-white/10 opacity-70 cursor-not-allowed" : isSelected ? "bg-[#172542] border-[var(--sys-accent)] shadow-md cursor-pointer" : "system-card cursor-pointer"}`}
    >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#94A3B8] flex items-center gap-1">
                      {!isUnlocked && <Lock className="w-3 h-3 text-[#F59E0B]" />}
                      <span>{slot.title}</span>
                    </span>
                    <span
      className="font-mono-num font-extrabold px-1.5 py-0.5 rounded bg-[#0A0F1A]"
      style={{ color: isUnlocked ? slot.color : "#64748B" }}
    >
                      [{slot.keyLabel}]
                    </span>
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-[#F8FAFC] truncate">
                    {isUnlocked ? equippedPower?.name : "\u062E\u0627\u0646\u0629 \u0645\u0642\u0641\u0644\u0629"}
                  </div>
                  <div className="text-[10px] font-mono-num text-[#38BDF8] mt-0.5">
                    {isUnlocked ? `\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${equippedLv}/5` : "\u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u0641\u062A\u062D"}
                  </div>
                </button>;
  })}
          </div>

          {
    /* Progressive Slot Unlocker Card */
  }
          {nextLockedSlot && nextSlotCost ? <div className="system-card rounded-xl p-4 border-[var(--sys-accent)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E6B85C]">
                  <Unlock className="w-4 h-4" />
                  <span>فتح {nextSlotCost.label} لتوسيع ترسانة القتال</span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  افتح الخانة باستخدام الذهب وشارات النقابة معاً، أو عبر الجواهر مباشرة.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
    type="button"
    onClick={() => {
      const res = onUnlockNextSkillSlot("gold_marks");
      onNotify(res.message);
    }}
    className="min-h-[40px] px-3.5 py-2 text-xs font-bold rounded-lg bg-[#E6B85C] hover:bg-[#F5D076] text-[#0A0F1A] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
  >
                  <Coins className="w-3.5 h-3.5" />
                  <span>
                    {nextSlotCost.gold} ذهب + {nextSlotCost.guildMarks} وسام
                  </span>
                </button>
                <button
    type="button"
    onClick={() => {
      const res = onUnlockNextSkillSlot("gems");
      onNotify(res.message);
    }}
    className="min-h-[40px] px-3.5 py-2 text-xs font-bold rounded-lg bg-[#162742] hover:bg-[#1F3558] text-[#38BDF8] border border-[#38BDF8]/40 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
  >
                  <Gem className="w-3.5 h-3.5" />
                  <span>{nextSlotCost.gems} جوهرة</span>
                </button>
              </div>
            </div> : <div className="px-4 py-2.5 rounded-xl bg-[#102622] border border-[#10B981]/35 text-xs font-semibold text-[#6EE7B7]">
              جميع خانات المهارات الأربع [Q] [R] [Z] [X] مفتوحة ومتاحة للاستخدام في القتال!
            </div>}

          {
    /* Owned + Core + Unlocked Fusion Powers List (Equip & Level 1-5 Upgrade) */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allEquippablePowers.map((pw) => {
    const unlocked = profile.unlockedPowers.includes(pw.id);
    const lv = profile.powerLevels[pw.id] || 1;
    const scaledDamage = Math.round(pw.damage * (1 + (lv - 1) * 0.18));
    const upgGold = lv * (pw.isFusion ? 320 : 220);
    const upgMarks = lv * (pw.isFusion ? 8 : 5);
    const activeSlotIndices = SKILL_SLOT_META.filter(
      (s) => s.index < profile.unlockedSkillSlots && profile.avatar.powerSlots[s.index] === pw.id
    ).map((s) => `[${s.keyLabel}]`);
    const effectiveTarget = powerSlotTarget < profile.unlockedSkillSlots ? powerSlotTarget : 0;
    const isActiveInTarget = profile.avatar.powerSlots[effectiveTarget] === pw.id;
    const targetKey = SKILL_SLOT_META[effectiveTarget].keyLabel;
    return <div
      key={pw.id}
      className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 ${pw.isFusion ? "bg-[#1F1233]/90 border-[#C084FC]/55" : activeSlotIndices.length > 0 ? "bg-[#14223D] border-[var(--sys-accent)]/60" : "system-card"}`}
    >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold text-[#F8FAFC] flex items-center gap-1.5">
                        {pw.isFusion && <Flame className="w-3.5 h-3.5 text-[#C084FC]" />}
                        <span>{pw.name}</span>
                      </span>
                      <span className="text-[11px] font-mono-num text-[#38BDF8]">
                        {unlocked ? `Lv.${lv}/5` : "\u0645\u0642\u0641\u0644\u0629"}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-num text-[#94A3B8]">
                      ضرر {scaledDamage} · تبريد {pw.cooldown}ث · مدى {pw.radius}م
                    </div>
                    <p className="text-xs text-[#CBD5E1] leading-snug">{pw.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                    {unlocked && lv < 5 ? <button
      type="button"
      onClick={() => {
        const res = onUpgradePower(pw.id);
        onNotify(res.message);
        if (res.ok) onTriggerPreviewPower();
      }}
      className="px-2.5 py-1.5 text-[11px] font-bold rounded-lg bg-[#16233D] hover:bg-[#1F3154] text-[#E6B85C] border border-[#E6B85C]/30 flex items-center gap-1 cursor-pointer"
    >
                        <ArrowUpCircle className="w-3.5 h-3.5" />
                        <span>
                          تطوير ({upgGold}ذ + {upgMarks}وسام)
                        </span>
                      </button> : unlocked ? <span className="text-[11px] font-bold text-[#10B981]">الحد الأقصى Lv.5</span> : <span className="text-[11px] text-[#94A3B8]">{pw.tagline}</span>}

                    <button
      type="button"
      onClick={() => {
        const res = onUnlockOrEquipPower(pw.id, effectiveTarget);
        onNotify(res.message);
        if (res.ok) onTriggerPreviewPower();
      }}
      className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap ${isActiveInTarget ? "bg-[#132924] text-[#10B981] border border-[#10B981]/40" : unlocked ? "bg-[#1D2D4D] hover:bg-[#273C66] text-[#F1F5F9]" : "system-btn-primary"}`}
    >
                      {isActiveInTarget ? `\u0645\u062C\u0647\u0632\u0629 [${targetKey}]` : unlocked ? `\u062A\u0639\u064A\u064A\u0646 [${targetKey}]` : pw.costGems > 0 ? `\u0634\u0631\u0627\u0621 (${pw.costGold} + ${pw.costGems}\u062C)` : `\u0634\u0631\u0627\u0621 (${pw.costGold} \u0630\u0647\u0628)`}
                    </button>
                  </div>
                </div>;
  })}
          </div>
        </div>}

      {
    /* SUB-TAB 2: INTERACTIVE 9-NODE SKILL NETWORK */
  }
      {subTab === "network" && <div className="space-y-4">
          {
    /* Cumulative Active Bonuses Banner */
  }
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[11px]">
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">مضاعف الضرر</div>
              <div className="font-mono-num font-bold text-[#F97316] mt-0.5">{netBonuses.dmgMult}x</div>
            </div>
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">تقليص التبريد</div>
              <div className="font-mono-num font-bold text-[#38BDF8] mt-0.5">
                -{Math.round(netBonuses.cdrMult * 100)}%
              </div>
            </div>
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">مدى المهارات</div>
              <div className="font-mono-num font-bold text-[#E6B85C] mt-0.5">{netBonuses.radiusMult}x</div>
            </div>
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">طاقة قصوى إضافية</div>
              <div className="font-mono-num font-bold text-[#10B981] mt-0.5">+{netBonuses.bonusEnergy}</div>
            </div>
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">توفير الطاقة</div>
              <div className="font-mono-num font-bold text-[#2DD4BF] mt-0.5">
                {Math.round((1 - netBonuses.energyCostMult) * 100)}%
              </div>
            </div>
            <div className="system-card rounded-lg p-2">
              <div className="text-[#94A3B8]">قوة الدمج</div>
              <div className="font-mono-num font-bold text-[#C084FC] mt-0.5">{netBonuses.fusionMult}x</div>
            </div>
          </div>

          {
    /* Interactive SVG + Node Constellation */
  }
          <div className="relative h-[300px] sm:h-[330px] rounded-xl bg-[#070B16] border border-white/10 overflow-hidden">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              {SKILL_NETWORK_NODES.map((node) => {
    if (!node.requires) return null;
    const parent = SKILL_NETWORK_NODES.find((p) => p.id === node.requires);
    if (!parent) return null;
    const bothUnlocked = profile.unlockedNetworkNodes.includes(node.id) && profile.unlockedNetworkNodes.includes(parent.id);
    return <line
      key={`edge_${node.id}`}
      x1={parent.x}
      y1={parent.y}
      x2={node.x}
      y2={node.y}
      stroke={bothUnlocked ? BRANCH_COLORS[node.branch] || "#38BDF8" : "#334155"}
      strokeWidth={bothUnlocked ? 1.1 : 0.65}
      strokeDasharray={bothUnlocked ? void 0 : "2 1.5"}
    />;
  })}
            </svg>

            {SKILL_NETWORK_NODES.map((node) => {
    const unlocked = profile.unlockedNetworkNodes.includes(node.id);
    const parentOk = !node.requires || profile.unlockedNetworkNodes.includes(node.requires);
    const isSelected = selectedNode.id === node.id;
    const col = BRANCH_COLORS[node.branch] || "#38BDF8";
    return <button
      key={node.id}
      type="button"
      onClick={() => setSelectedNodeId(node.id)}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        borderColor: unlocked ? col : isSelected ? "#F8FAFC" : "rgba(255,255,255,0.2)"
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1.5 rounded-lg border-2 text-[10px] sm:text-[11px] font-bold transition-transform cursor-pointer ${unlocked ? "bg-[#13223D] text-[#F8FAFC] shadow-lg" : parentOk ? "bg-[#0E1629] text-[#CBD5E1] hover:scale-105" : "bg-[#080C16] text-[#64748B] opacity-75"} ${isSelected ? "scale-110 ring-2 ring-white/40 z-10" : ""}`}
    >
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: col }} />
                    <span>{node.title}</span>
                  </div>
                </button>;
  })}
          </div>

          {
    /* Selected Node Inspector & Unlock Action */
  }
          <div className="system-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
    className="font-display text-sm font-bold"
    style={{ color: BRANCH_COLORS[selectedNode.branch] }}
  >
                  {selectedNode.title}
                </span>
                <span className="text-[11px] font-mono-num px-2 py-0.5 rounded bg-[#0A101D] text-[#38BDF8]">
                  {selectedNode.bonusLabel}
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1]">{selectedNode.description}</p>
            </div>
            <div className="shrink-0">
              {profile.unlockedNetworkNodes.includes(selectedNode.id) ? <span className="px-3.5 py-2 rounded-lg bg-[#112722] border border-[#10B981]/35 text-xs font-bold text-[#10B981] inline-block">
                  مُفعَّلة في الشبكة
                </span> : <button
    type="button"
    onClick={() => {
      const res = onUnlockNetworkNode(selectedNode.id);
      onNotify(res.message);
    }}
    className="min-h-[42px] px-4 py-2 text-xs font-bold rounded-lg system-btn-primary cursor-pointer whitespace-nowrap"
  >
                  تفعيل ({selectedNode.costGold} ذهب + {selectedNode.costMarks} وسام)
                </button>}
            </div>
          </div>
        </div>}

      {
    /* SUB-TAB 3: SKILL FUSION LABORATORY */
  }
      {subTab === "fusion" && <div className="space-y-3">
          <div className="p-3 rounded-xl bg-[#160F29] border border-[#C084FC]/35 text-xs text-[#E9D5FF]">
            مختبر الدمج يجمع بين مهارتين أساسيتين (بشرط فتحهما وترقيتهما إلى <strong>المستوى 2</strong> على الأقل) لصناعة مهارة مدمجة فائقة القوة.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {FUSION_POWER_LIST.map((fusion) => {
    const isUnlocked = profile.unlockedPowers.includes(fusion.id);
    const [pA, pB] = fusion.fusionPair || ["inferno_nova", "thunder_strike"];
    const defA = POWERS[pA];
    const defB = POWERS[pB];
    const ownedA = profile.unlockedPowers.includes(pA);
    const ownedB = profile.unlockedPowers.includes(pB);
    const lvA = profile.powerLevels[pA] || 1;
    const lvB = profile.powerLevels[pB] || 1;
    const readyA = ownedA && lvA >= 2;
    const readyB = ownedB && lvB >= 2;
    return <div
      key={fusion.id}
      className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${isUnlocked ? "bg-[#1D1233] border-[#C084FC]" : "system-card border-[#C084FC]/30"}`}
    >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-base font-bold text-[#F8FAFC] flex items-center gap-1.5">
                        <GitMerge className="w-4 h-4 text-[#C084FC]" />
                        <span>{fusion.name}</span>
                      </span>
                      <span className="font-mono-num text-[11px] text-[#E6B85C]">
                        ضرر {fusion.damage} · مدى {fusion.radius}م
                      </span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">{fusion.description}</p>

                    {
      /* Recipe Ingredients */
    }
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div
      className={`p-2 rounded-lg border ${readyA ? "bg-[#102622] border-[#10B981]/45 text-[#6EE7B7]" : "bg-[#0A101E] border-white/10 text-[#94A3B8]"}`}
    >
                        <div className="font-bold truncate">{defA.name}</div>
                        <div className="font-mono-num mt-0.5">
                          {ownedA ? `Lv.${lvA}/2+` : "\u063A\u064A\u0631 \u0645\u0641\u062A\u0648\u062D\u0629"}
                        </div>
                      </div>
                      <div
      className={`p-2 rounded-lg border ${readyB ? "bg-[#102622] border-[#10B981]/45 text-[#6EE7B7]" : "bg-[#0A101E] border-white/10 text-[#94A3B8]"}`}
    >
                        <div className="font-bold truncate">{defB.name}</div>
                        <div className="font-mono-num mt-0.5">
                          {ownedB ? `Lv.${lvB}/2+` : "\u063A\u064A\u0631 \u0645\u0641\u062A\u0648\u062D\u0629"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    {isUnlocked ? <span className="text-xs font-bold text-[#10B981]">
                        مهارة مدمجة جاهزة (يمكن تجهيزها من تبويب الخانات)
                      </span> : <>
                        <span className="text-[11px] font-mono-num text-[#E6B85C]">
                          {fusion.fusionCostGold} ذهب + {fusion.fusionCostMarks} وسام
                        </span>
                        <button
      type="button"
      onClick={() => {
        const res = onFusePowers(fusion.id);
        onNotify(res.message);
        if (res.ok) onTriggerPreviewPower();
      }}
      className="min-h-[38px] px-3.5 py-1.5 text-xs font-bold rounded-lg system-btn-primary cursor-pointer whitespace-nowrap"
    >
                          دمج وصناعة المهارة
                        </button>
                      </>}
                  </div>
                </div>;
  })}
          </div>
        </div>}
    </div>;
};
