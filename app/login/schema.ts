import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(3),
});

export type FormSchema = z.infer<typeof formSchema>;
