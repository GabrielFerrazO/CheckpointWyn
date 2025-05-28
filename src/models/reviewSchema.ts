import { z } from 'zod';

export const reviewSchema = z.object({
  providerId: z.string(),
  clientId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});
