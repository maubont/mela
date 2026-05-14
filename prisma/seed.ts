import {
  AutomationAction,
  AutomationTrigger,
  ContentAccessType,
  ContentType,
  ContentVisibility,
  CreatorAvailability,
  Prisma,
  PrismaClient,
  ServiceKind,
  SubscriptionInterval,
  UserRole,
  UserStatus,
} from "@prisma/client";

import { melaSystemPromptBlueprint } from "../lib/ai/mela-system-prompt";

const prisma = new PrismaClient();

const creatorEmail = "melany@melanypremium.local";

const tokenPackages = [
  {
    code: "mela-starter",
    name: "Starter Glow",
    description: "Low-friction entry package for first-time fans.",
    tokens: 120,
    bonusTokens: 0,
    totalTokens: 120,
    priceUsd: new Prisma.Decimal("14.99"),
    priceCop: new Prisma.Decimal("59000"),
    isFeatured: false,
    sortOrder: 1,
  },
  {
    code: "mela-signature",
    name: "Signature Pass",
    description: "Balanced bundle for regular unlocks, tips, and chat.",
    tokens: 350,
    bonusTokens: 35,
    totalTokens: 385,
    priceUsd: new Prisma.Decimal("39.99"),
    priceCop: new Prisma.Decimal("154000"),
    isFeatured: true,
    sortOrder: 2,
  },
  {
    code: "mela-vip-vault",
    name: "VIP Vault",
    description: "High-value bundle optimized for calls, customs, and live tipping.",
    tokens: 900,
    bonusTokens: 140,
    totalTokens: 1040,
    priceUsd: new Prisma.Decimal("89.99"),
    priceCop: new Prisma.Decimal("349000"),
    isFeatured: false,
    sortOrder: 3,
  },
];

const serviceOfferings = [
  {
    slug: "melany-private-chat",
    kind: ServiceKind.PRIVATE_CHAT,
    name: "Private Chat Session",
    description: "High-touch chat time with priority replies and upsell hooks.",
    basePriceTokens: 60,
    durationMinutes: 15,
    turnaroundHours: null,
    inventoryPerDay: 18,
    isHighlighted: true,
  },
  {
    slug: "melany-video-call",
    kind: ServiceKind.VIDEO_CALL,
    name: "Video Call Experience",
    description: "One-to-one booking with token-gated scheduling.",
    basePriceTokens: 320,
    durationMinutes: 20,
    turnaroundHours: null,
    inventoryPerDay: 6,
    isHighlighted: true,
  },
  {
    slug: "melany-custom-video",
    kind: ServiceKind.CUSTOM_VIDEO,
    name: "Custom Video Request",
    description: "Personalized content request with fulfillment tracking and revisions.",
    basePriceTokens: 780,
    durationMinutes: null,
    turnaroundHours: 72,
    inventoryPerDay: 4,
    isHighlighted: false,
  },
];

async function main() {
  const creator = await prisma.user.upsert({
    where: { email: creatorEmail },
    update: {
      role: UserRole.CREATOR,
      status: UserStatus.ACTIVE,
      locale: "es-CO",
      timezone: "America/Bogota",
      preferredCurrency: "USD",
      isAgeVerified: true,
      emailVerifiedAt: new Date(),
    },
    create: {
      email: creatorEmail,
      username: "melany",
      role: UserRole.CREATOR,
      status: UserStatus.ACTIVE,
      locale: "es-CO",
      timezone: "America/Bogota",
      preferredCurrency: "USD",
      countryCode: "CO",
      isAgeVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.userProfile.upsert({
    where: { userId: creator.id },
    update: {
      displayName: "Melany",
      headline: "Editorial creator brand, token-first, global-ready",
      bio: "Luxury token-first creator brand with curated content, live monetization, and AI-assisted fan ops.",
      city: "Bogota",
      country: "Colombia",
      pronouns: "ella / she",
      languages: ["es", "en"],
      socialLinks: {
        instagram: "@melany",
        telegram: "@melanypremium",
      },
    },
    create: {
      userId: creator.id,
      displayName: "Melany",
      headline: "Editorial creator brand, token-first, global-ready",
      bio: "Luxury token-first creator brand with curated content, live monetization, and AI-assisted fan ops.",
      city: "Bogota",
      country: "Colombia",
      pronouns: "ella / she",
      languages: ["es", "en"],
      socialLinks: {
        instagram: "@melany",
        telegram: "@melanypremium",
      },
    },
  });

  await prisma.creatorProfile.upsert({
    where: { userId: creator.id },
    update: {
      slug: "melany",
      stageName: "Melany",
      brandName: "Melany",
      tagline: "Exclusive experiences powered by tokens.",
      shortBio: "Curated content, private access, and high-conversion fan care.",
      fullBio:
        "Melany is structured as a token-first creator business with global card rails, crypto support, and a local Colombia payment workflow.",
      status: CreatorAvailability.ONLINE,
      isFeatured: true,
      isVerified: true,
      platformFeeBps: 2000,
      acceptingDirectColombiaPayments: true,
      chatRateTokens: 30,
      videoCallRateTokens: 250,
      customVideoBaseTokens: 600,
      subscriptionBaseTokens: 700,
      minimumTipTokens: 20,
      languages: ["es", "en"],
      publicFlags: {
        liveReady: true,
        aiEnabled: true,
        directPaymentColombia: true,
      },
    },
    create: {
      userId: creator.id,
      slug: "melany",
      stageName: "Melany",
      brandName: "Melany",
      tagline: "Exclusive experiences powered by tokens.",
      shortBio: "Curated content, private access, and high-conversion fan care.",
      fullBio:
        "Melany is structured as a token-first creator business with global card rails, crypto support, and a local Colombia payment workflow.",
      status: CreatorAvailability.ONLINE,
      isFeatured: true,
      isVerified: true,
      platformFeeBps: 2000,
      acceptingDirectColombiaPayments: true,
      chatRateTokens: 30,
      videoCallRateTokens: 250,
      customVideoBaseTokens: 600,
      subscriptionBaseTokens: 700,
      minimumTipTokens: 20,
      languages: ["es", "en"],
      publicFlags: {
        liveReady: true,
        aiEnabled: true,
        directPaymentColombia: true,
      },
    },
  });

  await prisma.tokenWallet.upsert({
    where: { userId: creator.id },
    update: {},
    create: {
      userId: creator.id,
    },
  });

  await prisma.creatorBalance.upsert({
    where: { creatorId: creator.id },
    update: {},
    create: {
      creatorId: creator.id,
    },
  });

  const agent = await prisma.aiAgentProfile.upsert({
    where: { creatorId: creator.id },
    update: {
      name: "Mela",
      assistantHandle: "mela-concierge",
      enabled: true,
      autoReplyEnabled: true,
      longTermMemoryEnabled: true,
      defaultModel: process.env.MELA_DEFAULT_MODEL || null,
      temperature: new Prisma.Decimal("0.85"),
      systemPrompt: melaSystemPromptBlueprint,
      modeConfig: {
        customerSupport: true,
        contentCreator: true,
        strategy: true,
        operations: true,
        roleplay: true,
      },
      safetyConfig: {
        requireAgeVerifiedUsers: true,
        enforceCreatorBoundaries: true,
        escalateHighValueBuyers: true,
      },
      escalationKeywords: ["custom", "videollamada", "refund", "vip", "urgent"],
    },
    create: {
      creatorId: creator.id,
      name: "Mela",
      assistantHandle: "mela-concierge",
      enabled: true,
      autoReplyEnabled: true,
      longTermMemoryEnabled: true,
      defaultModel: process.env.MELA_DEFAULT_MODEL || null,
      temperature: new Prisma.Decimal("0.85"),
      systemPrompt: melaSystemPromptBlueprint,
      modeConfig: {
        customerSupport: true,
        contentCreator: true,
        strategy: true,
        operations: true,
        roleplay: true,
      },
      safetyConfig: {
        requireAgeVerifiedUsers: true,
        enforceCreatorBoundaries: true,
        escalateHighValueBuyers: true,
      },
      escalationKeywords: ["custom", "videollamada", "refund", "vip", "urgent"],
    },
  });

  for (const rule of [
    {
      name: "Welcome new subscribers",
      trigger: AutomationTrigger.NEW_SUBSCRIBER,
      action: AutomationAction.AUTO_REPLY,
      priority: 10,
      conditions: { subscriptionStatus: "ACTIVE" },
      actionConfig: {
        tone: "warm",
        objective: "welcome-and-upsell",
      },
    },
    {
      name: "Recover abandoned carts",
      trigger: AutomationTrigger.ABANDONED_CART,
      action: AutomationAction.OFFER_DISCOUNT,
      priority: 20,
      conditions: { minutesIdle: 30 },
      actionConfig: {
        incentive: "small-token-bonus",
        objective: "recover-checkout",
      },
    },
    {
      name: "Escalate VIP intent",
      trigger: AutomationTrigger.INCOMING_MESSAGE,
      action: AutomationAction.ESCALATE_TO_CREATOR,
      priority: 5,
      conditions: { vipSignals: true },
      actionConfig: {
        notifyCreator: true,
        objective: "protect-close-rate",
      },
    },
  ]) {
    await prisma.aiAutomationRule.upsert({
      where: {
        agentId_name: {
          agentId: agent.id,
          name: rule.name,
        },
      },
      update: {
        trigger: rule.trigger,
        action: rule.action,
        priority: rule.priority,
        isActive: true,
        conditions: rule.conditions,
        actionConfig: rule.actionConfig,
      },
      create: {
        agentId: agent.id,
        name: rule.name,
        trigger: rule.trigger,
        action: rule.action,
        priority: rule.priority,
        isActive: true,
        conditions: rule.conditions,
        actionConfig: rule.actionConfig,
      },
    });
  }

  for (const pack of tokenPackages) {
    await prisma.tokenPackage.upsert({
      where: { code: pack.code },
      update: {
        creatorId: creator.id,
        name: pack.name,
        description: pack.description,
        tokens: pack.tokens,
        bonusTokens: pack.bonusTokens,
        totalTokens: pack.totalTokens,
        priceUsd: pack.priceUsd,
        priceCop: pack.priceCop,
        isFeatured: pack.isFeatured,
        isActive: true,
        sortOrder: pack.sortOrder,
      },
      create: {
        creatorId: creator.id,
        ...pack,
        isActive: true,
      },
    });
  }

  for (const offering of serviceOfferings) {
    await prisma.serviceOffering.upsert({
      where: { slug: offering.slug },
      update: {
        creatorId: creator.id,
        kind: offering.kind,
        name: offering.name,
        description: offering.description,
        basePriceTokens: offering.basePriceTokens,
        durationMinutes: offering.durationMinutes,
        turnaroundHours: offering.turnaroundHours,
        inventoryPerDay: offering.inventoryPerDay,
        isHighlighted: offering.isHighlighted,
        isActive: true,
      },
      create: {
        creatorId: creator.id,
        ...offering,
        isActive: true,
      },
    });
  }

  await prisma.subscriptionPlan.upsert({
    where: { slug: "melany-inner-circle" },
    update: {
      creatorId: creator.id,
      name: "Inner Circle",
      description: "Monthly private access for recurring fans and retention offers.",
      priceTokens: 700,
      billingInterval: SubscriptionInterval.MONTHLY,
      trialDays: 0,
      isActive: true,
      sortOrder: 1,
      perks: {
        priorityChat: true,
        gatedDrops: true,
        subscriberLiveAccess: true,
      },
    },
    create: {
      creatorId: creator.id,
      slug: "melany-inner-circle",
      name: "Inner Circle",
      description: "Monthly private access for recurring fans and retention offers.",
      priceTokens: 700,
      billingInterval: SubscriptionInterval.MONTHLY,
      trialDays: 0,
      isActive: true,
      sortOrder: 1,
      perks: {
        priorityChat: true,
        gatedDrops: true,
        subscriberLiveAccess: true,
      },
    },
  });

  await prisma.contentItem.upsert({
    where: { slug: "melany-welcome-drop" },
    update: {
      creatorId: creator.id,
      title: "Welcome Drop",
      excerpt: "Phase 1 seed content to validate token access and public catalog flows.",
      description:
        "Initial sample content record used to validate pricing, publishing states, and future unlock logic.",
      type: ContentType.PHOTOSET,
      accessType: ContentAccessType.TOKEN_UNLOCK,
      visibility: ContentVisibility.PUBLISHED,
      priceTokens: 180,
      isExplicit: true,
      allowReviews: true,
      publishedAt: new Date(),
    },
    create: {
      creatorId: creator.id,
      slug: "melany-welcome-drop",
      title: "Welcome Drop",
      excerpt: "Phase 1 seed content to validate token access and public catalog flows.",
      description:
        "Initial sample content record used to validate pricing, publishing states, and future unlock logic.",
      type: ContentType.PHOTOSET,
      accessType: ContentAccessType.TOKEN_UNLOCK,
      visibility: ContentVisibility.PUBLISHED,
      priceTokens: 180,
      isExplicit: true,
      allowReviews: true,
      publishedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
