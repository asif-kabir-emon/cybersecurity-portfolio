import { z } from "zod";

export const SkillCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Skill's category name must be at least 3 characters long"),
});
