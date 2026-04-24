import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  readConsent,
  writeConsent,
} from "./consent";

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

describe("consent storage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: createMemoryStorage(),
    });
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("returns null when nothing stored", () => {
    expect(readConsent()).toBeNull();
  });

  it("persists accepted value to localStorage", () => {
    writeConsent("accepted");
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("accepted");
    expect(readConsent()).toBe("accepted");
  });

  it("persists rejected value to localStorage", () => {
    writeConsent("rejected");
    expect(readConsent()).toBe("rejected");
  });

  it("dispatches CONSENT_EVENT on write", () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_EVENT, listener);
    writeConsent("accepted");
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(CONSENT_EVENT, listener);
  });

  it("falls back to memory cache when localStorage throws", () => {
    writeConsent("accepted");
    const spy = vi
      .spyOn(window.localStorage, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });

    expect(readConsent()).toBe("accepted");
    spy.mockRestore();
  });

  it("does not treat invalid stored values as accepted/rejected", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "garbage");
    const result = readConsent();
    expect(result).not.toBe("garbage");
  });
});
