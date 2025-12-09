// src/app/api/v1/meta_listing/route.ts
import { NextResponse } from "next/server";
import { extApiFetch, withForwardedQuery } from "@/lib/extApi";

export const runtime = "nodejs";
// (tuỳ chọn) cho phép static hoá route nếu toàn bộ GET có thể cache
// export const revalidate = 3600; // cache output của route 1h (xem mục 2)

export async function GET(req: Request) {
  try {
    const upstreamPath = withForwardedQuery(req.url, "/api/v1/meta_listing");

    // Cache kết quả upstream trong 1h (server-side data cache)
    const res = await extApiFetch(upstreamPath, {
      next: { revalidate: 86400 }, // hoặc 86400 nếu gần như tĩnh
      // cache: "force-cache" // tương đương nếu không cần revalidate theo thời gian
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
