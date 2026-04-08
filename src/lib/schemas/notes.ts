import { z } from "zod";

export const createNoteSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
