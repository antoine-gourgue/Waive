import { describe, it, expect } from "vitest";
import { createDocumentSchema } from "./documents";

describe("createDocumentSchema", () => {
  it("validates a complete document input", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Boarding pass",
      file_url: "https://storage.example.com/file.pdf",
      file_type: "application/pdf",
      file_size: 1024,
    };

    const result = createDocumentSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid trip_id", () => {
    const input = {
      trip_id: "not-a-uuid",
      name: "Boarding pass",
      file_url: "https://storage.example.com/file.pdf",
      file_type: "application/pdf",
      file_size: 1024,
    };

    const result = createDocumentSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing name", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      file_url: "https://storage.example.com/file.pdf",
      file_type: "application/pdf",
      file_size: 1024,
    };

    const result = createDocumentSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects negative file_size", () => {
    const input = {
      trip_id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Boarding pass",
      file_url: "https://storage.example.com/file.pdf",
      file_type: "application/pdf",
      file_size: -1,
    };

    const result = createDocumentSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
