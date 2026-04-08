import { z } from "zod";

export const createPhotoSchema = z.object({
  trip_id: z.string().uuid(),
  url: z.string().url(),
  caption: z.string().optional(),
  taken_at: z.string().optional(),
});

export type CreatePhotoInput = z.infer<typeof createPhotoSchema>;
