// src/app/api/v1/listings/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { extApiFetch } from "@/lib/extApi";

export const runtime = "nodejs";

// context.params là Promise<{ id: string }>
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const res = await extApiFetch(`/api/v1/listings/${encodeURIComponent(id)}`);
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
