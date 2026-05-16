import { NextRequest, NextResponse } from "next/server";

import { requireOpenClawAuth } from "@/lib/openclaw/auth";
import { getOpenClawDailyBrief } from "@/lib/openclaw/service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const auth = requireOpenClawAuth(request);

  if (auth instanceof NextResponse) {
    return auth;
  }

  const brief = await getOpenClawDailyBrief();

  return NextResponse.json({
    gateway: auth.gateway,
    ok: true,
    requestId: auth.requestId,
    ...brief,
  });
}
