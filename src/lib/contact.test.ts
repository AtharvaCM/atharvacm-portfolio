import {
  __resetRateLimitStoreForTests,
  getRateLimitIdentifier,
  handleContactSubmission,
  isRateLimited,
  sendContactEmail
} from "@/lib/contact";

const validInput = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I am reaching out about a senior frontend role and wanted to discuss team fit.",
  website: ""
};

describe("handleContactSubmission", () => {
  beforeEach(() => {
    __resetRateLimitStoreForTests();
  });

  it("accepts valid input", async () => {
    const response = await handleContactSubmission(validInput, "127.0.0.1", async () => ({ id: "123" }));

    expect(response).toEqual({ ok: true, submissionId: "123" });
  });

  it("rejects invalid input", async () => {
    const response = await handleContactSubmission({ ...validInput, email: "not-email" }, "127.0.0.1", async () => ({
      id: "123"
    }));

    expect(response.ok).toBe(false);
  });

  it("returns a specific message for short messages", async () => {
    const response = await handleContactSubmission({ ...validInput, message: "Short" }, "127.0.0.1", async () => ({
      id: "123"
    }));

    expect(response).toEqual({
      ok: false,
      error: "Please enter a message with at least 20 characters."
    });
  });

  it("accepts honeypot silently", async () => {
    const response = await handleContactSubmission(
      { ...validInput, website: "https://spam.example" },
      "127.0.0.1",
      async () => ({ id: "123" })
    );

    expect(response.ok).toBe(true);
  });

  it("limits repeated requests", async () => {
    for (let i = 0; i < 5; i += 1) {
      await handleContactSubmission(validInput, "limit-key", async () => ({ id: String(i) }));
    }

    const blocked = await handleContactSubmission(validInput, "limit-key", async () => ({ id: "9" }));

    expect(blocked).toEqual({
      ok: false,
      error: "Too many requests. Please try again in a few minutes."
    });
  });

  it("surfaces sender failure", async () => {
    const response = await handleContactSubmission(validInput, "failure-key", async () => {
      throw new Error("Email API down");
    });

    expect(response).toEqual({
      ok: false,
      error: "Failed to send your message. Please try again."
    });
  });

  it("resets the rate-limit window after 15 minutes", async () => {
    const key = "window-key";
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(key, t0)).toBe(false);
    }
    expect(isRateLimited(key, t0)).toBe(true);

    const later = t0 + 15 * 60 * 1000 + 1;
    expect(isRateLimited(key, later)).toBe(false);
  });

  it("isolates rate-limit buckets per identifier", async () => {
    const now = 2_000_000;
    for (let i = 0; i < 5; i += 1) {
      isRateLimited("bucket-a", now);
    }
    expect(isRateLimited("bucket-a", now)).toBe(true);
    expect(isRateLimited("bucket-b", now)).toBe(false);
  });

  it("getRateLimitIdentifier falls back to 'anonymous' when ip is null", () => {
    expect(getRateLimitIdentifier(null)).toBe("anonymous");
    expect(getRateLimitIdentifier("203.0.113.7")).toBe("203.0.113.7");
  });

  it("does not silently simulate delivery when email config is missing", async () => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;

    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;

    await expect(sendContactEmail(validInput)).rejects.toThrow("Contact email delivery is not configured.");

    if (resendApiKey) {
      process.env.RESEND_API_KEY = resendApiKey;
    }

    if (contactToEmail) {
      process.env.CONTACT_TO_EMAIL = contactToEmail;
    }
  });
});
