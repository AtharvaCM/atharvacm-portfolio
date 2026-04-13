import { __resetRateLimitStoreForTests, handleContactSubmission } from "@/lib/contact";

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
});
