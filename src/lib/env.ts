import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url()
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalEmail = z
  .string()
  .trim()
  .email()
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalNonEmpty = z
  .string()
  .trim()
  .min(1)
  .optional()
  .or(z.literal("").transform(() => undefined));

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  NEXT_PUBLIC_SITE_URL: optionalUrl,
  NEXT_PUBLIC_CONTACT_EMAIL: optionalEmail,
  NEXT_PUBLIC_GTM_ID: optionalNonEmpty,
  NEXT_PUBLIC_CLARITY_ID: optionalNonEmpty,
  NEXT_PUBLIC_RESUME_URL: optionalNonEmpty,
  NEXT_PUBLIC_LINKEDIN_URL: optionalUrl,
  NEXT_PUBLIC_GITHUB_URL: optionalUrl,
  NEXT_PUBLIC_X_URL: optionalUrl,

  RESEND_API_KEY: optionalNonEmpty,
  CONTACT_TO_EMAIL: optionalEmail,
  CONTACT_FROM_EMAIL: optionalNonEmpty,
  BLOG_PREVIEW_SECRET: optionalNonEmpty,
  BLOG_PREVIEW_BASE_URL: optionalUrl,

  NEXT_PUBLIC_X_HANDLE: optionalNonEmpty,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: optionalNonEmpty,
  NEXT_PUBLIC_BING_SITE_VERIFICATION: optionalNonEmpty,
  NEXT_PUBLIC_YANDEX_VERIFICATION: optionalNonEmpty,
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  return parsed.data;
}

export const env = parseEnv();

export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (value === undefined || value === null || value === "") {
    throw new Error(`Missing required env var: ${String(key)}`);
  }
  return value as NonNullable<Env[K]>;
}
