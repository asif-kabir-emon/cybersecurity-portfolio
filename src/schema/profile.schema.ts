import { z } from "zod";

export const CreateProfileSchema = z.object({
  name: z
    .string({
      message: "Name is required.",
    })
    .min(5, {
      message: "Name must be at least 5 characters.",
    }),
  title: z
    .string({
      message: "Title is required.",
    })
    .min(5, {
      message: "Title must be at least 5 characters.",
    }),
  bio: z.string().optional(),
});
