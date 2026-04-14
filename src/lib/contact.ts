import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";

import type { ContactFormInput, ContactResponse } from "@/lib/types";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
export const DEFAULT_CONTACT_FROM_EMAIL = "Portfolio <hello@middle-earth.in>";

export const contactFormSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(20).max(2500),
  website: z.string().max(200).optional()
});

function getContactValidationMessage(error: z.ZodError<ContactFormInput>) {
  const fields = error.flatten().fieldErrors;

  if (fields.name?.length) {
    return "Please enter your name.";
  }

  if (fields.email?.length) {
    return "Please enter a valid email address.";
  }

  if (fields.message?.length) {
    return "Please enter a message with at least 20 characters.";
  }

  return "Invalid form data. Please review your inputs.";
}

export function getRateLimitIdentifier(ip: string | null) {
  return ip ?? "anonymous";
}

export function isRateLimited(identifier: string, now = Date.now()) {
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function formatContactEmail(input: ContactFormInput) {
  return {
    subject: `New Portfolio Contact - ${input.name}`,
    html: `
      <h2>New Portfolio Contact</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Message:</strong></p>
      <p>${input.message.replaceAll("\n", "<br/>")}</p>
    `
  };
}

export async function sendContactEmail(input: ContactFormInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_CONTACT_FROM_EMAIL;

  if (!apiKey || !to) {
    return { id: randomUUID(), simulated: true };
  }

  const resend = new Resend(apiKey);
  const email = formatContactEmail(input);
  const response = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: email.subject,
    html: email.html
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return { id: response.data?.id ?? randomUUID(), simulated: false };
}

export async function handleContactSubmission(
  payload: unknown,
  rateLimitIdentifier: string,
  sender: (input: ContactFormInput) => Promise<{ id: string } | { id: string; simulated: boolean }> =
    sendContactEmail
): Promise<ContactResponse> {
  if (isRateLimited(rateLimitIdentifier)) {
    return { ok: false, error: "Too many requests. Please try again in a few minutes." };
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return { ok: false, error: getContactValidationMessage(parsed.error) };
  }

  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    return { ok: true, submissionId: randomUUID() };
  }

  try {
    const result = await sender(parsed.data);
    return { ok: true, submissionId: result.id };
  } catch {
    return { ok: false, error: "Failed to send your message. Please try again." };
  }
}

export function __resetRateLimitStoreForTests() {
  rateLimitStore.clear();
}
