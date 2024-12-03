import { z } from "zod";

export const CertificationSchema = z.object({
  name: z
    .string({
      message: "Certification name is required.",
    })
    .min(2, {
      message: "Certification name must be at least 2 characters long.",
    }),
  issuingOrganization: z
    .string({
      message: "Issuing organization name is required.",
    })
    .min(5, {
      message: "Issuing organization name must be at least 5 characters.",
    }),
  issueDate: z.object(
    {
      month: z.string({
        message: "Issued month is required.",
      }),
      year: z.string({
        message: "Issued year is required.",
      }),
    },
    {
      message: "Issued year is required",
    },
  ),
  expirationDate: z
    .object({
      month: z.string().optional(),
      year: z.string().optional(),
    })
    .optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
  description: z.string().optional(),
});
