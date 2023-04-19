import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string().max(20),
  email: z.string().max(100).email(),
  password: z.string().min(6).max(120),
  admin: z.boolean(),
  active: z.boolean(),
});

// faltando o admin como optional
export const userRequestSchema = userSchema.omit({ id: true, active: true });

export const userResponseSchema = userSchema.omit({ password: true });

export const userUpdateSchema = userSchema.partial();
