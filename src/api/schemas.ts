import { z } from 'zod';

export const ReservationInputSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.number().int().min(1).max(10),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional()
});

export type ReservationInputDTO = z.infer<typeof ReservationInputSchema>;

export const ReservationResponseSchema = z.object({
  id: z.string()
});

export type ReservationResponseDTO = z.infer<typeof ReservationResponseSchema>;