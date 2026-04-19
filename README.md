# Atharva CM Portfolio

A premium, Awwwards-inspired personal portfolio built with Next.js App Router, Tailwind CSS, MDX content collections, and motion libraries.

## Features

- App Router + TypeScript strict mode
- Blog + project case studies powered by local MDX
- Dedicated resume page for experience and skills
- Category/tech filters for projects
- Tag filtering + pagination + RSS for blog
- Opportunity-focused contact form API with Zod validation, honeypot, basic rate limiting, and Resend integration
- Cookie consent banner with consent-aware Google Tag Manager and Microsoft Clarity loading
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

- Google Tag Manager uses `NEXT_PUBLIC_GTM_ID` and is the single entry point for GA4
- Microsoft Clarity uses `NEXT_PUBLIC_CLARITY_ID` and is intentionally loaded directly by the app, not through GTM
- Analytics loaders live in `src/components/client-overlays.tsx` and only mount after analytics consent is accepted
- Do not initialize GA4 directly in app code while GTM owns the GA4 base tag, or pageviews/events can duplicate
- Do not add a Clarity tag in GTM unless the direct app integration is removed first, or Clarity can load twice

Custom GTM events:

- Event helper: `src/lib/gtm-events.ts`
- Tracked link wrapper: `src/components/tracked-link.tsx`
- Events emitted by the app: `resume_click`, `contact_form_submit`, `contact_email_click`, `linkedin_click`, `github_click`, `project_open`, `project_live_site_click`, `project_filter_select`, `blog_post_open`, `rss_click`
- Custom events are pushed only after analytics consent is accepted
- Custom analytics events are emitted through `dataLayer` for GTM to route into GA4

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
