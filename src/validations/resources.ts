import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(8),
  price: z.coerce.number().int().positive(),
  duration: z.coerce.number().int().min(10).max(240),
});

export const barberSchema = z.object({
  name: z.string().min(2),
  image: z.string().url(),
  specialty: z.string().min(3),
});
