import { z } from "zod";

export const SkillSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Skill name must be at least 3 characters long"),
  level: z
    .string({
      required_error: "Level is required",
    })
    .min(3, "Skill level must have a level"),
  categoryId: z
    .string({
      required_error: "Category is required",
    })
    .min(3, "Skill must have a category"),
});
