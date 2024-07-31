import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(3),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
