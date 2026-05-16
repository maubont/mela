import { NextRequest, NextResponse } from "next/server";

import { runMelaConcierge } from "@/lib/ai/mela-concierge";

export const dynamic = "force-dynamic";

interface ConciergePayload {
  fanId?: string;
  intent?: string;
  message: string;
}

function isValidPayload(payload: unknown): payload is ConciergePayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.message === "string" &&
    candidate.message.trim().length > 0 &&
    candidate.message.trim().length <= 400 &&
    (candidate.intent === undefined || typeof candidate.intent === "string") &&
    (candidate.fanId === undefined || typeof candidate.fanId === "string")
  );
}

export async function POST(request: NextRequest) {
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

  const result = await runMelaConcierge(payload);

  return NextResponse.json({
    ok: true,
    ...result,
  });
}
