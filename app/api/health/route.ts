import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/config/site";

export async function GET() {
  return NextResponse.json({
    app: siteConfig.name,
    phase: 1,
    status: "ready-for-auth-and-prisma",
    timestamp: new Date().toISOString(),
  });
}

