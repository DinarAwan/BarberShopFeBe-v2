import { z } from "zod";

export const bookingStatuses = ["PENDING", "CONFIRMED", "ONGOING", "DONE", "CANCELED"] as const;

export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  barberId: z.string().min(1),
  bookingDate: z.string().date(),
  bookingTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export const bookingStatusSchema = z.object({
  status: z.enum(bookingStatuses),
  notes: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
