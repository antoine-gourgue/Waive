import { describe, it, expect } from "vitest";
import { createNoteSchema, updateNoteSchema } from "./notes";

describe("createNoteSchema", () => {
  it("validates a complete note input", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Day 1",
      content: "Arrived in Tokyo",
    };

    const result = createNoteSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      title: "",
      content: "Some content",
    };

    const result = createNoteSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty content", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Day 1",
      content: "",
    };

    const result = createNoteSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("updateNoteSchema", () => {
  it("validates partial update", () => {
    const result = updateNoteSchema.safeParse({ title: "Updated title" });
    expect(result.success).toBe(true);
  });

  it("validates empty object", () => {
    const result = updateNoteSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});
