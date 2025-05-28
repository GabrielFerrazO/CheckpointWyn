// src/models/serviceSchema.ts
import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  providerId: z.string().uuid()
});
