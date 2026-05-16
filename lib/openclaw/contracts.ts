export type OpenClawGateway =
  | "ops-telegram"
  | "ops-whatsapp"
  | "support-webchat"
  | "research-browser"
  | "unknown";

export type OpenClawIntent =
  | "wants-private-more-intimate"
  | "asks-live-status"
  | "wants-replay"
  | "wants-drop"
  | "wants-custom"
  | "general-support";

export type OpenClawProposalType =
  | "send-followup"
  | "suggest-offer"
  | "draft-drop"
  | "handoff-to-melany";

export type OpenClawAlertSeverity = "low" | "medium" | "high" | "critical";

export interface OpenClawReplyDraftRequest {
  fanId?: string;
  channel: string;
  intent: OpenClawIntent;
  message: string;
}

export interface OpenClawProposedActionRequest {
  type: OpenClawProposalType;
  target: string;
  payload: Record<string, unknown>;
}

export interface OpenClawAlertRequest {
  severity: OpenClawAlertSeverity;
  code: string;
  summary: string;
  context?: Record<string, unknown>;
}
