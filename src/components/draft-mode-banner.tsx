import { draftMode } from "next/headers";

export async function DraftModeBanner() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="border-b border-accent/25 bg-accent/10 px-4 py-2 text-center text-xs uppercase tracking-[0.16em] text-accent">
      Preview mode enabled. Unpublished blog posts are visible.{" "}
      <a className="font-semibold underline underline-offset-4" href="/api/draft/disable">
        Exit preview
      </a>
    </div>
  );
}
