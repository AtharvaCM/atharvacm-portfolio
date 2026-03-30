import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function getSafeRedirectTarget(requestUrl: URL) {
  const slug = requestUrl.searchParams.get("slug");

  if (!slug || !slug.startsWith("/")) {
    return "/blog";
  }

  return slug;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const secret = requestUrl.searchParams.get("secret");
  const previewSecret = process.env.BLOG_PREVIEW_SECRET;

  if (!previewSecret) {
    return NextResponse.json({ error: "BLOG_PREVIEW_SECRET is not configured." }, { status: 500 });
  }

  if (secret !== previewSecret) {
    return NextResponse.json({ error: "Invalid preview secret." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(getSafeRedirectTarget(requestUrl), request.url));
}
