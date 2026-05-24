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
