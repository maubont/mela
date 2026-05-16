import { NextRequest, NextResponse } from "next/server";

import type { OpenClawProposedActionRequest } from "@/lib/openclaw/contracts";
import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { recordOpenClawProposal } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

function isValidPayload(
  payload: unknown,
): payload is OpenClawProposedActionRequest {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.type === "string" &&
    typeof candidate.target === "string" &&
    !!candidate.payload &&
    typeof candidate.payload === "object"
  );
}

export async function POST(request: NextRequest) {
  const auth = requireOpenClawAuth(request);

  if (auth instanceof NextResponse) {
    return auth;
  }

  const payload = await request.json().catch(() => null);

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      {
        error: "invalid_payload",
        ok: false,
      },
      { status: 400 },
    );
  }

  const result = await recordOpenClawProposal(payload, auth.gateway);

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...result,
  });
}
