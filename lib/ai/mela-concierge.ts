import { buildOpenClawReplyDraft, getOpenClawDailyBrief } from "@/lib/openclaw/service";
import { normalizeMelaIntent } from "@/lib/mela/intents";

export interface MelaConciergeRequest {
  fanId?: string;
  intent?: string;
  message: string;
}

export interface MelaConciergeResponse {
  chips: string[];
  cta: {
    href: string;
    label: string;
  };
  intent: string;
  mela: string;
  reply: string;
  stageName: string;
}

function buildCta(intent: string) {
  switch (intent) {
    case "asks-live-status":
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Entrar al live",
      };
    case "wants-replay":
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Ver replay",
      };
    case "wants-private-more-intimate":
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Abrir entrada íntima",
      };
    case "wants-custom":
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Pedir algo a medida",
      };
    case "wants-drop":
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Ver lo nuevo",
      };
    default:
      return {
        href: "/sign-in#elige-tu-entrada",
        label: "Elegir mi entrada",
      };
  }
}

function fallbackReply(message: string, intent: string) {
  switch (intent) {
    case "asks-live-status":
      return "Si vienes por el live, te ubico rápido: entra primero por tu acceso y te dejo lista la entrada correcta para que no llegues tarde cuando Melany se abra.";
    case "wants-replay":
      return "Si lo que quieres es volver sobre algo que ya pasó, te guío por el replay o por la pieza que más se parece a lo que te quedaste con ganas de ver.";
    case "wants-private-more-intimate":
      return "Si vienes por algo más íntimo, te llevo primero por la entrada que mejor te acomoda y dejo el tono listo para que no empieces en frío.";
    case "wants-drop":
      return "Si quieres ver qué hay nuevo, te acerco primero a la pieza que mejor encaja con lo que estás buscando esta noche.";
    case "wants-custom":
      return "Si buscas algo más personal, puedo ayudarte a abrir la entrada correcta y dejar el contexto listo antes de que Melany te tome directamente.";
    default:
      return `Te acompaño sin enfriar el momento: dime por dónde quieres entrar y te acerco a lo que hoy vale más la pena abrir con Melany.`;
  }
}

export async function runMelaConcierge(
  input: MelaConciergeRequest,
): Promise<MelaConciergeResponse> {
  const intent = normalizeMelaIntent(input.message, input.intent);

  try {
    const [brief, draftResult] = await Promise.all([
      getOpenClawDailyBrief(),
      buildOpenClawReplyDraft({
        channel: "support-webchat",
        fanId: input.fanId,
        intent: intent as
          | "wants-private-more-intimate"
          | "asks-live-status"
          | "wants-replay"
          | "wants-drop"
          | "wants-custom"
          | "general-support",
        message: input.message,
      }),
    ]);

    const chips = [
      brief.live.status === "live"
        ? "Melany está en vivo"
        : brief.live.status === "scheduled"
          ? "Hay live programado"
          : "Entrada privada disponible",
      brief.summaryFlags.pendingPayments > 0
        ? "Pago en revisión manual activo"
        : "Pago discreto activo",
      draftResult.recommendedOffer.type === "aftershow"
        ? "Aftershow sugerido"
        : `${draftResult.recommendedOffer.tokenCost} tokens sugeridos`,
    ];

    return {
      chips,
      cta: buildCta(intent),
      intent,
      mela: brief.mela,
      reply: draftResult.draft,
      stageName: brief.stageName,
    };
  } catch {
    return {
      chips: ["Pago discreto", "Tokens desde el inicio", "Atención privada"],
      cta: buildCta(intent),
      intent,
      mela: "Mela",
      reply: fallbackReply(input.message, intent),
      stageName: "Melany",
    };
  }
}
