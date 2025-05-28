// src/models/userSchema.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['CLIENT', 'PROVIDER']),
});
