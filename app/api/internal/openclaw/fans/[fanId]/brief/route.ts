import { NextRequest, NextResponse } from "next/server";

import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { getOpenClawFanBrief } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{
    fanId: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const auth = requireOpenClawAuth(request);

  if (auth instanceof NextResponse) {
    return auth;
  }

  const { fanId } = await context.params;
  const brief = await getOpenClawFanBrief(fanId);

  if (!brief) {
    return NextResponse.json(
      {
        error: "fan_not_found",
        ok: false,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...brief,
  });
}
