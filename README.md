# Atharva CM Portfolio

A premium, Awwwards-inspired personal portfolio built with Next.js App Router, Tailwind CSS, MDX content collections, and motion libraries.

## Features

- App Router + TypeScript strict mode
- Blog + project case studies powered by local MDX
- Dedicated resume page for experience and skills
- Category/tech filters for projects
- Tag filtering + pagination + RSS for blog
- Opportunity-focused contact form API with Zod validation, honeypot, basic rate limiting, and Resend integration
- Cookie consent banner with consent-aware GA4, Google Tag Manager, and Microsoft Clarity loading
- SEO routes: `sitemap.xml`, `robots.txt`, `rss.xml`
- CI workflow for lint/typecheck/test/build

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint
- `npm run typecheck` - TypeScript checks
- `npm test` - run unit tests
- `npm run blog:new -- "Post title"` - scaffold a hidden draft post in `src/content/blog`
- `npm run blog:publish -- <slug>` - flip a draft live and optionally prepare git/PR workflow
- `npm run blog:validate` - validate all blog posts
- `npm run mcp:blog` - start the local MCP server for blog authoring tools

## Environment variables

Copy `.env.example` to `.env.local` and update values.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_RESUME_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_X_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `BLOG_PREVIEW_SECRET`
- `BLOG_PREVIEW_BASE_URL`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Contact email setup:

- Public email shown on the site: `hello@atharvacm.dev`
- Inbound email: Cloudflare Email Routing should forward `hello@atharvacm.dev` to the real inbox
- Contact form sender: Resend should send from a verified `middle-earth.in` address, configured with `CONTACT_FROM_EMAIL`
- Contact form replies: `replyTo` is set to the visitor-submitted email address

See [docs/contact-email-routing.md](docs/contact-email-routing.md) for the production setup.

Analytics setup:

- GA4 uses `NEXT_PUBLIC_GA_ID`
- Google Tag Manager uses `NEXT_PUBLIC_GTM_ID`
- Microsoft Clarity uses `NEXT_PUBLIC_CLARITY_ID`
- Analytics loaders live in `src/components/client-overlays.tsx` and only mount after analytics consent is accepted
- If GA4 is configured inside GTM, leave `NEXT_PUBLIC_GA_ID` empty to avoid duplicate pageviews

## Blog workflow

Blog posts are local MDX files in `src/content/blog`. Drafts, scheduled posts, validation, preview mode,
RSS, and MCP-assisted authoring are documented in [docs/blogging-system.md](docs/blogging-system.md).

Common commands:

```bash
npm run blog:new -- "Post title"
npm run blog:validate
npm run blog:publish -- <slug>
npm run mcp:blog
```
