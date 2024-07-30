import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(2000),
  from: z.string(),
  to: z.string(),
});
// .refine(
//   (data) => {
//     const from = parseInt(data.from.slice(0, 2));
//     const to = parseInt(data.to.slice(0, 2));
//     console.log({ from, to });
//     if (from > to) return false;
//   },
//   {
//     message: "Meeting end time cannot be earlier than start time.",
//     path: ["to"],
//   },
// );
// .refine(
//   (data) => {
//     const from = parseInt(data.from.slice(0, 2));
//     const to = parseInt(data.to.slice(0, 2));
//     const fromMinutes = parseInt(data.from.slice(-2));
//     const toMinutes = parseInt(data.to.slice(-2));
//
//
//     if (from === to && fromMinutes === toMinutes) return true;
//   },
//   {
//     message: "Meeting cannot start and end at the same time.",
//     path: ["to"],
//   },
// );

export type FormSchema = z.infer<typeof formSchema>;
