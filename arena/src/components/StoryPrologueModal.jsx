import { useState } from "react";
import { BookOpen, Compass, Shield, Sparkles, Swords, X } from "lucide-react";
import { BUNDLED_IMAGES } from "../data/bundledAssets";
const CHAPTERS = [
  {
    id: 1,
    badge: "\u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u0623\u0648\u0644 \xB7 \u0646\u062F\u0627\u0621 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0633\u0645\u0627\u0648\u064A\u0629",
    title: "\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0628\u0637\u0644 \u062C\u062F\u064A\u062F \u0625\u0644\u0649 \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
    body: "\u0627\u0646\u0634\u0642\u0651\u062A \u0633\u0645\u0627\u0621 \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0642\u062F\u064A\u0645 \u0628\u0628\u0648\u0627\u0628\u0629 \u0630\u0647\u0628\u064A\u0629 \u0639\u0627\u0628\u0631\u0629 \u0644\u0644\u0623\u0628\u0639\u0627\u062F\u060C \u0648\u0627\u0633\u062A\u064F\u062F\u0639\u064A \u0631\u0648\u062D\u064F\u0643 \u0625\u0644\u0649 \u0642\u0627\u0631\u0629 \xAB\u0625\u064A\u062B\u064A\u0631\u064A\u0627\xBB \u0627\u0644\u0645\u0645\u0632\u0642\u0629 \u0628\u064A\u0646 \u0625\u0634\u0639\u0627\u0639 \u0627\u0644\u0623\u062B\u064A\u0631 \u0648\u0638\u0644\u0627\u0644 \u0627\u0644\u0647\u0627\u0648\u064A\u0629. \u0639\u0646\u062F \u0628\u0648\u0627\u0628\u0629 \u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630\u060C \u0627\u0644\u062A\u0642\u0637 \u0627\u0644\u062D\u0643\u064A\u0645 \u0623\u0648\u0631\u064A\u0648\u0646 \u0625\u0634\u0627\u0631\u0629 \u0642\u062F\u0648\u0645\u0643 \u0644\u064A\u0645\u0646\u062D\u0643 \u0645\u064A\u062B\u0627\u0642 \u0627\u0644\u0645\u0633\u062A\u062F\u0639\u0649 \u0627\u0644\u0623\u0648\u0644.",
    highlight: "\u0639\u0627\u0644\u0645 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0645\u0641\u062A\u0648\u062D \u064A\u0645\u062A\u062F \u0627\u0644\u0622\u0646 \u0639\u0644\u0649 \u0645\u0633\u0627\u062D\u0629 1400 \u0645\u062A\u0631 \u0643\u0627\u0645\u0644\u0629 \u0628\u062A\u0633\u0639\u0629 \u0623\u0642\u0627\u0644\u064A\u0645 \u0645\u062A\u0635\u0644\u0629 \u0648\u0623\u0633\u0631\u0627\u0631 \u0645\u0646\u0633\u064A\u0629."
  },
  {
    id: 2,
    badge: "\u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062B\u0627\u0646\u064A \xB7 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0648\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u064A\u0648\u0645\u064A\u0629",
    title: "\u0642\u0648\u062A\u0643 \u062A\u064F\u0635\u0646\u0639 \u0645\u0646 \u0627\u0644\u0645\u0647\u0627\u0631\u0629 \u0648\u0627\u0644\u0639\u0645\u0644 \u0643\u0645\u0627 \u0645\u0646 \u0627\u0644\u0633\u064A\u0641",
    body: "\u0641\u064A \u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630 \u0627\u0644\u0622\u0645\u0646\u0629\u060C \u0644\u0646 \u062A\u0642\u0627\u062A\u0644 \u0648\u062D\u064A\u062F\u0627\u064B! \u0631\u0626\u064A\u0633 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0643\u0627\u064A\u0644\u060C \u0627\u0644\u062D\u062F\u0651\u0627\u062F \u0628\u0631\u0648\u0646\u060C \u0627\u0644\u062E\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0644\u064A\u0631\u0627\u060C \u0648\u0627\u0644\u062A\u0627\u062C\u0631 \u0633\u0644\u064A\u0645 \u0628\u0627\u0646\u062A\u0638\u0627\u0631\u0643 \u0628\u0639\u0642\u0648\u062F \u0639\u0645\u0644 \u0645\u062C\u0632\u064A\u0629 \u0644\u062C\u0645\u0639 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0648\u0627\u0644\u0645\u0639\u0627\u062F\u0646 \u0648\u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0648\u0643\u0633\u0628 \u0623\u0648\u0633\u0645\u0629 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0648\u0627\u0644\u0630\u0647\u0628\u060C \u0642\u0628\u0644 \u0627\u0644\u0639\u0628\u0648\u0631 \u0625\u0644\u0649 \u0633\u0627\u062D\u0627\u062A \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u0633\u062A \u0627\u0644\u0643\u0628\u0631\u0649.",
    highlight: "8 \u0633\u0645\u0627\u062A \u0642\u062A\u0627\u0644\u064A\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0637\u0648\u064A\u0631 + 4 \u0645\u0647\u0627\u0631\u0627\u062A \u0642\u062A\u0627\u0644\u064A\u0629 \u0646\u0634\u0637\u0629 [Q] [R] [Z] [X] + 6 \u0643\u0627\u0645\u064A\u0631\u0627\u062A \u0639\u0631\u0636!"
  }
];
const BLESSINGS = [
  {
    id: "vanguard",
    title: "\u0628\u0631\u0643\u0629 \u0627\u0644\u0637\u0644\u064A\u0639\u0629 \u0627\u0644\u062D\u062F\u064A\u062F\u064A\u0629",
    subtitle: "\u0644\u0644\u0645\u062D\u0627\u0631\u0628\u064A\u0646 \u0648\u0623\u0628\u0637\u0627\u0644 \u0627\u0644\u0627\u0634\u062A\u0628\u0627\u0643 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u0628\u0629",
    bonuses: ["+3 \u0642\u0648\u0629 (STR)", "+2 \u062F\u0641\u0627\u0639 (DEF)", "+2 \u062D\u064A\u0648\u064A\u0629 (VIT)", "+180 \u0630\u0647\u0628"],
    accent: "#F97316",
    icon: "sword"
  },
  {
    id: "arcane",
    title: "\u0628\u0631\u0643\u0629 \u0627\u0644\u0623\u062B\u064A\u0631 \u0627\u0644\u0633\u062D\u0631\u064A",
    subtitle: "\u0644\u0633\u062D\u0631\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u0642\u0629 \u0648\u0625\u064A\u0642\u0627\u0639 \u0627\u0644\u062A\u0639\u0627\u0648\u064A\u0630 \u0627\u0644\u0633\u0631\u064A\u0639",
    bonuses: ["+3 \u0630\u0643\u0627\u0621 (INT)", "+2 \u0631\u0648\u062D (SPR)", "+2 \u0628\u0631\u0627\u0639\u0629 (DEX)", "+10 \u062C\u0648\u0627\u0647\u0631 \xB7 +140 \u0630\u0647\u0628"],
    accent: "#38BDF8",
    icon: "magic"
  },
  {
    id: "fortune",
    title: "\u0628\u0631\u0643\u0629 \u0627\u0644\u0631\u062D\u0651\u0627\u0644 \u0627\u0644\u0645\u062D\u0638\u0648\u0638",
    subtitle: "\u0644\u0645\u0633\u062A\u0643\u0634\u0641\u064A \u0627\u0644\u0642\u0627\u0631\u0629 \u0648\u0635\u0627\u0626\u062F\u064A \u0627\u0644\u0643\u0646\u0648\u0632 \u0648\u0627\u0644\u063A\u0646\u0627\u0626\u0645",
    bonuses: ["+3 \u062D\u0638 (LCK)", "+2 \u0631\u0634\u0627\u0642\u0629 (AGI)", "+25 \u0648\u0633\u0627\u0645 \u0646\u0642\u0627\u0628\u0629", "+280 \u0630\u0647\u0628 + \u0635\u0646\u062F\u0648\u0642 \u0645\u062D\u0627\u0631\u0628"],
    accent: "#E6B85C",
    icon: "luck"
  }
];
export const StoryPrologueModal = ({
  open,
  playerName,
  hasSeenIntro,
  onCompleteIntro,
  onClose
}) => {
  const [step, setStep] = useState(0);
  const [selectedBlessing, setSelectedBlessing] = useState("vanguard");
  if (!open) return null;
  const isBlessingStep = step === 2;
  const chapter = CHAPTERS[step] || CHAPTERS[0];
  const handleConfirmBlessing = () => {
    onCompleteIntro(selectedBlessing);
    onClose();
  };
  return <div
    className="fixed inset-0 z-50 bg-[#050811]/88 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-label="قصة استدعاء المستدعى في إيثيريا"
  >
      <div className="w-full max-w-4xl max-h-[94dvh] overflow-y-auto isekai-panel rounded-2xl shadow-2xl my-auto">
        {
    /* Dramatic Visual Banner */
  }
        <div className="relative h-36 sm:h-52 landscape-phone-story-banner bg-[#0B1120] overflow-hidden shrink-0">
          <img
    src={BUNDLED_IMAGES.storyAwakening}
    alt="بوابة استدعاء إيثيريا"
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover object-center"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1422] via-[#0D1422]/45 to-transparent" />
          <div className="absolute top-2.5 sm:top-3 inset-x-3 sm:inset-x-4 flex items-center justify-between">
            <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#0A0F1A]/80 border border-[#E6B85C]/40 text-[11px] sm:text-xs font-bold text-[#E6B85C] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>سِفر بداية إيثيريا · {playerName}</span>
            </span>
            {hasSeenIntro && <button
    type="button"
    onClick={onClose}
    aria-label="إغلاق القصة"
    className="p-2 rounded-lg bg-[#0A0F1A]/80 hover:bg-[#16223A] border border-white/15 text-[#CBD5E1] cursor-pointer"
  >
                <X className="w-4 h-4" />
              </button>}
          </div>

          <div className="absolute bottom-2.5 sm:bottom-3 inset-x-4 sm:inset-x-5 flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs font-semibold text-[#7DD3FC]">
              {isBlessingStep ? "\u0627\u0644\u0641\u0635\u0644 \u0627\u0644\u062B\u0627\u0644\u062B \xB7 \u0645\u064A\u062B\u0627\u0642 \u0627\u0644\u0628\u0631\u0643\u0629 \u0627\u0644\u0623\u0648\u0644\u0649" : chapter.badge}
            </span>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((idx) => <button
    key={idx}
    type="button"
    onClick={() => setStep(idx)}
    aria-label={`\u0627\u0644\u0641\u0635\u0644 ${idx + 1}`}
    className={`h-2 rounded-full transition-all cursor-pointer ${step === idx ? "w-7 bg-[#E6B85C]" : "w-2 bg-white/30 hover:bg-white/50"}`}
  />)}
            </div>
          </div>
        </div>

        {
    /* Content Body */
  }
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {!isBlessingStep ? <div className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
                {chapter.title}
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                {chapter.body}
              </p>
              <div className="p-3.5 rounded-xl bg-[#0B1220] border border-[#38BDF8]/30 text-xs sm:text-sm font-semibold text-[#7DD3FC] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E6B85C] shrink-0" />
                <span>{chapter.highlight}</span>
              </div>
            </div> : <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-[#F8FAFC]">
                  {hasSeenIntro ? "\u0633\u062C\u0644 \u0628\u0631\u0643\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0627\u0644\u062B\u0644\u0627\u062B" : "\u0627\u062E\u062A\u0631 \u0628\u0631\u0643\u0629 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0628\u0637\u0644\u0643"}
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  {hasSeenIntro ? "\u0644\u0642\u062F \u0641\u0639\u0644\u062A \u0628\u0631\u0643\u0629 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0628\u062F\u0627\u064A\u0629 \u0631\u062D\u0644\u062A\u0643\u060C \u0648\u064A\u0645\u0643\u0646\u0643 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0641\u0635\u0648\u0644 \u0641\u064A \u0623\u064A \u0648\u0642\u062A." : "\u062A\u0645\u0646\u062D\u0643 \u0627\u0644\u0628\u0631\u0643\u0629 \u062F\u0641\u0639\u0629 \u0641\u0648\u0631\u064A\u0629 \u0641\u064A \u0627\u0644\u0633\u0645\u0627\u062A \u0627\u0644\u062B\u0645\u0627\u0646\u064A \u0648\u0627\u0644\u0630\u0647\u0628 \u0644\u062A\u0628\u062F\u0623 \u0645\u063A\u0627\u0645\u0631\u062A\u0643 \u0628\u0623\u0633\u0644\u0648\u0628\u0643 \u0627\u0644\u0645\u0641\u0636\u0644."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {BLESSINGS.map((b) => {
    const active = selectedBlessing === b.id;
    return <button
      key={b.id}
      type="button"
      onClick={() => setSelectedBlessing(b.id)}
      className={`text-right p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 cursor-pointer ${active ? "bg-[#17243D] border-[#E6B85C] shadow-[0_0_24px_-8px_rgba(230,184,92,0.45)]" : "bg-[#0B1220] border-white/10 hover:border-white/25"}`}
    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
      className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
      style={{ backgroundColor: `${b.accent}22`, color: b.accent }}
    >
                            {b.icon === "sword" ? <Swords className="w-4 h-4" /> : b.icon === "magic" ? <Sparkles className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                          </span>
                          {active && <span className="text-[11px] font-bold text-[#E6B85C]">مختارة</span>}
                        </div>
                        <h3 className="font-display text-base font-bold text-[#F8FAFC]">
                          {b.title}
                        </h3>
                        <p className="text-xs text-[#94A3B8] leading-snug">{b.subtitle}</p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5 text-[11px] font-mono-num">
                        {b.bonuses.map((tag, i) => <span
      key={i}
      className="px-2 py-0.5 rounded bg-[#141F35] text-[#E2E8F0] border border-white/10"
    >
                            {tag}
                          </span>)}
                      </div>
                    </button>;
  })}
              </div>
            </div>}

          {
    /* Footer Controls */
  }
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              {step > 0 && <button
    type="button"
    onClick={() => setStep((s) => Math.max(0, s - 1))}
    className="px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] bg-[#141F35] hover:bg-[#1D2D4C] border border-white/10 rounded-xl cursor-pointer"
  >
                  السابق
                </button>}
              {!isBlessingStep && !hasSeenIntro && <button
    type="button"
    onClick={() => setStep(2)}
    className="px-3 py-2.5 text-xs font-medium text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
  >
                  تخطي إلى اختيار البركة
                </button>}
            </div>

            <div className="flex items-center gap-2.5">
              {!isBlessingStep ? <button
    type="button"
    onClick={() => setStep((s) => Math.min(2, s + 1))}
    className="px-6 py-2.5 text-sm font-bold text-[#0A0F1A] bg-[#E6B85C] hover:bg-[#F5D076] rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
  >
                  <span>متابعة القصة</span>
                  <Shield className="w-4 h-4" />
                </button> : <button
    type="button"
    onClick={handleConfirmBlessing}
    className="px-6 py-2.5 text-sm font-bold text-[#0A0F1A] bg-gradient-to-r from-[#E6B85C] to-[#F5D076] hover:brightness-105 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
  >
                  <Sparkles className="w-4 h-4" />
                  <span>{hasSeenIntro ? "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0625\u064A\u062B\u064A\u0631\u064A\u0627" : "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0628\u0631\u0643\u0629 \u0648\u0628\u062F\u0621 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0629"}</span>
                </button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
