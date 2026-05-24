"use client";

import Link from "next/link";
import { FiCheck, FiCopy } from "react-icons/fi";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

export function ArticleShareLinks({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  const xUrl = `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    title
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-1">
      <button
        className="rail-link-button rail-link-button-copy"
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <FiCheck aria-hidden="true" className="h-3.5 w-3.5" />
        ) : (
          <FiCopy aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
      <Link
        className="rail-link-button"
        href={linkedInUrl}
        rel="noreferrer"
        target="_blank"
      >
        <SiLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
        LinkedIn
      </Link>
      <Link
        className="rail-link-button"
        href={xUrl}
        rel="noreferrer"
        target="_blank"
      >
        <SiX aria-hidden="true" className="h-3.5 w-3.5" />
        X
      </Link>
      <Link
        className="rail-link-button"
        href={facebookUrl}
        rel="noreferrer"
        target="_blank"
      >
        <SiFacebook aria-hidden="true" className="h-3.5 w-3.5" />
        Facebook
      </Link>
    </div>
  );
}
