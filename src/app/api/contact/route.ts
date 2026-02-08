import { NextResponse } from "next/server";

import { getRateLimitIdentifier, handleContactSubmission } from "@/lib/contact";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? null;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const result = await handleContactSubmission(payload, getRateLimitIdentifier(ip));

  if (!result.ok) {
    const status = result.error.startsWith("Too many requests") ? 429 : 400;
    return NextResponse.json(result, {
      status,
      headers: {
        "Cache-Control": "no-store"
      }
    });
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
