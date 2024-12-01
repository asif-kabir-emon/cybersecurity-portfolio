import { z } from "zod";

export const EducationSchema = z.object({
  school: z
    .string({
      message: "School name is required.",
    })
    .min(5, {
      message: "School name must be at least 5 characters.",
    }),
  degree: z
    .string({
      message: "Degree is required.",
    })
    .min(5, {
      message: "Degree must be at least 5 characters.",
    }),
  fieldOfStudy: z
    .string({
      message: "Field of study is required.",
    })
    .min(5, {
      message: "Field of study must be at least 5 characters.",
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
  grade: z.string().optional(),
});
