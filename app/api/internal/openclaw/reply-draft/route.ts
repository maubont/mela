import { NextRequest, NextResponse } from "next/server";

import type { OpenClawReplyDraftRequest } from "@/lib/openclaw/contracts";
import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { buildOpenClawReplyDraft } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

function isValidPayload(payload: unknown): payload is OpenClawReplyDraftRequest {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.channel === "string" &&
    typeof candidate.intent === "string" &&
    typeof candidate.message === "string" &&
    (candidate.fanId === undefined || typeof candidate.fanId === "string")
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

  const result = await buildOpenClawReplyDraft(payload);

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...result,
  });
}
