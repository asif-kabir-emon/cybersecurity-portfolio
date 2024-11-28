import { z } from "zod";

export const ProjectSchema = z.object({
  title: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Project name must be at least 3 characters long"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(3, "Project description must be at least 3 characters long"),
  startDate: z
    .object({
      month: z.string(),
      year: z.string(),
    })
    .optional(),
  endDate: z
    .object({
      month: z.string(),
      year: z.string(),
    })
    .optional(),
  isCurrentlyWorking: z.boolean().optional(),
  image: z
    .array(
      z.object({
        name: z.string(), // File name
        type: z.string(), // MIME type (e.g., "image/jpeg")
        size: z.number(), // File size in bytes
        lastModified: z.number(), // Timestamp of the last modification
      }),
    )
    .default([])
    .optional(),
  github_link: z.string().url("Invalid URL format").optional(),
  live_demo: z.string().url("Invalid URL format").optional(),
  video_demo: z.string().url("Invalid URL format").optional(),
});
