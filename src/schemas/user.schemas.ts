import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(20),
  email: z.string().max(100).email(),
  password: z.string().min(4).max(120),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

export const userRequestSchema = userSchema.omit({ id: true, active: true });

export const userResponseSchema = userSchema.omit({ password: true });

export const userDataUpdateSchema = userSchema.omit({
  id: true,
  active: true,
  admin: true,
});

export const userUpdateSchema = userDataUpdateSchema.partial();

export const userLoginSchema = userSchema.omit({
  id: true,
  name: true,
  admin: true,
  active: true,
});
