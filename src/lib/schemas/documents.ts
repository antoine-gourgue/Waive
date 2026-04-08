import { z } from "zod";

export const createDocumentSchema = z.object({
  trip_id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  file_url: z.string().url(),
  file_type: z.string().min(1),
  file_size: z.number().positive(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
