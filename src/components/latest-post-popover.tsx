"use client";

import { usePathname } from "next/navigation";
import { type KeyboardEvent, useEffect, useState, useSyncExternalStore } from "react";

import { TrackedLink } from "@/components/tracked-link";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { trackEvent } from "@/lib/gtm-events";
import { formatDate } from "@/lib/utils";

export const LATEST_POST_DISMISSED_KEY = "portfolio-latest-post-dismissed";
export const LATEST_POST_DELAY_MS = 6000;

export type LatestPost = {
  slug: string;
  title: string;
  publishedAt: string;
  readingTime: number;
  excerpt: string;
};

type Props = {
  post: LatestPost;
};

function readDismissedSlug() {
  try {
    return window.localStorage.getItem(LATEST_POST_DISMISSED_KEY);
  } catch {
    return null;
  }
}

function writeDismissedSlug(slug: string) {
  try {
    window.localStorage.setItem(LATEST_POST_DISMISSED_KEY, slug);
  } catch {
    // Blocked storage: the card stays closed for this page view only.
  }
}

// Dismissal is stored per slug, so publishing a newer post shows the card once more.
export function LatestPostPopover({ post }: Props) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const [dismissed, setDismissed] = useState(() => readDismissedSlug() === post.slug);
  const [delayElapsed, setDelayElapsed] = useState(false);

  const postHref = `/blog/${post.slug}`;
  // Wait for the cookie banner to be answered so the two cards never stack in the same corner.
  const eligible = !dismissed && consent !== null && !pathname.startsWith("/blog");

  useEffect(() => {
    if (pathname === postHref) {
      writeDismissedSlug(post.slug);
    }
  }, [pathname, postHref, post.slug]);

  useEffect(() => {
    if (!eligible || delayElapsed) {
      return;
    }

    const reveal = () => {
      if (document.visibilityState === "visible") {
        setDelayElapsed(true);
      }
    };

    const timer = window.setTimeout(() => {
      reveal();
      document.addEventListener("visibilitychange", reveal);
    }, LATEST_POST_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", reveal);
    };
  }, [eligible, delayElapsed]);

  if (!eligible || !delayElapsed || readDismissedSlug() === post.slug) {
    return null;
  }

  const close = () => {
    writeDismissedSlug(post.slug);
    setDismissed(true);
  };

  const handleDismiss = () => {
    close();
    trackEvent("latest_post_dismiss", { post_slug: post.slug });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      handleDismiss();
    }
  };

  const meta = `${formatDate(post.publishedAt)} • ${post.readingTime} min read`;

  return (
    <aside
      aria-label="Latest blog post"
      className="latest-post-popover pointer-events-none fixed bottom-3 right-3 z-[85] w-[min(21rem,calc(100vw-1.5rem))] md:bottom-4 md:right-4 md:w-[20rem]"
      onKeyDown={handleKeyDown}
    >
      <div className="panel pointer-events-auto relative overflow-hidden rounded-[1.1rem] border border-text/12 bg-[hsl(var(--surface)/0.96)] shadow-[0_24px_48px_-30px_hsl(var(--text)/0.35)] backdrop-blur-md">
        <TrackedLink
          className="group block p-4 md:p-5"
          href={postHref}
          onClick={close}
          trackingEvent="blog_post_open"
          trackingPayload={{ location: "latest_post_popover", post_slug: post.slug }}
        >
          <div className="subtle-rule mr-11" />
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Latest post
          </p>
          <p className="mt-2 font-display text-[1.35rem] leading-[1.05] tracking-tight text-text group-hover:underline group-hover:decoration-accent/60 group-hover:underline-offset-4">
            {post.title}
          </p>
          <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-text/70">{post.excerpt}</p>
          <div className="mt-3.5 flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">{meta}</p>
            <span className="link-action shrink-0">
              Read <span aria-hidden>-&gt;</span>
            </span>
          </div>
        </TrackedLink>
        <button
          aria-label="Close latest post"
          className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-text/12 bg-[hsl(var(--surface)/0.92)] text-base leading-none text-text/70 backdrop-blur transition hover:text-text"
          onClick={handleDismiss}
          type="button"
        >
          <span aria-hidden>×</span>
        </button>
      </div>
    </aside>
  );
}
