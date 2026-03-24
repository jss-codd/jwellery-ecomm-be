import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  password: z.string().min(8),
  role_name: z.string().min(2).max(50).default("staff"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
