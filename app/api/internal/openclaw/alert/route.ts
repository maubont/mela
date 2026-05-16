import { NextRequest, NextResponse } from "next/server";

import type { OpenClawAlertRequest } from "@/lib/openclaw/contracts";
import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { recordOpenClawAlert } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

function isValidPayload(payload: unknown): payload is OpenClawAlertRequest {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.code === "string" &&
    typeof candidate.severity === "string" &&
    typeof candidate.summary === "string" &&
    (candidate.context === undefined || typeof candidate.context === "object")
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

  const result = await recordOpenClawAlert(payload, auth.gateway);

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...result,
  });
}
