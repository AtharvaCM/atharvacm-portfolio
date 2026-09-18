import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const CONSENT_STORAGE_KEY = "portfolio-cookie-consent";
const DISMISSED_KEY = "portfolio-latest-post-dismissed";
const DELAY_MS = 6000;

const usePathnameMock = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));


let LatestPostPopover: typeof import("./latest-post-popover").LatestPostPopover;

const post = {
  slug: "git-merge-squash-rebase-explained",
  title: "Merge, Squash, or Rebase",
  publishedAt: "2026-09-18T09:27:36.000Z",
  readingTime: 7,
  excerpt: "What each GitHub merge button does to your commits.",
};

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

function waitOutDelay() {
  act(() => {
    vi.advanceTimersByTime(DELAY_MS);
  });
}

describe("LatestPostPopover", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createMemoryStorage(),
    });
  });

  beforeEach(async () => {
    vi.useFakeTimers();
    window.localStorage.clear();
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    usePathnameMock.mockReturnValue("/");
    vi.resetModules();
    ({ LatestPostPopover } = await import("./latest-post-popover"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    window.localStorage.clear();
  });

  it("appears only after the delay", () => {
    render(<LatestPostPopover post={post} />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();

    waitOutDelay();

    const link = screen.getByRole("link", { name: /merge, squash, or rebase/i });
    expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    expect(screen.getByText(/7 min read/i)).toBeInTheDocument();
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });

  it("closes and remembers the dismissed slug", () => {
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    fireEvent.click(screen.getByRole("button", { name: /close latest post/i }));

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(DISMISSED_KEY)).toBe(post.slug);
  });

  it("closes on Escape", () => {
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    fireEvent.keyDown(screen.getByRole("button", { name: /close latest post/i }), { key: "Escape" });

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("stays hidden once this post was dismissed", () => {
    window.localStorage.setItem(DISMISSED_KEY, post.slug);
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("shows again when a newer post replaces the dismissed one", () => {
    window.localStorage.setItem(DISMISSED_KEY, "an-older-post");
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    expect(screen.getByRole("complementary", { name: /latest blog post/i })).toBeInTheDocument();
  });

  it("waits for the cookie banner to be answered", () => {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("does not show on blog pages", () => {
    usePathnameMock.mockReturnValue("/blog");
    render(<LatestPostPopover post={post} />);
    waitOutDelay();

    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
});
