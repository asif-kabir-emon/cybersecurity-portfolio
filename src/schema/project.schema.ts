import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  images: z
    .any()
    .refine((files) =>
      files.every((file: any) => file?.size <= MAX_FILE_SIZE, {
        message: "Max image size is 5MB.",
      }),
    )
    .refine(
      (files) =>
        files.every(
          (file: any) =>
            ACCEPTED_IMAGE_TYPES.includes(file?.type) &&
            file?.size <= MAX_FILE_SIZE,
        ),
      {
        message:
          "Only .jpg, .jpeg, .png, and .webp formats are supported, and each file must not exceed 5MB.",
      },
    )
    .optional(),
  github_link: z.string().optional(),
  live_demo: z.string().optional(),
  video_demo: z.string().optional(),
});

export const ProjectImageSchema = z.object({
  images: z
    .any()
    .refine((files) =>
      files.every((file: any) => file?.size <= MAX_FILE_SIZE, {
        message: "Max image size is 5MB.",
      }),
    )
    .refine(
      (files) =>
        files.every(
          (file: any) =>
            ACCEPTED_IMAGE_TYPES.includes(file?.type) &&
            file?.size <= MAX_FILE_SIZE,
        ),
      {
        message:
          "Only .jpg, .jpeg, .png, and .webp formats are supported, and each file must not exceed 5MB.",
      },
    )
    .optional(),
});
