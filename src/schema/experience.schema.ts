import { z } from "zod";

export const ExperienceSchema = z.object({
  companyName: z
    .string({
      message: "Company name is required.",
    })
    .min(2, {
      message: "Company name must be at least 2 characters long.",
    }),
  role: z
    .string({
      message: "Role is required.",
    })
    .min(2, {
      message: "Degree must be at least 2 characters long.",
    }),
  startDate: z.object(
    {
      month: z.string({
        message: "Start month is required.",
      }),
      year: z.string({
        message: "Start year is required.",
      }),
    },
    {
      message: "Start year is required",
    },
  ),
  endDate: z
    .object({
      month: z.string().optional(),
      year: z.string().optional(),
    })
    .optional(),
  description: z.string().optional(),
});
