# Contact Email Routing

This portfolio uses two different email identities on purpose:

- Public contact address: `hello@atharvacm.dev`
- Transactional sender: a verified Resend sender on `middle-earth.in`

Do not send contact-form email from `atharvacm.dev` through Resend unless that domain is verified in Resend. The current practical setup keeps `atharvacm.dev` as the public address and uses Cloudflare Email Routing for inbound forwarding.

## Runtime Behavior

The contact form is handled in `src/lib/contact.ts`.

When a visitor submits the form:

- `from` comes from `CONTACT_FROM_EMAIL`, falling back to `Portfolio <hello@middle-earth.in>`.
- `to` comes from `CONTACT_TO_EMAIL`.
- `replyTo` is set to the visitor-submitted email address.
- The Resend API key still comes from `RESEND_API_KEY`.

Recommended production values:

```bash
NEXT_PUBLIC_SITE_URL=https://atharvacm.dev
BLOG_PREVIEW_BASE_URL=https://atharvacm.dev
NEXT_PUBLIC_CONTACT_EMAIL=hello@atharvacm.dev
CONTACT_TO_EMAIL=hello@atharvacm.dev
CONTACT_FROM_EMAIL="Portfolio <hello@middle-earth.in>"
RESEND_API_KEY=<existing-resend-api-key>
```

`CONTACT_TO_EMAIL=hello@atharvacm.dev` works when Cloudflare Email Routing forwards that address to the real inbox. If you prefer to bypass forwarding for contact-form submissions, set `CONTACT_TO_EMAIL` to the real destination inbox instead. Keep `NEXT_PUBLIC_CONTACT_EMAIL=hello@atharvacm.dev` either way so the public site displays the canonical domain address.

## Cloudflare Email Routing

Cloudflare should handle inbound mail for `hello@atharvacm.dev`.

Manual setup:

1. Open Cloudflare dashboard for `atharvacm.dev`.
2. Go to Email Routing.
3. Enable Email Routing for the zone.
4. Add or verify the destination inbox where mail should be forwarded.
5. Create a routing rule:
   - Custom address: `hello@atharvacm.dev`
   - Action: forward to the verified destination inbox
6. Let Cloudflare add or verify the required Email Routing DNS records.
7. Confirm the DNS records are active and there are no conflicting MX/TXT records from another mail provider.
8. Send a test email to `hello@atharvacm.dev` and confirm it arrives in the destination inbox.

The installed `cf` CLI in this environment exposes DNS commands and its schema lists Email Routing APIs, but the runnable top-level CLI help does not expose Email Routing commands. Do not assume Email Routing is configured unless the Cloudflare dashboard or a supported CLI/API call verifies it.

## Netlify Environment Variables

Set these in Netlify:

```bash
NEXT_PUBLIC_SITE_URL=https://atharvacm.dev
BLOG_PREVIEW_BASE_URL=https://atharvacm.dev
NEXT_PUBLIC_CONTACT_EMAIL=hello@atharvacm.dev
CONTACT_TO_EMAIL=hello@atharvacm.dev
CONTACT_FROM_EMAIL="Portfolio <hello@middle-earth.in>"
RESEND_API_KEY=<existing-resend-api-key>
```

The public values are also documented in `.env.example`. `RESEND_API_KEY` must stay in Netlify environment variables or another secret store and should not be committed.
