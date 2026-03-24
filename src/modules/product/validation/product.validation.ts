import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(120),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category: z.string().min(2).max(50),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
