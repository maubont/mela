export type MelaIntent =
  | "wants-private-more-intimate"
  | "asks-live-status"
  | "wants-replay"
  | "wants-drop"
  | "wants-custom"
  | "general-support";

export function normalizeMelaIntent(message: string, intent?: string): MelaIntent {
  if (intent) {
    return intent as MelaIntent;
  }

  const lower = message.toLowerCase();

  if (
    lower.includes("íntim") ||
    lower.includes("intim") ||
    lower.includes("privad") ||
    lower.includes("personal")
  ) {
    return "wants-private-more-intimate";
  }

  if (lower.includes("live") || lower.includes("en vivo") || lower.includes("transmis")) {
    return "asks-live-status";
  }

  if (lower.includes("replay") || lower.includes("grabaci") || lower.includes("anoche")) {
    return "wants-replay";
  }

  if (lower.includes("drop") || lower.includes("nuevo") || lower.includes("fotos")) {
    return "wants-drop";
  }

  if (lower.includes("personalizado") || lower.includes("custom")) {
    return "wants-custom";
  }

  return "general-support";
}

export function getMelaIntentLabel(intent: MelaIntent) {
  switch (intent) {
    case "wants-private-more-intimate":
      return "Más íntimo";
    case "asks-live-status":
      return "Live";
    case "wants-replay":
      return "Replay";
    case "wants-drop":
      return "Drop";
    case "wants-custom":
      return "A medida";
    default:
      return "General";
  }
}

export function getMelaIntentRecommendation(intent: MelaIntent) {
  switch (intent) {
    case "wants-private-more-intimate":
      return "Empujar a aftershow o entrada íntima.";
    case "asks-live-status":
      return "Confirmar estado del live y empujar entrada.";
    case "wants-replay":
      return "Ofrecer replay y siguiente unlock.";
    case "wants-drop":
      return "Guiar al drop activo o al set más cercano.";
    case "wants-custom":
      return "Escalar a Melany con contexto claro.";
    default:
      return "Mantener conversación y detectar intención.";
  }
}
