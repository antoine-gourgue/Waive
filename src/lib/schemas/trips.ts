import { z } from "zod";

export const createTripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  destination: z.string().min(1, "Destination is required"),
  cover_url: z.string().url().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;

export const updateTripSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  destination: z.string().min(1).optional(),
  cover_url: z.string().url().optional(),
  start_date: z.string().min(1).optional(),
  end_date: z.string().optional(),
});

export type UpdateTripInput = z.infer<typeof updateTripSchema>;
