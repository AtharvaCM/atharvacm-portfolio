"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

import { trackEvent } from "@/lib/gtm-events";

type Props = {
  markdown: string;
  slug: string;
};

export function CopyArticleButton({ markdown, slug }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      trackEvent("article_copy_markdown", { slug });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      aria-label={copied ? "Article copied as Markdown" : "Copy article as Markdown"}
      className="rail-link-button rail-link-button-copy w-auto"
      onClick={handleCopy}
      title="Copy the full article as Markdown, ready to paste into an LLM"
      type="button"
    >
      {copied ? (
        <FiCheck aria-hidden="true" className="h-3.5 w-3.5" />
      ) : (
        <FiCopy aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied" : "Copy as Markdown"}
    </button>
  );
}
