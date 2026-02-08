# Atharva CM Portfolio

A premium, Awwwards-inspired personal portfolio built with Next.js App Router, Tailwind CSS, MDX content collections, and motion libraries.

## Features

- App Router + TypeScript strict mode
- Blog + project case studies powered by local MDX
- Dedicated resume page for experience and skills
- Category/tech filters for projects
- Tag filtering + pagination + RSS for blog
- Opportunity-focused contact form API with Zod validation, honeypot, basic rate limiting, and Resend integration
- Cookie consent banner with consent-aware GA4 loading
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

## Environment variables

Copy `.env.example` to `.env.local` and update values.

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_RESUME_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
