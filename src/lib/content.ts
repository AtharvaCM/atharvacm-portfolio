import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

import { BLOG_PAGE_SIZE, PROJECT_CATEGORIES } from "./constants";
import type { BlogPost, BlogPostMeta, Project, ProjectMeta } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "src/content");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");

const projectMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  context: z.string().min(1),
  problem: z.string().min(1),
  contribution: z.string().min(1),
  impact: z.string().min(1),
  metricHighlights: z.array(z.string()).min(1),
  coverImage: z.string().min(1),
  year: z.number().int(),
  client: z.string().optional(),
  role: z.string().min(1),
  services: z.array(z.string()).min(1),
  techStack: z.array(z.string()).min(1),
  category: z.enum(PROJECT_CATEGORIES),
  duration: z.string().optional(),
  outcomes: z.array(z.string()).min(1),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  featured: z.boolean()
});

const blogMetaSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString() : value),
    z.string().datetime()
  ),
  updatedAt: z
    .preprocess((value) => (value instanceof Date ? value.toISOString() : value), z.string().datetime())
    .optional(),
  tags: z.array(z.string()).min(1),
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
  showCoverImageInPost: z.boolean().optional().default(true),
  readingTime: z.number().int().positive().optional(),
  featured: z.boolean(),
  draft: z.boolean().optional().default(false)
});

type BlogQueryOptions = {
  includeUnpublished?: boolean;
  now?: Date;
};

const WORDS_PER_MINUTE = 200;
// Readers skim code blocks (console output, config, boilerplate) rather than read them word by word.
const CODE_WORD_WEIGHT = 0.5;

const FENCED_CODE_BLOCK = /^[ \t]*(`{3,}|~{3,})[^\n]*\n([\s\S]*?)(?:^[ \t]*\1[ \t]*$|(?![\s\S]))/gm;
const MDX_COMMENT = /\{\/\*[\s\S]*?\*\/\}/g;
const INLINE_CODE = /`([^`\n]+)`/g;
// Attribute values may hold quoted strings or JSX expressions nested one level deep, like style={{ ... }}.
const JSX_TAG = /<\/?[A-Za-z][\w.:-]*(?:[^"'{}>]|"[^"]*"|'[^']*'|\{(?:[^{}]|\{[^{}]*\})*\})*>/g;
const MARKDOWN_IMAGE = /!\[[^\]]*]\([^)]*\)/g;
const MARKDOWN_LINK = /\[([^\]]*)]\([^)]*\)/g;
const LINK_DEFINITION = /^[ \t]*\[[^\]]+]:.*$/gm;
const ORDERED_LIST_MARKER = /^[ \t]*\d+[.)][ \t]+/gm;

// Tokens with no letter or digit are markup (#, -, |, >, ---) or punctuation (—), not words.
function countWords(text: string) {
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

function calculateReadingTime(content: string) {
  let codeWords = 0;
  const prose = content
    .replace(FENCED_CODE_BLOCK, (_block, _fence, code: string) => {
      codeWords += countWords(code);
      return "\n";
    })
    .replace(MDX_COMMENT, " ")
    // Keep inline code as words, but stop `<sha>` from reading as a tag.
    .replace(INLINE_CODE, (_span, code: string) => code.replace(/[<>]/g, " "))
    .replace(JSX_TAG, " ")
    .replace(MARKDOWN_IMAGE, " ")
    .replace(MARKDOWN_LINK, "$1")
    .replace(LINK_DEFINITION, "")
    .replace(ORDERED_LIST_MARKER, "");

  const words = countWords(prose) + codeWords * CODE_WORD_WEIGHT;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function getFileList(directory: string) {
  let entries: string[];

  try {
    entries = await fs.readdir(directory);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  return entries.filter((entry) => entry.endsWith(".mdx"));
}

export function parseProjectMdx(source: string): Project {
  const { data, content } = matter(source);
  const parsed = projectMetaSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(`Invalid project frontmatter: ${parsed.error.message}`);
  }

  return {
    ...parsed.data,
    content
  };
}

export function parseBlogMdx(source: string): BlogPost {
  const { data, content } = matter(source);
  const parsed = blogMetaSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(`Invalid blog frontmatter: ${parsed.error.message}`);
  }

  return {
    ...parsed.data,
    readingTime: parsed.data.readingTime ?? calculateReadingTime(content),
    content
  };
}

export function isPublishedBlogPost(
  post: Pick<BlogPostMeta, "draft" | "publishedAt">,
  now = new Date()
) {
  return !post.draft && +new Date(post.publishedAt) <= +now;
}

function sortProjects(projects: ProjectMeta[]) {
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return b.year - a.year;
  });
}

function sortPosts(posts: BlogPostMeta[]) {
  return posts.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const files = await getFileList(PROJECTS_DIR);
  const projects = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
      const parsed = parseProjectMdx(source);
      return {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        context: parsed.context,
        problem: parsed.problem,
        contribution: parsed.contribution,
        impact: parsed.impact,
        metricHighlights: parsed.metricHighlights,
        coverImage: parsed.coverImage,
        year: parsed.year,
        client: parsed.client,
        role: parsed.role,
        services: parsed.services,
        techStack: parsed.techStack,
        category: parsed.category,
        duration: parsed.duration,
        outcomes: parsed.outcomes,
        liveUrl: parsed.liveUrl,
        repoUrl: parsed.repoUrl,
        featured: parsed.featured
      };
    })
  );

  return sortProjects(projects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    return parseProjectMdx(source);
  } catch {
    return null;
  }
}

export async function getProjectSlugs() {
  const files = await getFileList(PROJECTS_DIR);
  return files.map((file) => file.replace(/\.mdx$/, ""));
}

export function filterProjects(projects: ProjectMeta[], category?: string, tech?: string) {
  return projects.filter((project) => {
    const categoryMatch = category ? project.category === category : true;
    const techMatch = tech
      ? project.techStack.map((item) => item.toLowerCase()).includes(tech.toLowerCase())
      : true;
    return categoryMatch && techMatch;
  });
}

export async function getAllBlogPosts(options: BlogQueryOptions = {}): Promise<BlogPostMeta[]> {
  const now = options.now ?? new Date();
  const files = await getFileList(BLOG_DIR);
  const posts = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
      const parsed = parseBlogMdx(source);
      return {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        publishedAt: parsed.publishedAt,
        updatedAt: parsed.updatedAt,
        tags: parsed.tags,
        coverImage: parsed.coverImage,
        coverImageAlt: parsed.coverImageAlt,
        showCoverImageInPost: parsed.showCoverImageInPost,
        readingTime: parsed.readingTime,
        featured: parsed.featured,
        draft: parsed.draft
      };
    })
  );

  const sorted = sortPosts(posts);
  return options.includeUnpublished ? sorted : sorted.filter((post) => isPublishedBlogPost(post, now));
}

export async function getBlogPostBySlug(
  slug: string,
  options: BlogQueryOptions = {}
): Promise<BlogPost | null> {
  const now = options.now ?? new Date();
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const post = parseBlogMdx(source);
    if (!options.includeUnpublished && !isPublishedBlogPost(post, now)) {
      return null;
    }

    return post;
  } catch {
    return null;
  }
}

export async function getBlogSlugs(options: BlogQueryOptions = {}) {
  const now = options.now ?? new Date();
  const files = await getFileList(BLOG_DIR);

  if (options.includeUnpublished) {
    return files.map((file) => file.replace(/\.mdx$/, ""));
  }

  const visibleFiles = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
      const parsed = parseBlogMdx(source);
      return isPublishedBlogPost(parsed, now) ? file.replace(/\.mdx$/, "") : null;
    })
  );

  return visibleFiles.filter((slug): slug is string => Boolean(slug));
}

export function getAllTags(posts: BlogPostMeta[]) {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b));
}

export function filterPostsByTag(posts: BlogPostMeta[], tag?: string) {
  if (!tag) {
    return posts;
  }

  return posts.filter((post) => post.tags.includes(tag));
}

export function paginatePosts(posts: BlogPostMeta[], page: number) {
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;
  const end = start + BLOG_PAGE_SIZE;

  return {
    posts: posts.slice(start, end),
    currentPage,
    totalPages: Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE))
  };
}

export function getRelatedPosts(posts: BlogPostMeta[], currentSlug: string, limit = 3) {
  const current = posts.find((post) => post.slug === currentSlug);
  if (!current) {
    return [];
  }

  const related = posts
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
      return { post, commonTags };
    })
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, limit)
    .map(({ post }) => post);

  return related;
}
