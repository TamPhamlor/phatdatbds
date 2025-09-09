// src/lib/extApi.ts
type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
  next?: NextFetchOptions;
};

function getRevalidate(): number | 0 {
  const v = Number(process.env.LISTINGS_REVALIDATE ?? 0);
  return Number.isFinite(v) && v > 0 ? v : 0;
}

/**
 * Gọi API ngoài với prefix API_URL và header Authorization: Bearer <API_SECRET_KEY>.
 * Server-only (API routes / server components).
 */
export async function extApiFetch(path: string, options: FetchOptions = {}) {
  const base = process.env.API_URL;
  const key = process.env.API_SECRET_KEY;

  if (!base) throw new Error("Missing env API_URL");
  if (!key) throw new Error("Missing env API_SECRET_KEY");

  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(options.headers ?? {});
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${key}`);

  const next = options.next ?? (getRevalidate() ? { revalidate: getRevalidate() } : undefined);

  return fetch(url, { ...options, headers, next });
}

/** Forward toàn bộ query string từ req.url vào basePath */
export function withForwardedQuery(reqUrl: string, basePath: string) {
  const from = new URL(reqUrl);
  const qs = from.searchParams.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
