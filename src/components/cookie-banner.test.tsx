import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const CONSENT_STORAGE_KEY = "portfolio-cookie-consent";

let CookieBanner: typeof import("./cookie-banner").CookieBanner;

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? (store.get(key) as string) : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

describe("CookieBanner", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createMemoryStorage(),
    });
  });

  beforeEach(async () => {
    window.localStorage.clear();
    vi.resetModules();
    ({ CookieBanner } = await import("./cookie-banner"));
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("renders when consent is unset", () => {
    render(<CookieBanner />);
    expect(screen.getByText(/Analytics cookies/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reject/i })).toBeInTheDocument();
  });

  it("hides and persists accepted consent", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /accept/i }));
    expect(screen.queryByText(/Analytics cookies/i)).not.toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("accepted");
  });

  it("hides and persists rejected consent", () => {
    render(<CookieBanner />);
    fireEvent.click(screen.getByRole("button", { name: /reject/i }));
    expect(screen.queryByText(/Analytics cookies/i)).not.toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("rejected");
  });

  it("does not render when consent already stored", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    render(<CookieBanner />);
    expect(screen.queryByText(/Analytics cookies/i)).not.toBeInTheDocument();
  });

  it("links to privacy policy", () => {
    render(<CookieBanner />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });
});
