import { NextRequest, NextResponse } from "next/server";

import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { getOpenClawLiveBrief } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    sessionId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const auth = requireOpenClawAuth(request);

  if (auth instanceof NextResponse) {
    return auth;
  }

  const { sessionId } = await context.params;
  const live = await getOpenClawLiveBrief(sessionId);

  if (!live) {
    return NextResponse.json(
      {
        error: "live_session_not_found",
        ok: false,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...live,
  });
}
