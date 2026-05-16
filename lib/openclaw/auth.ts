import { NextRequest, NextResponse } from "next/server";

import type { OpenClawGateway } from "@/lib/openclaw/contracts";

export interface OpenClawAuthContext {
  gateway: OpenClawGateway;
  requestId: string;
}

function jsonError(status: number, error: string, detail: string) {
  return NextResponse.json(
    {
      detail,
      error,
      ok: false,
    },
    { status },
  );
}

export function requireOpenClawAuth(
  request: NextRequest,
): NextResponse | OpenClawAuthContext {
  const configuredToken = process.env.OPENCLAW_INTERNAL_TOKEN;

  if (!configuredToken) {
    return jsonError(
      503,
      "openclaw_not_configured",
      "OPENCLAW_INTERNAL_TOKEN is missing on this environment.",
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return jsonError(
      401,
      "openclaw_unauthorized",
      "Missing Bearer token for OpenClaw internal route.",
    );
  }

  const providedToken = authorization.slice("Bearer ".length).trim();

  if (providedToken !== configuredToken) {
    return jsonError(
      401,
      "openclaw_unauthorized",
      "The supplied OpenClaw token is not valid.",
    );
  }

  const gatewayHeader = request.headers.get("x-openclaw-gateway");
  const gateway = (gatewayHeader?.slice(0, 64) ??
    "unknown") as OpenClawGateway;

  return {
    gateway,
    requestId: request.headers.get("x-request-id") ?? crypto.randomUUID(),
  };
}
