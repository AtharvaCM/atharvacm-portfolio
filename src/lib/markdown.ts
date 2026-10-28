export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function extractMarkdownHeadings(source: string): MarkdownHeading[] {
  const matches = source.matchAll(/^(##|###)\s+(.+)$/gm);

  return Array.from(matches, ([, levelToken, rawText]) => {
    const text = stripInlineMarkdown(rawText ?? "");
    const level = levelToken === "###" ? 3 : 2;

    return {
      id: slugifyHeading(text),
      text,
      level,
    } satisfies MarkdownHeading;
  }).filter((heading) => heading.text.length > 0);
}

function absolutize(path: string, origin: string) {
  return path.startsWith("/") ? new URL(path, origin).toString() : path;
}

// Posts embed figures as JSX (<figure><picture><img …/></picture></figure>), which
// reads as noise once pasted elsewhere. Swap each for a plain markdown image and
// point root-relative links at the live site so they still resolve.
export function toPortableMarkdown(source: string, origin: string) {
  return source
    .replace(/<figure[\s\S]*?<\/figure>/g, (figure) => {
      const img = figure.match(/<img\b[^>]*>/)?.[0] ?? "";
      const alt = img.match(/\balt="([^"]*)"/)?.[1] ?? "";
      const src = img.match(/\bsrc="([^"]*)"/)?.[1];

      return src ? `![${alt}](${absolutize(src, origin)})` : "";
    })
    .replace(/(!?\[[^\]]*]\()(\/[^)\s]*)/g, (_, prefix: string, path: string) => {
      return `${prefix}${absolutize(path, origin)}`;
    })
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type ArticleMarkdownInput = {
  title: string;
  excerpt: string;
  url: string;
  content: string;
};

export function buildArticleMarkdown({ title, excerpt, url, content }: ArticleMarkdownInput) {
  const origin = new URL(url).origin;

  return [`# ${title}`, `Source: ${url}`, `> ${excerpt.trim()}`, toPortableMarkdown(content, origin)].join(
    "\n\n"
  ) + "\n";
}
