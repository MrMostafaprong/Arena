import { BUNDLED_IMAGES } from "./bundledAssets";
export const WEAPONS = {
  vanguard_sword: {
    id: "vanguard_sword",
    name: "\u0646\u0635\u0644 \u0627\u0644\u0637\u0644\u064A\u0639\u0629",
    role: "melee",
    category: "\u0633\u064A\u0641 \u0637\u0648\u064A\u0644 \xB7 \u0647\u062C\u0648\u0645\u064A",
    description: "\u0633\u064A\u0641 \u0645\u062A\u0648\u0627\u0632\u0646 \u0628\u0645\u062F\u0649 \u0648\u0627\u0633\u0639 \u0648\u0636\u0631\u0628\u0627\u062A \u0642\u0648\u0633\u064A\u0629 \u0645\u062A\u062A\u0627\u0644\u064A\u0629 \u0645\u062B\u0627\u0644\u064A\u0629 \u0644\u0644\u0645\u0639\u0627\u0631\u0643 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629.",
    damage: 24,
    heavyDamage: 46,
    range: 3.1,
    attackSpeed: 2.2,
    critBonus: 10,
    knockback: 4.5,
    isRanged: false,
    bladeColor: "#DCE4F0",
    hiltColor: "#D99124",
    energyColor: "#F59E0B",
    costGold: 0,
    costGems: 0,
    heavySkillName: "\u0634\u0637\u0652\u0631 \u0627\u0644\u0647\u0644\u0627\u0644"
  },
  shadow_daggers: {
    id: "shadow_daggers",
    name: "\u062E\u0646\u0627\u062C\u0631 \u0627\u0644\u0638\u0644 \u0627\u0644\u0645\u0632\u062F\u0648\u062C\u0629",
    role: "melee",
    category: "\u0646\u0635\u0627\u0644 \u0645\u0632\u062F\u0648\u062C\u0629 \xB7 \u0647\u062C\u0648\u0645\u064A",
    description: "\u0633\u0644\u0627\u062D \u0645\u0632\u062F\u0648\u062C \u0641\u0627\u0626\u0642 \u0627\u0644\u0633\u0631\u0639\u0629 \u0628\u0641\u0631\u0635\u0629 \u0636\u0631\u0628\u0627\u062A \u062D\u0627\u0633\u0645\u0629 \u0639\u0627\u0644\u064A\u0629 \u0648\u0627\u0646\u062F\u0641\u0627\u0639 \u062E\u0627\u0637\u0641.",
    damage: 17,
    heavyDamage: 38,
    range: 2.5,
    attackSpeed: 3.5,
    critBonus: 26,
    knockback: 2.5,
    isRanged: false,
    bladeColor: "#A7B4C9",
    hiltColor: "#3B4254",
    energyColor: "#10B981",
    costGold: 320,
    costGems: 0,
    heavySkillName: "\u0648\u0645\u0636\u0629 \u0627\u0644\u0634\u0628\u062D"
  },
  storm_hammer: {
    id: "storm_hammer",
    name: "\u0645\u0637\u0631\u0642\u0629 \u0627\u0644\u0639\u0627\u0635\u0641\u0629",
    role: "melee",
    category: "\u0645\u0637\u0631\u0642\u0629 \u062B\u0642\u064A\u0644\u0629 \xB7 \u0647\u062C\u0648\u0645\u064A",
    description: "\u0636\u0631\u0628\u0627\u062A \u062B\u0642\u064A\u0644\u0629 \u062A\u062D\u0637\u0645 \u062F\u0641\u0627\u0639 \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u062A\u0637\u0644\u0642 \u0645\u0648\u062C\u0629 \u0627\u0631\u062A\u062F\u0627\u062F\u064A\u0629 \u062A\u062F\u0641\u0639 \u0627\u0644\u062E\u0635\u0648\u0645 \u0628\u0639\u064A\u062F\u0627\u064B.",
    damage: 36,
    heavyDamage: 68,
    range: 3,
    attackSpeed: 1.45,
    critBonus: 12,
    knockback: 8.5,
    isRanged: false,
    bladeColor: "#6C7789",
    hiltColor: "#8B5A2B",
    energyColor: "#F97316",
    costGold: 550,
    costGems: 0,
    heavySkillName: "\u0632\u0644\u0632\u0627\u0644 \u0627\u0644\u0645\u0637\u0631\u0642\u0629"
  },
  dragon_spear: {
    id: "dragon_spear",
    name: "\u0631\u0645\u062D \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0642\u0631\u0645\u0632\u064A",
    role: "melee",
    category: "\u0631\u0645\u062D \u062D\u0631\u0628\u064A \xB7 \u0647\u062C\u0648\u0645\u064A",
    description: "\u0645\u062F\u0649 \u0637\u0639\u0646 \u0627\u0633\u062A\u062B\u0646\u0627\u0626\u064A \u064A\u062E\u062A\u0631\u0642 \u0635\u0641\u0648\u0641 \u0627\u0644\u0623\u0639\u062F\u0627\u0621 \u0645\u0639 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0645\u0633\u0627\u0641\u0629 \u0622\u0645\u0646\u0629.",
    damage: 27,
    heavyDamage: 54,
    range: 4.1,
    attackSpeed: 2,
    critBonus: 16,
    knockback: 5.5,
    isRanged: false,
    bladeColor: "#E8EDF5",
    hiltColor: "#991B1B",
    energyColor: "#EF4444",
    costGold: 780,
    costGems: 0,
    heavySkillName: "\u0627\u0646\u062F\u0641\u0627\u0639 \u0627\u0644\u0631\u0645\u062D \u0627\u0644\u062E\u0627\u0631\u0642"
  },
  solar_bow: {
    id: "solar_bow",
    name: "\u0642\u0648\u0633 \u0627\u0644\u0634\u0645\u0633 \u0627\u0644\u0645\u0635\u0642\u0648\u0644",
    role: "melee",
    category: "\u0642\u0648\u0633 \u0628\u0639\u064A\u062F \u0627\u0644\u0645\u062F\u0649",
    description: "\u064A\u0637\u0644\u0642 \u0633\u0647\u0627\u0645 \u0637\u0627\u0642\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0633\u0631\u064A\u0639\u0629 \u0645\u0639 \u0648\u0627\u0628\u0644 \u062B\u0644\u0627\u062B\u064A \u0641\u064A \u0627\u0644\u0647\u062C\u0645\u0629 \u0627\u0644\u062B\u0642\u064A\u0644\u0629.",
    damage: 22,
    heavyDamage: 32,
    range: 14,
    attackSpeed: 2.1,
    critBonus: 20,
    knockback: 3,
    isRanged: true,
    bladeColor: "#E59A24",
    hiltColor: "#5C3D24",
    energyColor: "#FBBF24",
    costGold: 950,
    costGems: 15,
    heavySkillName: "\u0648\u0627\u0628\u0644 \u0627\u0644\u0633\u0647\u0627\u0645 \u0627\u0644\u0634\u0645\u0633\u064A\u0629"
  },
  void_staff: {
    id: "void_staff",
    name: "\u0635\u0648\u0644\u062C\u0627\u0646 \u0627\u0644\u0646\u062C\u0645 \u0627\u0644\u062F\u0627\u0643\u0646",
    role: "magic",
    category: "\u0639\u0635\u0627 \u0633\u062D\u0631\u064A\u0629 \xB7 \u0633\u062D\u0631",
    description: "\u064A\u0637\u0644\u0642 \u0643\u0631\u0627\u062A \u0637\u0627\u0642\u0629 \u0645\u0648\u062C\u0647\u0629 \u0646\u062D\u0648 \u0627\u0644\u0623\u0639\u062F\u0627\u0621 \u0648\u062A\u0641\u062C\u064A\u0631 \u062C\u0627\u0630\u0628\u064A\u0629 \u0648\u0627\u0633\u0639 \u0627\u0644\u0646\u0637\u0627\u0642.",
    damage: 25,
    heavyDamage: 58,
    range: 13,
    attackSpeed: 1.85,
    critBonus: 15,
    knockback: 5,
    isRanged: true,
    bladeColor: "#CBD5E1",
    hiltColor: "#334155",
    energyColor: "#38BDF8",
    costGold: 680,
    costGems: 10,
    heavySkillName: "\u0627\u0646\u0641\u062C\u0627\u0631 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629"
  },
  arcane_tome: {
    id: "arcane_tome",
    name: "\u0645\u062E\u0637\u0648\u0637\u0629 \u0627\u0644\u0634\u0639\u0644\u0629 \u0627\u0644\u0623\u0632\u0644\u064A\u0629",
    role: "magic",
    category: "\u0643\u062A\u0627\u0628 \u062A\u0639\u0627\u0648\u064A\u0630 \xB7 \u0633\u062D\u0631",
    description: "\u064A\u0637\u0644\u0642 \u0634\u0647\u0628\u0627\u064B \u0633\u062D\u0631\u064A\u0629 \u0645\u0632\u062F\u0648\u062C\u0629 \u0645\u0646 \u0635\u0641\u062D\u0627\u062A\u0647 \u0627\u0644\u0639\u0627\u0626\u0645\u0629 \u0648\u064A\u0641\u062C\u0631 \u062D\u0644\u0642\u0629 \u0631\u0648\u0646\u064A\u0629 \u0646\u0627\u0631\u064A\u0629 \u0628\u0627\u0644\u0645\u0647\u0627\u0631\u0629 \u0627\u0644\u062B\u0642\u064A\u0644\u0629.",
    damage: 24,
    heavyDamage: 62,
    range: 13.5,
    attackSpeed: 2.05,
    critBonus: 18,
    knockback: 4.2,
    isRanged: true,
    bladeColor: "#7C2D12",
    hiltColor: "#F59E0B",
    energyColor: "#FB923C",
    costGold: 520,
    costGems: 0,
    heavySkillName: "\u0637\u0648\u0641\u0627\u0646 \u0627\u0644\u062A\u0639\u0648\u064A\u0630\u0629"
  },
  crimson_wand: {
    id: "crimson_wand",
    name: "\u0639\u0635\u0627 \u0627\u0644\u0639\u0627\u0635\u0641\u0629 \u0627\u0644\u0642\u0631\u0645\u0632\u064A\u0629",
    role: "magic",
    category: "\u0639\u0635\u0627 \u0628\u0631\u0642 \xB7 \u0633\u062D\u0631",
    description: "\u0633\u0644\u0627\u062D \u0633\u062D\u0631\u064A \u0633\u0631\u064A\u0639 \u064A\u0637\u0644\u0642 \u0637\u0644\u0642\u0627\u062A \u0645\u062A\u0633\u0644\u0633\u0644\u0629 \u062A\u0635\u0639\u0642 \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u062A\u062E\u062A\u0631\u0642 \u0627\u0644\u062D\u0634\u0648\u062F.",
    damage: 21,
    heavyDamage: 52,
    range: 14.5,
    attackSpeed: 2.55,
    critBonus: 22,
    knockback: 3.5,
    isRanged: true,
    bladeColor: "#E11D48",
    hiltColor: "#1E293B",
    energyColor: "#F43F5E",
    costGold: 890,
    costGems: 12,
    heavySkillName: "\u0631\u0639\u062F \u0627\u0644\u0639\u0627\u0635\u0641\u0629"
  },
  radiant_scepter: {
    id: "radiant_scepter",
    name: "\u0635\u0648\u0644\u062C\u0627\u0646 \u0627\u0644\u0646\u0648\u0631 \u0627\u0644\u0634\u0627\u0641\u064A",
    role: "support",
    category: "\u0635\u0648\u0644\u062C\u0627\u0646 \u0645\u0628\u0627\u0631\u0643 \xB7 \u062F\u0639\u0645",
    description: "\u0633\u0644\u0627\u062D \u062F\u0639\u0645 \u064A\u0639\u0627\u0644\u062C\u0643 \u0628\u0646\u0633\u0628\u0629 6% \u0645\u0639 \u0643\u0644 \u0636\u0631\u0628\u0629 \u0645\u0635\u064A\u0628\u0629\u060C \u0648\u0645\u0647\u0627\u0631\u062A\u0647 \u0627\u0644\u062B\u0642\u064A\u0644\u0629 \u062A\u0637\u0644\u0642 \u0646\u0628\u0636\u0629 \u0634\u0641\u0627\u0621 \u0648\u0637\u0627\u0642\u0629.",
    damage: 20,
    heavyDamage: 42,
    range: 12,
    attackSpeed: 2.1,
    critBonus: 12,
    knockback: 4.5,
    isRanged: true,
    healOnHitPct: 0.06,
    bladeColor: "#FEF08A",
    hiltColor: "#0F766E",
    energyColor: "#10B981",
    costGold: 480,
    costGems: 0,
    heavySkillName: "\u0645\u0648\u062C\u0629 \u0627\u0644\u0634\u0641\u0627\u0621 \u0627\u0644\u0645\u0628\u0627\u0631\u0643"
  },
  astral_censer: {
    id: "astral_censer",
    name: "\u0643\u0631\u0629 \u0627\u0644\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u0642\u062F\u0633",
    role: "support",
    category: "\u062C\u0631\u0645 \u062F\u0639\u0645 \xB7 \u062F\u0639\u0645",
    description: "\u0643\u0631\u0629 \u0637\u0627\u0642\u0629 \u062A\u062F\u0648\u0631 \u062D\u0648\u0644\u0643 \u0648\u062A\u0637\u0644\u0642 \u0623\u0634\u0639\u0629 \u0645\u0648\u062C\u0647\u0629 \u062A\u0634\u062D\u0646 \u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0648\u062A\u0645\u0646\u062D\u0643 \u062F\u0631\u0639\u0627\u064B \u0645\u0624\u0642\u062A\u0627\u064B \u0639\u0646\u062F \u0627\u0644\u0647\u062C\u0648\u0645 \u0627\u0644\u062B\u0642\u064A\u0644.",
    damage: 23,
    heavyDamage: 48,
    range: 13,
    attackSpeed: 2.25,
    critBonus: 15,
    knockback: 5,
    isRanged: true,
    healOnHitPct: 0.04,
    bladeColor: "#A5F3FC",
    hiltColor: "#0284C7",
    energyColor: "#38BDF8",
    costGold: 840,
    costGems: 10,
    heavySkillName: "\u0647\u0627\u0644\u0629 \u0627\u0644\u0625\u0645\u062F\u0627\u062F \u0627\u0644\u0623\u062B\u064A\u0631\u064A\u0629"
  },
  bastion_mace: {
    id: "bastion_mace",
    name: "\u062A\u0631\u0633 \u0627\u0644\u062D\u0635\u0646 \u0648\u0635\u0648\u0644\u062C\u0627\u0646 \u0627\u0644\u0635\u062F\u0651",
    role: "defense",
    category: "\u0633\u0644\u0627\u062D \u0648\u062F\u0631\u0639 \xB7 \u062F\u0641\u0627\u0639",
    description: "\u064A\u0645\u0646\u062D +12% \u062A\u0642\u0644\u064A\u0644 \u0636\u0631\u0631 \u062F\u0627\u0626\u0645\u060C \u0648\u064A\u0633\u062D\u0642 \u0627\u0644\u0623\u0639\u062F\u0627\u0621 \u0628\u0636\u0631\u0628\u0629 \u062F\u0631\u0639 \u062A\u0633\u0628\u0628 \u0630\u0647\u0648\u0644\u0627\u064B \u0648\u0627\u0631\u062A\u062F\u0627\u062F\u0627\u064B \u0642\u0648\u064A\u0627\u064B.",
    damage: 25,
    heavyDamage: 56,
    range: 3.1,
    attackSpeed: 1.85,
    critBonus: 10,
    knockback: 7.5,
    isRanged: false,
    armorBonus: 0.12,
    bladeColor: "#94A3B8",
    hiltColor: "#1E3A8A",
    energyColor: "#60A5FA",
    costGold: 460,
    costGems: 0,
    heavySkillName: "\u0635\u062F\u0645\u0629 \u0627\u0644\u062A\u0631\u0633 \u0627\u0644\u062D\u062F\u064A\u062F\u064A"
  },
  aegis_greatshield: {
    id: "aegis_greatshield",
    name: "\u062F\u0631\u0639 \u0627\u0644\u062D\u062F\u064A\u062F \u0627\u0644\u0623\u0628\u062F\u064A \u0627\u0644\u0639\u0645\u0644\u0627\u0642",
    role: "defense",
    category: "\u062F\u0631\u0639 \u062D\u0631\u0628\u064A \u062B\u0642\u064A\u0644 \xB7 \u062F\u0641\u0627\u0639",
    description: "\u064A\u0645\u0646\u062D +18% \u062F\u0641\u0627\u0639 \u0625\u0636\u0627\u0641\u064A \u0648\u064A\u062D\u0648\u0644 \u0627\u0644\u0635\u062F\u0651 \u0625\u0644\u0649 \u0627\u0631\u062A\u062F\u0627\u062F \u0645\u062F\u0645\u0631 \u0645\u0639 \u0645\u0648\u062C\u0629 \u0623\u0631\u0636\u064A\u0629 \u062F\u0627\u0641\u0639\u0629 \u0644\u0643\u0644 \u0627\u0644\u0645\u062D\u064A\u0637\u064A\u0646.",
    damage: 28,
    heavyDamage: 64,
    range: 3.4,
    attackSpeed: 1.6,
    critBonus: 8,
    knockback: 9.5,
    isRanged: false,
    armorBonus: 0.18,
    bladeColor: "#475569",
    hiltColor: "#D97706",
    energyColor: "#F59E0B",
    costGold: 920,
    costGems: 14,
    heavySkillName: "\u062D\u0627\u062C\u0632 \u0627\u0644\u062C\u0628\u0644 \u0627\u0644\u0645\u0646\u064A\u0639"
  }
};
export const WEAPON_LIST = Object.values(WEAPONS);
export const POWERS = {
  inferno_nova: {
    id: "inferno_nova",
    name: "\u0645\u0648\u062C\u0629 \u0627\u0644\u0644\u0647\u0628",
    role: "melee",
    tagline: "\u0627\u0646\u0641\u062C\u0627\u0631 \u0646\u0627\u0631\u064A \u0645\u062D\u064A\u0637\u064A",
    description: "\u062A\u0637\u0644\u0642 \u062D\u0644\u0642\u0629 \u0646\u0627\u0631 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062D\u0648\u0644\u0643 \u062A\u062F\u0641\u0639 \u0643\u0644 \u0627\u0644\u062E\u0635\u0648\u0645 \u0648\u062A\u0644\u062D\u0642 \u0628\u0647\u0645 \u0636\u0631\u0631\u0627\u064B \u062D\u0627\u0631\u0642\u0627\u064B.",
    cooldown: 7.5,
    energyCost: 35,
    damage: 54,
    radius: 6,
    color: "#F97316",
    costGold: 0,
    costGems: 0
  },
  thunder_strike: {
    id: "thunder_strike",
    name: "\u0635\u0627\u0639\u0642\u0629 \u0627\u0644\u0633\u0645\u0627\u0621",
    role: "magic",
    tagline: "\u0628\u0631\u0642 \u0645\u062A\u0633\u0644\u0633\u0644 \u0648\u0635\u0639\u0642",
    description: "\u062A\u0633\u062A\u062F\u0639\u064A \u0635\u0648\u0627\u0639\u0642 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062A\u0636\u0631\u0628 \u0623\u0642\u0631\u0628 \u062B\u0644\u0627\u062B\u0629 \u062E\u0635\u0648\u0645 \u0648\u062A\u0634\u0644 \u062D\u0631\u0643\u062A\u0647\u0645 \u0645\u0624\u0642\u062A\u0627\u064B.",
    cooldown: 8.5,
    energyCost: 40,
    damage: 58,
    radius: 9.5,
    color: "#38BDF8",
    costGold: 0,
    costGems: 0
  },
  crystal_aegis: {
    id: "crystal_aegis",
    name: "\u062F\u0631\u0639 \u0627\u0644\u0628\u0644\u0648\u0631",
    role: "defense",
    tagline: "\u062D\u0645\u0627\u064A\u0629 \u0648\u0627\u0631\u062A\u062F\u0627\u062F \u0636\u0631\u0631",
    description: "\u064A\u062D\u064A\u0637 \u0627\u0644\u0623\u0641\u062A\u0627\u0631 \u0628\u062F\u0631\u0639 \u0628\u0644\u0648\u0631\u064A \u062F\u0648\u0651\u0627\u0631 \u064A\u0645\u062A\u0635 65% \u0645\u0646 \u0627\u0644\u0636\u0631\u0631 \u0644\u0640 5 \u062B\u0648\u0627\u0646\u064D \u0648\u064A\u0639\u064A\u062F \u0634\u062D\u0646 \u0627\u0644\u0635\u062D\u0629.",
    cooldown: 11,
    energyCost: 35,
    damage: 24,
    radius: 3.8,
    color: "#10B981",
    costGold: 340,
    costGems: 0
  },
  shadow_blink: {
    id: "shadow_blink",
    name: "\u0627\u0646\u062F\u0641\u0627\u0639 \u0627\u0644\u0638\u0644",
    role: "melee",
    tagline: "\u0627\u062E\u062A\u0631\u0627\u0642 \u0633\u0631\u064A\u0639 \u0648\u062D\u0631\u062C",
    description: "\u062A\u0646\u062F\u0641\u0639 \u0644\u0645\u0633\u0627\u0641\u0629 \u0628\u0639\u064A\u062F\u0629 \u0645\u062E\u062A\u0631\u0642\u0627\u064B \u0643\u0644 \u0627\u0644\u062E\u0635\u0648\u0645 \u0641\u064A \u0637\u0631\u064A\u0642\u0643 \u0628\u0636\u0631\u0628\u0629 \u0642\u0627\u0637\u0639\u0629 \u0641\u0648\u0631\u064A\u0629.",
    cooldown: 6.5,
    energyCost: 30,
    damage: 50,
    radius: 7,
    color: "#94A3B8",
    costGold: 420,
    costGems: 0
  },
  frost_vortex: {
    id: "frost_vortex",
    name: "\u0632\u0648\u0628\u0639\u0629 \u0627\u0644\u062C\u0644\u064A\u062F",
    role: "magic",
    tagline: "\u062A\u062C\u0645\u064A\u062F \u0648\u0625\u0628\u0637\u0627\u0621 \u062C\u0645\u0627\u0639\u064A",
    description: "\u0625\u0639\u0635\u0627\u0631 \u062C\u0644\u064A\u062F\u064A \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u064A\u062C\u0645\u0651\u062F \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u0627\u0644\u0645\u0646\u0627\u0641\u0633\u064A\u0646 \u0648\u064A\u0628\u0637\u0626\u0647\u0645 \u0644\u0640 4 \u062B\u0648\u0627\u0646\u064D.",
    cooldown: 9,
    energyCost: 38,
    damage: 46,
    radius: 6.8,
    color: "#60A5FA",
    costGold: 560,
    costGems: 8
  },
  titan_overdrive: {
    id: "titan_overdrive",
    name: "\u063A\u0636\u0628 \u0627\u0644\u0639\u0645\u0644\u0627\u0642",
    role: "melee",
    tagline: "\u062A\u0636\u062E\u0645 \u062C\u0633\u062F\u064A \u0648\u0642\u0648\u0629 \u0641\u0627\u0626\u0642\u0629",
    description: "\u064A\u062A\u0636\u062E\u0645 \u0623\u0641\u062A\u0627\u0631\u0643 \u0628\u0647\u0627\u0644\u0629 \u0630\u0647\u0628\u064A\u0629 \u0644\u0640 7 \u062B\u0648\u0627\u0646\u064D \u0645\u0639 +55% \u0636\u0631\u0631 \u0648\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0635\u062D\u0629 \u0645\u0639 \u0643\u0644 \u0636\u0631\u0628\u0629.",
    cooldown: 14,
    energyCost: 45,
    damage: 34,
    radius: 4.5,
    color: "#E59A24",
    costGold: 780,
    costGems: 15
  },
  meteor_rain: {
    id: "meteor_rain",
    name: "\u0645\u0637\u0631 \u0627\u0644\u0646\u064A\u0627\u0632\u0643",
    role: "magic",
    tagline: "\u0642\u0635\u0641 \u0633\u062D\u0631\u064A \u0648\u0627\u0633\u0639 \u0627\u0644\u0646\u0637\u0627\u0642",
    description: "\u064A\u0633\u0642\u0637 4 \u0646\u064A\u0627\u0632\u0643 \u0645\u062A\u0641\u062C\u0631\u0629 \u0645\u062A\u062A\u0627\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u062E\u0635\u0648\u0645 \u0627\u0644\u0645\u062D\u064A\u0637\u064A\u0646 \u0628\u0636\u0631\u0631 \u0646\u0627\u0631\u064A \u0645\u062F\u0645\u0631 \u0648\u0645\u0648\u062C\u0627\u062A \u0635\u062F\u0645\u0629.",
    cooldown: 11.5,
    energyCost: 42,
    damage: 66,
    radius: 8.5,
    color: "#FB7185",
    costGold: 740,
    costGems: 12
  },
  holy_sanctuary: {
    id: "holy_sanctuary",
    name: "\u0645\u0644\u0627\u0630 \u0627\u0644\u0636\u0648\u0621 \u0627\u0644\u0634\u0627\u0641\u064A",
    role: "support",
    tagline: "\u062F\u0639\u0645 \u0648\u0627\u0633\u062A\u0634\u0641\u0627\u0621 + \u0637\u0627\u0642\u0629",
    description: "\u064A\u0634\u0641\u064A 34% \u0645\u0646 \u0627\u0644\u0635\u062D\u0629 \u0641\u0648\u0631\u0627\u064B \u0648\u064A\u062F\u0641\u0639 \u0627\u0644\u0623\u0639\u062F\u0627\u0621 \u0644\u0644\u062E\u0644\u0641 \u0645\u0639 \u0645\u0646\u062D\u0643 \u0633\u0631\u0639\u0629 \u0648\u0634\u062D\u0646 \u0637\u0627\u0642\u0629 \u0625\u0636\u0627\u0641\u064A.",
    cooldown: 10.5,
    energyCost: 32,
    damage: 28,
    radius: 5.5,
    color: "#34D399",
    costGold: 450,
    costGems: 0
  },
  iron_fortress: {
    id: "iron_fortress",
    name: "\u062D\u0635\u0646 \u0627\u0644\u062D\u062F\u064A\u062F \u0627\u0644\u0623\u0628\u062F\u064A",
    role: "defense",
    tagline: "\u0635\u0645\u0648\u062F \u0645\u0637\u0644\u0642 \u0648\u0627\u0646\u0639\u0643\u0627\u0633",
    description: "\u064A\u0641\u0639\u0651\u0644 \u062F\u0631\u0639 \u0627\u0644\u062D\u0635\u0646 \u0645\u0639 \u0645\u0646\u0627\u0639\u0629 \u0642\u0635\u064A\u0631\u0629 \u0636\u062F \u0627\u0644\u0636\u0631\u0628\u0627\u062A \u0648\u0635\u062F\u0645\u0629 \u0623\u0631\u0636\u064A\u0629 \u062A\u0642\u0630\u0641 \u0643\u0644 \u062E\u0635\u0645 \u0642\u0631\u064A\u0628.",
    cooldown: 12,
    energyCost: 36,
    damage: 42,
    radius: 5.2,
    color: "#60A5FA",
    costGold: 520,
    costGems: 0
  },
  arcane_beam: {
    id: "arcane_beam",
    name: "\u0634\u0639\u0627\u0639 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0633\u062D\u0631\u064A",
    role: "magic",
    tagline: "\u0642\u0641\u0632\u0629 \u0648\u0637\u0627\u0642\u0629 \u0645\u0631\u0643\u0632\u0629",
    description: "\u064A\u0637\u0644\u0642 \u0648\u0627\u0628\u0644\u0627\u064B \u0645\u0631\u0643\u0632\u0627\u064B \u0645\u0646 \u0627\u0644\u0643\u0631\u0627\u062A \u0627\u0644\u0633\u062D\u0631\u064A\u0629 \u0627\u0644\u0645\u0648\u062C\u0647\u0629 \u0627\u0644\u062A\u064A \u062A\u0635\u064A\u0628 \u0627\u0644\u062E\u0635\u0648\u0645 \u0645\u0646 \u0645\u0633\u0627\u0641\u0627\u062A \u0628\u0639\u064A\u062F\u0629.",
    cooldown: 8,
    energyCost: 35,
    damage: 60,
    radius: 12,
    color: "#A78BFA",
    costGold: 620,
    costGems: 8
  },
  fusion_plasma_tempest: {
    id: "fusion_plasma_tempest",
    name: "\u0639\u0627\u0635\u0641\u0629 \u0627\u0644\u0628\u0644\u0627\u0632\u0645\u0627 \u0627\u0644\u0645\u062A\u0641\u062C\u0631\u0629",
    role: "magic",
    tagline: "\u0645\u0647\u0627\u0631\u0629 \u0645\u062F\u0645\u062C\u0629: \u0644\u0647\u0628 + \u0635\u0627\u0639\u0642\u0629",
    description: "\u062A\u062F\u0645\u062C \u0645\u0648\u062C\u0629 \u0627\u0644\u0644\u0647\u0628 \u0645\u0639 \u0635\u0627\u0639\u0642\u0629 \u0627\u0644\u0633\u0645\u0627\u0621 \u0644\u0625\u0637\u0644\u0627\u0642 \u0627\u0646\u0641\u062C\u0627\u0631 \u0628\u0644\u0627\u0632\u0645\u064A \u0645\u0632\u062F\u0648\u062C \u0648\u0635\u0648\u0627\u0639\u0642 \u0645\u062A\u0633\u0644\u0633\u0644\u0629 \u062A\u0635\u0639\u0642 \u0627\u0644\u0623\u0639\u062F\u0627\u0621.",
    cooldown: 9.5,
    energyCost: 42,
    damage: 94,
    radius: 8.5,
    color: "#FB923C",
    costGold: 0,
    costGems: 0,
    isFusion: true,
    fusionPair: ["inferno_nova", "thunder_strike"],
    fusionCostGold: 680,
    fusionCostMarks: 16
  },
  fusion_eternal_glacier: {
    id: "fusion_eternal_glacier",
    name: "\u0647\u0627\u0644\u0629 \u0627\u0644\u062E\u0644\u0648\u062F \u0627\u0644\u0645\u062A\u062C\u0645\u062F\u0629",
    role: "support",
    tagline: "\u0645\u0647\u0627\u0631\u0629 \u0645\u062F\u0645\u062C\u0629: \u0635\u0642\u064A\u0639 + \u0645\u0644\u0627\u0630 \u0627\u0644\u0636\u0648\u0621",
    description: "\u062A\u0634\u0641\u064A 42% \u0645\u0646 \u0635\u062D\u062A\u0643 \u0648\u062A\u0645\u0646\u062D\u0643 \u062F\u0631\u0639\u0627\u064B \u0641\u0648\u0631\u064A\u0627\u064B \u0645\u0639 \u0632\u0648\u0628\u0639\u0629 \u062C\u0644\u064A\u062F\u064A\u0629 \u062A\u062C\u0645\u0651\u062F \u0627\u0644\u062E\u0635\u0648\u0645 \u0627\u0644\u0645\u062D\u064A\u0637\u064A\u0646 5 \u062B\u0648\u0627\u0646\u064D.",
    cooldown: 11,
    energyCost: 38,
    damage: 68,
    radius: 7.5,
    color: "#2DD4BF",
    costGold: 0,
    costGems: 0,
    isFusion: true,
    fusionPair: ["frost_vortex", "holy_sanctuary"],
    fusionCostGold: 740,
    fusionCostMarks: 18
  },
  fusion_void_eclipse: {
    id: "fusion_void_eclipse",
    name: "\u0634\u0642\u0651 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u0627\u0644\u0635\u0627\u0639\u0642",
    role: "melee",
    tagline: "\u0645\u0647\u0627\u0631\u0629 \u0645\u062F\u0645\u062C\u0629: \u0627\u0646\u062F\u0641\u0627\u0639 \u0627\u0644\u0638\u0644 + \u0634\u0639\u0627\u0639 \u0627\u0644\u0647\u0627\u0648\u064A\u0629",
    description: "\u0627\u0646\u062F\u0641\u0627\u0639\u0629 \u0641\u0627\u0626\u0642\u0629 \u0627\u0644\u0633\u0631\u0639\u0629 \u0639\u0628\u0631 \u0627\u0644\u0623\u0628\u0639\u0627\u062F \u062A\u0637\u0644\u0642 \u0645\u0639\u0647\u0627 \u0631\u0634\u0642\u0629 \u0623\u062B\u064A\u0631\u064A\u0629 \u0645\u0648\u062C\u0647\u0629 \u062A\u0636\u0627\u0639\u0641 \u0627\u0644\u0636\u0631\u0628\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629.",
    cooldown: 8.2,
    energyCost: 36,
    damage: 88,
    radius: 9.5,
    color: "#C084FC",
    costGold: 0,
    costGems: 0,
    isFusion: true,
    fusionPair: ["shadow_blink", "arcane_beam"],
    fusionCostGold: 820,
    fusionCostMarks: 22
  },
  fusion_dragon_bastion: {
    id: "fusion_dragon_bastion",
    name: "\u0642\u0635\u0641 \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0645\u062F\u0631\u0651\u0639",
    role: "defense",
    tagline: "\u0645\u0647\u0627\u0631\u0629 \u0645\u062F\u0645\u062C\u0629: \u0645\u0637\u0631 \u0627\u0644\u0646\u064A\u0627\u0632\u0643 + \u062D\u0635\u0646 \u0627\u0644\u062D\u062F\u064A\u062F",
    description: "\u062A\u0641\u0639\u0651\u0644 \u062F\u0631\u0639\u0627\u064B \u0645\u0646\u064A\u0639\u0627\u064B \u0645\u0639 \u0647\u0628\u0648\u0637 5 \u0646\u064A\u0627\u0632\u0643 \u062A\u0646\u064A\u0646\u064A\u0629 \u0633\u0627\u062D\u0642\u0629 \u062A\u062D\u0648\u0644\u0643 \u0644\u0642\u0644\u0639\u0629 \u0645\u062A\u062D\u0631\u0643\u0629.",
    cooldown: 12.5,
    energyCost: 46,
    damage: 98,
    radius: 9.2,
    color: "#F43F5E",
    costGold: 0,
    costGems: 0,
    isFusion: true,
    fusionPair: ["meteor_rain", "iron_fortress"],
    fusionCostGold: 950,
    fusionCostMarks: 26
  }
};
export const POWER_LIST = Object.values(POWERS);
export const CORE_POWER_LIST = POWER_LIST.filter((p) => !p.isFusion);
export const FUSION_POWER_LIST = POWER_LIST.filter((p) => p.isFusion);
export const SKILL_SLOT_UNLOCK_COSTS = {
  2: { gold: 450, guildMarks: 10, gems: 15, keyHint: "[R]", label: "\u0627\u0644\u062E\u0627\u0646\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 [R]" },
  3: { gold: 1100, guildMarks: 25, gems: 35, keyHint: "[Z]", label: "\u0627\u0644\u062E\u0627\u0646\u0629 \u0627\u0644\u062B\u0627\u0644\u062B\u0629 [Z]" },
  4: { gold: 2400, guildMarks: 50, gems: 70, keyHint: "[X]", label: "\u0627\u0644\u062E\u0627\u0646\u0629 \u0627\u0644\u0631\u0627\u0628\u0639\u0629 [X]" }
};
export const SKILL_NETWORK_NODES = [
  {
    id: "node_core_awakening",
    title: "\u0646\u0648\u0627\u0629 \u064A\u0642\u0638\u0629 \u0627\u0644\u0646\u0638\u0627\u0645",
    description: "\u0646\u0642\u0637\u0629 \u0627\u0644\u0623\u0635\u0644 \u0641\u064A \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A\u061B \u062A\u0631\u0641\u0639 \u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0636\u0631\u0631 \u0648\u0646\u0637\u0627\u0642 \u0643\u0644 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.",
    branch: "core",
    x: 50,
    y: 50,
    costGold: 0,
    costMarks: 0,
    bonusLabel: "+5% \u0636\u0631\u0631 \u0645\u0647\u0627\u0631\u0627\u062A",
    effects: { dmgMult: 0.05 }
  },
  {
    id: "node_fury_1",
    title: "\u0634\u0639\u0644\u0629 \u0627\u0644\u0628\u0637\u0634 I",
    description: "\u062A\u0635\u0642\u0644 \u0642\u0648\u0629 \u0627\u0644\u0627\u0646\u0641\u062C\u0627\u0631 \u0648\u0627\u0644\u0636\u0631\u0628\u0627\u062A \u0627\u0644\u0633\u062D\u0631\u064A\u0629 \u0648\u0627\u0644\u0642\u062A\u0627\u0644\u064A\u0629 \u0628\u0646\u0633\u0628\u0629 12%.",
    branch: "fury",
    x: 22,
    y: 26,
    requires: "node_core_awakening",
    costGold: 220,
    costMarks: 6,
    bonusLabel: "+12% \u0636\u0631\u0631 \u0645\u0647\u0627\u0631\u0627\u062A",
    effects: { dmgMult: 0.12 }
  },
  {
    id: "node_fury_2",
    title: "\u063A\u0636\u0628 \u0627\u0644\u0633\u064A\u0627\u062F\u0629 II",
    description: "\u064A\u0631\u0641\u0639 \u0636\u0631\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629 \u0648\u0627\u0644\u0645\u062F\u0645\u062C\u0629 \u0628\u0646\u0633\u0628\u0629 18% \u0625\u0636\u0627\u0641\u064A\u0629.",
    branch: "fury",
    x: 12,
    y: 12,
    requires: "node_fury_1",
    costGold: 520,
    costMarks: 14,
    bonusLabel: "+18% \u0636\u0631\u0631 \u0645\u0647\u0627\u0631\u0627\u062A",
    effects: { dmgMult: 0.18 }
  },
  {
    id: "node_haste_1",
    title: "\u062A\u062F\u0641\u0642 \u0627\u0644\u0632\u0645\u0646 I",
    description: "\u064A\u0642\u0644\u0644 \u0632\u0645\u0646 \u0627\u0644\u062A\u0628\u0631\u064A\u062F \u0648\u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0628\u0646\u0633\u0628\u0629 10%.",
    branch: "haste",
    x: 78,
    y: 26,
    requires: "node_core_awakening",
    costGold: 220,
    costMarks: 6,
    bonusLabel: "-10% \u0648\u0642\u062A \u062A\u0628\u0631\u064A\u062F",
    effects: { cdrMult: 0.1 }
  },
  {
    id: "node_haste_2",
    title: "\u0633\u0631\u0639\u0629 \u0627\u0644\u0628\u0631\u0642 II",
    description: "\u064A\u062E\u062A\u0635\u0631 \u062A\u0628\u0631\u064A\u062F \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0628\u0646\u0633\u0628\u0629 14% \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629 \u0627\u0644\u0642\u062A\u0627\u0644.",
    branch: "haste",
    x: 88,
    y: 12,
    requires: "node_haste_1",
    costGold: 540,
    costMarks: 15,
    bonusLabel: "-14% \u0648\u0642\u062A \u062A\u0628\u0631\u064A\u062F",
    effects: { cdrMult: 0.14 }
  },
  {
    id: "node_ether_1",
    title: "\u064A\u0646\u0628\u0648\u0639 \u0627\u0644\u0623\u062B\u064A\u0631 I",
    description: "\u064A\u0632\u064A\u062F \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0628\u0637\u0644 \u0628\u0645\u0642\u062F\u0627\u0631 +25 \u0646\u0642\u0637\u0629 \u0637\u0627\u0642\u0629.",
    branch: "ether",
    x: 22,
    y: 74,
    requires: "node_core_awakening",
    costGold: 240,
    costMarks: 7,
    bonusLabel: "+25 \u0637\u0627\u0642\u0629 \u0642\u0635\u0648\u0649",
    effects: { bonusEnergy: 25 }
  },
  {
    id: "node_ether_2",
    title: "\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A II",
    description: "\u064A\u062E\u0641\u0636 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0637\u0627\u0642\u0629 \u0644\u0643\u0644 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0628\u0646\u0633\u0628\u0629 18%.",
    branch: "ether",
    x: 12,
    y: 88,
    requires: "node_ether_1",
    costGold: 560,
    costMarks: 16,
    bonusLabel: "-18% \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0637\u0627\u0642\u0629",
    effects: { energyCostMult: 0.18 }
  },
  {
    id: "node_fusion_1",
    title: "\u0631\u0646\u064A\u0646 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A I",
    description: "\u064A\u0648\u0633\u0651\u0639 \u0646\u0637\u0627\u0642 \u062A\u0623\u062B\u064A\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0628\u0646\u0633\u0628\u0629 16%.",
    branch: "fusion",
    x: 78,
    y: 74,
    requires: "node_core_awakening",
    costGold: 260,
    costMarks: 8,
    bonusLabel: "+16% \u0645\u062F\u0649 \u0627\u0644\u062A\u0623\u062B\u064A\u0631",
    effects: { radiusMult: 0.16 }
  },
  {
    id: "node_fusion_master",
    title: "\u0633\u064A\u0627\u062F\u0629 \u0627\u0644\u062F\u0645\u062C \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A\u0629 II",
    description: "\u064A\u0631\u0641\u0639 \u0642\u0648\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062F\u0645\u062C\u0629 \u0628\u0646\u0633\u0628\u0629 +26% \u0648\u064A\u0645\u0646\u062D +10% \u0636\u0631\u0631 \u0639\u0627\u0645.",
    branch: "fusion",
    x: 88,
    y: 88,
    requires: "node_fusion_1",
    costGold: 720,
    costMarks: 22,
    bonusLabel: "+26% \u0642\u0648\u0629 \u0627\u0644\u062F\u0645\u062C",
    effects: { fusionMult: 0.26, dmgMult: 0.1 }
  }
];
export function computeSkillNetworkBonuses(unlockedNodeIds = ["node_core_awakening"]) {
  let dmgMult = 1;
  let cdrMult = 0;
  let radiusMult = 1;
  let energyCostMult = 1;
  let bonusEnergy = 0;
  let fusionMult = 1;
  for (const node of SKILL_NETWORK_NODES) {
    if (!unlockedNodeIds.includes(node.id)) continue;
    if (node.effects.dmgMult) dmgMult += node.effects.dmgMult;
    if (node.effects.cdrMult) cdrMult += node.effects.cdrMult;
    if (node.effects.radiusMult) radiusMult += node.effects.radiusMult;
    if (node.effects.energyCostMult) energyCostMult -= node.effects.energyCostMult;
    if (node.effects.bonusEnergy) bonusEnergy += node.effects.bonusEnergy;
    if (node.effects.fusionMult) fusionMult += node.effects.fusionMult;
  }
  return {
    dmgMult: Number(dmgMult.toFixed(2)),
    cdrMult: Math.min(0.45, Number(cdrMult.toFixed(2))),
    radiusMult: Number(radiusMult.toFixed(2)),
    energyCostMult: Math.max(0.5, Number(energyCostMult.toFixed(2))),
    bonusEnergy,
    fusionMult: Number(fusionMult.toFixed(2))
  };
}
export const QUICK_CHAT_PHRASES = [
  "\u0647\u064A\u0627 \u0646\u0628\u062F\u0623 \u0627\u0644\u0642\u062A\u0627\u0644!",
  "\u062A\u062C\u0645\u0639\u0648\u0627 \u0639\u0646\u062F \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0622\u0646!",
  "\u0627\u0646\u062A\u0628\u0647\u0648\u0627\u060C \u0627\u0644\u0632\u0639\u064A\u0645 \u064A\u0642\u062A\u0631\u0628!",
  "\u0623\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062F\u0639\u0645 \u0648\u0634\u0641\u0627\u0621!",
  "\u0643\u0641\u0648! \u0636\u0631\u0628\u0629 \u0631\u0627\u0626\u0639\u0629!",
  "\u0645\u0646 \u064A\u0631\u064A\u062F \u0645\u0628\u0627\u0631\u0632\u0629 1 \u0636\u062F 1\u061F"
];
export const GEAR_ITEMS = {
  ring_vitality: {
    id: "ring_vitality",
    name: "\u062E\u0627\u062A\u0645 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0645\u062A\u062C\u062F\u062F\u0629",
    slot: "relic",
    slotLabel: "\u062A\u0645\u064A\u0645\u0629 / \u062E\u0627\u062A\u0645",
    description: "\u064A\u0632\u064A\u062F \u0623\u0642\u0635\u0649 \u0635\u062D\u0629 +55 \u0648\u064A\u0639\u0632\u0632 \u062A\u062C\u062F\u064A\u062F \u0627\u0644\u0637\u0627\u0642\u0629 \u0641\u064A \u0627\u0644\u0645\u0639\u0627\u0631\u0643 \u0627\u0644\u0637\u0648\u064A\u0644\u0629.",
    hpBonus: 55,
    dmgBonus: 0,
    speedBonus: 0,
    armorBonus: 0.02,
    critBonus: 0,
    pwrScaleBonus: 0.05,
    costGold: 260,
    costGems: 0,
    accentColor: "#10B981"
  },
  amulet_arcane: {
    id: "amulet_arcane",
    name: "\u0642\u0644\u0627\u062F\u0629 \u0627\u0644\u062D\u0643\u0645\u0629 \u0627\u0644\u0633\u062D\u0631\u064A\u0629",
    slot: "relic",
    slotLabel: "\u062A\u0645\u064A\u0645\u0629 / \u062E\u0627\u062A\u0645",
    description: "\u062A\u0631\u0641\u0639 \u0642\u0648\u0629 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0642\u062F\u0631\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u0642\u0629 +20% \u0648\u062A\u0632\u064A\u062F \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u062D\u0631\u062C\u0629.",
    hpBonus: 15,
    dmgBonus: 4,
    speedBonus: 0,
    armorBonus: 0,
    critBonus: 5,
    pwrScaleBonus: 0.2,
    costGold: 420,
    costGems: 0,
    accentColor: "#38BDF8"
  },
  ring_crit: {
    id: "ring_crit",
    name: "\u062E\u0627\u062A\u0645 \u0639\u064A\u0646 \u0627\u0644\u0635\u0642\u0631",
    slot: "relic",
    slotLabel: "\u062A\u0645\u064A\u0645\u0629 / \u062E\u0627\u062A\u0645",
    description: "\u064A\u0645\u0646\u062D +12% \u0641\u0631\u0635\u0629 \u0636\u0631\u0628\u0629 \u062D\u0627\u0633\u0645\u0629 \u0648+7 \u0636\u0631\u0631 \u0647\u062C\u0648\u0645\u064A \u0645\u0628\u0627\u0634\u0631.",
    hpBonus: 0,
    dmgBonus: 7,
    speedBonus: 0.25,
    armorBonus: 0,
    critBonus: 12,
    pwrScaleBonus: 0,
    costGold: 560,
    costGems: 5,
    accentColor: "#F59E0B"
  },
  core_bastion: {
    id: "core_bastion",
    name: "\u0646\u0648\u0627\u0629 \u0627\u0644\u062D\u0635\u0646 \u0627\u0644\u0645\u062F\u0631\u0639\u0629",
    slot: "armor_core",
    slotLabel: "\u0646\u0648\u0627\u0629 \u0627\u0644\u062F\u0631\u0639",
    description: "\u062A\u0636\u064A\u0641 +8% \u062A\u0642\u0644\u064A\u0644 \u0636\u0631\u0631 \u0648+45 \u0635\u062D\u0629 \u0644\u0645\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0632\u0639\u0645\u0627\u0621.",
    hpBonus: 45,
    dmgBonus: 0,
    speedBonus: 0,
    armorBonus: 0.08,
    critBonus: 0,
    pwrScaleBonus: 0,
    costGold: 310,
    costGems: 0,
    accentColor: "#60A5FA"
  },
  core_dragon: {
    id: "core_dragon",
    name: "\u062D\u0631\u0627\u0634\u0641 \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0645\u0644\u062A\u0647\u0628",
    slot: "armor_core",
    slotLabel: "\u0646\u0648\u0627\u0629 \u0627\u0644\u062F\u0631\u0639",
    description: "\u062A\u062F\u0645\u062C \u0627\u0644\u0635\u0644\u0627\u0628\u0629 \u0628\u0627\u0644\u0647\u062C\u0648\u0645\u064A\u0629: +60 \u0635\u062D\u0629\u060C +8 \u0636\u0631\u0631\u060C \u0648+5% \u062F\u0631\u0639.",
    hpBonus: 60,
    dmgBonus: 8,
    speedBonus: 0,
    armorBonus: 0.05,
    critBonus: 4,
    pwrScaleBonus: 0.08,
    costGold: 640,
    costGems: 8,
    accentColor: "#EF4444"
  },
  core_radiant: {
    id: "core_radiant",
    name: "\u0648\u0634\u0627\u062D \u0627\u0644\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0631\u0643",
    slot: "armor_core",
    slotLabel: "\u0646\u0648\u0627\u0629 \u0627\u0644\u062F\u0631\u0639",
    description: "\u064A\u0648\u0627\u0632\u0646 \u0627\u0644\u062F\u0641\u0627\u0639 (+6%) \u0645\u0639 \u062A\u0639\u0632\u064A\u0632 \u0642\u0648\u0629 \u0627\u0644\u0634\u0641\u0627\u0621 \u0648\u0627\u0644\u0633\u062D\u0631 (+15%).",
    hpBonus: 35,
    dmgBonus: 3,
    speedBonus: 0.2,
    armorBonus: 0.06,
    critBonus: 0,
    pwrScaleBonus: 0.15,
    costGold: 490,
    costGems: 0,
    accentColor: "#34D399"
  },
  boots_wind: {
    id: "boots_wind",
    name: "\u062E\u0641\u0651 \u0627\u0644\u0631\u064A\u062D \u0627\u0644\u062E\u0627\u0637\u0641",
    slot: "boots",
    slotLabel: "\u062D\u0630\u0627\u0621 \u0648\u0642\u0641\u0627\u0632 \u0642\u062A\u0627\u0644\u064A",
    description: "\u064A\u0632\u064A\u062F \u0633\u0631\u0639\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 +1.1 \u0648\u0627\u0644\u0636\u0631\u0628\u0629 \u0627\u0644\u062D\u0627\u0633\u0645\u0629 +6% \u0644\u0644\u0645\u0646\u0627\u0648\u0631\u0629 \u062D\u0648\u0644 \u0627\u0644\u0648\u062D\u0648\u0634.",
    hpBonus: 0,
    dmgBonus: 2,
    speedBonus: 1.1,
    armorBonus: 0,
    critBonus: 6,
    pwrScaleBonus: 0,
    costGold: 290,
    costGems: 0,
    accentColor: "#38BDF8"
  },
  gauntlet_fury: {
    id: "gauntlet_fury",
    name: "\u0642\u0641\u0627\u0632 \u0627\u0644\u0642\u0628\u0636\u0629 \u0627\u0644\u0630\u0647\u0628\u064A\u0629",
    slot: "boots",
    slotLabel: "\u062D\u0630\u0627\u0621 \u0648\u0642\u0641\u0627\u0632 \u0642\u062A\u0627\u0644\u064A",
    description: "\u064A\u0631\u0641\u0639 \u0636\u0631\u0631 \u0627\u0644\u0633\u0644\u0627\u062D \u0627\u0644\u0623\u0633\u0627\u0633\u064A +11 \u0648\u064A\u0632\u064A\u062F \u0633\u0631\u0639\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 +0.4.",
    hpBonus: 15,
    dmgBonus: 11,
    speedBonus: 0.4,
    armorBonus: 0.02,
    critBonus: 5,
    pwrScaleBonus: 0,
    costGold: 540,
    costGems: 6,
    accentColor: "#F59E0B"
  },
  greaves_titan: {
    id: "greaves_titan",
    name: "\u0633\u0627\u0642\u064A\u0629 \u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629 \u0627\u0644\u062B\u0642\u064A\u0644\u0629",
    slot: "boots",
    slotLabel: "\u062D\u0630\u0627\u0621 \u0648\u0642\u0641\u0627\u0632 \u0642\u062A\u0627\u0644\u064A",
    description: "\u062A\u0645\u0646\u062D +80 \u0635\u062D\u0629 \u0648+7% \u062F\u0631\u0639 \u0635\u0644\u0628 \u0644\u062B\u0628\u0627\u062A \u0623\u0633\u0637\u0648\u0631\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0633\u0627\u062D\u0629.",
    hpBonus: 80,
    dmgBonus: 4,
    speedBonus: 0.2,
    armorBonus: 0.07,
    critBonus: 0,
    pwrScaleBonus: 0,
    costGold: 620,
    costGems: 6,
    accentColor: "#94A3B8"
  }
};
export const GEAR_LIST = Object.values(GEAR_ITEMS);
export const CONSUMABLES = {
  elixir_heal: {
    id: "elixir_heal",
    name: "\u062C\u0631\u0639\u0629 \u0627\u0644\u0634\u0641\u0627\u0621 \u0627\u0644\u0645\u0644\u0643\u064A\u0629",
    description: "\u062A\u0633\u062A\u0639\u064A\u062F \u0641\u0648\u0631\u0627\u064B 40% \u0645\u0646 \u0635\u062D\u062A\u0643 \u0627\u0644\u0642\u0635\u0648\u0649 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0642\u062A\u0627\u0644.",
    costGold: 75,
    color: "#10B981"
  },
  scroll_energy: {
    id: "scroll_energy",
    name: "\u0644\u0641\u064A\u0641\u0629 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0641\u0648\u0631\u064A\u0629",
    description: "\u062A\u0634\u062D\u0646 \u0627\u0644\u0637\u0627\u0642\u0629 100% \u0648\u062A\u0644\u063A\u064A \u0646\u0635\u0641 \u0648\u0642\u062A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u062E\u0627\u0631\u0642\u0629.",
    costGold: 85,
    color: "#38BDF8"
  },
  tonic_fury: {
    id: "tonic_fury",
    name: "\u0625\u0643\u0633\u064A\u0631 \u063A\u0636\u0628 \u0627\u0644\u0645\u0639\u0631\u0643\u0629",
    description: "\u064A\u0641\u0639\u0651\u0644 \u0647\u0627\u0644\u0629 \u0627\u0644\u062A\u0636\u062E\u0645 (+55% \u0636\u0631\u0631 \u0648\u0633\u0631\u0639\u0629) \u0644\u0645\u062F\u0629 6 \u062B\u0648\u0627\u0646\u064D.",
    costGold: 110,
    color: "#F59E0B"
  }
};
export const CONSUMABLE_LIST = Object.values(CONSUMABLES);
export const ARENAS = {
  obsidian_citadel: {
    id: "obsidian_citadel",
    name: "\u0642\u0644\u0639\u0629 \u0627\u0644\u063A\u0633\u0642 \u0627\u0644\u062D\u062C\u0631\u064A\u0629",
    subtitle: "\u0645\u062F\u0631\u062C \u0645\u0644\u0643\u064A \u0639\u0645\u0644\u0627\u0642 \u0628\u0642\u0637\u0631 96\u0645 \u0648\u0645\u0646\u0635\u0627\u062A \u0639\u0631\u0634 \u0645\u0631\u062A\u0641\u0639\u0629 \u0648\u0628\u0648\u0627\u0628\u0627\u062A \u0646\u0635\u0631",
    description: "\u062E\u0631\u064A\u0637\u0629 \u0642\u062A\u0627\u0644\u064A\u0629 \u0645\u0648\u0633\u0651\u0639\u0629 \u0628\u0642\u0637\u0631 96\u0645 \u062A\u0636\u0645 \u0645\u0646\u0635\u0629 \u0639\u0631\u0634 \u0645\u0631\u0643\u0632\u064A\u0629 (+12% \u0636\u0631\u0631)\u060C \u062B\u0644\u0627\u062B \u0634\u0631\u0641\u0627\u062A \u062D\u0635\u0646\u060C \u062D\u0644\u0642\u0629 \u062A\u0633\u0627\u0631\u0639\u060C \u0648\u0645\u062D\u0631\u0627\u0628\u064A \u062F\u0639\u0645.",
    imagePath: BUNDLED_IMAGES.arenaObsidian,
    radius: 48,
    skyTop: "#080D1A",
    skyMid: "#18243D",
    skyHorizon: "#634E4A",
    fogColor: "#131B2E",
    floorMain: "#252D3D",
    floorAlt: "#1C2332",
    floorTrim: "#E6B85C",
    platformWall: "#101622",
    pillarColor: "#3A465C",
    pillarAccent: "#E6B85C",
    ambientParticleColor: "#FBBF24",
    hazardType: "none",
    rewardMultiplier: 1.08,
    pillars: [
      { x: -22.5, z: -22.5, radius: 1.75, height: 7.2, style: "column" },
      { x: 22.5, z: -22.5, radius: 1.75, height: 7.2, style: "column" },
      { x: -22.5, z: 22.5, radius: 1.75, height: 7.2, style: "column" },
      { x: 22.5, z: 22.5, radius: 1.75, height: 7.2, style: "column" }
    ],
    platforms: [
      {
        id: "cit_throne",
        x: 0,
        z: 0,
        radius: 8.6,
        height: 0.85,
        color: "#313B4F",
        trimColor: "#E6B85C",
        label: "\u0645\u0646\u0635\u0629 \u0627\u0644\u062A\u0627\u062C (+12% \u0636\u0631\u0631)"
      },
      {
        id: "cit_bastion_n",
        x: 0,
        z: -31.5,
        radius: 6,
        height: 0.65,
        color: "#2A3346",
        trimColor: "#38BDF8"
      },
      {
        id: "cit_bastion_e",
        x: 33.5,
        z: 0,
        radius: 5.2,
        height: 0.6,
        color: "#2A3346",
        trimColor: "#38BDF8"
      },
      {
        id: "cit_bastion_w",
        x: -33.5,
        z: 0,
        radius: 5.2,
        height: 0.6,
        color: "#2A3346",
        trimColor: "#10B981"
      }
    ],
    terrainZones: [
      {
        id: "cit_rune",
        x: 0,
        z: 29.5,
        radius: 5.8,
        kind: "rune_pad",
        label: "\u062D\u0644\u0642\u0629 \u0627\u0644\u062A\u0633\u0627\u0631\u0639",
        color: "#38BDF8"
      }
    ],
    shrines: [
      { id: "obs_heal", x: -33.5, z: 0, kind: "heal", label: "\u0645\u062D\u0631\u0627\u0628 \u0627\u0644\u0627\u0633\u062A\u0634\u0641\u0627\u0621", color: "#10B981" },
      { id: "obs_energy", x: 33.5, z: 0, kind: "energy", label: "\u0628\u0624\u0631\u0629 \u0627\u0644\u0637\u0627\u0642\u0629", color: "#38BDF8" }
    ],
    arches: [
      { x: 0, z: -44.5, rotY: 0, width: 8.8, height: 7.6 },
      { x: 0, z: 44.5, rotY: 0, width: 8.8, height: 7.6 }
    ],
    componentsSummary: [
      { title: "\u0645\u0646\u0635\u0629 \u0627\u0644\u062A\u0627\u062C + 3 \u0634\u0631\u0641\u0627\u062A \u062D\u0635\u0646 (96\u0645)", detail: "\u062A\u0636\u0627\u0631\u064A\u0633 \u0645\u0631\u062A\u0641\u0639\u0629 \u0631\u062D\u0628\u0629 \u062A\u0645\u0646\u062D +12% \u0636\u0631\u0631 \u0648\u0645\u062F\u0649 \u0631\u0624\u064A\u0629 \u0633\u064A\u0627\u062F\u064A." },
      { title: "4 \u0623\u0639\u0645\u062F\u0629 \u0645\u0634\u0627\u0639\u0644 \u0648\u0628\u0648\u0627\u0628\u062A\u0627 \u0646\u0635\u0631", detail: "\u0645\u0635\u062F\u0627\u062A \u0628\u0627\u0632\u0644\u062A\u064A\u0629 \u0645\u062A\u0628\u0627\u0639\u062F\u0629 \u062A\u0633\u0645\u062D \u0628\u0645\u0646\u0627\u0648\u0631\u0627\u062A \u0627\u0644\u0633\u062D\u0631 \u0648\u0627\u0644\u0642\u0648\u0633 \u0648\u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u062D\u0631\u0629." },
      { title: "\u062D\u0644\u0642\u0629 \u062A\u0633\u0627\u0631\u0639 \u0648\u0645\u062D\u0631\u0627\u0628\u0627 \u062F\u0639\u0645", detail: "\u062F\u0627\u0626\u0631\u0629 \u0631\u0648\u0646\u064A\u0629 \u0641\u064A \u0627\u0644\u062C\u0646\u0648\u0628 \u0644\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u0633\u0631\u0639\u0629 \u0648\u0645\u062D\u0631\u0627\u0628\u0627\u0646 \u0645\u062A\u0642\u0627\u0628\u0644\u0627\u0646 \u0644\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0637\u0627\u0642\u0629." }
    ]
  },
  magma_caldera: {
    id: "magma_caldera",
    name: "\u0641\u0648\u0647\u0629 \u0627\u0644\u0628\u0631\u0643\u0627\u0646 \u0627\u0644\u0645\u0644\u062A\u0647\u0628",
    subtitle: "\u0645\u0646\u0635\u0627\u062A \u0623\u0648\u0628\u0633\u064A\u062F\u064A\u0627\u0646 \u0645\u062A\u062F\u0631\u062C\u0629 \u0628\u0642\u0637\u0631 100\u0645 \u0641\u0648\u0642 \u0628\u062D\u064A\u0631\u0627\u062A \u0627\u0644\u062D\u0645\u0645 \u0627\u0644\u0645\u0634\u062A\u0639\u0644\u0629",
    description: "\u0633\u0627\u062D\u0629 \u0628\u0631\u0643\u0627\u0646\u064A\u0629 \u0639\u0645\u0644\u0627\u0642\u0629 \u0628\u0642\u0637\u0631 100\u0645 \u062A\u0636\u0645 \u0642\u0645\u0629 \u0645\u0631\u062A\u0641\u0639\u0629\u060C \u0628\u0631\u0643 \u062D\u0645\u0645 \u0645\u0634\u062A\u0639\u0644\u0629\u060C \u0646\u0648\u0627\u0629 \u063A\u0636\u0628\u060C \u0648\u064A\u0646\u0628\u0648\u0639 \u0635\u0645\u0648\u062F (+28% \u063A\u0646\u0627\u0626\u0645).",
    imagePath: BUNDLED_IMAGES.arenaMagma,
    radius: 50,
    skyTop: "#14090B",
    skyMid: "#3C1612",
    skyHorizon: "#BD4B1E",
    fogColor: "#27110E",
    floorMain: "#231D24",
    floorAlt: "#1A151B",
    floorTrim: "#F97316",
    platformWall: "#120C10",
    pillarColor: "#2E262C",
    pillarAccent: "#FB923C",
    ambientParticleColor: "#FB923C",
    hazardType: "lava_vents",
    rewardMultiplier: 1.28,
    pillars: [
      { x: -24, z: 0, radius: 1.8, height: 7.4, style: "obsidian" },
      { x: 24, z: 0, radius: 1.8, height: 7.4, style: "obsidian" },
      { x: 0, z: -24, radius: 1.8, height: 7.4, style: "obsidian" },
      { x: 0, z: 24, radius: 1.8, height: 7.4, style: "obsidian" }
    ],
    platforms: [
      {
        id: "mag_peak",
        x: 0,
        z: 0,
        radius: 8.2,
        height: 0.95,
        color: "#342529",
        trimColor: "#F97316",
        label: "\u0642\u0645\u0629 \u0627\u0644\u0641\u0648\u0647\u0629 (+12% \u0636\u0631\u0631)"
      },
      {
        id: "mag_ledge_w",
        x: -32,
        z: -16.5,
        radius: 6.2,
        height: 0.7,
        color: "#2C2024",
        trimColor: "#10B981"
      },
      {
        id: "mag_ledge_e",
        x: 32,
        z: 16.5,
        radius: 5.8,
        height: 0.68,
        color: "#2C2024",
        trimColor: "#F59E0B"
      }
    ],
    terrainZones: [
      {
        id: "mag_pool_1",
        x: 19.5,
        z: -19.5,
        radius: 5.5,
        kind: "magma_pool",
        label: "\u0628\u0631\u0643\u0629 \u062D\u0645\u0645",
        color: "#EA580C"
      },
      {
        id: "mag_pool_2",
        x: -19.5,
        z: 19.5,
        radius: 5.5,
        kind: "magma_pool",
        label: "\u0628\u0631\u0643\u0629 \u062D\u0645\u0645",
        color: "#EA580C"
      }
    ],
    shrines: [
      { id: "mag_fury", x: 0, z: 0, kind: "fury", label: "\u0646\u0648\u0627\u0629 \u0627\u0644\u063A\u0636\u0628 \u0627\u0644\u0628\u0631\u0643\u0627\u0646\u064A", color: "#F97316" },
      { id: "mag_heal", x: -32, z: -16.5, kind: "heal", label: "\u064A\u0646\u0628\u0648\u0639 \u0627\u0644\u0635\u0645\u0648\u062F", color: "#10B981" }
    ],
    arches: [
      { x: -46, z: 0, rotY: Math.PI / 2, width: 7.8, height: 7.2 },
      { x: 46, z: 0, rotY: Math.PI / 2, width: 7.8, height: 7.2 }
    ],
    componentsSummary: [
      { title: "\u0642\u0645\u0629 \u0627\u0644\u0641\u0648\u0647\u0629 \u0648\u0627\u0644\u0623\u0631\u0635\u0641\u0629 \u0627\u0644\u0645\u0631\u062A\u0641\u0639\u0629 (100\u0645)", detail: "3 \u0645\u0631\u062A\u0641\u0639\u0627\u062A \u0635\u062E\u0631\u064A\u0629 \u0648\u0627\u0633\u0639\u0629 \u062A\u062D\u0645\u064A\u0643 \u0645\u0646 \u062D\u0645\u0645 \u0627\u0644\u0623\u0631\u0636\u064A\u0629 \u0648\u062A\u0632\u064A\u062F \u0636\u0631\u0631 \u0647\u062C\u0645\u0627\u062A\u0643." },
      { title: "\u0628\u0631\u0643 \u062D\u0645\u0645 \u0648\u0641\u0648\u0647\u0627\u062A \u0645\u062A\u0641\u062C\u0631\u0629", detail: "\u0645\u062E\u0627\u0637\u0631 \u0628\u064A\u0626\u064A\u0629 \u0645\u062A\u0628\u0627\u0639\u062F\u0629 \u062A\u0643\u0627\u0641\u0626 \u0627\u0644\u0645\u0642\u0627\u062A\u0644\u064A\u0646 \u0627\u0644\u062C\u0631\u064A\u0626\u064A\u0646 +28% \u063A\u0646\u0627\u0626\u0645." },
      { title: "4 \u0645\u0633\u0644\u0627\u062A \u0623\u0648\u0628\u0633\u064A\u062F\u064A\u0627\u0646 \u0648\u0628\u0648\u0627\u0628\u062A\u0627\u0646", detail: "\u062A\u063A\u0637\u064A\u0629 \u062A\u0643\u062A\u064A\u0643\u064A\u0629 \u0648\u0627\u0633\u0639\u0629 \u0623\u062B\u0646\u0627\u0621 \u0645\u0648\u062C\u0627\u062A \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u0627\u0644\u0632\u0639\u0645\u0627\u0621." }
    ]
  },
  glacier_spire: {
    id: "glacier_spire",
    name: "\u0642\u0645\u0629 \u0627\u0644\u062C\u0644\u064A\u062F \u0627\u0644\u0623\u0628\u062F\u064A",
    subtitle: "\u0647\u0636\u0628\u0629 \u0628\u0644\u0648\u0631\u064A\u0629 \u0645\u062A\u0631\u0627\u0645\u064A\u0629 \u0628\u0642\u0637\u0631 104\u0645 \u062A\u062D\u062A \u0627\u0644\u0634\u0641\u0642 \u0648\u0628\u062D\u064A\u0631\u0627\u062A \u0635\u0642\u064A\u0639 \u0639\u0627\u0643\u0633\u0629",
    description: "\u0633\u0627\u062D\u0629 \u062C\u0644\u064A\u062F\u064A\u0629 \u0648\u0627\u0633\u0639\u0629 \u0628\u0642\u0637\u0631 104\u0645 \u062A\u0636\u0645 3 \u0634\u0631\u0641\u0627\u062A \u0645\u0631\u062A\u0641\u0639\u0629\u060C \u0628\u062D\u064A\u0631\u062A\u064A \u0635\u0642\u064A\u0639 \u0645\u0633\u0631\u0651\u0639\u062A\u064A\u0646 \u0644\u0644\u062D\u0631\u0643\u0629\u060C \u0648\u0628\u0644\u0648\u0631\u0629 \u0634\u0641\u0642 (+18% \u063A\u0646\u0627\u0626\u0645).",
    imagePath: BUNDLED_IMAGES.arenaGlacier,
    radius: 52,
    skyTop: "#091628",
    skyMid: "#183754",
    skyHorizon: "#5C8EB3",
    fogColor: "#162C44",
    floorMain: "#283F57",
    floorAlt: "#1F3247",
    floorTrim: "#38BDF8",
    platformWall: "#132132",
    pillarColor: "#5683AA",
    pillarAccent: "#BAE6FD",
    ambientParticleColor: "#E0F2FE",
    hazardType: "frost_pulse",
    rewardMultiplier: 1.18,
    pillars: [
      { x: -22.5, z: -22.5, radius: 1.65, height: 7.6, style: "ice" },
      { x: 22.5, z: -22.5, radius: 1.65, height: 7.6, style: "ice" },
      { x: -22.5, z: 22.5, radius: 1.65, height: 7.6, style: "ice" },
      { x: 22.5, z: 22.5, radius: 1.65, height: 7.6, style: "ice" }
    ],
    platforms: [
      {
        id: "ice_dais_c",
        x: 0,
        z: 0,
        radius: 8.4,
        height: 0.82,
        color: "#325270",
        trimColor: "#38BDF8",
        label: "\u0645\u0631\u062A\u0641\u0639 \u0627\u0644\u0634\u0641\u0642 (+12% \u0636\u0631\u0631)"
      },
      {
        id: "ice_dais_s",
        x: 0,
        z: 34,
        radius: 6.2,
        height: 0.62,
        color: "#2D4A66",
        trimColor: "#10B981"
      },
      {
        id: "ice_dais_n",
        x: 0,
        z: -34,
        radius: 6,
        height: 0.62,
        color: "#2D4A66",
        trimColor: "#7DD3FC"
      }
    ],
    terrainZones: [
      {
        id: "ice_patch_w",
        x: -31,
        z: 0,
        radius: 7.2,
        kind: "ice_patch",
        label: "\u062C\u0644\u064A\u062F \u0627\u0644\u0627\u0646\u0632\u0644\u0627\u0642 \u0627\u0644\u0633\u0631\u064A\u0639",
        color: "#7DD3FC"
      },
      {
        id: "ice_patch_e",
        x: 31,
        z: 0,
        radius: 7.2,
        kind: "ice_patch",
        label: "\u062C\u0644\u064A\u062F \u0627\u0644\u0627\u0646\u0632\u0644\u0627\u0642 \u0627\u0644\u0633\u0631\u064A\u0639",
        color: "#7DD3FC"
      }
    ],
    shrines: [
      { id: "ice_energy", x: 0, z: -34, kind: "energy", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0634\u0641\u0642", color: "#38BDF8" },
      { id: "ice_heal", x: 0, z: 34, kind: "heal", label: "\u0642\u0644\u0628 \u0627\u0644\u0635\u0642\u064A\u0639", color: "#10B981" }
    ],
    arches: [
      { x: -48, z: 0, rotY: Math.PI / 2, width: 8, height: 7.4 },
      { x: 48, z: 0, rotY: Math.PI / 2, width: 8, height: 7.4 }
    ],
    componentsSummary: [
      { title: "\u0645\u0631\u062A\u0641\u0639 \u0627\u0644\u0634\u0641\u0642 \u0648\u0627\u0644\u0634\u0631\u0641\u0627\u062A (104\u0645)", detail: "\u062A\u062F\u0631\u0651\u062C\u0627\u062A \u062C\u0644\u064A\u062F\u064A\u0629 \u0648\u0627\u0633\u0639\u0629 \u062A\u0639\u0637\u064A \u0645\u062F\u0649 \u0631\u0624\u064A\u0629 \u0648\u0645\u0646\u0627\u0648\u0631\u0629 \u0645\u062B\u0627\u0644\u064A\u064A\u0646 \u0644\u0644\u0623\u0633\u0644\u062D\u0629 \u0627\u0644\u0628\u0639\u064A\u062F\u0629." },
      { title: "\u0628\u062D\u064A\u0631\u0627\u062A \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0627\u0646\u0632\u0644\u0627\u0642\u064A\u0629", detail: "\u062D\u0644\u0628\u0627\u062A \u062C\u0644\u064A\u062F \u0634\u0631\u0642\u0627\u064B \u0648\u063A\u0631\u0628\u0627\u064B \u062A\u0632\u064A\u062F \u0633\u0631\u0639\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0645\u0631\u0627\u0648\u063A\u0629 +24% \u0641\u0648\u0642\u0647\u0627." },
      { title: "4 \u0628\u0644\u0648\u0631\u0627\u062A \u0634\u0641\u0642\u064A\u0629 \u0639\u0645\u0644\u0627\u0642\u0629", detail: "\u0645\u0635\u062F\u0627\u062A \u062C\u0644\u064A\u062F\u064A\u0629 \u0635\u0627\u0641\u064A\u0629 +18% \u063A\u0646\u0627\u0626\u0645 \u0644\u0644\u0645\u0648\u0627\u062C\u0647\u0627\u062A \u0627\u0644\u062A\u0646\u0627\u0641\u0633\u064A\u0629 \u0648\u0645\u0648\u062C\u0627\u062A \u0627\u0644\u0648\u062D\u0648\u0634." }
    ]
  },
  sunstone_dunes: {
    id: "sunstone_dunes",
    name: "\u0645\u0639\u0628\u062F \u0631\u0645\u0627\u0644 \u0627\u0644\u0634\u0645\u0633",
    subtitle: "\u0641\u0646\u0627\u0621 \u0635\u062D\u0631\u0627\u0648\u064A \u0647\u0627\u0626\u0644 \u0628\u0642\u0637\u0631 112\u0645 \u0648\u0645\u062F\u0631\u062C\u0627\u062A \u0647\u0631\u0645\u064A\u0629 \u0648\u0648\u0627\u062D\u0629 \u0627\u0633\u062A\u0634\u0641\u0627\u0621",
    description: "\u0633\u0627\u062D\u0629 \u0642\u062A\u0627\u0644 \u062D\u0631\u0629 \u0628\u0642\u0637\u0631 112\u0645 \u062A\u0636\u0645 \u0645\u062F\u0631\u062C\u0627\u064B \u0647\u0631\u0645\u064A\u0627\u064B \u0639\u0645\u0644\u0627\u0642\u0627\u064B\u060C \u0648\u0627\u062D\u0629 \u0634\u0641\u0627\u0621 \u0637\u0628\u064A\u0639\u064A\u0629\u060C \u0648\u0645\u0630\u0628\u062D \u0634\u0645\u0633 \u0645\u0639 \u0645\u0633\u0644\u0627\u062A \u0630\u0647\u0628\u064A\u0629 (+15% \u063A\u0646\u0627\u0626\u0645).",
    imagePath: BUNDLED_IMAGES.arenaSunstone,
    radius: 56,
    skyTop: "#1A161F",
    skyMid: "#6E4C2D",
    skyHorizon: "#DFA95F",
    fogColor: "#4E3926",
    floorMain: "#5C4A36",
    floorAlt: "#4C3D2D",
    floorTrim: "#E6B85C",
    platformWall: "#33261A",
    pillarColor: "#9C7E54",
    pillarAccent: "#FDE68A",
    ambientParticleColor: "#FCD34D",
    hazardType: "sand_gust",
    rewardMultiplier: 1.15,
    pillars: [
      { x: -25, z: -16, radius: 1.7, height: 8, style: "obelisk" },
      { x: 25, z: -16, radius: 1.7, height: 8, style: "obelisk" },
      { x: -25, z: 16, radius: 1.7, height: 8, style: "obelisk" },
      { x: 25, z: 16, radius: 1.7, height: 8, style: "obelisk" }
    ],
    platforms: [
      {
        id: "sun_ziggurat",
        x: 0,
        z: 0,
        radius: 10.2,
        height: 0.92,
        color: "#735B40",
        trimColor: "#E6B85C",
        label: "\u0645\u062F\u0631\u062C \u0627\u0644\u0634\u0645\u0633 \u0627\u0644\u0645\u0631\u062A\u0641\u0639 (+12% \u0636\u0631\u0631)"
      },
      {
        id: "sun_altar_w",
        x: -37.5,
        z: 0,
        radius: 6.2,
        height: 0.7,
        color: "#6A533A",
        trimColor: "#F59E0B"
      }
    ],
    terrainZones: [
      {
        id: "sun_oasis",
        x: 37.5,
        z: 0,
        radius: 7.4,
        kind: "healing_spring",
        label: "\u0648\u0627\u062D\u0629 \u0627\u0644\u062A\u062C\u062F\u064A\u062F",
        color: "#10B981"
      }
    ],
    shrines: [
      { id: "sun_fury", x: -37.5, z: 0, kind: "fury", label: "\u0645\u0630\u0628\u062D \u0627\u0644\u0634\u0645\u0633", color: "#F59E0B" },
      { id: "sun_heal", x: 37.5, z: 0, kind: "heal", label: "\u0648\u0627\u062D\u0629 \u0627\u0644\u0645\u0639\u0628\u062F", color: "#10B981" }
    ],
    arches: [
      { x: 0, z: -51.5, rotY: 0, width: 8.8, height: 8 },
      { x: 0, z: 51.5, rotY: 0, width: 8.8, height: 8 }
    ],
    componentsSummary: [
      { title: "\u0645\u062F\u0631\u062C \u0627\u0644\u0634\u0645\u0633 \u0627\u0644\u0639\u0645\u0644\u0627\u0642 \u0648\u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u063A\u0631\u0628\u064A\u0629 (112\u0645)", detail: "\u0645\u0633\u0627\u062D\u0629 \u0642\u062A\u0627\u0644\u064A\u0629 \u0631\u062D\u0628\u0629 \u0628\u0645\u062F\u0631\u062C \u0645\u0631\u0643\u0632\u064A \u0645\u0647\u064A\u0628 \u0648\u0645\u0645\u0631\u0627\u062A \u0627\u0644\u062A\u0641\u0627\u0641 \u0645\u0641\u062A\u0648\u062D\u0629." },
      { title: "\u0648\u0627\u062D\u0629 \u0627\u0644\u0645\u0639\u0628\u062F \u0627\u0644\u0627\u0633\u062A\u0634\u0641\u0627\u0626\u064A\u0629", detail: "\u0646\u0628\u0639 \u0645\u0627\u0626\u064A \u0648\u0627\u0633\u0639 \u064A\u0639\u0627\u0644\u062C \u0635\u062D\u062A\u0643 \u0628\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0642\u062A\u0627\u0644 \u0648\u0627\u0644\u062A\u0646\u0627\u0641\u0633." },
      { title: "4 \u0645\u0633\u0644\u0627\u062A \u0648\u0628\u0648\u0627\u0628\u062A\u0627 \u0634\u0645\u0633", detail: "\u0645\u0639\u0627\u0644\u0645 \u0625\u064A\u0633\u064A\u0643\u0627\u064A \u0635\u062D\u0631\u0627\u0648\u064A\u0629 \u0641\u062E\u0645\u0629 \u062A\u0645\u0646\u062D +15% \u063A\u0646\u0627\u0626\u0645 \u0648\u062A\u062C\u0631\u0628\u0629 \u0642\u062A\u0627\u0644 \u0645\u0641\u062A\u0648\u062D\u0629." }
    ]
  },
  celestial_sanctuary: {
    id: "celestial_sanctuary",
    name: "\u0627\u0644\u062D\u0631\u0645 \u0627\u0644\u0633\u0645\u0627\u0648\u064A \u0627\u0644\u0645\u0639\u0644\u0642",
    subtitle: "\u062C\u0632\u064A\u0631\u0629 \u0631\u062E\u0627\u0645 \u0633\u0645\u0627\u0648\u064A\u0629 \u0628\u0642\u0637\u0631 108\u0645 \u0641\u0648\u0642 \u0627\u0644\u0633\u062D\u0628 \u0628\u062F\u0648\u0627\u0626\u0631 \u0646\u0648\u0631 \u0648\u062A\u0633\u0627\u0631\u0639 \u0631\u0648\u0646\u064A",
    description: "\u0633\u0627\u062D\u0629 \u062C\u062F\u064A\u062F\u0629 \u0641\u0648\u0642 \u0628\u062D\u0631 \u0627\u0644\u063A\u064A\u0648\u0645 \u0628\u0642\u0637\u0631 108\u0645 \u062A\u0636\u0645 \u0631\u0648\u0627\u0642 \u0623\u0639\u0645\u062F\u0629 \u0631\u062E\u0627\u0645\u064A\u0629\u060C \u062D\u0644\u0642\u062A\u064A \u062A\u0633\u0627\u0631\u0639 \u0630\u0647\u0628\u064A\u062A\u064A\u0646\u060C \u0648\u0645\u0646\u0635\u0629 \u0634\u0641\u0627\u0621 \u0645\u0628\u0627\u0631\u0643\u0629 (+22% \u063A\u0646\u0627\u0626\u0645).",
    imagePath: BUNDLED_IMAGES.arenaCelestial,
    radius: 54,
    skyTop: "#0B1E3D",
    skyMid: "#2D609E",
    skyHorizon: "#F3D29A",
    fogColor: "#376294",
    floorMain: "#CBD5E1",
    floorAlt: "#94A3B8",
    floorTrim: "#E6B85C",
    platformWall: "#64748B",
    pillarColor: "#E2E8F0",
    pillarAccent: "#38BDF8",
    ambientParticleColor: "#FDE68A",
    hazardType: "none",
    rewardMultiplier: 1.22,
    pillars: [
      { x: -24, z: -24, radius: 1.55, height: 8, style: "column" },
      { x: 24, z: -24, radius: 1.55, height: 8, style: "column" },
      { x: -24, z: 24, radius: 1.55, height: 8, style: "column" },
      { x: 24, z: 24, radius: 1.55, height: 8, style: "column" },
      { x: 0, z: -34, radius: 1.55, height: 7.2, style: "column" },
      { x: 0, z: 34, radius: 1.55, height: 7.2, style: "column" }
    ],
    platforms: [
      {
        id: "cel_sanctum",
        x: 0,
        z: 0,
        radius: 9.2,
        height: 0.85,
        color: "#E2E8F0",
        trimColor: "#E6B85C",
        label: "\u0645\u0630\u0628\u062D \u0627\u0644\u0646\u0648\u0631 \u0627\u0644\u0639\u0644\u0648\u064A (+12% \u0636\u0631\u0631)"
      },
      {
        id: "cel_wing_e",
        x: 36,
        z: 0,
        radius: 6.4,
        height: 0.65,
        color: "#CBD5E1",
        trimColor: "#38BDF8"
      },
      {
        id: "cel_wing_w",
        x: -36,
        z: 0,
        radius: 6.4,
        height: 0.65,
        color: "#CBD5E1",
        trimColor: "#10B981"
      }
    ],
    terrainZones: [
      {
        id: "cel_rune_n",
        x: 0,
        z: -21,
        radius: 5.5,
        kind: "rune_pad",
        label: "\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0631\u064A\u062D \u0627\u0644\u0633\u0645\u0627\u0648\u064A\u0629",
        color: "#38BDF8"
      },
      {
        id: "cel_spring_s",
        x: 0,
        z: 21,
        radius: 5.5,
        kind: "healing_spring",
        label: "\u0646\u0628\u0639 \u0627\u0644\u063A\u064A\u0648\u0645 \u0627\u0644\u0645\u0628\u0627\u0631\u0643",
        color: "#10B981"
      }
    ],
    shrines: [
      { id: "cel_heal", x: -36, z: 0, kind: "heal", label: "\u0646\u0639\u0645\u0629 \u0627\u0644\u0633\u0645\u0627\u0621", color: "#10B981" },
      { id: "cel_energy", x: 36, z: 0, kind: "energy", label: "\u0645\u0646\u0627\u0631\u0629 \u0627\u0644\u0623\u062B\u064A\u0631", color: "#38BDF8" }
    ],
    arches: [
      { x: 0, z: -49.5, rotY: 0, width: 9.2, height: 8.2 },
      { x: 0, z: 49.5, rotY: 0, width: 9.2, height: 8.2 }
    ],
    componentsSummary: [
      { title: "\u0634\u0631\u0641\u0627\u062A \u0627\u0644\u0631\u062E\u0627\u0645 \u0641\u0648\u0642 \u0627\u0644\u063A\u064A\u0648\u0645 (108\u0645)", detail: "\u0631\u0624\u064A\u0629 \u0645\u0634\u0631\u0642\u0629 \u0635\u0627\u0641\u064A\u0629 \u0645\u0639 6 \u0623\u0639\u0645\u062F\u0629 \u0625\u063A\u0631\u064A\u0642\u064A\u0629 \u062A\u0643\u062A\u064A\u0643\u064A\u0629 \u0648\u0645\u0631\u062A\u0641\u0639\u0627\u062A \u0645\u062A\u0635\u0644\u0629." },
      { title: "\u062F\u0627\u0626\u0631\u0629 \u062A\u0633\u0627\u0631\u0639 + \u0646\u0628\u0639 \u0634\u0641\u0627\u0621", detail: "\u0645\u0648\u0627\u0632\u0646\u0629 \u0647\u062C\u0648\u0645\u064A\u0629 \u0648\u062F\u0641\u0627\u0639\u064A\u0629 \u0645\u062B\u0627\u0644\u064A\u0629 \u0641\u064A \u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0645\u064A\u062F\u0627\u0646." },
      { title: "\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0633\u0645\u0627\u0648\u064A\u0629 +22%", detail: "\u062A\u0645\u0646\u062D \u063A\u0646\u0627\u0626\u0645 \u0648\u0630\u0647\u0628 \u0625\u0636\u0627\u0641\u064A \u0641\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0627\u0644\u0641\u0631\u062F\u064A\u0629 \u0648\u0627\u0644\u062C\u0645\u0627\u0639\u064A\u0629." }
    ]
  },
  abyssal_colosseum: {
    id: "abyssal_colosseum",
    name: "\u0643\u0648\u0644\u0648\u0633\u064A\u0648\u0645 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0645\u0638\u0644\u0645",
    subtitle: "\u0623\u0639\u0638\u0645 \u062D\u0644\u0628\u0629 \u0642\u062A\u0627\u0644 \u0623\u0633\u0637\u0648\u0631\u064A\u0629 \u0628\u0642\u0637\u0631 120\u0645 \u0648\u0633\u0637 \u0643\u0647\u0641 \u0627\u0644\u062C\u0645\u0634\u062A \u0648\u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629",
    description: "\u0623\u0636\u062E\u0645 \u0633\u0627\u062D\u0629 \u0645\u0639\u0627\u0631\u0643 \u0641\u064A \u0627\u0644\u0644\u0639\u0628\u0629 \u0628\u0642\u0637\u0631 120\u0645! \u062A\u0636\u0645 4 \u0634\u0631\u0641\u0627\u062A \u0643\u0631\u064A\u0633\u062A\u0627\u0644\u060C \u0645\u0633\u0644\u0627\u062A \u0647\u0627\u0648\u064A\u0629 \u0639\u0627\u0626\u0645\u0629\u060C \u0645\u062D\u0631\u0627\u0628\u064A \u063A\u0636\u0628 \u0648\u0634\u0641\u0627\u060C \u0648\u0645\u0636\u0627\u0639\u0641 \u063A\u0646\u0627\u0626\u0645 +35%.",
    imagePath: BUNDLED_IMAGES.arenaAbyssal,
    radius: 60,
    skyTop: "#070412",
    skyMid: "#1C113A",
    skyHorizon: "#5B21B6",
    fogColor: "#160D2B",
    floorMain: "#1E1B2E",
    floorAlt: "#151324",
    floorTrim: "#A855F7",
    platformWall: "#0C0A17",
    pillarColor: "#2E264D",
    pillarAccent: "#C084FC",
    ambientParticleColor: "#C084FC",
    hazardType: "frost_pulse",
    rewardMultiplier: 1.35,
    pillars: [
      { x: -27, z: -27, radius: 1.85, height: 8.6, style: "obsidian" },
      { x: 27, z: -27, radius: 1.85, height: 8.6, style: "obsidian" },
      { x: -27, z: 27, radius: 1.85, height: 8.6, style: "obsidian" },
      { x: 27, z: 27, radius: 1.85, height: 8.6, style: "obsidian" }
    ],
    platforms: [
      {
        id: "aby_core",
        x: 0,
        z: 0,
        radius: 11,
        height: 1,
        color: "#2A2247",
        trimColor: "#A855F7",
        label: "\u0639\u0631\u0634 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A (+12% \u0636\u0631\u0631)"
      },
      {
        id: "aby_n",
        x: 0,
        z: -41,
        radius: 6.8,
        height: 0.72,
        color: "#231C3B",
        trimColor: "#38BDF8"
      },
      {
        id: "aby_s",
        x: 0,
        z: 41,
        radius: 6.8,
        height: 0.72,
        color: "#231C3B",
        trimColor: "#F59E0B"
      }
    ],
    terrainZones: [
      {
        id: "aby_rune_w",
        x: -39,
        z: 0,
        radius: 6.8,
        kind: "rune_pad",
        label: "\u0645\u0645\u0631 \u0627\u0644\u0628\u0639\u062F \u0627\u0644\u0633\u0631\u064A\u0639",
        color: "#A855F7"
      },
      {
        id: "aby_rune_e",
        x: 39,
        z: 0,
        radius: 6.8,
        kind: "rune_pad",
        label: "\u0645\u0645\u0631 \u0627\u0644\u0628\u0639\u062F \u0627\u0644\u0633\u0631\u064A\u0639",
        color: "#38BDF8"
      }
    ],
    shrines: [
      { id: "aby_fury", x: 0, z: 41, kind: "fury", label: "\u0645\u0630\u0628\u062D \u0627\u0644\u0639\u0645\u0644\u0627\u0642", color: "#F59E0B" },
      { id: "aby_energy", x: 0, z: -41, kind: "energy", label: "\u0642\u0644\u0628 \u0627\u0644\u062C\u0645\u0634\u062A", color: "#C084FC" },
      { id: "aby_heal", x: -39, z: 0, kind: "heal", label: "\u064A\u0646\u0628\u0648\u0639 \u0627\u0644\u0623\u062B\u064A\u0631", color: "#10B981" }
    ],
    arches: [
      { x: -55, z: 0, rotY: Math.PI / 2, width: 9, height: 8.6 },
      { x: 55, z: 0, rotY: Math.PI / 2, width: 9, height: 8.6 }
    ],
    componentsSummary: [
      { title: "\u0643\u0648\u0644\u0648\u0633\u064A\u0648\u0645 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0628\u0642\u0637\u0631 120 \u0645\u062A\u0631", detail: "\u0623\u0648\u0633\u0639 \u0645\u064A\u062F\u0627\u0646 \u0645\u0639\u0627\u0631\u0643 \u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0623\u0642\u0635\u0649 \u0645\u0647\u0627\u0631\u0627\u062A\u0643 \u0636\u062F \u0623\u0633\u0631\u0627\u0628 \u0627\u0644\u0648\u062D\u0648\u0634 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629." },
      { title: "\u062B\u0644\u0627\u062B\u0629 \u0645\u062D\u0627\u0631\u064A\u0628 \u0648\u0645\u0645\u0631\u0627 \u062A\u0633\u0627\u0631\u0639", detail: "\u062F\u0639\u0645 \u0645\u0633\u062A\u0645\u0631 \u0644\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u063A\u0636\u0628 \u0648\u0627\u0644\u0637\u0627\u0642\u0629 \u0644\u062A\u0633\u0647\u064A\u0644 \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u0645\u0644\u062D\u0645\u064A \u0627\u0644\u0637\u0648\u064A\u0644." },
      { title: "\u0623\u0639\u0644\u0649 \u0639\u0627\u0626\u062F \u063A\u0646\u0627\u0626\u0645 (+35%)", detail: "\u0645\u062B\u0627\u0644\u064A \u0644\u062C\u0645\u0639 \u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u062C\u0648\u0627\u0647\u0631 \u0627\u0644\u0633\u0631\u064A\u0639 \u0648\u062A\u062D\u062F\u064A \u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629." }
    ]
  }
};
export const ARENA_LIST = Object.values(ARENAS);
export const NPC_JOBS = {
  job_herbs: {
    id: "job_herbs",
    npcId: "npc_lyra",
    title: "\u062C\u0645\u0639 \u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0642\u0645\u0631 \u0644\u0644\u062E\u064A\u0645\u064A\u0627\u0621",
    description: "\u0627\u062C\u0645\u0639 3 \u0645\u0646 \u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0642\u0645\u0631 \u0627\u0644\u0645\u0646\u062A\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u0645\u0631\u062C \u0627\u0644\u0647\u0627\u0645\u0633 \u0648\u063A\u0627\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F \u0644\u0625\u0639\u062F\u0627\u062F \u062C\u0631\u0639\u0627\u062A \u0627\u0644\u0634\u0641\u0627\u0621.",
    kind: "gather_herb",
    target: 3,
    rewardGold: 220,
    rewardGuildMarks: 4,
    rewardGems: 4,
    rewardXp: 150
  },
  job_ores: {
    id: "job_ores",
    npcId: "npc_bronn",
    title: "\u062A\u0639\u062F\u064A\u0646 \u062E\u0627\u0645 \u0627\u0644\u0623\u0648\u0631\u064A\u0643\u0627\u0644\u0643\u0648\u0645",
    description: "\u0627\u0633\u062A\u062E\u0631\u062C 3 \u0642\u0637\u0639 \u0645\u0646 \u062E\u0627\u0645 \u0627\u0644\u062D\u062F\u064A\u062F \u0648\u0627\u0644\u0645\u0639\u062F\u0646 \u0627\u0644\u0646\u0627\u062F\u0631 \u0642\u0631\u0628 \u0636\u0641\u0627\u0641 \u0627\u0644\u0646\u0647\u0631 \u0627\u0644\u0641\u0636\u064A \u0648\u0647\u0636\u0628\u0629 \u0627\u0644\u062A\u0646\u064A\u0646.",
    kind: "gather_ore",
    target: 3,
    rewardGold: 260,
    rewardGuildMarks: 5,
    rewardGems: 5,
    rewardXp: 180
  },
  job_crystals: {
    id: "job_crystals",
    npcId: "npc_salim",
    title: "\u0634\u062D\u0646 \u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u062B\u064A\u0631 \u0644\u0644\u0642\u0627\u0641\u0644\u0629",
    description: "\u0627\u062C\u0645\u0639 3 \u0628\u0644\u0648\u0631\u0627\u062A \u0623\u062B\u064A\u0631 \u0645\u062A\u0648\u0647\u062C\u0629 \u0645\u0646 \u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644 \u0648\u0645\u0631\u0635\u062F \u0627\u0644\u0646\u062C\u0648\u0645 \u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0642\u0627\u0641\u0644\u0629.",
    kind: "gather_crystal",
    target: 3,
    rewardGold: 300,
    rewardGuildMarks: 6,
    rewardGems: 6,
    rewardXp: 210
  },
  job_monsters: {
    id: "job_monsters",
    npcId: "npc_kael",
    title: "\u0639\u0642\u062F \u0627\u0644\u0646\u0642\u0627\u0628\u0629: \u062A\u0637\u0647\u064A\u0631 \u0627\u0644\u0637\u0631\u0642 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629",
    description: "\u0627\u0642\u0636\u0650 \u0639\u0644\u0649 6 \u0648\u062D\u0648\u0634 \u0628\u0631\u064A\u0629 \u0641\u064A \u0623\u0642\u0627\u0644\u064A\u0645 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0642\u0648\u0627\u0641\u0644 \u0627\u0644\u0645\u0633\u0627\u0644\u0645\u0629.",
    kind: "hunt_monsters",
    target: 6,
    rewardGold: 340,
    rewardGuildMarks: 7,
    rewardGems: 7,
    rewardXp: 240
  },
  job_explore: {
    id: "job_explore",
    npcId: "npc_orion",
    title: "\u0631\u0633\u0645 \u062E\u0631\u0627\u0626\u0637 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u062A\u0633\u0639\u0629",
    description: "\u0627\u0643\u062A\u0634\u0641 4 \u0623\u0642\u0627\u0644\u064A\u0645 \u0645\u062E\u062A\u0644\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u0633\u0641\u0631 \u0623\u0648 \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u062F\u0627\u062E\u0644 \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0643\u0628\u0631\u0649.",
    kind: "explore_regions",
    target: 4,
    rewardGold: 380,
    rewardGuildMarks: 8,
    rewardGems: 10,
    rewardXp: 280
  }
};
export const NPC_JOB_LIST = Object.values(NPC_JOBS);
function generateOverworldScenery() {
  const props = [
    // Haven Village Central Sanctuary (0,0)
    { id: "fountain_main", kind: "fountain", x: 0, z: 0, scale: 1.4 },
    { id: "house_nw", kind: "cottage", x: -16, z: -14, scale: 1.25, rotY: 0.75, color: "#D8CFC2", accentColor: "#991B1B" },
    { id: "house_ne", kind: "cottage", x: 16, z: -14, scale: 1.2, rotY: -0.75, color: "#D8CFC2", accentColor: "#1D4E7A" },
    { id: "house_sw", kind: "cottage", x: -16, z: 14, scale: 1.15, rotY: 2.35, color: "#CBBFA9", accentColor: "#B45309" },
    { id: "house_se", kind: "cottage", x: 16, z: 14, scale: 1.15, rotY: -2.35, color: "#D8CFC2", accentColor: "#0F6A52" },
    { id: "house_guild", kind: "cottage", x: 0, z: -23, scale: 1.45, rotY: 0, color: "#E2D9C8", accentColor: "#C9841A" },
    { id: "camp_orion", kind: "campfire", x: 7.5, z: -6.5, scale: 1.05 },
    { id: "camp_bronn", kind: "campfire", x: -12.5, z: 5.5, scale: 1.15 }
  ];
  for (let i = 0; i < 26; i++) {
    const a = i / 26 * Math.PI * 2;
    const dist = 58 + i % 4 * 26;
    props.push({
      id: `meadow_tree_${i}`,
      kind: "pine_tree",
      x: Math.round(Math.cos(a) * dist),
      z: Math.round(Math.sin(a) * dist - 40),
      scale: 1.25 + i % 3 * 0.2
    });
  }
  for (let i = 0; i < 42; i++) {
    const a = i * 2.39996;
    const r = 18 + Math.sqrt(i + 1) * 18;
    props.push({
      id: `forest_tree_${i}`,
      kind: i % 9 === 0 ? "campfire" : "pine_tree",
      x: Math.round(-180 + Math.cos(a) * r),
      z: Math.round(-340 + Math.sin(a) * r),
      scale: 1.35 + i % 4 * 0.2
    });
  }
  for (let i = 0; i < 18; i++) {
    const a = i * 1.9;
    const r = 16 + i % 6 * 16;
    props.push({
      id: `river_prop_${i}`,
      kind: i % 2 === 0 ? "boulder" : "pine_tree",
      x: Math.round(175 + Math.cos(a) * r),
      z: Math.round(-240 + Math.sin(a) * r),
      scale: 1.3 + i % 3 * 0.25,
      color: i % 2 === 0 ? "#64748B" : void 0
    });
  }
  for (let i = 0; i < 20; i++) {
    const a = i / 20 * Math.PI * 2;
    const r = 20 + i % 3 * 32;
    props.push({
      id: `ruin_prop_${i}`,
      kind: i % 5 === 0 ? "boulder" : "ruin_pillar",
      x: Math.round(360 + Math.cos(a) * r),
      z: Math.round(-40 + Math.sin(a) * r),
      scale: 1.25 + i % 3 * 0.2
    });
  }
  for (let i = 0; i < 22; i++) {
    const a = i / 22 * Math.PI * 2;
    const r = 24 + i % 4 * 24;
    props.push({
      id: `lake_prop_${i}`,
      kind: i % 2 === 0 ? "crystal_cluster" : "pine_tree",
      x: Math.round(40 + Math.cos(a) * r),
      z: Math.round(340 + Math.sin(a) * r),
      scale: 1.35 + i % 3 * 0.2,
      color: i % 2 === 0 ? "#38BDF8" : void 0
    });
  }
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2;
    const r = 22 + i % 3 * 26;
    props.push({
      id: `arc_prop_${i}`,
      kind: i % 3 === 0 ? "ruin_pillar" : "crystal_cluster",
      x: Math.round(310 + Math.cos(a) * r),
      z: Math.round(290 + Math.sin(a) * r),
      scale: 1.4,
      color: "#A855F7"
    });
  }
  for (let i = 0; i < 24; i++) {
    const a = i * 2.1;
    const r = 20 + i % 5 * 24;
    props.push({
      id: `dragon_prop_${i}`,
      kind: i % 6 === 0 ? "campfire" : "boulder",
      x: Math.round(-390 + Math.cos(a) * r),
      z: Math.round(60 + Math.sin(a) * r),
      scale: 1.45 + i % 3 * 0.25,
      color: "#3A2A2D"
    });
  }
  for (let i = 0; i < 20; i++) {
    const a = i * 1.7;
    const r = 20 + i % 4 * 26;
    props.push({
      id: `frost_prop_${i}`,
      kind: i % 2 === 0 ? "crystal_cluster" : "boulder",
      x: Math.round(-280 + Math.cos(a) * r),
      z: Math.round(-440 + Math.sin(a) * r),
      scale: 1.45,
      color: i % 2 === 0 ? "#7DD3FC" : "#475569"
    });
  }
  return props;
}
const OVERWORLD_NODES = [
  // Herbs in Whispering Meadow & Emerald Forest
  { id: "node_herb_1", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0642\u0645\u0631", x: -18, z: -72, regionId: "whispering_meadow", color: "#10B981" },
  { id: "node_herb_2", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0642\u0645\u0631", x: 24, z: -115, regionId: "whispering_meadow", color: "#10B981" },
  { id: "node_herb_3", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0642\u0645\u0631", x: -45, z: -158, regionId: "whispering_meadow", color: "#22C55E" },
  { id: "node_herb_4", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F", x: -140, z: -280, regionId: "emerald_forest", color: "#22C55E" },
  { id: "node_herb_5", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F", x: -205, z: -365, regionId: "emerald_forest", color: "#10B981" },
  { id: "node_herb_6", kind: "herb", label: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F", x: -120, z: -380, regionId: "emerald_forest", color: "#34D399" },
  // Ores in Silver River & Dragon Ridge
  { id: "node_ore_1", kind: "ore", label: "\u062E\u0627\u0645 \u0627\u0644\u0641\u0636\u0629", x: 135, z: -180, regionId: "silver_river", color: "#F59E0B" },
  { id: "node_ore_2", kind: "ore", label: "\u062E\u0627\u0645 \u0627\u0644\u0641\u0636\u0629", x: 195, z: -250, regionId: "silver_river", color: "#FBBF24" },
  { id: "node_ore_3", kind: "ore", label: "\u062E\u0627\u0645 \u0627\u0644\u0641\u0636\u0629", x: 215, z: -210, regionId: "silver_river", color: "#F59E0B" },
  { id: "node_ore_4", kind: "ore", label: "\u062E\u0627\u0645 \u0627\u0644\u062A\u0646\u064A\u0646", x: -330, z: 35, regionId: "dragon_ridge", color: "#F97316" },
  { id: "node_ore_5", kind: "ore", label: "\u062E\u0627\u0645 \u0627\u0644\u062A\u0646\u064A\u0646", x: -410, z: 85, regionId: "dragon_ridge", color: "#FB923C" },
  { id: "node_ore_6", kind: "ore", label: "\u062E\u0627\u0645 \u0623\u0637\u0644\u0627\u0644", x: 320, z: -20, regionId: "forgotten_ruins", color: "#E6B85C" },
  // Crystals in Crystal Lake, Arcane Observatory & Frost Peaks
  { id: "node_crys_1", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644", x: 15, z: 265, regionId: "crystal_lake", color: "#38BDF8" },
  { id: "node_crys_2", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644", x: 75, z: 360, regionId: "crystal_lake", color: "#7DD3FC" },
  { id: "node_crys_3", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644", x: -30, z: 380, regionId: "crystal_lake", color: "#38BDF8" },
  { id: "node_crys_4", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0623\u062B\u064A\u0631", x: 280, z: 255, regionId: "arcane_observatory", color: "#A855F7" },
  { id: "node_crys_5", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0623\u062B\u064A\u0631", x: 340, z: 320, regionId: "arcane_observatory", color: "#C084FC" },
  { id: "node_crys_6", kind: "crystal", label: "\u0628\u0644\u0648\u0631\u0629 \u0627\u0644\u0635\u0642\u064A\u0639", x: -260, z: -410, regionId: "frost_peaks", color: "#7DD3FC" }
];
export const OVERWORLD_MAP = {
  id: "etheria_overworld",
  name: "\u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0639\u0638\u0645\u0649 (\u0628\u062B \u0642\u0637\u0627\u0639\u0627\u062A 14,000\u0645)",
  subtitle: "\u0639\u0627\u0644\u0645 \u0625\u064A\u0633\u064A\u0643\u0627\u064A \u0645\u062A\u062F\u0641\u0642 100 \u0636\u0639\u0641 (\u0642\u0637\u0631 14,000\u0645): \u062A\u062D\u0645\u064A\u0644 \u0630\u0643\u064A \u0644\u0644\u0642\u0637\u0627\u0639\u0627\u062A\u060C 9 \u0623\u0642\u0627\u0644\u064A\u0645\u060C 5 \u0634\u062E\u0635\u064A\u0627\u062A \u0645\u0633\u0627\u0644\u0645\u0629\u060C \u0648\u0646\u0642\u0627\u0637 \u0627\u0646\u062A\u0642\u0627\u0644 \u0633\u0631\u064A\u0639\u0629",
  description: "\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0628\u0628\u062B \u0627\u0644\u0642\u0637\u0627\u0639\u0627\u062A (Chunked World Loading) \u0628\u0642\u0637\u0631 14,000 \u0645\u062A\u0631! \u062A\u062D\u0645\u0651\u0644 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0639\u0646\u062F \u0627\u0644\u0627\u0642\u062A\u0631\u0627\u0628 \u0641\u0642\u0637 \u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0636\u0639\u064A\u0641\u0629\u060C \u0648\u062A\u0636\u0645 \u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630 \u06485 \u0634\u062E\u0635\u064A\u0627\u062A \u0645\u0633\u0627\u0644\u0645\u0629 \u0648\u0623\u0642\u0627\u0644\u064A\u0645 \u0648\u063A\u0627\u0628\u0627\u062A \u0648\u0643\u0646\u0648\u0632\u0627\u064B \u0644\u0627 \u062A\u0646\u062A\u0647\u064A.",
  imagePath: BUNDLED_IMAGES.worldEtheria,
  radius: 7e3,
  isOverworld: true,
  skyTop: "#071124",
  skyMid: "#18365C",
  skyHorizon: "#8CC4D6",
  fogColor: "#172E47",
  floorMain: "#284538",
  floorAlt: "#213B30",
  floorTrim: "#E6B85C",
  platformWall: "#152026",
  pillarColor: "#566478",
  pillarAccent: "#38BDF8",
  ambientParticleColor: "#FDE68A",
  hazardType: "none",
  rewardMultiplier: 1.25,
  pillars: [
    { x: 350, z: -45, radius: 1.6, height: 6.8, style: "column" },
    { x: 372, z: -28, radius: 1.6, height: 5.8, style: "column" },
    { x: 345, z: -15, radius: 1.6, height: 7.2, style: "column" },
    { x: -378, z: 52, radius: 1.75, height: 6.8, style: "obsidian" },
    { x: -402, z: 75, radius: 1.75, height: 7.4, style: "obsidian" },
    { x: 300, z: 278, radius: 1.5, height: 7, style: "ice" },
    { x: 324, z: 302, radius: 1.5, height: 7, style: "ice" }
  ],
  platforms: [
    {
      id: "ow_plaza",
      x: 0,
      z: 0,
      radius: 13.5,
      height: 0.48,
      color: "#465264",
      trimColor: "#E6B85C",
      label: "\u0633\u0627\u062D\u0629 \u0645\u0644\u0627\u0630 \u0627\u0644\u0645\u0633\u0627\u0641\u0631\u064A\u0646 \u0648\u0646\u0642\u0627\u0628\u0629 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u064A\u0646"
    },
    {
      id: "ow_meadow_outpost",
      x: 0,
      z: -145,
      radius: 11,
      height: 0.52,
      color: "#3D5248",
      trimColor: "#10B981",
      label: "\u0628\u0633\u062A\u0627\u0646 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0647\u0627\u062F\u0626"
    },
    {
      id: "ow_ruins_dais",
      x: 360,
      z: -40,
      radius: 14,
      height: 0.72,
      color: "#3F4A5C",
      trimColor: "#38BDF8",
      label: "\u0623\u0637\u0644\u0627\u0644 \u0627\u0644\u0628\u0631\u062C \u0627\u0644\u0645\u0646\u0633\u064A"
    },
    {
      id: "ow_dragon_ridge",
      x: -390,
      z: 60,
      radius: 15,
      height: 1,
      color: "#3D2B2F",
      trimColor: "#F97316",
      label: "\u0647\u0636\u0628\u0629 \u0627\u0644\u062A\u0646\u064A\u0646 (+12% \u0636\u0631\u0631)"
    },
    {
      id: "ow_lake_pier",
      x: 40,
      z: 300,
      radius: 8.5,
      height: 0.55,
      color: "#6E5338",
      trimColor: "#38BDF8",
      label: "\u0631\u0635\u064A\u0641 \u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644"
    },
    {
      id: "ow_observatory_dais",
      x: 310,
      z: 290,
      radius: 12,
      height: 0.8,
      color: "#2F2747",
      trimColor: "#A855F7",
      label: "\u0645\u0631\u0635\u062F \u0627\u0644\u0646\u062C\u0648\u0645 \u0627\u0644\u0633\u062D\u0631\u064A"
    }
  ],
  terrainZones: [
    {
      id: "ow_haven_spring",
      x: 0,
      z: 0,
      radius: 9.5,
      kind: "healing_spring",
      label: "\u0646\u0627\u0641\u0648\u0631\u0629 \u0627\u0644\u062A\u062C\u062F\u064A\u062F \u0627\u0644\u0622\u0645\u0646\u0629",
      color: "#10B981"
    },
    {
      id: "ow_meadow_zone",
      x: 0,
      z: -145,
      radius: 46,
      kind: "meadow",
      label: "\u0627\u0644\u0645\u0631\u062C \u0627\u0644\u0647\u0627\u0645\u0633",
      color: "#22C55E"
    },
    {
      id: "ow_forest_meadow",
      x: -180,
      z: -340,
      radius: 65,
      kind: "meadow",
      label: "\u063A\u0627\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F \u0627\u0644\u0639\u0638\u0645\u0649",
      color: "#10B981"
    },
    {
      id: "ow_crystal_water",
      x: 40,
      z: 345,
      radius: 58,
      kind: "water_lake",
      label: "\u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644",
      color: "#0EA5E9"
    },
    {
      id: "ow_dragon_ash",
      x: -390,
      z: 60,
      radius: 62,
      kind: "ash_land",
      label: "\u0623\u0631\u0636 \u0627\u0644\u0631\u0645\u0627\u062F \u0627\u0644\u0628\u0631\u0643\u0627\u0646\u064A",
      color: "#F97316"
    },
    {
      id: "ow_speed_road_n",
      x: 0,
      z: -72,
      radius: 8.5,
      kind: "rune_pad",
      label: "\u062F\u0631\u0628 \u0627\u0644\u0633\u0641\u0631 \u0627\u0644\u0633\u0631\u064A\u0639 \u0627\u0644\u0634\u0645\u0627\u0644\u064A",
      color: "#38BDF8"
    },
    {
      id: "ow_speed_road_e",
      x: 175,
      z: -20,
      radius: 9.5,
      kind: "rune_pad",
      label: "\u062F\u0631\u0628 \u0627\u0644\u0642\u0627\u0641\u0644\u0629 \u0627\u0644\u0634\u0631\u0642\u064A",
      color: "#E6B85C"
    }
  ],
  shrines: [
    { id: "ow_shrine_n", x: 0, z: -138, kind: "energy", label: "\u0645\u0646\u0627\u0631\u0629 \u0627\u0644\u0645\u0631\u062C", color: "#38BDF8" },
    { id: "ow_shrine_f", x: -180, z: -320, kind: "heal", label: "\u064A\u0646\u0628\u0648\u0639 \u0627\u0644\u0632\u0645\u0631\u062F", color: "#10B981" },
    { id: "ow_shrine_s", x: 40, z: 295, kind: "heal", label: "\u064A\u0646\u0628\u0648\u0639 \u0627\u0644\u0628\u062D\u064A\u0631\u0629", color: "#10B981" },
    { id: "ow_shrine_w", x: -340, z: 58, kind: "fury", label: "\u0646\u0635\u0628 \u0627\u0644\u0642\u0648\u0629", color: "#F59E0B" },
    { id: "ow_shrine_e", x: 335, z: -38, kind: "energy", label: "\u0645\u0633\u0644\u0629 \u0627\u0644\u0623\u0637\u0644\u0627\u0644", color: "#38BDF8" }
  ],
  arches: [
    { x: 0, z: -32, rotY: 0, width: 7.2, height: 6.2 },
    { x: 32, z: 0, rotY: Math.PI / 2, width: 7.2, height: 6.2 },
    { x: 0, z: 32, rotY: 0, width: 7.2, height: 6.2 },
    { x: -32, z: 0, rotY: Math.PI / 2, width: 7.2, height: 6.2 }
  ],
  regions: [
    {
      id: "haven_village",
      name: "\u0642\u0631\u064A\u0629 \u0645\u0644\u0627\u0630 \u0627\u0644\u0645\u0633\u0627\u0641\u0631\u064A\u0646 (\u0645\u0646\u0637\u0642\u0629 \u0622\u0645\u0646\u0629)",
      subtitle: "\u0627\u0644\u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629\u060C \u0645\u0628\u0646\u0649 \u0646\u0642\u0627\u0628\u0629 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u064A\u0646\u060C 5 \u0634\u062E\u0635\u064A\u0627\u062A \u0645\u0633\u0627\u0644\u0645\u0629\u060C \u0648\u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u0633\u0627\u062D\u0627\u062A \u0627\u0644\u0633\u062A",
      x: 0,
      z: 0,
      radius: 42,
      color: "#E6B85C",
      safeZone: true,
      rewardGold: 80,
      rewardXp: 90
    },
    {
      id: "whispering_meadow",
      name: "\u0627\u0644\u0645\u0631\u062C \u0627\u0644\u0647\u0627\u0645\u0633",
      subtitle: "\u0645\u0631\u0648\u062C \u0639\u0634\u0628\u064A\u0629 \u0647\u0627\u062F\u0626\u0629 \u063A\u0646\u064A\u0629 \u0628\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0642\u0645\u0631 \u0644\u0644\u062E\u064A\u0645\u064A\u0627\u0621 \u0648\u0628\u0639\u0636 \u0630\u0626\u0627\u0628 \u0627\u0644\u0631\u0645\u0627\u062F",
      x: 0,
      z: -145,
      radius: 95,
      color: "#22C55E",
      monsterPool: ["ash_stalker", "ember_imp"],
      rewardGold: 110,
      rewardXp: 120
    },
    {
      id: "emerald_forest",
      name: "\u063A\u0627\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F \u0627\u0644\u0634\u0645\u0627\u0644\u064A\u0629",
      subtitle: "\u063A\u0627\u0628\u0629 \u0635\u0646\u0648\u0628\u0631 \u0645\u062A\u0631\u0627\u0645\u064A\u0629 \u0627\u0644\u0623\u0637\u0631\u0627\u0641\u060C \u0645\u0648\u0627\u0631\u062F \u0639\u0634\u0628\u064A\u0629 \u0646\u0627\u062F\u0631\u0629\u060C \u0648\u0632\u0648\u0627\u062D\u0641 \u0627\u0644\u0633\u0645\u0648\u0645",
      x: -180,
      z: -340,
      radius: 145,
      color: "#10B981",
      monsterPool: ["ash_stalker", "venom_crawler", "ember_imp"],
      rewardGold: 150,
      rewardXp: 160
    },
    {
      id: "silver_river",
      name: "\u0636\u0641\u0627\u0641 \u0627\u0644\u0646\u0647\u0631 \u0627\u0644\u0641\u0636\u064A \u0648\u0627\u0644\u0645\u0646\u0627\u062C\u0645",
      subtitle: "\u0648\u0627\u062F\u064A \u062A\u0639\u062F\u064A\u0646 \u0648\u0627\u0633\u0639 \u063A\u0646\u064A \u0628\u062E\u0627\u0645\u0627\u062A \u0627\u0644\u0641\u0636\u0629 \u0648\u0627\u0644\u062D\u062F\u064A\u062F \u0644\u062D\u0631\u0641\u0629 \u0627\u0644\u062D\u062F\u0627\u062F\u0629",
      x: 175,
      z: -240,
      radius: 120,
      color: "#F59E0B",
      monsterPool: ["obsidian_golem", "ash_stalker", "venom_crawler"],
      rewardGold: 165,
      rewardXp: 175
    },
    {
      id: "forgotten_ruins",
      name: "\u0623\u0637\u0644\u0627\u0644 \u0627\u0644\u0625\u0645\u0628\u0631\u0627\u0637\u0648\u0631\u064A\u0629 \u0627\u0644\u0645\u0646\u0633\u064A\u0629",
      subtitle: "\u0628\u0642\u0627\u064A\u0627 \u0645\u0639\u0628\u062F \u0642\u062F\u064A\u0645 \u0645\u062A\u0631\u0627\u0645\u064D \u064A\u062D\u0631\u0633\u0647 \u0623\u0634\u0628\u0627\u062D \u0627\u0644\u0646\u0635\u0644 \u0648\u062D\u0631\u0627\u0633 \u0627\u0644\u0628\u0627\u0632\u0644\u062A",
      x: 360,
      z: -40,
      radius: 140,
      color: "#38BDF8",
      monsterPool: ["wraith_knight", "obsidian_golem", "ash_stalker"],
      rewardGold: 190,
      rewardXp: 210
    },
    {
      id: "crystal_lake",
      name: "\u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644 \u0627\u0644\u062C\u0646\u0648\u0628\u064A\u0629",
      subtitle: "\u0628\u062D\u064A\u0631\u0629 \u0634\u0641\u0642\u064A\u0629 \u0635\u0627\u0641\u064A\u0629 \u063A\u0646\u064A\u0629 \u0628\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u062B\u064A\u0631 \u0648\u0623\u0637\u064A\u0627\u0641 \u0627\u0644\u0635\u0642\u064A\u0639",
      x: 40,
      z: 340,
      radius: 145,
      color: "#0EA5E9",
      monsterPool: ["frost_specter", "venom_crawler"],
      rewardGold: 175,
      rewardXp: 190
    },
    {
      id: "arcane_observatory",
      name: "\u0645\u0631\u0635\u062F \u0627\u0644\u0646\u062C\u0648\u0645 \u0627\u0644\u0633\u062D\u0631\u064A",
      subtitle: "\u0645\u062C\u0645\u0639 \u0641\u0644\u0643\u064A \u0639\u0631\u064A\u0642 \u064A\u0641\u064A\u0636 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0623\u062B\u064A\u0631 \u0648\u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629 \u0627\u0644\u0646\u0627\u062F\u0631\u0629",
      x: 310,
      z: 290,
      radius: 125,
      color: "#A855F7",
      monsterPool: ["frost_specter", "wraith_knight", "shadow_reaper"],
      rewardGold: 220,
      rewardXp: 240
    },
    {
      id: "dragon_ridge",
      name: "\u0647\u0636\u0628\u0629 \u0627\u0644\u062A\u0646\u064A\u0646 \u0627\u0644\u0628\u0631\u0643\u0627\u0646\u064A\u0629",
      subtitle: "\u0645\u0631\u062A\u0641\u0639\u0627\u062A \u0646\u0627\u0631\u064A\u0629 \u063A\u0631\u0628\u064A\u0629 \u064A\u0633\u0643\u0646\u0647\u0627 \u062D\u0627\u0635\u062F\u0648 \u0627\u0644\u0638\u0644\u0627\u0644 \u0648\u0623\u063A\u0644\u0649 \u0627\u0644\u0643\u0646\u0648\u0632 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A\u0629",
      x: -390,
      z: 60,
      radius: 155,
      color: "#F97316",
      monsterPool: ["shadow_reaper", "obsidian_golem", "ember_imp"],
      rewardGold: 260,
      rewardXp: 280
    },
    {
      id: "frost_peaks",
      name: "\u0642\u0645\u0645 \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0623\u0628\u062F\u064A",
      subtitle: "\u062C\u0628\u0627\u0644 \u062C\u0644\u064A\u062F\u064A\u0629 \u0634\u0627\u0647\u0642\u0629 \u0641\u064A \u0623\u0642\u0635\u0649 \u0627\u0644\u0634\u0645\u0627\u0644 \u0627\u0644\u063A\u0631\u0628\u064A \u0645\u0644\u064A\u0626\u0629 \u0628\u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0646\u0642\u064A\u0629",
      x: -280,
      z: -440,
      radius: 140,
      color: "#7DD3FC",
      monsterPool: ["frost_specter", "wraith_knight", "shadow_reaper"],
      rewardGold: 245,
      rewardXp: 265
    }
  ],
  worldNpcs: [
    {
      id: "npc_orion",
      name: "\u0627\u0644\u062D\u0643\u064A\u0645 \u0623\u0648\u0631\u064A\u0648\u0646",
      title: "\u0645\u0631\u0634\u062F \u0639\u0627\u0644\u0645 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
      role: "guide",
      serviceLabel: "\u0634\u0641\u0627\u0621 \u0645\u062C\u0627\u0646\u064A + \u0639\u0642\u062F \u0627\u0633\u062A\u0643\u0634\u0627\u0641",
      x: 6.5,
      z: -5.5,
      yaw: -0.65,
      robeColor: "#1E3A5F",
      accentColor: "#38BDF8",
      jobIds: ["job_explore"],
      lines: [
        "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0623\u064A\u0647\u0627 \u0627\u0644\u0645\u0633\u062A\u062F\u0639\u0649 \u0641\u064A \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627! \u0645\u0633\u0627\u062D\u0629 \u0647\u0630\u0627 \u0627\u0644\u0639\u0627\u0644\u0645 \u062A\u0636\u0627\u0639\u0641\u062A \u0645\u0626\u0629 \u0645\u0631\u0629 \u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u062D\u0642\u064A\u0642\u064A.",
        "\u062A\u062D\u0627\u0648\u0631 \u0645\u0639 \u0631\u0641\u0627\u0642\u0643 \u0641\u064A \u0627\u0644\u0642\u0631\u064A\u0629: \u0631\u0626\u064A\u0633 \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0643\u0627\u064A\u0644\u060C \u0627\u0644\u062D\u062F\u0651\u0627\u062F \u0628\u0631\u0648\u0646\u060C \u0627\u0644\u062E\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0644\u064A\u0631\u0627\u060C \u0648\u0627\u0644\u062A\u0627\u062C\u0631 \u0633\u0644\u064A\u0645.",
        "\u0627\u0633\u062A\u062E\u062F\u0645 \u0623\u062D\u062C\u0627\u0631 \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0627\u0644\u0633\u0631\u064A\u0639 [M] \u0644\u0644\u062A\u0646\u0642\u0644 \u0627\u0644\u0641\u0648\u0631\u064A \u0628\u064A\u0646 \u0627\u0644\u0623\u0642\u0627\u0644\u064A\u0645 \u0627\u0644\u062A\u0633\u0639\u0629 \u0628\u0639\u062F \u0627\u0643\u062A\u0634\u0627\u0641\u0647\u0627!"
      ]
    },
    {
      id: "npc_kael",
      name: "\u0627\u0644\u0642\u0627\u0626\u062F \u0643\u0627\u064A\u0644",
      title: "\u0631\u0626\u064A\u0633 \u0646\u0642\u0627\u0628\u0629 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u064A\u0646",
      role: "guild_master",
      serviceLabel: "\u0639\u0642\u0648\u062F \u0627\u0644\u0639\u0645\u0644 + \u0635\u0631\u0641 \u0634\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0642\u0627\u0628\u0629",
      x: -2,
      z: -16.5,
      yaw: 0.1,
      robeColor: "#7C2D12",
      accentColor: "#E6B85C",
      jobIds: ["job_monsters"],
      lines: [
        "\u0646\u0642\u0627\u0628\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u062A\u0643\u0627\u0641\u0626 \u0643\u0644 \u0645\u0642\u0627\u062A\u0644 \u064A\u0637\u0647\u0651\u0631 \u0627\u0644\u0637\u0631\u0642 \u0627\u0644\u062A\u062C\u0627\u0631\u064A\u0629 \u0628\u0634\u0647\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0630\u0647\u0628!",
        "\u0643\u0644 \u0639\u0642\u062F \u0639\u0645\u0644 \u062A\u0646\u0641\u0630\u0647 \u064A\u0645\u0646\u062D\u0643 \u0634\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0627\u0644\u062A\u064A \u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u0648\u064A\u0644\u0647\u0627 \u0625\u0644\u0649 \u062C\u0648\u0627\u0647\u0631 \u0648\u0635\u0646\u0627\u062F\u064A\u0642 \u0623\u0648 \u0628\u064A\u0639 \u0645\u0648\u0627\u0631\u062F\u0643."
      ]
    },
    {
      id: "npc_bronn",
      name: "\u0627\u0644\u062D\u062F\u0651\u0627\u062F \u0628\u0631\u0648\u0646",
      title: "\u062D\u0631\u0641\u064A \u0627\u0644\u0623\u0633\u0644\u062D\u0629 \u0648\u0627\u0644\u062F\u0631\u0648\u0639",
      role: "blacksmith",
      serviceLabel: "\u062A\u0639\u062F\u064A\u0646 \u0627\u0644\u062E\u0627\u0645 + \u0634\u062D\u0630 \u0627\u0644\u0633\u0644\u0627\u062D (+30% \u0647\u062C\u0648\u0645)",
      x: -11,
      z: 3.5,
      yaw: 0.9,
      robeColor: "#3F3F46",
      accentColor: "#F97316",
      jobIds: ["job_ores"],
      lines: [
        "\u0623\u062D\u0636\u0631 \u0644\u064A \u062E\u0627\u0645 \u0627\u0644\u0641\u0636\u0629 \u0623\u0648 \u0627\u0644\u062A\u0646\u064A\u0646 \u0645\u0646 \u0648\u0627\u062F\u064A \u0627\u0644\u0646\u0647\u0631 \u0627\u0644\u0641\u0636\u064A \u0648\u0633\u0623\u0635\u0642\u0644 \u0646\u0635\u0644\u0643 \u0645\u062C\u0627\u0646\u0627\u064B \u0644\u0644\u0645\u0639\u0631\u0643\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629!",
        "\u0646\u0635\u0627\u0644 \u0627\u0644\u0623\u0628\u0637\u0627\u0644 \u062A\u064F\u0635\u0646\u0639 \u0645\u0646 \u0627\u0644\u0639\u0632\u0645 \u0648\u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062F\u0624\u0648\u0628 \u0648\u0644\u064A\u0633 \u0627\u0644\u0642\u062A\u0627\u0644 \u0648\u062D\u062F\u0647."
      ]
    },
    {
      id: "npc_lyra",
      name: "\u0627\u0644\u062E\u064A\u0645\u064A\u0627\u0626\u064A\u0629 \u0644\u064A\u0631\u0627",
      title: "\u0635\u0627\u0646\u0639\u0629 \u0627\u0644\u0625\u0643\u0633\u064A\u0631 \u0648\u0627\u0644\u0623\u0639\u0634\u0627\u0628",
      role: "alchemist",
      serviceLabel: "\u062C\u0645\u0639 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 + \u062A\u0632\u0648\u064A\u062F \u0628\u062C\u0631\u0639\u0629 \u0634\u0641\u0627\u0621",
      x: 11.5,
      z: 3.5,
      yaw: -0.95,
      robeColor: "#0F6A52",
      accentColor: "#10B981",
      jobIds: ["job_herbs"],
      lines: [
        "\u0623\u0639\u0634\u0627\u0628 \u0627\u0644\u0642\u0645\u0631 \u0641\u064A \u0627\u0644\u0645\u0631\u062C \u0627\u0644\u0647\u0627\u0645\u0633 \u0634\u0645\u0627\u0644 \u0627\u0644\u0642\u0631\u064A\u0629 \u0647\u064A \u0633\u0631 \u062C\u0631\u0639\u0627\u062A \u0627\u0644\u0634\u0641\u0627\u0621 \u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u0644\u062F\u064A\u0646\u0627.",
        "\u0623\u062A\u0645\u0645 \u0639\u0642\u062F \u062C\u0645\u0639 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0648\u0633\u0623\u0645\u0646\u062D\u0643 \u0630\u0647\u0628\u0627\u064B \u0648\u0634\u0627\u0631\u0627\u062A \u0646\u0642\u0627\u0628\u0629 \u0648\u062C\u0631\u0639\u0629 \u0634\u0641\u0627\u0621 \u0641\u0648\u0631\u064A\u0629!"
      ]
    },
    {
      id: "npc_salim",
      name: "\u0627\u0644\u062A\u0627\u062C\u0631 \u0633\u0644\u064A\u0645",
      title: "\u0648\u0633\u064A\u0637 \u0642\u0648\u0627\u0641\u0644 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
      role: "merchant",
      serviceLabel: "\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F + \u0639\u0642\u0648\u062F \u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A",
      x: 11,
      z: -10.5,
      yaw: -2.2,
      robeColor: "#5B21B6",
      accentColor: "#FBBF24",
      jobIds: ["job_crystals"],
      lines: [
        "\u0642\u0648\u0627\u0641\u0644\u064A \u062A\u0639\u0628\u0631 \u0628\u064A\u0646 \u0627\u0644\u0642\u0631\u0649 \u0627\u0644\u062A\u0633\u0639 \u0648\u062A\u0634\u062A\u0631\u064A \u0643\u0644 \u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0648\u0627\u0644\u062E\u0627\u0645\u0627\u062A \u0648\u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u062C\u0645\u0639\u0647\u0627 \u0628\u0623\u0633\u0639\u0627\u0631 \u0645\u062C\u0632\u064A\u0629!",
        "\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u062B\u064A\u0631 \u0641\u064A \u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644 \u0648\u0645\u0631\u0635\u062F \u0627\u0644\u0646\u062C\u0648\u0645 \u0647\u064A \u0627\u0644\u0623\u063A\u0644\u0649 \u0641\u064A \u0627\u0644\u0642\u0627\u0631\u0629."
      ]
    }
  ],
  worldNodes: OVERWORLD_NODES,
  worldWaystones: [
    { id: "ws_haven", name: "\u0633\u0627\u062D\u0629 \u0642\u0631\u064A\u0629 \u0627\u0644\u0645\u0644\u0627\u0630", regionId: "haven_village", x: 0, z: 6, color: "#E6B85C" },
    { id: "ws_meadow", name: "\u0627\u0644\u0645\u0631\u062C \u0627\u0644\u0647\u0627\u0645\u0633", regionId: "whispering_meadow", x: 0, z: -135, color: "#22C55E" },
    { id: "ws_forest", name: "\u0642\u0644\u0628 \u063A\u0627\u0628\u0629 \u0627\u0644\u0632\u0645\u0631\u062F", regionId: "emerald_forest", x: -175, z: -325, color: "#10B981" },
    { id: "ws_river", name: "\u0645\u0646\u0627\u062C\u0645 \u0627\u0644\u0646\u0647\u0631 \u0627\u0644\u0641\u0636\u064A", regionId: "silver_river", x: 170, z: -225, color: "#F59E0B" },
    { id: "ws_ruins", name: "\u0627\u0644\u0623\u0637\u0644\u0627\u0644 \u0627\u0644\u0645\u0646\u0633\u064A\u0629", regionId: "forgotten_ruins", x: 350, z: -32, color: "#38BDF8" },
    { id: "ws_lake", name: "\u0628\u062D\u064A\u0631\u0629 \u0627\u0644\u0643\u0631\u064A\u0633\u062A\u0627\u0644", regionId: "crystal_lake", x: 40, z: 295, color: "#0EA5E9" },
    { id: "ws_observatory", name: "\u0645\u0631\u0635\u062F \u0627\u0644\u0646\u062C\u0648\u0645", regionId: "arcane_observatory", x: 300, z: 280, color: "#A855F7" },
    { id: "ws_dragon", name: "\u0647\u0636\u0628\u0629 \u0627\u0644\u062A\u0646\u064A\u0646", regionId: "dragon_ridge", x: -375, z: 58, color: "#F97316" },
    { id: "ws_frost", name: "\u0642\u0645\u0645 \u0627\u0644\u0635\u0642\u064A\u0639", regionId: "frost_peaks", x: -270, z: -420, color: "#7DD3FC" }
  ],
  worldChests: [
    { id: "chest_meadow_1", x: -22, z: -155, tier: "standard", regionId: "whispering_meadow", gold: 140, gems: 4, xp: 90 },
    { id: "chest_forest_1", x: -165, z: -310, tier: "standard", regionId: "emerald_forest", gold: 170, gems: 5, xp: 110 },
    { id: "chest_forest_2", x: -215, z: -375, tier: "standard", regionId: "emerald_forest", gold: 190, gems: 5, xp: 120 },
    { id: "chest_river_1", x: 185, z: -245, tier: "standard", regionId: "silver_river", gold: 200, gems: 6, xp: 130 },
    { id: "chest_ruins_1", x: 365, z: -42, tier: "mythic", regionId: "forgotten_ruins", gold: 310, gems: 10, xp: 180 },
    { id: "chest_ruins_2", x: 330, z: 12, tier: "standard", regionId: "forgotten_ruins", gold: 185, gems: 5, xp: 120 },
    { id: "chest_lake_1", x: 18, z: 325, tier: "standard", regionId: "crystal_lake", gold: 195, gems: 6, xp: 130 },
    { id: "chest_lake_2", x: 92, z: 365, tier: "standard", regionId: "crystal_lake", gold: 210, gems: 6, xp: 140 },
    { id: "chest_obs_mythic", x: 318, z: 296, tier: "mythic", regionId: "arcane_observatory", gold: 340, gems: 12, xp: 200 },
    { id: "chest_ridge_1", x: -355, z: 95, tier: "standard", regionId: "dragon_ridge", gold: 220, gems: 7, xp: 150 },
    { id: "chest_ridge_mythic", x: -405, z: 58, tier: "mythic", regionId: "dragon_ridge", gold: 420, gems: 15, xp: 240 },
    { id: "chest_frost_mythic", x: -292, z: -450, tier: "mythic", regionId: "frost_peaks", gold: 390, gems: 14, xp: 230 }
  ],
  worldPortals: [
    { id: "portal_citadel", arenaId: "obsidian_citadel", label: "\u0628\u0648\u0627\u0628\u0629 \u0642\u0644\u0639\u0629 \u0627\u0644\u063A\u0633\u0642", x: 0, z: -26, color: "#E6B85C" },
    { id: "portal_magma", arenaId: "magma_caldera", label: "\u0628\u0648\u0627\u0628\u0629 \u0641\u0648\u0647\u0629 \u0627\u0644\u0628\u0631\u0643\u0627\u0646", x: -26, z: 0, color: "#F97316" },
    { id: "portal_glacier", arenaId: "glacier_spire", label: "\u0628\u0648\u0627\u0628\u0629 \u0642\u0645\u0629 \u0627\u0644\u062C\u0644\u064A\u062F", x: 0, z: 26, color: "#38BDF8" },
    { id: "portal_sunstone", arenaId: "sunstone_dunes", label: "\u0628\u0648\u0627\u0628\u0629 \u0645\u0639\u0628\u062F \u0627\u0644\u0634\u0645\u0633", x: 26, z: 0, color: "#FBBF24" },
    { id: "portal_celestial", arenaId: "celestial_sanctuary", label: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062D\u0631\u0645 \u0627\u0644\u0633\u0645\u0627\u0648\u064A", x: 20, z: -20, color: "#10B981" },
    { id: "portal_abyssal", arenaId: "abyssal_colosseum", label: "\u0628\u0648\u0627\u0628\u0629 \u0643\u0648\u0644\u0648\u0633\u064A\u0648\u0645 \u0627\u0644\u0647\u0627\u0648\u064A\u0629", x: -20, z: 20, color: "#A855F7" }
  ],
  sceneryProps: generateOverworldScenery(),
  componentsSummary: [
    { title: "\u0642\u0627\u0631\u0629 14,000\u0645 \u0628\u0628\u062B \u0627\u0644\u0642\u0637\u0627\u0639\u0627\u062A (100 \u0636\u0639\u0641 \u0627\u0644\u0645\u0633\u0627\u062D\u0629)", detail: "\u062A\u062D\u0645\u0651\u0644 \u0642\u0637\u0627\u0639\u0627\u062A 240\u0645 \xD7 240\u0645 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u062D\u0648\u0644 \u0627\u0644\u0644\u0627\u0639\u0628 \u0648\u062A\u0641\u0631\u0651\u063A \u0627\u0644\u0628\u0639\u064A\u062F\u0629 \u0644\u0623\u062F\u0627\u0621 60 FPS \u062B\u0627\u0628\u062A." },
    { title: "5 \u0634\u062E\u0635\u064A\u0627\u062A \u0645\u0633\u0627\u0644\u0645\u0629 \u0648\u0646\u0638\u0627\u0645 \u0639\u0645\u0644 \u0648\u0627\u0642\u062A\u0635\u0627\u062F \u0646\u0642\u0627\u0628\u0629", detail: "\u062A\u0639\u0627\u0642\u062F \u0645\u0639 \u0644\u064A\u0631\u0627 \u0648\u0628\u0631\u0648\u0646 \u0648\u0643\u0627\u064A\u0644 \u0648\u0633\u0644\u064A\u0645 \u0644\u062C\u0645\u0639 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0648\u0643\u0633\u0628 \u0634\u0627\u0631\u0627\u062A \u0627\u0644\u0646\u0642\u0627\u0628\u0629 \u0648\u0627\u0644\u0630\u0647\u0628." },
    { title: "\u0643\u0646\u0648\u0632 \u0645\u062A\u062C\u062F\u062F\u0629 \u0628\u0627\u0644\u0642\u0637\u0627\u0639\u0627\u062A + 6 \u0628\u0648\u0627\u0628\u0627\u062A \u0633\u0627\u062D\u0627\u062A", detail: "\u0627\u0633\u062A\u0643\u0634\u0627\u0641 \u0644\u0627 \u0645\u062D\u062F\u0648\u062F \u0628\u0639\u064A\u062F\u0627\u064B \u0639\u0646 \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A \u0645\u0639 \u062D\u0641\u0638 \u062F\u0627\u0626\u0645 \u0644\u0643\u0644 \u0645\u0627 \u062A\u0641\u062A\u062D\u0647 \u0648\u062A\u062C\u0645\u0639\u0647." }
  ]
};
export const MONSTERS = {
  ash_stalker: {
    id: "ash_stalker",
    name: "\u0630\u0626\u0628 \u0627\u0644\u0631\u0645\u0627\u062F",
    tier: 1,
    roleLabel: "\u0645\u0641\u062A\u0631\u0633 \u0633\u0631\u064A\u0639",
    description: "\u064A\u062A\u062D\u0631\u0643 \u0641\u064A \u0623\u0633\u0631\u0627\u0628 \u0648\u064A\u0644\u062A\u0641 \u062D\u0648\u0644 \u0627\u0644\u0623\u0641\u062A\u0627\u0631 \u0645\u0646 \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0644\u0647\u062C\u0645\u0627\u062A \u062E\u0627\u0637\u0641\u0629.",
    maxHp: 85,
    damage: 13,
    speed: 6.5,
    attackRange: 2.1,
    scale: 0.92,
    bodyColor: "#47505E",
    accentColor: "#F59E0B",
    eyeColor: "#FBBF24",
    isRanged: false,
    isBoss: false,
    goldReward: 22,
    xpReward: 26
  },
  ember_imp: {
    id: "ember_imp",
    name: "\u062C\u0646\u064A \u0627\u0644\u0644\u0647\u0628",
    tier: 1,
    roleLabel: "\u0631\u0627\u0645\u064A \u0646\u0627\u0631\u064A",
    description: "\u064A\u062D\u0644\u0642 \u0628\u0639\u064A\u062F\u0627\u064B \u0648\u064A\u0631\u0645\u064A \u0643\u0631\u0627\u062A \u0646\u0627\u0631 \u0648\u064A\u062A\u0631\u0627\u062C\u0639 \u0639\u0646\u062F \u0627\u0642\u062A\u0631\u0627\u0628\u0643 \u0645\u0646\u0647.",
    maxHp: 74,
    damage: 15,
    speed: 5,
    attackRange: 10.2,
    scale: 0.85,
    bodyColor: "#9A2E1B",
    accentColor: "#FB923C",
    eyeColor: "#FEF08A",
    isRanged: true,
    isBoss: false,
    goldReward: 26,
    xpReward: 32
  },
  venom_crawler: {
    id: "venom_crawler",
    name: "\u0632\u0627\u062D\u0641 \u0627\u0644\u0633\u0645\u0648\u0645",
    tier: 2,
    roleLabel: "\u0645\u0646\u062F\u0641\u0639 \u062E\u0627\u0637\u0641",
    description: "\u0648\u062D\u0634 \u0633\u0631\u064A\u0639 \u064A\u062E\u062A\u0628\u0626 \u0642\u0631\u0628 \u0627\u0644\u0623\u0639\u0645\u062F\u0629 \u062B\u0645 \u064A\u0646\u062F\u0641\u0639 \u0646\u062D\u0648\u0643 \u0628\u0647\u062C\u0645\u0629 \u0645\u0633\u0645\u0648\u0645\u0629 \u0645\u0641\u0627\u062C\u0626\u0629.",
    maxHp: 112,
    damage: 18,
    speed: 7.4,
    attackRange: 2.3,
    scale: 0.98,
    bodyColor: "#1E3A2F",
    accentColor: "#10B981",
    eyeColor: "#A3E635",
    isRanged: false,
    isBoss: false,
    goldReward: 34,
    xpReward: 40
  },
  frost_specter: {
    id: "frost_specter",
    name: "\u0637\u064A\u0641 \u0627\u0644\u0635\u0642\u064A\u0639",
    tier: 2,
    roleLabel: "\u0633\u0627\u062D\u0631 \u062C\u0644\u064A\u062F",
    description: "\u0633\u0627\u062D\u0631 \u0637\u0627\u0626\u0631 \u064A\u0637\u0644\u0642 \u0643\u0631\u0627\u062A \u0635\u0642\u064A\u0639 \u0639\u0646 \u0628\u064F\u0639\u062F \u062A\u0628\u0637\u0626 \u062D\u0631\u0643\u062A\u0643 \u0639\u0646\u062F \u0627\u0644\u0625\u0635\u0627\u0628\u0629.",
    maxHp: 120,
    damage: 19,
    speed: 4.8,
    attackRange: 11.5,
    scale: 0.98,
    bodyColor: "#1E3A5F",
    accentColor: "#38BDF8",
    eyeColor: "#E0F2FE",
    isRanged: true,
    isBoss: false,
    goldReward: 38,
    xpReward: 44
  },
  obsidian_golem: {
    id: "obsidian_golem",
    name: "\u062D\u0627\u0631\u0633 \u0627\u0644\u0628\u0627\u0632\u0644\u062A",
    tier: 3,
    roleLabel: "\u0645\u062F\u0631\u0651\u0639 \u062B\u0642\u064A\u0644",
    description: "\u0639\u0645\u0644\u0627\u0642 \u0635\u062E\u0631\u064A \u0628\u0635\u0644\u0627\u0628\u0629 \u0639\u0627\u0644\u064A\u0629 \u064A\u0636\u0631\u0628 \u0627\u0644\u0623\u0631\u0636 \u0628\u0645\u0648\u062C\u0629 \u0627\u0631\u062A\u062F\u0627\u062F\u064A\u0629 \u062A\u062D\u0630\u0631 \u0628\u062F\u0627\u0626\u0631\u0629 \u062D\u0645\u0631\u0627\u0621.",
    maxHp: 225,
    damage: 26,
    speed: 3.3,
    attackRange: 2.9,
    scale: 1.4,
    bodyColor: "#363C47",
    accentColor: "#EA580C",
    eyeColor: "#F97316",
    isRanged: false,
    isBoss: false,
    goldReward: 50,
    xpReward: 58
  },
  wraith_knight: {
    id: "wraith_knight",
    name: "\u0634\u0628\u062D \u0627\u0644\u0646\u0635\u0644",
    tier: 3,
    roleLabel: "\u0645\u0628\u0627\u0631\u0632 \u0646\u062E\u0628\u0648\u064A",
    description: "\u0641\u0627\u0631\u0633 \u0634\u0628\u062D\u064A \u064A\u0642\u0627\u062A\u0644 \u0628\u0633\u064A\u0641 \u0637\u0627\u0642\u0629 \u0648\u064A\u0644\u062A\u0641 \u0628\u0633\u0631\u0639\u0629 \u0644\u0627\u062E\u062A\u0631\u0627\u0642 \u062F\u0641\u0627\u0639\u0627\u062A\u0643.",
    maxHp: 165,
    damage: 22,
    speed: 5.8,
    attackRange: 3,
    scale: 1.1,
    bodyColor: "#252B3B",
    accentColor: "#38BDF8",
    eyeColor: "#7DD3FC",
    isRanged: false,
    isBoss: false,
    goldReward: 45,
    xpReward: 52
  },
  shadow_reaper: {
    id: "shadow_reaper",
    name: "\u062D\u0627\u0635\u062F \u0627\u0644\u0638\u0644\u0627\u0644",
    tier: 4,
    roleLabel: "\u0646\u062E\u0628\u0629 \u0642\u0627\u062A\u0644",
    description: "\u0643\u0627\u0626\u0646 \u0638\u0644\u0627\u0645\u064A \u0646\u062E\u0628\u0648\u064A \u0633\u0631\u064A\u0639 \u0627\u0644\u0636\u0631\u0628\u0627\u062A \u064A\u0631\u0627\u0641\u0642 \u0645\u0648\u062C\u0627\u062A \u0627\u0644\u0645\u0646\u062A\u0635\u0641 \u0648\u0627\u0644\u0632\u0639\u0645\u0627\u0621.",
    maxHp: 250,
    damage: 28,
    speed: 6.4,
    attackRange: 3.2,
    scale: 1.22,
    bodyColor: "#181824",
    accentColor: "#C084FC",
    eyeColor: "#F43F5E",
    isRanged: false,
    isBoss: false,
    goldReward: 68,
    xpReward: 78
  },
  magma_boss: {
    id: "magma_boss",
    name: "\u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 \u0627\u0644\u0645\u062F\u0631\u0651\u0639",
    tier: 5,
    roleLabel: "\u0632\u0639\u064A\u0645 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0623\u0648\u0644\u0649",
    description: "\u0632\u0639\u064A\u0645 \u0645\u064A\u062F\u0627\u0646 \u064A\u0637\u0644\u0642 \u0645\u0648\u062C\u0627\u062A \u0646\u0627\u0631\u064A\u0629 \u0645\u062D\u064A\u0637\u064A\u0629 \u0648\u064A\u062F\u062E\u0644 \u0637\u0648\u0631 \u0627\u0644\u063A\u0636\u0628 \u0639\u0646\u062F \u0627\u0646\u062E\u0641\u0627\u0636 \u0635\u062D\u062A\u0647 \u062F\u0648\u0646 50%.",
    maxHp: 640,
    damage: 34,
    speed: 4.1,
    attackRange: 3.9,
    scale: 1.85,
    bodyColor: "#2B1F23",
    accentColor: "#F97316",
    eyeColor: "#FDE047",
    isRanged: false,
    isBoss: true,
    goldReward: 195,
    xpReward: 220
  },
  void_colossus: {
    id: "void_colossus",
    name: "\u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A",
    tier: 6,
    roleLabel: "\u0632\u0639\u064A\u0645 \u0627\u0644\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0623\u0639\u0644\u0649",
    description: "\u0623\u0642\u0648\u0649 \u0648\u062D\u0648\u0634 \u0627\u0644\u0633\u0644\u0633\u0644\u0629! \u064A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0636\u0631\u0628\u0627\u062A \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u062F\u0627\u0626\u0631\u064A\u0629 \u0648\u0625\u0637\u0644\u0627\u0642 \u0634\u0647\u0628 \u0627\u0644\u0638\u0644\u0627\u0645.",
    maxHp: 880,
    damage: 39,
    speed: 4.3,
    attackRange: 4.2,
    scale: 2.05,
    bodyColor: "#1B162C",
    accentColor: "#A855F7",
    eyeColor: "#38BDF8",
    isRanged: false,
    isBoss: true,
    goldReward: 290,
    xpReward: 340
  }
};
export const MONSTER_LIST = Object.values(MONSTERS).sort((a, b) => a.tier - b.tier);
export const MAP_CHALLENGES = [
  {
    id: "ch_citadel_slayer",
    title: "\u062A\u062D\u062F\u064A \u062D\u0627\u0631\u0633 \u0627\u0644\u0642\u0644\u0639\u0629",
    arenaId: "obsidian_citadel",
    description: "\u0627\u0647\u0632\u0645 25 \u0648\u062D\u0634\u0627\u064B \u0641\u064A \u0633\u0627\u062D\u0627\u062A \u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0644\u0625\u062B\u0628\u0627\u062A \u0633\u064A\u0637\u0631\u062A\u0643 \u0639\u0644\u0649 \u0642\u0644\u0639\u0629 \u0627\u0644\u063A\u0633\u0642.",
    metric: "kills",
    target: 25,
    rewardGold: 360,
    rewardGems: 12,
    rewardXp: 240
  },
  {
    id: "ch_missions_master",
    title: "\u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u062E\u0631\u0627\u0626\u0637 \u0627\u0644\u0648\u0627\u0633\u0639\u0629",
    arenaId: "sunstone_dunes",
    description: "\u0623\u0643\u0645\u0644 3 \u0645\u0647\u0627\u0645 \u0645\u064A\u062F\u0627\u0646\u064A\u0629 \u062D\u064A\u0629 \u062F\u0627\u062E\u0644 \u0627\u0644\u062E\u0631\u0627\u0626\u0637 \u0627\u0644\u0648\u0627\u0633\u0639\u0629 (\u0627\u0644\u0633\u064A\u0637\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0631\u062A\u0641\u0639\u0627\u062A\u060C \u0627\u0644\u0645\u062D\u0627\u0631\u064A\u0628\u060C \u0648\u0627\u0644\u0635\u064A\u062F \u0627\u0644\u0633\u0631\u064A\u0639).",
    metric: "missions",
    target: 3,
    rewardGold: 420,
    rewardGems: 15,
    rewardXp: 280
  },
  {
    id: "ch_boss_chain",
    title: "\u0643\u0627\u0633\u0631 \u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0632\u0639\u0645\u0627\u0621",
    arenaId: "abyssal_colosseum",
    description: "\u0627\u0642\u0636\u0650 \u0639\u0644\u0649 2 \u0645\u0646 \u0632\u0639\u0645\u0627\u0621 \u0627\u0644\u0633\u0627\u062D\u0629 (\u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 \u0623\u0648 \u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629).",
    metric: "bossKills",
    target: 2,
    rewardGold: 550,
    rewardGems: 22,
    rewardXp: 360
  },
  {
    id: "ch_glacier_rank",
    title: "\u0646\u062E\u0628\u0629 \u0627\u0644\u062D\u0631\u0645 \u0627\u0644\u0633\u0645\u0627\u0648\u064A",
    arenaId: "celestial_sanctuary",
    description: "\u0627\u0631\u0641\u0639 \u062A\u0635\u0646\u064A\u0641\u0643 \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0641\u0633\u0629 \u0625\u0644\u0649 1150 \u0646\u0642\u0637\u0629 \u0639\u0628\u0631 \u0627\u0644\u0646\u0632\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u0645\u0648\u062D\u062F.",
    metric: "rating",
    target: 1150,
    rewardGold: 480,
    rewardGems: 18,
    rewardXp: 300
  },
  {
    id: "ch_world_explorer",
    title: "\u0641\u0627\u062A\u062D \u0623\u0642\u0627\u0644\u064A\u0645 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0643\u0628\u0631\u0649",
    arenaId: "etheria_overworld",
    description: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 1400\u0645 \u0648\u0627\u0643\u062A\u0634\u0641 6 \u0623\u0642\u0627\u0644\u064A\u0645 \u0631\u0626\u064A\u0633\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0627\u0644\u0628\u0631\u064A\u0629.",
    metric: "regions",
    target: 6,
    rewardGold: 620,
    rewardGems: 24,
    rewardXp: 420
  }
];
export const STAT_DEFINITIONS = [
  { key: "str", short: "\u0627\u0644\u0642\u0648\u0629", label: "\u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u062C\u0633\u062F\u064A\u0629 (STR)", desc: "\u062A\u0631\u0641\u0639 \u0636\u0631\u0631 \u0627\u0644\u0633\u0644\u0627\u062D \u0648\u0627\u0644\u0647\u062C\u0645\u0627\u062A \u0627\u0644\u062B\u0642\u064A\u0644\u0629", color: "#F97316" },
  { key: "agi", short: "\u0627\u0644\u0631\u0634\u0627\u0642\u0629", label: "\u0627\u0644\u0631\u0634\u0627\u0642\u0629 \u0648\u0627\u0644\u0633\u0631\u0639\u0629 (AGI)", desc: "\u062A\u0631\u0641\u0639 \u0633\u0631\u0639\u0629 \u0627\u0644\u062C\u0631\u064A \u0648\u062A\u0642\u0644\u0644 \u062A\u0628\u0631\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u0648\u063A\u0629", color: "#38BDF8" },
  { key: "vit", short: "\u0627\u0644\u062D\u064A\u0648\u064A\u0629", label: "\u0627\u0644\u062D\u064A\u0648\u064A\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 (VIT)", desc: "\u062A\u0632\u064A\u062F \u0623\u0642\u0635\u0649 \u0646\u0642\u0627\u0637 \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629", color: "#10B981" },
  { key: "int", short: "\u0627\u0644\u0630\u0643\u0627\u0621", label: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0633\u062D\u0631\u064A (INT)", desc: "\u062A\u0636\u0627\u0639\u0641 \u0636\u0631\u0631 \u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u062E\u0627\u0631\u0642\u0629 \u0648\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A", color: "#A855F7" },
  { key: "def", short: "\u0627\u0644\u062F\u0641\u0627\u0639", label: "\u0627\u0644\u0635\u0644\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0627\u0639\u064A\u0629 (DEF)", desc: "\u062A\u0631\u0641\u0639 \u062A\u0642\u0644\u064A\u0644 \u0627\u0644\u0636\u0631\u0631 \u0627\u0644\u0645\u0633\u062A\u0644\u0645 \u0648\u0635\u0644\u0627\u0628\u0629 \u0627\u0644\u0635\u062F\u0651", color: "#60A5FA" },
  { key: "dex", short: "\u0627\u0644\u0628\u0631\u0627\u0639\u0629", label: "\u0627\u0644\u0628\u0631\u0627\u0639\u0629 \u0627\u0644\u0642\u062A\u0627\u0644\u064A\u0629 (DEX)", desc: "\u062A\u0631\u0641\u0639 \u0633\u0631\u0639\u0629 \u0627\u0644\u0636\u0631\u0628\u0627\u062A \u0648\u062A\u0642\u0644\u0644 \u062A\u0628\u0631\u064A\u062F \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A", color: "#E6B85C" },
  { key: "spr", short: "\u0627\u0644\u0631\u0648\u062D", label: "\u0627\u0644\u0631\u0648\u062D \u0648\u0627\u0644\u0637\u0627\u0642\u0629 (SPR)", desc: "\u062A\u0632\u064A\u062F \u0633\u0639\u0629 \u0634\u0631\u064A\u0637 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u0633\u0631\u0639\u0629 \u0634\u062D\u0646\u0647\u0627", color: "#2DD4BF" },
  { key: "lck", short: "\u0627\u0644\u062D\u0638", label: "\u0627\u0644\u062D\u0638 \u0648\u0627\u0644\u063A\u0646\u0627\u0626\u0645 (LCK)", desc: "\u062A\u0632\u064A\u062F \u0641\u0631\u0635\u0629 \u0627\u0644\u0636\u0631\u0628\u0629 \u0627\u0644\u062D\u0627\u0633\u0645\u0629 \u0648\u0645\u0636\u0627\u0639\u0641 \u0627\u0644\u0630\u0647\u0628", color: "#FDE047" }
];
export const SKIN_TONES = [
  { id: "sand", label: "\u0642\u0645\u062D\u064A \u062F\u0627\u0641\u0626", color: "#D6A57C" },
  { id: "bronze", label: "\u0628\u0631\u0648\u0646\u0632\u064A", color: "#B57B52" },
  { id: "fair", label: "\u0641\u0627\u062A\u062D", color: "#E8C5A8" },
  { id: "deep", label: "\u062F\u0627\u0643\u0646 \u063A\u0646\u064A", color: "#704832" },
  { id: "obsidian", label: "\u062D\u062C\u0631 \u0623\u0648\u0628\u0633\u064A\u062F\u064A\u0627\u0646", color: "#39404F" },
  { id: "steel", label: "\u0645\u0639\u062F\u0646\u064A \u0641\u0648\u0644\u0627\u0630\u064A", color: "#8A97AB" },
  { id: "frost", label: "\u062C\u0644\u064A\u062F\u064A \u0634\u0627\u062D\u0628", color: "#AECAD6" },
  { id: "ember", label: "\u0631\u0645\u0627\u062F \u0628\u0631\u0643\u0627\u0646\u064A", color: "#5A3A35" }
];
export const ARMOR_SWATCHES = [
  { label: "\u0641\u0648\u0644\u0627\u0630 \u062F\u0627\u0643\u0646", color: "#2B3442" },
  { label: "\u0642\u0631\u0645\u0632\u064A \u0645\u0644\u0643\u064A", color: "#991B1B" },
  { label: "\u0630\u0647\u0628\u064A \u0645\u0635\u0647\u0648\u0631", color: "#C9841A" },
  { label: "\u0632\u0645\u0631\u062F\u064A \u062D\u0631\u0628\u064A", color: "#0F6A52" },
  { label: "\u0623\u0632\u0631\u0642 \u0641\u0648\u0644\u0627\u0630\u064A", color: "#1D4E7A" },
  { label: "\u0639\u0627\u062C\u064A \u0642\u062F\u064A\u0645", color: "#CFC6B6" },
  { label: "\u0646\u062D\u0627\u0633\u064A \u0628\u0631\u0648\u0646\u0632\u064A", color: "#8A522C" },
  { label: "\u0641\u062D\u0645\u064A \u0644\u064A\u0644\u064A", color: "#181D24" },
  { label: "\u0623\u0631\u062C\u0648\u0627\u0646\u064A \u0633\u062D\u0631\u064A", color: "#5B21B6" }
];
export const GLOW_SWATCHES = [
  { label: "\u0643\u0647\u0631\u0645\u0627\u0646\u064A", color: "#F59E0B" },
  { label: "\u062C\u0644\u064A\u062F\u064A", color: "#38BDF8" },
  { label: "\u0632\u0645\u0631\u062F\u064A", color: "#10B981" },
  { label: "\u0642\u0631\u0645\u0632\u064A", color: "#EF4444" },
  { label: "\u0634\u0645\u0633\u064A", color: "#FDE047" },
  { label: "\u0623\u0631\u062C\u0648\u0627\u0646\u064A", color: "#A855F7" },
  { label: "\u0641\u0636\u064A", color: "#E2E8F0" }
];
export const DEFAULT_AVATAR = {
  name: "\u0637\u0627\u0631\u0642 \u0627\u0644\u0646\u0635\u0644",
  title: "\u0645\u0633\u062A\u062F\u0639\u0649 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
  build: "balanced",
  heightScale: 1,
  shoulderScale: 1.05,
  skinTone: "#D6A57C",
  headStyle: "knight_helm",
  helmetColor: "#2B3442",
  eyeGlow: "#F59E0B",
  armorStyle: "plate",
  primaryColor: "#2B3442",
  secondaryColor: "#C9841A",
  accentColor: "#F59E0B",
  backGear: "battle_cape",
  auraStyle: "ember_sparks",
  weaponId: "vanguard_sword",
  powerId: "inferno_nova",
  secondaryPowerId: "holy_sanctuary",
  powerSlots: ["inferno_nova", "holy_sanctuary", "thunder_strike", "shadow_blink"],
  stats: {
    str: 6,
    agi: 5,
    vit: 6,
    int: 5,
    def: 5,
    dex: 5,
    spr: 5,
    lck: 4
  }
};
export const RIVAL_CHAMPIONS = [
  {
    id: "champ_zaid",
    name: "\u0632\u064A\u062F \u0627\u0644\u0639\u0627\u0635\u0641",
    rankTitle: "\u0641\u0627\u0631\u0633 \u0627\u0644\u0628\u0631\u0648\u0646\u0632",
    rating: 1050,
    wins: 14,
    arenaFavorite: "obsidian_citadel",
    aiDifficulty: 0.62,
    avatar: {
      name: "\u0632\u064A\u062F \u0627\u0644\u0639\u0627\u0635\u0641",
      title: "\u062D\u0627\u0631\u0633 \u0627\u0644\u0628\u0648\u0627\u0628\u0629",
      build: "balanced",
      heightScale: 1,
      shoulderScale: 1,
      skinTone: "#D6A57C",
      headStyle: "spiky_hair",
      helmetColor: "#2B3442",
      eyeGlow: "#F59E0B",
      armorStyle: "tunic",
      primaryColor: "#1D4E7A",
      secondaryColor: "#CFC6B6",
      accentColor: "#38BDF8",
      backGear: "back_scabbard",
      auraStyle: "none",
      weaponId: "vanguard_sword",
      powerId: "thunder_strike",
      secondaryPowerId: "crystal_aegis",
      powerSlots: ["thunder_strike", "crystal_aegis", "inferno_nova", "shadow_blink"],
      stats: { str: 6, agi: 6, vit: 5, int: 5, def: 5, dex: 6, spr: 5, lck: 4 }
    }
  },
  {
    id: "champ_layla",
    name: "\u0644\u064A\u0644\u0649 \u0627\u0644\u0638\u0644",
    rankTitle: "\u0642\u0627\u062A\u0644\u0629 \u0627\u0644\u0641\u0636\u0629",
    rating: 1240,
    wins: 29,
    arenaFavorite: "glacier_spire",
    aiDifficulty: 0.72,
    avatar: {
      name: "\u0644\u064A\u0644\u0649 \u0627\u0644\u0638\u0644",
      title: "\u062E\u0646\u062C\u0631 \u0627\u0644\u0635\u0642\u064A\u0639",
      build: "agile",
      heightScale: 0.94,
      shoulderScale: 0.92,
      skinTone: "#E8C5A8",
      headStyle: "shadow_hood",
      helmetColor: "#181D24",
      eyeGlow: "#10B981",
      armorStyle: "nomad_cloak",
      primaryColor: "#181D24",
      secondaryColor: "#0F6A52",
      accentColor: "#10B981",
      backGear: "frost_wings",
      auraStyle: "frost_mist",
      weaponId: "shadow_daggers",
      powerId: "shadow_blink",
      secondaryPowerId: "frost_vortex",
      powerSlots: ["shadow_blink", "frost_vortex", "thunder_strike", "holy_sanctuary"],
      stats: { str: 6, agi: 11, vit: 5, int: 6, def: 4, dex: 10, spr: 6, lck: 8 }
    }
  },
  {
    id: "champ_khalid",
    name: "\u062E\u0627\u0644\u062F \u0627\u0644\u0635\u0627\u0639\u0642\u0629",
    rankTitle: "\u0628\u0637\u0644 \u0627\u0644\u0630\u0647\u0628",
    rating: 1460,
    wins: 47,
    arenaFavorite: "magma_caldera",
    aiDifficulty: 0.82,
    avatar: {
      name: "\u062E\u0627\u0644\u062F \u0627\u0644\u0635\u0627\u0639\u0642\u0629",
      title: "\u0645\u062D\u0637\u0645 \u0627\u0644\u062F\u0631\u0648\u0639",
      build: "heavy",
      heightScale: 1.12,
      shoulderScale: 1.22,
      skinTone: "#B57B52",
      headStyle: "horned_helm",
      helmetColor: "#2B3442",
      eyeGlow: "#F97316",
      armorStyle: "titan_mail",
      primaryColor: "#991B1B",
      secondaryColor: "#C9841A",
      accentColor: "#F59E0B",
      backGear: "flame_halo",
      auraStyle: "ember_sparks",
      weaponId: "bastion_mace",
      powerId: "iron_fortress",
      secondaryPowerId: "inferno_nova",
      powerSlots: ["iron_fortress", "inferno_nova", "titan_overdrive", "crystal_aegis"],
      stats: { str: 10, agi: 5, vit: 11, int: 5, def: 11, dex: 6, spr: 6, lck: 5 }
    }
  },
  {
    id: "champ_sara",
    name: "\u0633\u0627\u0631\u0629 \u0627\u0644\u0634\u0645\u0633",
    rankTitle: "\u0633\u0627\u062D\u0631\u0629 \u0627\u0644\u0628\u0644\u0627\u062A\u064A\u0646",
    rating: 1680,
    wins: 68,
    arenaFavorite: "celestial_sanctuary",
    aiDifficulty: 0.88,
    avatar: {
      name: "\u0633\u0627\u0631\u0629 \u0627\u0644\u0634\u0645\u0633",
      title: "\u0635\u0642\u0631 \u0627\u0644\u0633\u0645\u0627\u0621",
      build: "agile",
      heightScale: 0.98,
      shoulderScale: 0.96,
      skinTone: "#D6A57C",
      headStyle: "phoenix_crest",
      helmetColor: "#C9841A",
      eyeGlow: "#FDE047",
      armorStyle: "arcane_robe",
      primaryColor: "#5B21B6",
      secondaryColor: "#C9841A",
      accentColor: "#F59E0B",
      backGear: "arcane_orbit",
      auraStyle: "royal_gold",
      weaponId: "arcane_tome",
      powerId: "meteor_rain",
      secondaryPowerId: "holy_sanctuary",
      powerSlots: ["meteor_rain", "holy_sanctuary", "arcane_beam", "frost_vortex"],
      stats: { str: 6, agi: 9, vit: 7, int: 13, def: 6, dex: 9, spr: 11, lck: 8 }
    }
  },
  {
    id: "champ_omar",
    name: "\u0639\u0645\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A",
    rankTitle: "\u0633\u064A\u062F \u0627\u0644\u0645\u064A\u062F\u0627\u0646",
    rating: 1920,
    wins: 94,
    arenaFavorite: "abyssal_colosseum",
    aiDifficulty: 0.95,
    avatar: {
      name: "\u0639\u0645\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A",
      title: "\u0642\u0627\u0647\u0631 \u0627\u0644\u0647\u0627\u0648\u064A\u0629",
      build: "heavy",
      heightScale: 1.14,
      shoulderScale: 1.18,
      skinTone: "#39404F",
      headStyle: "royal_crown_helm",
      helmetColor: "#181D24",
      eyeGlow: "#38BDF8",
      armorStyle: "paladin_aegis",
      primaryColor: "#181D24",
      secondaryColor: "#C9841A",
      accentColor: "#38BDF8",
      backGear: "war_banner",
      auraStyle: "void_pulse",
      weaponId: "dragon_spear",
      powerId: "titan_overdrive",
      secondaryPowerId: "arcane_beam",
      powerSlots: ["titan_overdrive", "arcane_beam", "meteor_rain", "iron_fortress"],
      stats: { str: 12, agi: 9, vit: 11, int: 10, def: 10, dex: 10, spr: 9, lck: 8 }
    }
  }
];
export const INITIAL_QUESTS = [
  {
    id: "q_slay_10",
    title: "\u0635\u064A\u0627\u062F \u0627\u0644\u0648\u062D\u0648\u0634",
    description: "\u0627\u0647\u0632\u0645 10 \u0648\u062D\u0648\u0634 \u0641\u064A \u0627\u0644\u0642\u062A\u0627\u0644 \u0627\u0644\u0645\u0648\u062D\u062F \u0623\u0648 \u063A\u0627\u0631\u0629 \u0627\u0644\u0648\u062D\u0648\u0634.",
    target: 10,
    current: 0,
    rewardGold: 220,
    rewardGems: 5,
    rewardXp: 120,
    claimed: false,
    category: "combat"
  },
  {
    id: "q_combo_8",
    title: "\u0625\u064A\u0642\u0627\u0639 \u0644\u0627 \u064A\u062A\u0648\u0642\u0641",
    description: "\u062D\u0642\u0642 \u0633\u0644\u0633\u0644\u0629 \u0636\u0631\u0628\u0627\u062A \u0645\u062A\u062A\u0627\u0644\u064A\u0629 (\u0643\u0648\u0645\u0628\u0648) \u0645\u0646 8 \u0636\u0631\u0628\u0627\u062A \u0641\u064A \u0645\u0639\u0631\u0643\u0629 \u0648\u0627\u062D\u062F\u0629.",
    target: 8,
    current: 0,
    rewardGold: 180,
    rewardGems: 5,
    rewardXp: 100,
    claimed: false,
    category: "combat"
  },
  {
    id: "q_pvp_win",
    title: "\u0625\u062B\u0628\u0627\u062A \u0627\u0644\u062C\u062F\u0627\u0631\u0629",
    description: "\u062D\u0642\u0642 \u0627\u0646\u062A\u0635\u0627\u0631\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0641\u064A \u0646\u0632\u0627\u0644 \u0627\u0644\u062A\u0646\u0627\u0641\u0633 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0623\u0648 \u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u0645\u0648\u062D\u062F.",
    target: 1,
    current: 0,
    rewardGold: 300,
    rewardGems: 10,
    rewardXp: 180,
    claimed: false,
    category: "pvp"
  },
  {
    id: "q_boss_slayer",
    title: "\u0642\u0627\u0647\u0631 \u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629",
    description: "\u0627\u0647\u0632\u0645 \u0623\u062D\u062F \u0632\u0639\u0645\u0627\u0621 \u0627\u0644\u0633\u0627\u062D\u0629 (\u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 \u0623\u0648 \u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0647\u0627\u0648\u064A\u0629).",
    target: 1,
    current: 0,
    rewardGold: 450,
    rewardGems: 18,
    rewardXp: 280,
    claimed: false,
    category: "combat"
  },
  {
    id: "q_forge_avatar",
    title: "\u0647\u0648\u064A\u0629 \u0627\u0644\u0645\u0642\u0627\u062A\u0644",
    description: "\u062E\u0635\u0651\u0635 \u0623\u0641\u062A\u0627\u0631\u0643 \u0648\u0627\u062D\u0641\u0638 \u062A\u0639\u062F\u064A\u0644\u0627\u062A\u0643 \u0641\u064A \u0648\u0631\u0634\u0629 \u0628\u0646\u0627\u0621 \u0627\u0644\u0623\u0641\u062A\u0627\u0631.",
    target: 1,
    current: 0,
    rewardGold: 150,
    rewardGems: 5,
    rewardXp: 80,
    claimed: false,
    category: "forge"
  },
  {
    id: "q_upgrade_weapon",
    title: "\u0635\u0642\u0644 \u0627\u0644\u0646\u0635\u0644",
    description: "\u0642\u0645 \u0628\u062A\u0631\u0642\u064A\u0629 \u0623\u064A \u0633\u0644\u0627\u062D \u0641\u064A \u0627\u0644\u062A\u0631\u0633\u0627\u0646\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u0648\u0649 2 \u0623\u0648 \u0623\u0639\u0644\u0649.",
    target: 1,
    current: 0,
    rewardGold: 240,
    rewardGems: 8,
    rewardXp: 140,
    claimed: false,
    category: "forge"
  },
  {
    id: "q_buy_gear",
    title: "\u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0633\u0627\u0645\u0627\u0646",
    description: "\u0627\u0634\u062A\u0631\u0650 \u0648\u062C\u0647\u0651\u0632 \u0623\u064A \u0642\u0637\u0639\u0629 \u0633\u0627\u0645\u0627\u0646 (\u062E\u0627\u062A\u0645\u060C \u0646\u0648\u0627\u0629 \u062F\u0631\u0639\u060C \u0623\u0648 \u062D\u0630\u0627\u0621) \u0645\u0646 \u0627\u0644\u0645\u062A\u062C\u0631.",
    target: 1,
    current: 0,
    rewardGold: 260,
    rewardGems: 8,
    rewardXp: 150,
    claimed: false,
    category: "forge"
  },
  {
    id: "q_explore_world",
    title: "\u0631\u062D\u0651\u0627\u0644\u0629 \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
    description: "\u062A\u062C\u0648\u0651\u0644 \u0641\u064A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0648\u0627\u0643\u062A\u0634\u0641 4 \u0623\u0642\u0627\u0644\u064A\u0645 \u062C\u062F\u064A\u062F\u0629.",
    target: 4,
    current: 0,
    rewardGold: 340,
    rewardGems: 14,
    rewardXp: 220,
    claimed: false,
    category: "combat"
  }
];
export function computeFighterDerivedStats(avatar, weaponLevel = 1, equippedGear) {
  const weapon = WEAPONS[avatar.weaponId] || WEAPONS.vanguard_sword;
  const st = avatar.stats;
  const buildHpBonus = avatar.build === "heavy" ? 45 : avatar.build === "agile" ? -15 : 10;
  const buildSpeedBonus = avatar.build === "agile" ? 1.15 : avatar.build === "heavy" ? -0.6 : 0.2;
  const buildDamageBonus = avatar.build === "heavy" ? 5 : 0;
  let gearHp = 0;
  let gearDmg = 0;
  let gearSpeed = 0;
  let gearArmor = 0;
  let gearCrit = 0;
  let gearPwrScale = 0;
  if (equippedGear) {
    ["relic", "armor_core", "boots"].forEach((slot) => {
      const gId = equippedGear[slot];
      if (gId && GEAR_ITEMS[gId]) {
        const g = GEAR_ITEMS[gId];
        gearHp += g.hpBonus;
        gearDmg += g.dmgBonus;
        gearSpeed += g.speedBonus;
        gearArmor += g.armorBonus;
        gearCrit += g.critBonus;
        gearPwrScale += g.pwrScaleBonus;
      }
    });
  }
  const levelMult = 1 + (weaponLevel - 1) * 0.16;
  const maxHp = Math.round(140 + (st.vit || 5) * 18 + (st.def || 5) * 4 + buildHpBonus + gearHp);
  const magicBonus = weapon.role === "magic" || weapon.role === "support" ? (st.int || 5) * 1.9 : (st.int || 5) * 0.6;
  const attackDamage = Math.round(
    weapon.damage * levelMult + (st.str || 5) * 2.2 + magicBonus + buildDamageBonus + gearDmg
  );
  const heavyDamage = Math.round(
    weapon.heavyDamage * levelMult + (st.str || 5) * 3.1 + magicBonus * 1.25 + buildDamageBonus * 1.4 + gearDmg * 1.3
  );
  const moveSpeed = Number((6.3 + (st.agi || 5) * 0.2 + (st.dex || 5) * 0.06 + buildSpeedBonus + gearSpeed).toFixed(2));
  const critChance = Math.min(75, Math.round(weapon.critBonus + (st.agi || 5) * 0.9 + (st.lck || 4) * 1.35 + gearCrit));
  const powerScale = Number((1 + (st.int || 5) * 0.075 + (st.spr || 5) * 0.025 + gearPwrScale).toFixed(2));
  const maxEnergy = Math.round(95 + (st.spr || 5) * 4);
  const energyRegen = Number((8.5 + (st.spr || 5) * 0.95 + (weapon.role === "support" ? 3.5 : 0)).toFixed(1));
  const armorReduction = Math.min(
    0.62,
    0.04 + (st.def || 5) * 0.016 + (st.vit || 5) * 5e-3 + (avatar.build === "heavy" ? 0.05 : 0) + (weapon.armorBonus || 0) + gearArmor
  );
  const attackSpeedMult = Number((1 + Math.min(0.45, (st.dex || 5) * 0.022)).toFixed(2));
  const cooldownReduction = Number(Math.min(0.32, (st.dex || 5) * 0.015).toFixed(2));
  const lootMultiplier = Number((1 + (st.lck || 4) * 0.035).toFixed(2));
  return {
    maxHp,
    attackDamage,
    heavyDamage,
    moveSpeed,
    critChance,
    powerScale,
    maxEnergy,
    energyRegen,
    armorReduction,
    attackSpeedMult,
    cooldownReduction,
    lootMultiplier
  };
}
export function getRankLabel(rating) {
  if (rating >= 1850) return "\u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A";
  if (rating >= 1600) return "\u0627\u0644\u0628\u0644\u0627\u062A\u064A\u0646\u064A";
  if (rating >= 1350) return "\u0627\u0644\u0630\u0647\u0628\u064A";
  if (rating >= 1120) return "\u0627\u0644\u0641\u0636\u064A";
  return "\u0627\u0644\u0628\u0631\u0648\u0646\u0632\u064A";
}
export function xpForNextLevel(level) {
  return Math.round(180 * Math.pow(1.28, level - 1));
}
export const SECRET_WORLD_BOSSES = [
  {
    id: "sb_crimson_ignis",
    name: "\u0625\u063A\u0646\u064A\u0633 \u0627\u0644\u0642\u0631\u0645\u0632\u064A\u060C \u0648\u0631\u064A\u062B \u0627\u0644\u0628\u0631\u0643\u0627\u0646",
    title: "\u0633\u064A\u062F \u0627\u0644\u062D\u0645\u0645 \u0627\u0644\u0633\u0631\u064A",
    archetype: "magma_boss",
    hpMult: 1.55,
    dmgMult: 1.35,
    scaleMult: 1.38,
    chunkX: 4,
    chunkZ: 0,
    x: 960,
    z: 0,
    accentColor: "#F97316",
    auraColor: "#EF4444",
    rewardGold: 950,
    rewardGems: 28,
    rewardMarks: 45,
    rewardXp: 520,
    unlockTitle: "\u0633\u0644\u064A\u0644 \u0627\u0644\u062C\u062D\u064A\u0645 \u0627\u0644\u0642\u0631\u0645\u0632\u064A"
  },
  {
    id: "sb_abyss_malakor",
    name: "\u0645\u0627\u0644\u0627\u0643\u0648\u0631 \u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0635\u0645\u062A",
    title: "\u062A\u0627\u062C \u0627\u0644\u0641\u0631\u0627\u063A \u0627\u0644\u0623\u0628\u062F\u064A",
    archetype: "void_colossus",
    hpMult: 1.75,
    dmgMult: 1.45,
    scaleMult: 1.45,
    chunkX: -5,
    chunkZ: 2,
    x: -1200,
    z: 480,
    accentColor: "#A855F7",
    auraColor: "#C084FC",
    rewardGold: 1200,
    rewardGems: 35,
    rewardMarks: 60,
    rewardXp: 680,
    unlockTitle: "\u0642\u0627\u0647\u0631 \u0627\u0644\u0647\u0627\u0648\u064A\u0629 \u0627\u0644\u0635\u0627\u0645\u062A\u0629"
  },
  {
    id: "sb_glacier_valkor",
    name: "\u0641\u0627\u0644\u0643\u0648\u0631 \u062D\u0627\u0631\u0633 \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0623\u0632\u0644\u064A",
    title: "\u0634\u0628\u062D \u0627\u0644\u0642\u0637\u0628 \u0627\u0644\u062C\u0644\u064A\u062F\u064A",
    archetype: "wraith_knight",
    hpMult: 1.6,
    dmgMult: 1.4,
    scaleMult: 1.32,
    chunkX: 2,
    chunkZ: -6,
    x: 480,
    z: -1440,
    accentColor: "#38BDF8",
    auraColor: "#7DD3FC",
    rewardGold: 1080,
    rewardGems: 32,
    rewardMarks: 52,
    rewardXp: 600,
    unlockTitle: "\u0635\u0627\u0626\u062F \u0627\u0644\u0635\u0642\u064A\u0639 \u0627\u0644\u0623\u0632\u0644\u064A"
  },
  {
    id: "sb_obsidian_kranos",
    name: "\u0643\u0631\u0627\u0646\u0648\u0633 \u062D\u0627\u0631\u0633 \u0627\u0644\u0633\u062F\u064A\u0645 \u0627\u0644\u0639\u062A\u064A\u0642",
    title: "\u0639\u0645\u0644\u0627\u0642 \u0627\u0644\u0628\u0627\u0632\u0644\u062A \u0627\u0644\u0645\u062D\u0631\u0651\u0645",
    archetype: "obsidian_golem",
    hpMult: 1.9,
    dmgMult: 1.5,
    scaleMult: 1.5,
    chunkX: -6,
    chunkZ: -5,
    x: -1440,
    z: -1200,
    accentColor: "#EAB308",
    auraColor: "#FDE047",
    rewardGold: 1450,
    rewardGems: 42,
    rewardMarks: 75,
    rewardXp: 820,
    unlockTitle: "\u0641\u0627\u0631\u0633 \u0627\u0644\u0628\u0627\u0632\u0644\u062A \u0627\u0644\u0645\u0637\u0644\u0642"
  }
];
export const WORLD_EVENT_ZONES = [
  {
    id: "evt_ether_storm_east",
    name: "\u0639\u0627\u0635\u0641\u0629 \u0627\u0644\u0623\u062B\u064A\u0631 \u0627\u0644\u0639\u0638\u0645\u0649",
    kind: "ether_storm",
    description: "\u0627\u0636\u0637\u0631\u0627\u0628 \u0633\u062D\u0631\u064A \u064A\u062C\u0630\u0628 \u0645\u0648\u062C\u062A\u064A\u0646 \u0645\u0646 \u0648\u062D\u0648\u0634 \u0627\u0644\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062A\u0634\u0638\u064A\u0629 \u0641\u064A \u0633\u0647\u0648\u0644 \u0627\u0644\u0634\u0631\u0642.",
    chunkX: 2,
    chunkZ: 2,
    x: 480,
    z: 480,
    radius: 20,
    color: "#38BDF8",
    waveCount: 2,
    rewardGold: 520,
    rewardGems: 16,
    rewardMarks: 28,
    rewardXp: 340
  },
  {
    id: "evt_meteor_rift_south",
    name: "\u0635\u062F\u0639 \u0627\u0644\u0646\u064A\u0627\u0632\u0643 \u0627\u0644\u0645\u0644\u062A\u0647\u0628",
    kind: "meteor_rift",
    description: "\u0634\u0638\u0627\u064A\u0627 \u0646\u062C\u0645\u064A\u0629 \u0633\u0627\u0642\u0637\u0629 \u062A\u0641\u062A\u062D \u0628\u0648\u0627\u0628\u0629 \u0644\u0647\u062C\u0645\u0627\u062A \u0627\u0644\u0639\u0641\u0627\u0631\u064A\u062A \u0648\u0639\u0645\u0627\u0644\u0642\u0629 \u0627\u0644\u0635\u062E\u0631.",
    chunkX: -3,
    chunkZ: 4,
    x: -720,
    z: 960,
    radius: 20,
    color: "#F97316",
    waveCount: 2,
    rewardGold: 620,
    rewardGems: 19,
    rewardMarks: 34,
    rewardXp: 400
  },
  {
    id: "evt_blood_altar_west",
    name: "\u0645\u0630\u0628\u062D \u0627\u0644\u062F\u0645 \u0627\u0644\u0639\u062A\u064A\u0642",
    kind: "blood_altar",
    description: "\u0623\u0637\u0644\u0627\u0644 \u0645\u0644\u0639\u0648\u0646\u0629 \u062A\u0633\u062A\u062F\u0639\u064A \u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0623\u0637\u064A\u0627\u0641 \u0648\u0623\u0633\u064A\u0627\u062F \u0627\u0644\u0633\u0645\u0648\u0645 \u0644\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0643\u0646\u0632.",
    chunkX: -4,
    chunkZ: -2,
    x: -960,
    z: -480,
    radius: 22,
    color: "#EF4444",
    waveCount: 2,
    rewardGold: 740,
    rewardGems: 22,
    rewardMarks: 40,
    rewardXp: 460
  },
  {
    id: "evt_celestial_convergence",
    name: "\u062A\u0642\u0627\u0637\u0639 \u0627\u0644\u0628\u0644\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u0632\u0644\u064A",
    kind: "ether_storm",
    description: "\u0646\u0642\u0637\u0629 \u0627\u0644\u062A\u0642\u0627\u0621 \u0637\u0627\u0642\u0629 \u0627\u0644\u0642\u0627\u0631\u0629 \u0627\u0644\u062D\u0631\u0629 \u2014 \u062A\u062D\u062F\u064D \u0645\u0643\u062B\u0641 \u0644\u0645\u0642\u0627\u062A\u0644\u064A \u0627\u0644\u0631\u062A\u0628 \u0627\u0644\u0639\u0644\u064A\u0627.",
    chunkX: 5,
    chunkZ: -4,
    x: 1200,
    z: -960,
    radius: 22,
    color: "#A855F7",
    waveCount: 2,
    rewardGold: 860,
    rewardGems: 26,
    rewardMarks: 48,
    rewardXp: 540
  }
];
export const DAILY_CHALLENGE_POOL = [
  {
    id: "daily_slay_15",
    title: "\u062D\u0635\u0627\u062F \u0627\u0644\u0648\u062D\u0648\u0634 \u0627\u0644\u064A\u0648\u0645\u064A",
    description: "\u0627\u0647\u0632\u0645 15 \u0648\u062D\u0634\u0627\u064B \u0641\u064A \u0627\u0644\u0642\u0627\u0631\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629 \u0623\u0648 \u0648\u0636\u0639 \u0627\u0644\u063A\u0627\u0631\u0629.",
    metric: "kills",
    target: 15,
    rewardGold: 320,
    rewardGems: 12,
    rewardMarks: 18,
    rewardXp: 210
  },
  {
    id: "daily_crits_12",
    title: "\u062F\u0642\u0629 \u0627\u0644\u0646\u0635\u0644 \u0627\u0644\u062D\u0627\u0633\u0645\u0629",
    description: "\u0633\u062C\u0651\u0644 12 \u0636\u0631\u0628\u0629 \u062D\u0631\u062C\u0629 \u0641\u064A \u0623\u064A \u0645\u0639\u0631\u0643\u0629.",
    metric: "crits",
    target: 12,
    rewardGold: 280,
    rewardGems: 10,
    rewardMarks: 15,
    rewardXp: 180
  },
  {
    id: "daily_fusions_3",
    title: "\u0627\u0646\u0641\u062C\u0627\u0631 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062F\u0645\u062C\u0629",
    description: "\u0623\u0637\u0644\u0642 3 \u0645\u0647\u0627\u0631\u0627\u062A \u0642\u062A\u0627\u0644\u064A\u0629 \u0641\u0627\u0626\u0642\u0629 \u0623\u0648 \u0645\u0647\u0627\u0631\u0627\u062A \u062F\u0645\u062C.",
    metric: "fusions",
    target: 3,
    rewardGold: 350,
    rewardGems: 14,
    rewardMarks: 20,
    rewardXp: 240
  },
  {
    id: "daily_boss_1",
    title: "\u0625\u0633\u0642\u0627\u0637 \u0639\u0645\u0644\u0627\u0642",
    description: "\u0627\u0647\u0632\u0645 \u0632\u0639\u064A\u0645\u0627\u064B \u0648\u0627\u062D\u062F\u0627\u064B \u0623\u0648 \u0632\u0639\u064A\u0645\u0627\u064B \u0633\u0631\u064A\u0627\u064B \u0627\u0644\u064A\u0648\u0645.",
    metric: "bossKills",
    target: 1,
    rewardGold: 420,
    rewardGems: 16,
    rewardMarks: 25,
    rewardXp: 280
  },
  {
    id: "daily_chunks_4",
    title: "\u0645\u0633\u062D \u0642\u0637\u0627\u0639\u0627\u062A \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
    description: "\u0627\u0633\u062A\u0643\u0634\u0641 4 \u0642\u0637\u0627\u0639\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0641\u064A \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0628\u062B\u0648\u062B\u0629.",
    metric: "chunks",
    target: 4,
    rewardGold: 300,
    rewardGems: 11,
    rewardMarks: 18,
    rewardXp: 200
  },
  {
    id: "daily_gather_5",
    title: "\u062C\u0627\u0645\u0639 \u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0642\u0627\u0631\u0629",
    description: "\u0627\u062C\u0645\u0639 5 \u0645\u0648\u0627\u0631\u062F (\u062E\u0627\u0645\u060C \u0628\u0644\u0648\u0631\u0627\u062A\u060C \u0623\u0648 \u0623\u0639\u0634\u0627\u0628) \u0645\u0646 \u0625\u064A\u062B\u064A\u0631\u064A\u0627.",
    metric: "gather",
    target: 5,
    rewardGold: 260,
    rewardGems: 10,
    rewardMarks: 16,
    rewardXp: 170
  },
  {
    id: "daily_pvp_1",
    title: "\u062A\u0641\u0648\u0651\u0642 \u0627\u0644\u0646\u0632\u0627\u0644",
    description: "\u0627\u062D\u0633\u0645 \u0646\u0632\u0627\u0644 \u062A\u0646\u0627\u0641\u0633 \u0648\u0627\u062D\u062F \u0644\u0635\u0627\u0644\u062D\u0643.",
    metric: "pvpWins",
    target: 1,
    rewardGold: 390,
    rewardGems: 15,
    rewardMarks: 24,
    rewardXp: 260
  },
  {
    id: "daily_slay_25",
    title: "\u062A\u0637\u0647\u064A\u0631 \u0627\u0644\u062D\u062F\u0648\u062F",
    description: "\u0627\u0647\u0632\u0645 25 \u0648\u062D\u0634\u0627\u064B \u0644\u062D\u0645\u0627\u064A\u0629 \u0637\u0631\u0642 \u0627\u0644\u0642\u0648\u0627\u0641\u0644.",
    metric: "kills",
    target: 25,
    rewardGold: 480,
    rewardGems: 18,
    rewardMarks: 30,
    rewardXp: 320
  }
];
export function getTodayDateKey() {
  const now = /* @__PURE__ */ new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
export function pickDailyChallengesForDate(dateKey) {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = hash * 31 + dateKey.charCodeAt(i) >>> 0;
  }
  const pool = [...DAILY_CHALLENGE_POOL];
  const picked = [];
  for (let i = 0; i < 3 && pool.length > 0; i++) {
    const idx = (hash + i * 7) % pool.length;
    const def = pool.splice(idx, 1)[0];
    picked.push({
      ...def,
      current: 0,
      claimed: false
    });
  }
  return picked;
}
export const ACHIEVEMENT_DEFS = [
  {
    id: "ach_first_blood_50",
    title: "\u062C\u0644\u0627\u062F \u062C\u062D\u0627\u0641\u0644 \u0625\u064A\u062B\u064A\u0631\u064A\u0627",
    description: "\u0627\u0647\u0632\u0645 50 \u0648\u062D\u0634\u0627\u064B \u0641\u064A \u0645\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u064A\u0627\u062F\u064A\u0646 \u0648\u0627\u0644\u0642\u0627\u0631\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629.",
    metric: "kills",
    target: 50,
    rewardTitle: "\u062C\u0644\u0627\u062F \u0627\u0644\u0648\u062D\u0648\u0634",
    rewardGold: 450,
    rewardGems: 15,
    rewardMarks: 25
  },
  {
    id: "ach_slayer_250",
    title: "\u0639\u0627\u0635\u0641\u0629 \u0627\u0644\u0646\u0635\u0644 \u0627\u0644\u0623\u0628\u062F\u064A\u0629",
    description: "\u0627\u0647\u0632\u0645 250 \u0648\u062D\u0634\u0627\u064B \u0644\u062A\u062B\u0628\u064A\u062A \u0647\u064A\u0645\u0646\u062A\u0643 \u0627\u0644\u0642\u062A\u0627\u0644\u064A\u0629.",
    metric: "kills",
    target: 250,
    rewardTitle: "\u0633\u064A\u062F \u0627\u0644\u0645\u0630\u0627\u0628\u062D",
    rewardGold: 1100,
    rewardGems: 35,
    rewardMarks: 60
  },
  {
    id: "ach_crit_master",
    title: "\u0639\u064A\u0646 \u0627\u0644\u0635\u064A\u0627\u062F \u0627\u0644\u0645\u0644\u0643\u064A",
    description: "\u0646\u0641\u0651\u0630 40 \u0636\u0631\u0628\u0629 \u062D\u0631\u062C\u0629 \u0642\u0627\u062A\u0644\u0629 \u0639\u0628\u0631 \u0645\u0647\u0627\u0631\u0627\u062A\u0643 \u0648\u0633\u0644\u0627\u062D\u0643.",
    metric: "crits",
    target: 40,
    rewardTitle: "\u0639\u064A\u0646 \u0627\u0644\u0635\u0642\u0631 \u0627\u0644\u062D\u0627\u0633\u0645\u0629",
    rewardGold: 620,
    rewardGems: 22,
    rewardMarks: 35
  },
  {
    id: "ach_fusion_architect",
    title: "\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u062F\u0645\u062C \u0627\u0644\u0633\u0645\u0627\u0648\u064A",
    description: "\u0623\u0637\u0644\u0642 15 \u0645\u0647\u0627\u0631\u0629 \u062F\u0645\u062C \u0623\u0648 \u0642\u062F\u0631\u0629 \u0642\u062A\u0627\u0644\u064A\u0629 \u0642\u0635\u0648\u0649.",
    metric: "fusions",
    target: 15,
    rewardTitle: "\u062D\u0643\u064A\u0645 \u0627\u0644\u062F\u0645\u062C \u0627\u0644\u0645\u0644\u0643\u064A",
    rewardGold: 700,
    rewardGems: 24,
    rewardMarks: 40
  },
  {
    id: "ach_boss_hunter",
    title: "\u0645\u064F\u062D\u0637\u0651\u0645 \u0627\u0644\u062A\u0648\u0627\u062C\u062F \u0627\u0644\u0637\u0627\u063A\u064A",
    description: "\u0627\u0647\u0632\u0645 5 \u0632\u0639\u0645\u0627\u0621 \u0623\u0642\u0648\u064A\u0627\u0621 \u0641\u064A \u0627\u0644\u063A\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0633\u0627\u062D\u0627\u062A.",
    metric: "bossKills",
    target: 5,
    rewardTitle: "\u0645\u064F\u0628\u064A\u062F \u0627\u0644\u0639\u0645\u0627\u0644\u0642\u0629",
    rewardGold: 850,
    rewardGems: 28,
    rewardMarks: 48
  },
  {
    id: "ach_secret_boss_first",
    title: "\u0643\u0627\u0634\u0641 \u0627\u0644\u0645\u0632\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062D\u0631\u0651\u0645\u0629",
    description: "\u0627\u0647\u0632\u0645 \u0623\u0648\u0644 \u0632\u0639\u064A\u0645 \u0633\u0631\u064A \u0641\u064A \u0623\u0637\u0631\u0627\u0641 \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627.",
    metric: "secretBosses",
    target: 1,
    rewardTitle: "\u0635\u0627\u0626\u062F \u0627\u0644\u0623\u0633\u0627\u0637\u064A\u0631 \u0627\u0644\u0633\u0631\u064A\u0629",
    rewardGold: 900,
    rewardGems: 30,
    rewardMarks: 55
  },
  {
    id: "ach_secret_boss_all",
    title: "\u0633\u064A\u062F \u0627\u0644\u0623\u062E\u062A\u0627\u0645 \u0627\u0644\u0623\u0631\u0628\u0639\u0629",
    description: "\u0627\u0647\u0632\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0632\u0639\u0645\u0627\u0621 \u0627\u0644\u0633\u0631\u064A\u064A\u0646 \u0627\u0644\u0623\u0631\u0628\u0639\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0631\u0629.",
    metric: "secretBosses",
    target: 4,
    rewardTitle: "\u0627\u0644\u0639\u0627\u0647\u0644 \u0627\u0644\u0645\u0637\u0644\u0642 \u0644\u0625\u064A\u062B\u064A\u0631\u064A\u0627",
    rewardGold: 2200,
    rewardGems: 75,
    rewardMarks: 140
  },
  {
    id: "ach_world_events",
    title: "\u062D\u0627\u0645\u064A \u062A\u0648\u0627\u0632\u0646 \u0627\u0644\u0623\u062B\u064A\u0631",
    description: "\u0623\u0643\u0645\u0644 3 \u0645\u0646\u0627\u0637\u0642 \u0623\u062D\u062F\u0627\u062B \u062F\u064A\u0646\u0627\u0645\u064A\u0643\u064A\u0629 \u0641\u064A \u0627\u0644\u0642\u0627\u0631\u0629 \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629.",
    metric: "worldEvents",
    target: 3,
    rewardTitle: "\u062D\u0627\u0631\u0633 \u0627\u0644\u0635\u062F\u0639 \u0627\u0644\u0623\u0632\u0644\u064A",
    rewardGold: 980,
    rewardGems: 32,
    rewardMarks: 58
  },
  {
    id: "ach_chunk_explorer",
    title: "\u0631\u0651\u0633\u0627\u0645 \u0627\u0644\u062E\u0631\u0627\u0626\u0637 \u0627\u0644\u0645\u062C\u0647\u0648\u0644\u0629",
    description: "\u0627\u0641\u062A\u062D \u0648\u0628\u062B 20 \u0642\u0637\u0627\u0639\u0627\u064B \u0641\u064A \u0642\u0627\u0631\u0629 \u0625\u064A\u062B\u064A\u0631\u064A\u0627 \u0627\u0644\u0634\u0627\u0633\u0639\u0629.",
    metric: "chunks",
    target: 20,
    rewardTitle: "\u0631\u0627\u0626\u062F \u0627\u0644\u0622\u0641\u0627\u0642 \u0627\u0644\u0645\u0626\u0629",
    rewardGold: 750,
    rewardGems: 25,
    rewardMarks: 45
  },
  {
    id: "ach_arena_rating",
    title: "\u0639\u0631\u0634 \u0627\u0644\u0623\u0628\u0637\u0627\u0644 \u0627\u0644\u0623\u0633\u0637\u0648\u0631\u064A",
    description: "\u0648\u0635\u0644 \u0628\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0646\u0632\u0627\u0644 \u0625\u0644\u0649 1450 \u0646\u0642\u0637\u0629.",
    metric: "rating",
    target: 1450,
    rewardTitle: "\u0628\u0637\u0644 \u0627\u0644\u0645\u064A\u062F\u0627\u0646 \u0627\u0644\u0645\u062A\u0648\u0651\u062C",
    rewardGold: 1200,
    rewardGems: 40,
    rewardMarks: 70
  }
];
export const DEFAULT_TITLES = [
  { id: "t_novice", label: "\u0645\u0628\u0627\u0631\u0632 \u0646\u0627\u0634\u0626", source: "\u0644\u0642\u0628 \u0627\u0644\u0628\u062F\u0627\u064A\u0629", accentColor: "#94A3B8" },
  { id: "t_summoned", label: "\u0627\u0644\u0628\u0637\u0644 \u0627\u0644\u0645\u0633\u062A\u062F\u0639\u0649", source: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621", accentColor: "#38BDF8" },
  { id: "t_sword", label: "\u0633\u064A\u0641 \u0625\u064A\u062B\u064A\u0631\u064A\u0627", source: "\u0644\u0642\u0628 \u0627\u0644\u062D\u0631\u0633 \u0627\u0644\u0645\u0644\u0643\u064A", accentColor: "#F59E0B" }
];
export const EXCLUSIVE_TITLES = [
  ...DEFAULT_TITLES,
  ...ACHIEVEMENT_DEFS.map((a) => ({
    id: `t_${a.id}`,
    label: a.rewardTitle,
    source: `\u0625\u0646\u062C\u0627\u0632: ${a.title}`,
    accentColor: "#EAB308"
  })),
  ...SECRET_WORLD_BOSSES.filter((b) => Boolean(b.unlockTitle)).map((b) => ({
    id: `t_${b.id}`,
    label: b.unlockTitle,
    source: `\u0632\u0639\u064A\u0645 \u0633\u0631\u064A: ${b.name}`,
    accentColor: b.accentColor
  }))
];
