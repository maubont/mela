import type { AiModeDefinition, NavItem, PaymentRail, PhaseModule } from "@/types";

export const siteConfig = {
  name: "Melany",
  alternativeName: "Mela Vault",
  description:
    "Una plataforma de acceso reservado construida alrededor de exclusividad, cercanía y una experiencia visual cuidada.",
  creatorName: "Melany",
  locale: "es-CO",
} as const;

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Acceso", href: "/#acceso" },
  { label: "Mela", href: "/#mela" },
];

export const phaseModules: PhaseModule[] = [
  {
    eyebrow: "Core",
    title: "Identity, wallets, and compliance",
    description:
      "The user layer is ready for customers, creator operations, token balances, age checks, KYC, and audit trails.",
    bullets: [
      "User, profile, creator profile, and auth-compatible account models",
      "Token wallet plus immutable token ledger entries",
      "Age verification, KYC, user consents, notifications, and audit logs",
    ],
  },
  {
    eyebrow: "Commerce",
    title: "Payments, crypto, and withdrawals",
    description:
      "The commerce domain supports token top-ups, content orders, crypto rails, Colombia direct payments, and creator payouts.",
    bullets: [
      "Orders, order items, payment transactions, and webhook tracking",
      "Token packages, subscription plans, service offerings, and direct payment review",
      "Payout methods, creator balance ledger, withdrawals, and settlement allocations",
    ],
  },
  {
    eyebrow: "Engagement",
    title: "Content, chat, live, and AI memory",
    description:
      "Everything needed for paid content, private chat, unlocks, live sessions, and the Mela AI operator is scaffolded in the schema.",
    bullets: [
      "Content library, media assets, grants, reviews, and custom requests",
      "Conversations, participants, messages, PPV unlocks, and tipping",
      "AI agent profile, runs, memories, automation rules, and live session telemetry",
    ],
  },
];

export const paymentRails: PaymentRail[] = [
  {
    label: "CCBill / Segpay",
    focus: "International cards",
    description:
      "Primary acquisition rail for fans buying token bundles with adult-friendly card processors.",
  },
  {
    label: "USDT / BTC",
    focus: "Crypto checkout",
    description:
      "Low-friction deposits and payouts with explicit support for USDT priority and Bitcoin fallback.",
  },
  {
    label: "Colombia direct pay",
    focus: "Local conversion",
    description:
      "Manual proof-based approval flow for Bancolombia, Nequi, and other local settlement channels.",
  },
];

export const aiModes: AiModeDefinition[] = [
  { label: "Customer support", objective: "Resolve fan questions and move buyers toward checkout." },
  { label: "Content creator", objective: "Draft ideas, scripts, promos, and campaign angles." },
  { label: "Strategy", objective: "Spot VIP signals, retention gaps, and monetization opportunities." },
  { label: "Operations", objective: "Assist with fulfillment, follow-ups, and payout workflows." },
  { label: "Roleplay", objective: "Keep immersion controlled while respecting creator boundaries." },
];
