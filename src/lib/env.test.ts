import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("env validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws when NEXT_PUBLIC_SUPABASE_URL is missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "test-token";

    await expect(() => import("./env")).rejects.toThrow();
  });

  it("throws when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "test-token";

    await expect(() => import("./env")).rejects.toThrow();
  });

  it("throws when NEXT_PUBLIC_MAPBOX_TOKEN is missing", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
    delete process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    await expect(() => import("./env")).rejects.toThrow();
  });

  it("throws when NEXT_PUBLIC_SUPABASE_URL is not a valid URL", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "not-a-url";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "test-token";

    await expect(() => import("./env")).rejects.toThrow();
  });

  it("parses valid environment variables", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN = "test-token";

    const { env } = await import("./env");
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://test.supabase.co");
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("test-key");
    expect(env.NEXT_PUBLIC_MAPBOX_TOKEN).toBe("test-token");
  });
});
