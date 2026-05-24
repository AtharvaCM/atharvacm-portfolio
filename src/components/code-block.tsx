"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";

type Props = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    node.props &&
    typeof node.props === "object" &&
    "children" in node.props
  ) {
    return extractText(node.props.children as ReactNode);
  }

  return "";
}

export function CodeBlock({ children, className = "", ...props }: Props) {
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => extractText(children).trimEnd(), [children]);

  async function handleCopy() {
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="code-block-shell group">
      <button
        aria-label={copied ? "Code copied" : "Copy code"}
        className="code-copy-button"
        onClick={handleCopy}
        type="button"
      >
        <span aria-hidden="true" className="code-copy-button-icon">
          {copied ? "✓" : "⧉"}
        </span>
        <span className="code-copy-button-label">{copied ? "Copied" : "Copy"}</span>
      </button>
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
