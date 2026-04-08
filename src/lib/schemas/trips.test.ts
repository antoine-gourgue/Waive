import { describe, it, expect } from "vitest";
import { createTripSchema, updateTripSchema } from "./trips";

describe("createTripSchema", () => {
  it("validates a complete trip input", () => {
    const input = {
      title: "Japan 2026",
      destination: "Tokyo",
      start_date: "2026-05-01",
      end_date: "2026-05-15",
      description: "Cherry blossom trip",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("validates with only required fields", () => {
    const input = {
      title: "Japan",
      destination: "Tokyo",
      start_date: "2026-05-01",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const input = {
      destination: "Tokyo",
      start_date: "2026-05-01",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty title", () => {
    const input = {
      title: "",
      destination: "Tokyo",
      start_date: "2026-05-01",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing destination", () => {
    const input = {
      title: "Japan",
      start_date: "2026-05-01",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing start_date", () => {
    const input = {
      title: "Japan",
      destination: "Tokyo",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid cover_url", () => {
    const input = {
      title: "Japan",
      destination: "Tokyo",
      start_date: "2026-05-01",
      cover_url: "not-a-url",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts valid cover_url", () => {
    const input = {
      title: "Japan",
      destination: "Tokyo",
      start_date: "2026-05-01",
      cover_url: "https://example.com/photo.jpg",
    };

    const result = createTripSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

describe("updateTripSchema", () => {
  it("validates partial update with only title", () => {
    const result = updateTripSchema.safeParse({ title: "Updated" });
    expect(result.success).toBe(true);
  });

  it("validates empty object (all fields optional)", () => {
    const result = updateTripSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("rejects empty title string", () => {
    const result = updateTripSchema.safeParse({ title: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid cover_url", () => {
    const result = updateTripSchema.safeParse({ cover_url: "bad" });
    expect(result.success).toBe(false);
  });
});
