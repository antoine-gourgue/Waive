import { describe, it, expect } from "vitest";
import { createPhotoSchema } from "./photos";

describe("createPhotoSchema", () => {
  it("validates a complete photo input", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      url: "https://storage.example.com/photo.jpg",
      caption: "Sunset at Shibuya",
      taken_at: "2026-05-03T18:30:00Z",
    };

    const result = createPhotoSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("validates with only required fields", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      url: "https://storage.example.com/photo.jpg",
    };

    const result = createPhotoSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid url", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      url: "not-a-url",
    };

    const result = createPhotoSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid trip_id", () => {
    const input = {
      trip_id: "bad-id",
      url: "https://storage.example.com/photo.jpg",
    };

    const result = createPhotoSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
