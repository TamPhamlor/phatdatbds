// src/app/api/v1/meta_listing/route.ts
import { NextResponse } from "next/server";
import { extApiFetch, withForwardedQuery } from "@/lib/extApi";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    // Forward query parameters nếu có
    const upstreamPath = withForwardedQuery(req.url, "/api/v1/meta_listing");
    // Gọi API ngoài
    const res = await extApiFetch(upstreamPath);
    // Lấy dữ liệu JSON, fallback = {}
    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
