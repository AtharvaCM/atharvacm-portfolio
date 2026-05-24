import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/code-block";

type Props = {
  source: string;
};

const mdxComponents = {
  a: ({ href = "", children }: { href?: string; children: ReactNode }) => {
    if (href.startsWith("/")) {
      return (
        <Link
          className="font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition hover:text-text hover:decoration-accent/65"
          href={href}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        className="font-semibold text-accent underline decoration-accent/35 underline-offset-4 transition hover:text-text hover:decoration-accent/65"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  pre: CodeBlock,
};

export async function MdxRenderer({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              { behavior: "append", properties: { className: ["heading-anchor"] } },
            ],
            [
              rehypePrettyCode,
              {
                theme: "github-dark-dimmed",
                keepBackground: false,
                defaultLang: "txt",
              },
            ],
          ],
        },
      }}
    />
  );
}
