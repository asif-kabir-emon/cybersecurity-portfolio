import { z } from "zod";

export const ProfileSchema = z.object({
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
  contactInfo: z
    .object({
      email: z
        .string()
        .refine(
          (val) => {
            if (val.length > 1) {
              try {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val);
              } catch {
                return false;
              }
            }
            return true;
          },
          {
            message: "Invalid Email.",
          },
        )
        .optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      github: z
        .string()
        .refine(
          (val) => {
            if (val.length > 1) {
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            }
            return true;
          },
          {
            message: "Invalid GitHub URL.",
          },
        )
        .optional(),
      linkedin: z
        .string()
        .refine(
          (val) => {
            if (val.length > 1) {
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            }
            return true;
          },
          {
            message: "Invalid LinkedIn URL.",
          },
        )
        .optional(),
      whatsapp: z.string().optional(),
      telegram: z.string().optional(),
      twitter: z
        .string()
        .refine(
          (val) => {
            if (val.length > 1) {
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            }
            return true;
          },
          {
            message: "Invalid Twitter URL.",
          },
        )
        .optional(),
      youtube: z
        .string()
        .refine(
          (val) => {
            if (val.length > 1) {
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            }
            return true;
          },
          {
            message: "Invalid Youtube URL.",
          },
        )
        .optional(),
    })
    .optional(),
  projects: z
    .object({
      ids: z.array(z.string()).optional(),
    })
    .optional(),
  experiences: z
    .object({
      ids: z.array(z.string()).optional(),
    })
    .optional(),
  certifications: z
    .object({
      ids: z.array(z.string()).optional(),
    })
    .optional(),
  education: z
    .object({
      ids: z.array(z.string()).optional(),
    })
    .optional(),
  blogs: z
    .object({
      ids: z.array(z.string()).optional(),
    })
    .optional(),
});
