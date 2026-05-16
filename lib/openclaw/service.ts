import {
  AuditActorType,
  ContentVisibility,
  ConversationStatus,
  MemoryType,
  NotificationStatus,
  NotificationType,
  OrderStatus,
  OrderType,
  PaymentStatus,
  ParticipantRole,
  Prisma,
  UserRole,
} from "@prisma/client";

import type {
  OpenClawAlertRequest,
  OpenClawGateway,
  OpenClawIntent,
  OpenClawProposedActionRequest,
  OpenClawReplyDraftRequest,
} from "@/lib/openclaw/contracts";
import {
  getMelaIntentLabel,
  getMelaIntentRecommendation,
  normalizeMelaIntent,
} from "@/lib/mela/intents";
import { prisma } from "@/lib/prisma";

const PAID_ORDER_STATUSES = [OrderStatus.PAID, OrderStatus.FULFILLED];
const PENDING_PAYMENT_STATUSES = [
  PaymentStatus.PENDING,
  PaymentStatus.REQUIRES_ACTION,
  PaymentStatus.REQUIRES_REVIEW,
  PaymentStatus.PROCESSING,
];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function toNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

async function getPrimaryCreator() {
  const creator = await prisma.user.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      aiAgentProfile: {
        select: {
          name: true,
        },
      },
      creatorProfile: {
        select: {
          stageName: true,
        },
      },
      email: true,
      role: true,
    },
    where: {
      creatorProfile: {
        isNot: null,
      },
      role: UserRole.CREATOR,
    },
  });

  if (!creator) {
    throw new Error("No creator user is configured for OpenClaw.");
  }

  return creator;
}

function buildAlerts(input: {
  hasUpcomingLive: boolean;
  pendingPayments: number;
  replayPending: boolean;
}) {
  const alerts: string[] = [];

  if (!input.hasUpcomingLive) {
    alerts.push("No hay live programado o activo para las proximas horas.");
  }

  if (input.pendingPayments > 0) {
    alerts.push(
      `Hay ${input.pendingPayments} pagos pendientes o en revision manual.`,
    );
  }

  if (input.replayPending) {
    alerts.push("Hay un replay reciente sin asset final publicado.");
  }

  return alerts;
}

export async function getOpenClawDailyBrief() {
  const creator = await getPrimaryCreator();
  const now = new Date();
  const since = new Date(now.getTime() - DAY_IN_MS);
  const recentWindow = new Date(now.getTime() - 7 * DAY_IN_MS);
  const replyWindow = new Date(now.getTime() - 2 * DAY_IN_MS);

  const [
    activeLive,
    nextLive,
    latestEndedWithoutReplay,
    salesAgg,
    tokenPackOrders,
    tipsAgg,
    pendingPayments,
    draftDrops,
    fansNeedingFollowup,
  ] = await prisma.$transaction([
    prisma.liveSession.findFirst({
      orderBy: {
        startedAt: "desc",
      },
      select: {
        id: true,
        replayAssetId: true,
        scheduledStartAt: true,
        startedAt: true,
        status: true,
        title: true,
      },
      where: {
        creatorId: creator.id,
        status: "LIVE",
      },
    }),
    prisma.liveSession.findFirst({
      orderBy: {
        scheduledStartAt: "asc",
      },
      select: {
        id: true,
        scheduledStartAt: true,
        status: true,
        title: true,
      },
      where: {
        creatorId: creator.id,
        scheduledStartAt: {
          gte: now,
        },
        status: "SCHEDULED",
      },
    }),
    prisma.liveSession.findFirst({
      orderBy: {
        endedAt: "desc",
      },
      select: {
        endedAt: true,
        id: true,
        title: true,
      },
      where: {
        creatorId: creator.id,
        endedAt: {
          gte: since,
        },
        replayAssetId: null,
        status: "ENDED",
      },
    }),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        creatorId: creator.id,
        paidAt: {
          gte: since,
        },
        status: {
          in: PAID_ORDER_STATUSES,
        },
      },
    }),
    prisma.order.count({
      where: {
        creatorId: creator.id,
        paidAt: {
          gte: since,
        },
        status: {
          in: PAID_ORDER_STATUSES,
        },
        type: OrderType.TOKEN_TOP_UP,
      },
    }),
    prisma.tip.aggregate({
      _count: {
        _all: true,
      },
      _sum: {
        tokensAmount: true,
      },
      where: {
        createdAt: {
          gte: since,
        },
        creatorId: creator.id,
      },
    }),
    prisma.paymentTransaction.count({
      where: {
        creatorId: creator.id,
        status: {
          in: PENDING_PAYMENT_STATUSES,
        },
      },
    }),
    prisma.contentItem.count({
      where: {
        creatorId: creator.id,
        visibility: {
          in: [ContentVisibility.DRAFT, ContentVisibility.SCHEDULED],
        },
      },
    }),
    prisma.conversation.count({
      where: {
        creatorId: creator.id,
        customer: {
          customerOrders: {
            some: {
              creatorId: creator.id,
              status: {
                in: PAID_ORDER_STATUSES,
              },
            },
          },
        },
        lastMessageAt: {
          gte: recentWindow,
          lte: replyWindow,
        },
        status: ConversationStatus.ACTIVE,
      },
    }),
  ]);

  const live = activeLive
    ? {
        replayPending: false,
        startsAt: activeLive.startedAt?.toISOString() ?? null,
        status: "live",
        title: activeLive.title,
      }
    : nextLive
      ? {
          replayPending: false,
          startsAt: nextLive.scheduledStartAt?.toISOString() ?? null,
          status: "scheduled",
          title: nextLive.title,
        }
      : {
          replayPending: Boolean(latestEndedWithoutReplay),
          startsAt: null,
          status: "offline",
          title: null,
        };

  return {
    alerts: buildAlerts({
      hasUpcomingLive: Boolean(activeLive || nextLive),
      pendingPayments,
      replayPending: Boolean(latestEndedWithoutReplay),
    }),
    date: now.toISOString(),
    fansNeedingFollowup,
    live,
    mela: creator.aiAgentProfile?.name ?? "Mela",
    sales: {
      grossUsd: toNumber(salesAgg._sum.totalAmount),
      tipTokens: tipsAgg._sum.tokensAmount ?? 0,
      tipsCount: tipsAgg._count._all,
      tokenPacks: tokenPackOrders,
    },
    stageName: creator.creatorProfile?.stageName ?? "Melany",
    summaryFlags: {
      draftDrops,
      pendingPayments,
      replayPending: Boolean(latestEndedWithoutReplay),
    },
  };
}

function deriveFanTier(orderCount: number, totalSpentUsd: number) {
  if (orderCount >= 6 || totalSpentUsd >= 250) {
    return "vip";
  }

  if (orderCount >= 3 || totalSpentUsd >= 100) {
    return "returning-buyer";
  }

  if (orderCount >= 1) {
    return "new-buyer";
  }

  return "curious";
}

function deriveConversationMood(lastConversationAt?: Date | null) {
  if (!lastConversationAt) {
    return "cold";
  }

  const ageInMs = Date.now() - lastConversationAt.getTime();

  if (ageInMs <= DAY_IN_MS) {
    return "warm";
  }

  if (ageInMs <= 3 * DAY_IN_MS) {
    return "curious";
  }

  return "cool";
}

function deriveInterests(
  memories: Array<{ title: string; type: MemoryType }>,
  lastUnlockTitle?: string | null,
) {
  const interestSet = new Set<string>();

  for (const memory of memories) {
    if (
      memory.type === MemoryType.CONTENT_PREFERENCE ||
      memory.type === MemoryType.PREFERENCE ||
      memory.type === MemoryType.PURCHASE_PATTERN
    ) {
      interestSet.add(memory.title);
    }
  }

  if (lastUnlockTitle) {
    interestSet.add(lastUnlockTitle);
  }

  return Array.from(interestSet).slice(0, 5);
}

export async function getOpenClawFanBrief(fanId: string) {
  const creator = await getPrimaryCreator();
  const fan = await prisma.user.findFirst({
    select: {
      id: true,
      lastActiveAt: true,
      profile: {
        select: {
          displayName: true,
        },
      },
      tokenWallet: {
        select: {
          availableTokens: true,
        },
      },
      username: true,
    },
    where: {
      OR: [{ id: fanId }, { username: fanId }],
      role: UserRole.CUSTOMER,
    },
  });

  if (!fan) {
    return null;
  }

  const [orderAgg, lastPurchase, lastUnlock, memories, conversation] =
    await prisma.$transaction([
      prisma.order.aggregate({
        _count: {
          _all: true,
        },
        _sum: {
          totalAmount: true,
        },
        where: {
          creatorId: creator.id,
          customerId: fan.id,
          status: {
            in: PAID_ORDER_STATUSES,
          },
        },
      }),
      prisma.order.findFirst({
        orderBy: {
          paidAt: "desc",
        },
        select: {
          paidAt: true,
          totalAmount: true,
          type: true,
        },
        where: {
          creatorId: creator.id,
          customerId: fan.id,
          status: {
            in: PAID_ORDER_STATUSES,
          },
        },
      }),
      prisma.contentAccessGrant.findFirst({
        orderBy: {
          grantedAt: "desc",
        },
        select: {
          content: {
            select: {
              title: true,
            },
          },
        },
        where: {
          content: {
            creatorId: creator.id,
          },
          userId: fan.id,
        },
      }),
      prisma.aIAgentMemory.findMany({
        orderBy: [{ importance: "desc" }, { updatedAt: "desc" }],
        select: {
          title: true,
          type: true,
        },
        take: 6,
        where: {
          agent: {
            creatorId: creator.id,
          },
          fanUserId: fan.id,
        },
      }),
      prisma.conversation.findFirst({
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          lastMessageAt: true,
        },
        where: {
          creatorId: creator.id,
          customerId: fan.id,
          status: ConversationStatus.ACTIVE,
        },
      }),
    ]);

  const totalSpentUsd = toNumber(orderAgg._sum.totalAmount);

  return {
    availableTokens: fan.tokenWallet?.availableTokens ?? 0,
    conversationMood: deriveConversationMood(conversation?.lastMessageAt),
    displayName: fan.profile?.displayName ?? fan.username ?? "Fan",
    fanId: fan.id,
    interests: deriveInterests(memories, lastUnlock?.content.title),
    lastPurchase: lastPurchase
      ? {
          date:
            lastPurchase.paidAt?.toISOString() ??
            fan.lastActiveAt?.toISOString() ??
            null,
          type: lastPurchase.type,
          usd: toNumber(lastPurchase.totalAmount),
        }
      : null,
    lastSeenAt: fan.lastActiveAt?.toISOString() ?? null,
    lastUnlock: lastUnlock?.content.title ?? null,
    mela: creator.aiAgentProfile?.name ?? "Mela",
    stageName: creator.creatorProfile?.stageName ?? "Melany",
    tier: deriveFanTier(orderAgg._count._all, totalSpentUsd),
    totalPaidOrders: orderAgg._count._all,
    totalSpentUsd,
  };
}

function getOfferForIntent(intent: OpenClawIntent) {
  switch (intent) {
    case "wants-private-more-intimate":
      return {
        tokenCost: 120,
        type: "aftershow",
      };
    case "asks-live-status":
      return {
        tokenCost: 80,
        type: "live-pass",
      };
    case "wants-replay":
      return {
        tokenCost: 90,
        type: "replay",
      };
    case "wants-custom":
      return {
        tokenCost: 600,
        type: "custom-request",
      };
    case "wants-drop":
      return {
        tokenCost: 120,
        type: "drop",
      };
    default:
      return {
        tokenCost: 120,
        type: "entry-pack",
      };
  }
}

function getDraftForIntent(
  input: OpenClawReplyDraftRequest,
  fanBrief?: Awaited<ReturnType<typeof getOpenClawFanBrief>> | null,
) {
  const fanName = fanBrief?.displayName ?? "amor";

  switch (input.intent) {
    case "wants-private-more-intimate":
      return `Si quieres algo mas cercano esta noche, ${fanName}, puedo dejarte primero la entrada que mejor te acomoda y luego acercarte a lo que Melany esta reservando para quienes entran con mas intencion.`;
    case "asks-live-status":
      return `Te ubico rapido: ahora mismo puedo decirte si Melany ya esta por aparecer o si lo mejor es dejarte lista la entrada para que no llegues tarde cuando se abra el live.`;
    case "wants-replay":
      return `Si llegaste despues, no te preocupes. Puedo llevarte directo al replay que sigue disponible y dejarte mas cerca de lo que mas te interesaba ver.`;
    case "wants-custom":
      return `Si vienes por algo mas personal, puedo organizarte primero la entrada correcta y dejar listo el contexto para que cuando Melany te tome, ya no empieces desde cero.`;
    case "wants-drop":
      return `Justo puedo mostrarte lo que acaba de quedar abierto y llevarte primero por la pieza que mas se parece a lo que vienes buscando.`;
    default:
      return `Te acompaño sin enfriar el momento: dime por donde quieres entrar y te acerco a lo que hoy vale mas la pena abrir con Melany.`;
  }
}

export async function buildOpenClawReplyDraft(
  input: OpenClawReplyDraftRequest,
) {
  const fanBrief = input.fanId ? await getOpenClawFanBrief(input.fanId) : null;
  const recommendedOffer = getOfferForIntent(input.intent);
  const requiresHumanApproval =
    input.intent === "wants-custom" ||
    input.intent === "wants-private-more-intimate";

  return {
    draft: getDraftForIntent(input, fanBrief),
    fanBrief,
    recommendedOffer,
    requiresHumanApproval,
  };
}

export async function recordOpenClawProposal(
  input: OpenClawProposedActionRequest,
  gateway: OpenClawGateway,
) {
  const metadata: Prisma.InputJsonObject = {
    gateway,
    payload: input.payload as Prisma.InputJsonObject,
    status: "pending-review",
    target: input.target,
    type: input.type,
  };

  const proposal = await prisma.auditLog.create({
    data: {
      action: "OPENCLAW_PROPOSAL_CREATED",
      actorType: AuditActorType.AGENT,
      metadata,
      targetId: input.target,
      targetType: "openclaw-proposal",
    },
    select: {
      id: true,
    },
  });

  return {
    proposalId: proposal.id,
    status: "pending-review",
  };
}

export async function recordOpenClawAlert(
  input: OpenClawAlertRequest,
  gateway: OpenClawGateway,
) {
  const creator = await getPrimaryCreator();
  const context = (input.context ?? {}) as Prisma.InputJsonObject;
  const metadata: Prisma.InputJsonObject = {
    code: input.code,
    context,
    gateway,
    severity: input.severity,
    summary: input.summary,
  };

  const alert = await prisma.auditLog.create({
    data: {
      action: "OPENCLAW_ALERT_LOGGED",
      actorType: AuditActorType.AGENT,
      metadata,
      targetId: input.code,
      targetType: "openclaw-alert",
    },
    select: {
      id: true,
    },
  });

  if (input.severity === "high" || input.severity === "critical") {
    await prisma.notification.create({
      data: {
        body: input.summary,
        metadata: {
          alertId: alert.id,
          code: input.code,
          context,
          gateway,
          severity: input.severity,
        } as Prisma.InputJsonObject,
        status: NotificationStatus.PENDING,
        title: `OpenClaw alert: ${input.code}`,
        type: NotificationType.SYSTEM,
        userId: creator.id,
      },
    });
  }

  return {
    alertId: alert.id,
    status: "logged",
  };
}

export async function getOpenClawLiveBrief(sessionId: string) {
  const liveSession = await prisma.liveSession.findUnique({
    select: {
      _count: {
        select: {
          tips: true,
        },
      },
      id: true,
      metadata: true,
      peakViewers: true,
      replayAssetId: true,
      roomName: true,
      scheduledStartAt: true,
      startedAt: true,
      status: true,
      title: true,
      totalTipsTokens: true,
    },
    where: {
      id: sessionId,
    },
  });

  if (!liveSession) {
    return null;
  }

  const activeWindow = new Date(Date.now() - 5 * 60 * 1000);
  const viewerCount = await prisma.liveSessionViewer.count({
    where: {
      liveSessionId: sessionId,
      OR: [
        {
          lastSeenAt: {
            gte: activeWindow,
          },
        },
        {
          joinedAt: {
            gte: activeWindow,
          },
          lastSeenAt: null,
        },
      ],
    },
  });

  const metadata =
    liveSession.metadata && typeof liveSession.metadata === "object"
      ? (liveSession.metadata as Record<string, unknown>)
      : {};
  const goalTargetTokens = Number(metadata.goalTargetTokens ?? 0);

  return {
    goalProgress:
      goalTargetTokens > 0
        ? Number((liveSession.totalTipsTokens / goalTargetTokens).toFixed(2))
        : null,
    replayReady: Boolean(liveSession.replayAssetId),
    scheduledStartAt: liveSession.scheduledStartAt?.toISOString() ?? null,
    sessionId: liveSession.id,
    startedAt: liveSession.startedAt?.toISOString() ?? null,
    status: liveSession.status.toLowerCase(),
    tipsCount: liveSession._count.tips,
    tipsTotalTokens: liveSession.totalTipsTokens,
    title: liveSession.title,
    viewerCount,
    viewerPeak: liveSession.peakViewers,
  };
}

function buildDashboardFocus(input: {
  draftDrops: number;
  hasUpcomingLive: boolean;
  handoffCount: number;
  pendingPayments: number;
  replayPending: boolean;
}) {
  const focus: Array<{ description: string; title: string }> = [];

  if (input.hasUpcomingLive) {
    focus.push({
      description:
        "Mela puede empujar accesos, recordar entradas y dejar la conversación lista antes de que Melany aparezca.",
      title: "Preparar entrada al live",
    });
  }

  if (input.handoffCount > 0) {
    focus.push({
      description:
        "Hay fans recientes con intención visible. Vale más responder bien a esos que abrir conversaciones frías.",
      title: "Atender handoffs calientes",
    });
  }

  if (input.replayPending) {
    focus.push({
      description:
        "Subir o publicar el replay mantiene viva la monetización después del live.",
      title: "Cerrar replay pendiente",
    });
  }

  if (input.pendingPayments > 0) {
    focus.push({
      description:
        "Hay pagos que pueden frenar accesos o seguimiento si no se limpian hoy.",
      title: "Revisar pagos pendientes",
    });
  }

  if (input.draftDrops > 0) {
    focus.push({
      description:
        "Hay piezas en borrador o programadas que pueden convertirse en el próximo movimiento comercial.",
      title: "Cerrar próximo drop",
    });
  }

  if (focus.length === 0) {
    focus.push({
      description:
        "El día está limpio. Aprovecha para preparar un drop, revisar fans tibios y dejar a Mela con un tono fino.",
      title: "Mantener el ritmo afinado",
    });
  }

  return focus.slice(0, 4);
}

export async function getMelaDashboardSnapshot() {
  const creator = await getPrimaryCreator();
  const brief = await getOpenClawDailyBrief();
  const recentMessageWindow = new Date(Date.now() - 7 * DAY_IN_MS);

  const [notifications, contentPipeline, recentMessages] = await prisma.$transaction([
    prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        body: true,
        createdAt: true,
        id: true,
        title: true,
        type: true,
      },
      take: 4,
      where: {
        status: NotificationStatus.PENDING,
        userId: creator.id,
      },
    }),
    prisma.contentItem.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        releaseAt: true,
        title: true,
        type: true,
        visibility: true,
      },
      take: 4,
      where: {
        creatorId: creator.id,
        visibility: {
          in: [ContentVisibility.DRAFT, ContentVisibility.SCHEDULED],
        },
      },
    }),
    prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        body: true,
        conversation: {
          select: {
            customer: {
              select: {
                id: true,
                profile: {
                  select: {
                    displayName: true,
                  },
                },
                username: true,
              },
            },
            id: true,
          },
        },
        createdAt: true,
      },
      take: 12,
      where: {
        body: {
          not: null,
        },
        conversation: {
          creatorId: creator.id,
          status: ConversationStatus.ACTIVE,
        },
        createdAt: {
          gte: recentMessageWindow,
        },
        senderRole: ParticipantRole.FAN,
      },
    }),
  ]);

  const uniqueConversations = new Map<
    string,
    (typeof recentMessages)[number]
  >();

  for (const message of recentMessages) {
    if (!uniqueConversations.has(message.conversation.id)) {
      uniqueConversations.set(message.conversation.id, message);
    }

    if (uniqueConversations.size >= 4) {
      break;
    }
  }

  const handoffQueue = await Promise.all(
    Array.from(uniqueConversations.values()).map(async (message) => {
      const fan = message.conversation.customer;
      const orderAgg = await prisma.order.aggregate({
        _count: {
          _all: true,
        },
        _sum: {
          totalAmount: true,
        },
        where: {
          creatorId: creator.id,
          customerId: fan.id,
          status: {
            in: PAID_ORDER_STATUSES,
          },
        },
      });
      const totalSpentUsd = toNumber(orderAgg._sum.totalAmount);
      const intent = normalizeMelaIntent(message.body ?? "");

      return {
        conversationId: message.conversation.id,
        displayName: fan.profile?.displayName ?? fan.username ?? "Fan",
        fanId: fan.id,
        intent,
        intentLabel: getMelaIntentLabel(intent),
        lastMessage: message.body ?? "",
        lastMessageAt: message.createdAt.toISOString(),
        recommendation: getMelaIntentRecommendation(intent),
        tier: deriveFanTier(orderAgg._count._all, totalSpentUsd),
        totalSpentUsd,
      };
    }),
  );

  return {
    alerts: brief.alerts,
    contentPipeline,
    focus: buildDashboardFocus({
      draftDrops: brief.summaryFlags.draftDrops,
      hasUpcomingLive: brief.live.status !== "offline",
      handoffCount: handoffQueue.length,
      pendingPayments: brief.summaryFlags.pendingPayments,
      replayPending: brief.summaryFlags.replayPending,
    }),
    handoffQueue,
    mela: brief.mela,
    notifications,
    stageName: brief.stageName,
    summary: brief,
  };
}
