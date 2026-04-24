import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

let trackEvent: typeof import("./gtm-events").trackEvent;

describe("trackEvent", () => {
  beforeEach(async () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createMemoryStorage(),
    });
    window.dataLayer = undefined;
    vi.resetModules();
    ({ trackEvent } = await import("./gtm-events"));
  });

  afterEach(() => {
    window.dataLayer = undefined;
  });

  it("does not push to dataLayer when consent is unset", () => {
    trackEvent("test_event", { a: 1 });
    expect(window.dataLayer).toBeUndefined();
  });

  it("does not push when consent is rejected", () => {
    window.localStorage.setItem("portfolio-cookie-consent", "rejected");
    trackEvent("test_event", { a: 1 });
    expect(window.dataLayer).toBeUndefined();
  });

  it("pushes event with payload when consent is accepted", () => {
    window.localStorage.setItem("portfolio-cookie-consent", "accepted");
    trackEvent("test_event", { foo: "bar", count: 2 });
    expect(window.dataLayer).toEqual([
      { event: "test_event", foo: "bar", count: 2 },
    ]);
  });

  it("appends to existing dataLayer", () => {
    window.localStorage.setItem("portfolio-cookie-consent", "accepted");
    window.dataLayer = [{ event: "pre_existing" }];
    trackEvent("new_event");
    expect(window.dataLayer).toEqual([
      { event: "pre_existing" },
      { event: "new_event" },
    ]);
  });
});
