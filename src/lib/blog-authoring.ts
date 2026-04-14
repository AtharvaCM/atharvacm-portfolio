import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { getAllBlogPosts, getAllProjects, parseBlogMdx } from "./content";

export const BLOG_CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

type CreateBlogDraftInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  tags?: string[];
  publishedAt?: string;
  featured?: boolean;
  notes?: string;
  overwrite?: boolean;
};

export type BlogValidationIssue = {
  level: "error" | "warning";
  message: string;
};

export type BlogValidationEntry = {
  file: string;
  slug?: string;
  issues: BlogValidationIssue[];
};

export type BlogReviewCheck = {
  name: string;
  status: "pass" | "warn" | "fail";
  details: string;
};

export type BlogReview = {
  slug: string;
  title: string;
  wordCount: number;
  score: number;
  checks: BlogReviewCheck[];
  summary: string;
};

export type BlogSection = {
  heading: string;
  level: number;
  headingLine: string;
  body: string;
  markdown: string;
};

export type BlogLinkSuggestion = {
  type: "blog" | "project";
  title: string;
  href: string;
  reason: string;
  score: number;
};

type PublishBlogPostInput = {
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
};

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildBlogDraftSource({
  title,
  slug = slugifyTitle(title),
  excerpt = "Add a short excerpt that makes the article's angle immediately clear.",
  tags = ["Draft"],
  publishedAt = new Date().toISOString(),
  featured = false,
  notes
}: CreateBlogDraftInput) {
  const body = notes?.trim()
    ? `${notes.trim()}\n`
    : [
        "Start with the core argument in 2-3 lines.",
        "",
        "## Why this matters",
        "Explain the practical problem or decision tension.",
        "",
        "## What to do",
        "Lay out the concrete approach, tradeoffs, and examples.",
        "",
        "## Closing thought",
        "End with the punchline or recommendation."
      ].join("\n");

  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `slug: ${slug}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `publishedAt: ${publishedAt}`,
    "tags:",
    ...tags.map((tag) => `  - ${tag}`),
    `featured: ${featured ? "true" : "false"}`,
    "draft: true",
    "---",
    "",
    body
  ].join("\n");
}

export async function createBlogDraft(input: CreateBlogDraftInput) {
  const slug = input.slug ?? slugifyTitle(input.title);
  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);

  if (!input.overwrite) {
    try {
      await fs.access(filePath);
      throw new Error(`A blog post already exists at ${filePath}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        throw error;
      }
    }
  }

  const source = buildBlogDraftSource({ ...input, slug });
  await fs.mkdir(BLOG_CONTENT_DIR, { recursive: true });
  await fs.writeFile(filePath, source, "utf8");

  return {
    slug,
    filePath,
    source,
    previewPath: `/blog/${slug}`
  };
}

export async function readBlogPostSource(slug: string) {
  return fs.readFile(path.join(BLOG_CONTENT_DIR, `${slug}.mdx`), "utf8");
}

export async function updateBlogPostSource(slug: string, source: string) {
  const parsed = parseBlogMdx(source);

  if (parsed.slug !== slug) {
    throw new Error(`Frontmatter slug "${parsed.slug}" must match the file slug "${slug}"`);
  }

  const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
  await fs.writeFile(filePath, source, "utf8");

  return {
    slug,
    filePath,
    draft: parsed.draft
  };
}

export function buildPublishedBlogSource(
  source: string,
  { publishedAt, updatedAt = new Date().toISOString(), featured }: Omit<PublishBlogPostInput, "slug"> = {}
) {
  const parsed = matter(source);
  const currentData = parsed.data as Record<string, unknown>;

  currentData.draft = false;
  currentData.publishedAt =
    publishedAt ??
    (typeof currentData.publishedAt === "string" && currentData.publishedAt ? currentData.publishedAt : updatedAt);
  currentData.updatedAt = updatedAt;

  if (featured !== undefined) {
    currentData.featured = featured;
  }

  const nextSource = matter.stringify(parsed.content, currentData);
  const nextPost = parseBlogMdx(nextSource);

  return {
    source: nextSource,
    post: nextPost
  };
}

export async function publishBlogPost({ slug, ...input }: PublishBlogPostInput) {
  const source = await readBlogPostSource(slug);
  const next = buildPublishedBlogSource(source, input);
  const result = await updateBlogPostSource(slug, next.source);

  return {
    ...result,
    publishedAt: next.post.publishedAt,
    updatedAt: next.post.updatedAt,
    featured: next.post.featured,
    previewPath: `/blog/${slug}`
  };
}

function countWords(content: string) {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

function countMatches(source: string, pattern: RegExp) {
  return source.match(pattern)?.length ?? 0;
}

function normalizeHeading(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeToken(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function extractTokens(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .split(/[^a-z0-9]+/g)
        .map((token) => token.trim())
        .filter((token) => token.length >= 3)
    )
  );
}

function intersect<T>(left: T[], right: T[]) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item));
}

export function reviewBlogSource(source: string): BlogReview {
  const post = parseBlogMdx(source);
  const wordCount = countWords(post.content);
  const headingCount = countMatches(post.content, /^##\s+/gm);
  const subheadingCount = countMatches(post.content, /^###\s+/gm);
  const internalLinkCount = countMatches(post.content, /\[[^\]]+\]\(\/[^)]+\)/g);
  const externalLinkCount = countMatches(post.content, /\[[^\]]+\]\(https?:\/\/[^)]+\)/g);
  const listCount = countMatches(post.content, /^\s*[-*]\s+/gm) + countMatches(post.content, /^\s*\d+\.\s+/gm);
  const checks: BlogReviewCheck[] = [];

  checks.push({
    name: "Length",
    status: wordCount >= 700 ? "pass" : wordCount >= 350 ? "warn" : "fail",
    details:
      wordCount >= 700
        ? `${wordCount} words. Substantive enough for a standalone article.`
        : wordCount >= 350
          ? `${wordCount} words. Publishable if the post is intentionally short, but still thin for a flagship portfolio article.`
          : `${wordCount} words. Still reads like a stub rather than a complete article.`
  });

  checks.push({
    name: "Section structure",
    status: headingCount >= 3 ? "pass" : headingCount >= 1 ? "warn" : "fail",
    details:
      headingCount >= 3
        ? `${headingCount} H2 sections found.`
        : headingCount >= 1
          ? `${headingCount} H2 section found. The article would scan better with a clearer middle structure.`
          : "No H2 sections found. Add sectioning so the piece scans and feels intentional."
  });

  checks.push({
    name: "Supporting detail",
    status: subheadingCount > 0 || listCount > 0 ? "pass" : "warn",
    details:
      subheadingCount > 0 || listCount > 0
        ? `Found ${subheadingCount} H3 headings and ${listCount} list blocks.`
        : "No subheadings or lists found. Consider adding examples, checklists, or comparison bullets."
  });

  checks.push({
    name: "Excerpt quality",
    status: post.excerpt.length <= 160 ? "pass" : post.excerpt.length <= 200 ? "warn" : "fail",
    details:
      post.excerpt.length <= 160
        ? `${post.excerpt.length} characters. Good card/feed length.`
        : post.excerpt.length <= 200
          ? `${post.excerpt.length} characters. Slightly long but still usable.`
          : `${post.excerpt.length} characters. Too long for a crisp card or feed summary.`
  });

  checks.push({
    name: "Tag focus",
    status: post.tags.length >= 3 && post.tags.length <= 5 ? "pass" : "warn",
    details:
      post.tags.length >= 3 && post.tags.length <= 5
        ? `${post.tags.length} tags. Reasonable topic coverage.`
        : `${post.tags.length} tags. Aim for 3 to 5 specific tags so discovery stays focused.`
  });

  checks.push({
    name: "Linking",
    status: internalLinkCount + externalLinkCount > 0 ? "pass" : "warn",
    details:
      internalLinkCount + externalLinkCount > 0
        ? `Found ${internalLinkCount} internal and ${externalLinkCount} external links.`
        : "No links found. Add internal or external references if they strengthen the argument."
  });

  checks.push({
    name: "Publish readiness",
    status: post.draft ? "warn" : "pass",
    details: post.draft ? "Post is still marked as draft." : "Post is not marked as draft."
  });

  const penalties = checks.reduce((total, check) => {
    if (check.status === "fail") {
      return total + 20;
    }

    if (check.status === "warn") {
      return total + 8;
    }

    return total;
  }, 0);

  const score = Math.max(0, 100 - penalties);
  const failCount = checks.filter((check) => check.status === "fail").length;
  const warnCount = checks.filter((check) => check.status === "warn").length;
  const summary =
    failCount > 0
      ? `${failCount} critical gap(s) and ${warnCount} warning(s). Strengthen the structure before publishing.`
      : warnCount > 0
        ? `${warnCount} warning(s). The post is close, but it still has a few weak spots.`
        : "No structural issues found. The post looks publish-ready from a deterministic review pass.";

  return {
    slug: post.slug,
    title: post.title,
    wordCount,
    score,
    checks,
    summary
  };
}

export async function reviewBlogPost(slug: string) {
  const source = await readBlogPostSource(slug);
  return reviewBlogSource(source);
}

export function listBlogSections(source: string) {
  const post = parseBlogMdx(source);
  const lines = post.content.split("\n");
  const sections: BlogSection[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const match = /^(#{2,6})\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const hashes = match[1] ?? "";
    const headingText = match[2] ?? "";
    const level = hashes.length;
    const heading = headingText.trim();
    let endIndex = lines.length;

    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
      const nextLine = lines[nextIndex] ?? "";
      const nextMatch = /^(#{2,6})\s+(.+)$/.exec(nextLine);

      if (nextMatch && (nextMatch[1] ?? "").length <= level) {
        endIndex = nextIndex;
        break;
      }
    }

    const markdown = lines.slice(index, endIndex).join("\n").trimEnd();
    const body = lines.slice(index + 1, endIndex).join("\n").trim();

    sections.push({
      heading,
      level,
      headingLine: line,
      body,
      markdown
    });
  }

  return sections;
}

export function getBlogSection(source: string, heading: string) {
  const target = normalizeHeading(heading);
  return listBlogSections(source).find((section) => normalizeHeading(section.heading) === target) ?? null;
}

export function rewriteBlogSectionSource(source: string, heading: string, nextSectionBody: string) {
  const parsed = matter(source);
  const lines = parsed.content.split("\n");
  const target = normalizeHeading(heading);
  let startIndex = -1;
  let endIndex = -1;
  let level = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{2,6})\s+(.+)$/.exec(lines[index] ?? "");

    if (!match) {
      continue;
    }

    if (normalizeHeading(match[2] ?? "") === target) {
      startIndex = index;
      level = (match[1] ?? "").length;
      endIndex = lines.length;

      for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
        const nextMatch = /^(#{2,6})\s+(.+)$/.exec(lines[nextIndex] ?? "");
        if (nextMatch && (nextMatch[1] ?? "").length <= level) {
          endIndex = nextIndex;
          break;
        }
      }

      break;
    }
  }

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Section "${heading}" was not found in the blog post.`);
  }

  const replacement = [(lines[startIndex] ?? "").trimEnd(), nextSectionBody.trim(), ""].join("\n");
  const before = lines.slice(0, startIndex).join("\n");
  const after = lines.slice(endIndex).join("\n");
  const nextContent = [before, replacement.trimEnd(), after].filter(Boolean).join("\n\n").trim();
  return matter.stringify(`${nextContent}\n`, parsed.data);
}

export async function rewriteBlogPostSection(slug: string, heading: string, nextSectionBody: string) {
  const source = await readBlogPostSource(slug);
  const nextSource = rewriteBlogSectionSource(source, heading, nextSectionBody);
  const result = await updateBlogPostSource(slug, nextSource);

  return {
    ...result,
    heading
  };
}

export async function suggestInternalLinksForPost(slug: string, limit = 5) {
  const source = await readBlogPostSource(slug);
  const post = parseBlogMdx(source);
  const publishedPosts = await getAllBlogPosts();
  const projects = await getAllProjects();
  const existingLinks = new Set(
    Array.from(post.content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g))
      .map((match) => match[1] ?? "")
      .filter(Boolean)
  );
  const postTokens = extractTokens([post.title, post.excerpt, ...post.tags, post.content].join(" "));
  const tagTokens = post.tags.map(normalizeToken);
  const suggestions: BlogLinkSuggestion[] = [];

  for (const candidate of publishedPosts) {
    if (candidate.slug === slug) {
      continue;
    }

    const href = `/blog/${candidate.slug}`;
    if (existingLinks.has(href)) {
      continue;
    }

    const candidateTokens = extractTokens([candidate.title, candidate.excerpt, ...candidate.tags].join(" "));
    const sharedTags = intersect(tagTokens, candidate.tags.map(normalizeToken));
    const sharedTokens = intersect(postTokens, candidateTokens);
    const score = sharedTags.length * 5 + sharedTokens.length;

    if (score <= 0) {
      continue;
    }

    const reasons = [
      sharedTags.length > 0 ? `shared tags: ${sharedTags.join(", ")}` : "",
      sharedTokens.length > 0 ? `overlapping topic terms: ${sharedTokens.slice(0, 4).join(", ")}` : ""
    ].filter(Boolean);

    suggestions.push({
      type: "blog",
      title: candidate.title,
      href,
      reason: reasons.join("; "),
      score
    });
  }

  for (const project of projects) {
    const href = `/projects/${project.slug}`;
    if (existingLinks.has(href)) {
      continue;
    }

    const projectTokens = extractTokens(
      [project.title, project.excerpt, project.context, project.problem, ...project.techStack].join(" ")
    );
    const sharedTokens = intersect(postTokens, projectTokens);
    const sharedTech = intersect(tagTokens, project.techStack.map(normalizeToken));
    const score = sharedTech.length * 4 + sharedTokens.length;

    if (score <= 0) {
      continue;
    }

    const reasons = [
      sharedTech.length > 0 ? `matching stack/topic terms: ${sharedTech.join(", ")}` : "",
      sharedTokens.length > 0 ? `overlapping context terms: ${sharedTokens.slice(0, 4).join(", ")}` : ""
    ].filter(Boolean);

    suggestions.push({
      type: "project",
      title: project.title,
      href,
      reason: reasons.join("; "),
      score
    });
  }

  return suggestions.sort((left, right) => right.score - left.score).slice(0, limit);
}

function buildValidationIssues(file: string, source: string): BlogValidationEntry {
  try {
    const post = parseBlogMdx(source);
    const issues: BlogValidationIssue[] = [];
    const wordCount = countWords(post.content);

    if (post.slug !== file.replace(/\.mdx$/, "")) {
      issues.push({
        level: "warning",
        message: `Frontmatter slug "${post.slug}" does not match filename "${file.replace(/\.mdx$/, "")}".`
      });
    }

    if (wordCount < 120) {
      issues.push({
        level: "warning",
        message: `Body is only ${wordCount} words. This may still be a stub.`
      });
    }

    if (post.excerpt.length > 180) {
      issues.push({
        level: "warning",
        message: `Excerpt is ${post.excerpt.length} characters. Shorter excerpts usually scan better in cards and feeds.`
      });
    }

    if (!post.draft && +new Date(post.publishedAt) > Date.now()) {
      issues.push({
        level: "warning",
        message: "Post is scheduled in the future. It will stay hidden until the publish date passes."
      });
    }

    return {
      file,
      slug: post.slug,
      issues
    };
  } catch (error) {
    return {
      file,
      issues: [
        {
          level: "error",
          message: error instanceof Error ? error.message : "Unknown parsing error"
        }
      ]
    };
  }
}

export async function validateBlogFiles(targetSlug?: string) {
  let files: string[];

  try {
    files = (await fs.readdir(BLOG_CONTENT_DIR)).filter((entry) => entry.endsWith(".mdx"));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      files = [];
    } else {
      throw error;
    }
  }

  const targetFiles = targetSlug ? files.filter((file) => file === `${targetSlug}.mdx`) : files;
  const entries = await Promise.all(
    targetFiles.map(async (file) => {
      const source = await fs.readFile(path.join(BLOG_CONTENT_DIR, file), "utf8");
      return buildValidationIssues(file, source);
    })
  );

  const posts = await getAllBlogPosts({ includeUnpublished: true });
  const slugCounts = new Map<string, number>();

  for (const post of posts) {
    slugCounts.set(post.slug, (slugCounts.get(post.slug) ?? 0) + 1);
  }

  for (const entry of entries) {
    if (entry.slug && (slugCounts.get(entry.slug) ?? 0) > 1) {
      entry.issues.push({
        level: "error",
        message: `Duplicate slug "${entry.slug}" detected across blog posts.`
      });
    }
  }

  const errorCount = entries.flatMap((entry) => entry.issues).filter((issue) => issue.level === "error").length;
  const warningCount = entries.flatMap((entry) => entry.issues).filter((issue) => issue.level === "warning").length;

  return {
    ok: errorCount === 0,
    errorCount,
    warningCount,
    entries
  };
}

export function buildPreviewEnableUrl(slug: string) {
  const secret = process.env.BLOG_PREVIEW_SECRET;
  const baseUrl =
    process.env.BLOG_PREVIEW_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  if (!secret) {
    return undefined;
  }

  const url = new URL("/api/draft", baseUrl);
  url.searchParams.set("secret", secret);
  url.searchParams.set("slug", `/blog/${slug}`);
  return url.toString();
}
