"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArticleShareLinks } from "@/components/article-share-links";
import type { MarkdownHeading } from "@/lib/markdown";

type Props = {
  headings: MarkdownHeading[];
  title: string;
  url: string;
};

function useActiveHeading(headings: MarkdownHeading[]) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.1, 0.3, 0.6, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}

function getTocLinkClass(isActive: boolean) {
  return [
    "block rounded-[0.9rem] px-2.5 py-1.5 text-sm leading-6 transition duration-150",
    isActive
      ? "border border-border/80 bg-[hsl(var(--text)/0.055)] text-text shadow-[inset_2px_0_0_hsl(var(--accent)/0.74)]"
      : "border border-transparent text-text/60 hover:border-border/65 hover:bg-[hsl(var(--text)/0.04)] hover:text-text/92",
  ].join(" ");
}

export function ArticleTocMobile({ headings, title, url }: Props) {
  const activeId = useActiveHeading(headings);

  if (headings.length === 0) {
    return null;
  }

  return (
    <details className="mt-8 rounded-[1rem] border border-border/75 bg-[hsl(var(--surface)/0.72)] p-4 lg:hidden">
      <summary className="cursor-pointer list-none text-sm font-semibold tracking-[-0.01em] text-text">
        On this page
      </summary>
      <ul className="mt-4 space-y-2.5">
        {headings.map((heading) => (
          <li
            className={heading.level === 3 ? "pl-3" : undefined}
            key={heading.id}
          >
            <Link
              className={getTocLinkClass(activeId === heading.id)}
              href={`#${heading.id}`}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-border/70 pt-4">
        <p className="eyebrow">Share</p>
        <div className="mt-3">
          <ArticleShareLinks title={title} url={url} />
        </div>
      </div>
    </details>
  );
}

export function ArticleTocDesktop({ headings, title, url }: Props) {
  const activeId = useActiveHeading(headings);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
      <div className="pr-1">
        <div className="article-rail-scroll max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[1.05rem] border border-border/85 bg-[linear-gradient(180deg,hsl(var(--surface)/0.8),hsl(var(--surface-soft)/0.72))] p-5 shadow-[inset_0_1px_0_hsl(var(--text)/0.03)]">
          <p className="eyebrow">On this page</p>
          <ul className="mt-4 space-y-3">
            {headings.map((heading) => (
              <li
                className={heading.level === 3 ? "pl-3" : undefined}
                key={heading.id}
              >
                <Link
                  className={getTocLinkClass(activeId === heading.id)}
                  href={`#${heading.id}`}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border/70 pt-5">
            <p className="eyebrow">Share</p>
            <div className="mt-3 space-y-2.5">
              <ArticleShareLinks title={title} url={url} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
