// src/app/api/v1/posts/[slug]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { extApiFetch } from "@/lib/extApi";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // <-- await ở đây
    if (!slug)
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    const res = await extApiFetch(`/api/v1/posts/${encodeURIComponent(slug)}`);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
