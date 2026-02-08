import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ReactNode } from "react";

type Props = {
  source: string;
};

const mdxComponents = {
  a: ({ href = "", children }: { href?: string; children: ReactNode }) => {
    if (href.startsWith("/")) {
      return (
        <Link className="link-inline-accent" href={href}>
          {children}
        </Link>
      );
    }

    return (
      <a className="link-inline-accent" href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }
};

export async function MdxRenderer({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]]
        }
      }}
    />
  );
}
