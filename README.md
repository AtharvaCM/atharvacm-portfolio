# Atharva CM Portfolio

Personal portfolio site for Atharva Mahamuni, a senior full-stack engineer focused on React, Next.js, TypeScript, performance, and product engineering. This repo holds the public site, project case studies, writing system, and the small operational pieces around contact, analytics, SEO, and publishing.

## Highlights

- Home page built around positioning, proof points, and selected work
- Projects index with category filters and MDX-backed case study pages
- Resume, About, Contact, Blog, and `/now` pages
- Command palette for fast navigation
- Local MDX content workflow for projects and blog posts
- Blog tags, pagination, RSS, and draft preview support
- Consent-aware analytics with Google Tag Manager and Microsoft Clarity
- Contact form API with Zod validation, honeypot protection, basic rate limiting, and Resend email delivery
- Structured metadata, dynamic Open Graph images, `sitemap.xml`, and `robots.txt`
- Unit tests for core content, analytics, SEO, contact, and UI behavior

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- MDX
- Zod
- Vitest
- ESLint

## Content And Authoring

Projects and blog posts are stored locally as MDX content. The blog workflow supports draft creation, validation, publishing, preview mode for unpublished posts, RSS generation, and an optional local MCP server for authoring support.

Common commands:

```bash
npm run blog:new -- "Post title"
npm run blog:validate
npm run blog:publish -- <slug>
npm run mcp:blog
```

For the full publishing and preview flow, see [docs/blogging-system.md](/Users/atharvacm/technowizard/atharvacm-portfolio/docs/blogging-system.md).

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

```bash
npm run build
npm run start
npm run lint
npm run typecheck
npm test
```

## Environment Variables

Create `.env.local` and set the values relevant to your setup.

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

The detailed production email routing setup lives in [docs/contact-email-routing.md](/Users/atharvacm/technowizard/atharvacm-portfolio/docs/contact-email-routing.md).

## Quality

The repo includes:

- `npm run lint` for linting
- `npm run typecheck` for TypeScript checks
- `npm test` for unit tests with Vitest

## Documentation

- [Blog publishing system](/Users/atharvacm/technowizard/atharvacm-portfolio/docs/blogging-system.md)
- [Contact email routing](/Users/atharvacm/technowizard/atharvacm-portfolio/docs/contact-email-routing.md)

## Notes

This is a living personal site. Part portfolio, part writing system, part engineering sandbox.
