import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const requestUrl = new URL(request.url);
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.origin === requestUrl.origin) {
        return NextResponse.redirect(refererUrl);
      }
    } catch {
      // Fall through to the default redirect.
    }
  }

  return NextResponse.redirect(new URL("/blog", request.url));
}
