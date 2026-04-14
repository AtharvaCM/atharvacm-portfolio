# Blog Publishing System

This repo uses a local MDX blog system backed by typed parsing utilities, CLI scripts, draft-mode preview routes, RSS generation, and a local MCP server for authoring support.

## Where Content Lives

Blog posts live in:

```text
src/content/blog/*.mdx
```

Each file is parsed by `src/lib/content.ts` with `gray-matter` and a Zod frontmatter schema. The filename should match the `slug` field. Validation warns when they differ, and MCP/source update flows reject slug mismatches when writing a post.

## Frontmatter Schema

The current blog frontmatter schema is:

```yaml
---
title: "A Practical Performance Budget for Next.js Portfolio Sites"
slug: nextjs-performance-budget
excerpt: "A fast checklist for keeping premium portfolio sites under control as motion and media scale."
publishedAt: 2025-09-18T00:00:00.000Z
updatedAt: 2025-09-20T00:00:00.000Z
tags:
  - Next.js
  - Performance
  - Web Vitals
coverImage: /images/blog/performance-budget.jpg
readingTime: 4
featured: true
draft: false
---
```

Required fields:

- `title`: non-empty string
- `slug`: non-empty string
- `excerpt`: non-empty string
- `publishedAt`: ISO datetime string
- `tags`: at least one tag
- `featured`: boolean

Optional fields:

- `updatedAt`: ISO datetime string
- `coverImage`: image path used for metadata/card support where applicable
- `readingTime`: positive integer; if omitted, the site calculates it from body content at roughly 200 words per minute
- `draft`: boolean; defaults to `false` when omitted

## Visibility Rules

Public blog queries use `getAllBlogPosts()` and `getBlogPostBySlug()` from `src/lib/content.ts`.

- Draft posts: `draft: true`. Hidden from the public blog index, detail pages, static params, and RSS unless draft mode is enabled.
- Scheduled posts: `draft: false` with a future `publishedAt`. Hidden until the publish date passes unless draft mode is enabled.
- Published posts: `draft: false` with `publishedAt` less than or equal to the current date. Visible on the public blog, detail page, static params, and RSS.

Draft mode changes the query option to `includeUnpublished: true`, so both drafts and scheduled posts become visible in the blog index and detail pages while preview mode is enabled.

## Creating Drafts

Use the scaffold script:

```bash
npm run blog:new -- "Post title"
```

Optional flags:

```bash
npm run blog:new -- "Post title" \
  --slug=post-title \
  --tags=Next.js,Performance \
  --excerpt="A short excerpt." \
  --publishedAt=2026-04-14T09:00:00.000Z \
  --featured \
  --notes="Starter notes for the article."
```

The script calls `createBlogDraft()` from `src/lib/blog-authoring.ts`. It writes a new file in `src/content/blog`, sets `draft: true`, defaults tags to `Draft`, defaults `featured` to `false`, and prints the file path plus `/blog/<slug>` preview path.

## Previewing Unpublished Posts

Preview mode is enabled through:

```text
/api/draft?secret=<BLOG_PREVIEW_SECRET>&slug=/blog/<slug>
```

The route is implemented in `src/app/api/draft/route.ts`.

Behavior:

- Requires `BLOG_PREVIEW_SECRET`.
- Returns `500` if the secret is not configured.
- Returns `401` if the provided secret does not match.
- Enables Next.js draft mode.
- Redirects to the `slug` query value only if it starts with `/`; otherwise it redirects to `/blog`.

Disable preview mode through:

```text
/api/draft/disable
```

The disable route clears draft mode and redirects back to the same-origin `referer` when available. If there is no safe referer, it redirects to `/blog`.

The helper `buildPreviewEnableUrl(slug)` uses `BLOG_PREVIEW_SECRET` and a base URL from `BLOG_PREVIEW_BASE_URL`, then `NEXT_PUBLIC_SITE_URL`, then `http://localhost:3000`.

## Validating Posts

Validate all posts:

```bash
npm run blog:validate
```

Validate one post:

```bash
npm run blog:validate -- <slug>
```

The script calls `validateBlogFiles()` from `src/lib/blog-authoring.ts`.

Validation currently reports:

- Frontmatter parse/schema errors as errors.
- Duplicate slugs as errors.
- Slug/filename mismatch as a warning.
- Body content under 120 words as a warning.
- Excerpts over 180 characters as a warning.
- Future-dated non-draft posts as a warning because they are scheduled and hidden until the date passes.

The command exits with a non-zero status when any errors are found.

## Publishing Posts

Publish a post:

```bash
npm run blog:publish -- <slug>
```

Optional flags:

```bash
npm run blog:publish -- <slug> \
  --publishedAt=2026-04-14T09:00:00.000Z \
  --featured
```

The script calls `publishBlogPost()` from `src/lib/blog-authoring.ts`. It sets:

- `draft: false`
- `publishedAt` to the provided timestamp, or keeps the existing value if present, or falls back to the current `updatedAt`
- `updatedAt` to the current time
- `featured` when `--featured` is provided

## Branch, Commit, and PR Publishing

The publish script can also run a small git workflow:

```bash
npm run blog:publish -- <slug> --branch=publish/<slug> --commit --pr
```

Behavior:

- `--branch=<name>` switches to the branch if it exists, otherwise creates it.
- `--commit` stages only the published post file and commits it.
- `--pr` creates a pull request with `gh pr create`.
- If `--commit` or `--pr` is passed without `--branch`, the script uses `publish/<slug>`.
- PR base defaults to `main`; override with `--base=<branch>`.
- Commit/PR title defaults to `Publish blog post: <slug>`; override with `--title=...`.
- PR body defaults to `Publishes \`<slug>\` from draft to the live blog.`; override with `--body=...`.

Example:

```bash
npm run blog:publish -- nextjs-performance-budget \
  --branch=publish/nextjs-performance-budget \
  --commit \
  --pr \
  --base=main \
  --title="Publish Next.js performance budget post"
```

This workflow expects `git` and the GitHub CLI (`gh`) to be available and authenticated.

## Blog Index, Filtering, and Pagination

The blog index route is `src/app/blog/page.tsx`.

It:

- Reads `tag` and `page` from query params.
- Includes unpublished posts only when Next.js draft mode is enabled.
- Builds tags from the currently loaded posts.
- Filters posts by exact tag match.
- Paginates with `BLOG_PAGE_SIZE`, currently `6`.
- Shows a preview-mode note when draft mode is enabled.
- Links to `/rss.xml`.

Example URLs:

```text
/blog
/blog?tag=Performance
/blog?tag=Performance&page=2
```

## Blog Detail Pages and Related Posts

Blog detail pages live at `src/app/blog/[slug]/page.tsx`.

They:

- Generate static params from published slugs only.
- Include unpublished posts in metadata and page rendering only when draft mode is enabled.
- Return `notFound()` when the post is not visible or does not exist.
- Show `Previewing draft post` or `Previewing scheduled post` when viewing unpublished content in draft mode.
- Render MDX through `MdxRenderer`.
- Add article structured data through `StructuredData`.
- Show up to three related posts.

Related posts are selected by `getRelatedPosts()` using shared tags from the currently loaded post set. In draft mode, unpublished posts can participate in related-post suggestions because the page loads posts with `includeUnpublished: true`.

## RSS

RSS is served from:

```text
/rss.xml
```

The route `src/app/rss.xml/route.ts` calls `getAllBlogPosts()` without `includeUnpublished`, so RSS only includes posts that are publicly published at request time.

`src/lib/rss.ts` generates RSS 2.0 XML with:

- site title from `SITE_NAME`
- links based on `SITE_URL`
- each post title, link, guid, excerpt, and `publishedAt` as `pubDate`

The response uses:

```http
Content-Type: application/rss+xml; charset=utf-8
Cache-Control: public, s-maxage=1200, stale-while-revalidate=86400
```

## MCP-Assisted Blog Workflow

Start the local MCP server:

```bash
npm run mcp:blog
```

The server is implemented in `mcp/blog-server.ts` and runs over stdio with the name `atharvacm-portfolio-blog`.

Available resource:

- `blog://style-guide`: short repo-specific blog style guide.

Available prompt:

- `write-blog-post`: creates a prompt for drafting an MDX article from a topic, optional angle, and notes.

Available tools:

- `list_posts`: list all posts, including drafts and scheduled posts.
- `read_post`: read raw MDX source for one slug.
- `create_draft`: create a new `draft: true` file in `src/content/blog`.
- `update_post_source`: overwrite an existing post after validating frontmatter and slug/file consistency.
- `publish_post`: set `draft: false`, update timestamps, and optionally set `featured`.
- `validate_posts`: validate all posts or one slug.
- `review_post`: run deterministic publish-readiness checks and optionally add an AI editorial review through MCP sampling.
- `link_suggestions`: suggest internal blog/project links using deterministic token and tag matching.
- `suggest_metadata`: use MCP sampling to suggest a title, excerpt, tags, and slug.
- `outline_post`: use MCP sampling to generate a practical article outline.
- `rewrite_post_section`: use MCP sampling to rewrite a named `##`-style section and optionally apply the result.

Tools that use `server.server.createMessage()` require an MCP client that supports sampling. If sampling is not available, the server returns an explicit sampling error for those tools.

Use the MCP tools when you want authoring help, metadata suggestions, deterministic reviews, internal-link suggestions, or safe section-level rewrites. Use the CLI scripts when you want straightforward file creation, validation, and publishing from the terminal.

## Recommended Publishing Checklist

1. Create a draft:

   ```bash
   npm run blog:new -- "Post title" --tags=Next.js,Performance
   ```

2. Write the MDX body in `src/content/blog/<slug>.mdx`.

3. Confirm required frontmatter is present and the filename matches `slug`.

4. Preview the post:

   ```text
   /api/draft?secret=<BLOG_PREVIEW_SECRET>&slug=/blog/<slug>
   ```

5. Validate:

   ```bash
   npm run blog:validate -- <slug>
   ```

6. Optionally use MCP tools:

   - `review_post` for deterministic and optional editorial checks.
   - `link_suggestions` for internal blog/project links.
   - `rewrite_post_section` for focused section edits.

7. Publish:

   ```bash
   npm run blog:publish -- <slug>
   ```

8. If you want a PR-based publish flow:

   ```bash
   npm run blog:publish -- <slug> --branch=publish/<slug> --commit --pr
   ```

9. Re-run validation and the normal project checks before merging:

   ```bash
   npm run blog:validate
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
