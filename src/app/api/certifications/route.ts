import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: any, context: any) => {
    const {
      name,
      description,
      issuingOrganization,
      issueDate,
      expirationDate,
      credentialId,
      credentialUrl,
    } = await request.json();

    if (!name || !issuingOrganization || !issueDate) {
      return ApiError(400, "Invalid payload!");
    }

    if (
      expirationDate &&
      expirationDate.year !== 0 &&
      issueDate.year > expirationDate.year
    ) {
      return ApiError(
        400,
        "Issue year cannot be greater than expiration year!",
      );
    }

    if (
      expirationDate &&
      expirationDate.year !== 0 &&
      expirationDate.month !== 0 &&
      issueDate.year === expirationDate.year &&
      issueDate.month > expirationDate.month
    ) {
      return ApiError(
        400,
        "Issue month cannot be greater than expiration month as both issue and expiration year same!",
      );
    }

    const isCertificationExist = await prisma.certifications.findFirst({
      where: {
        name,
        issuingOrganization,
      },
    });

    if (isCertificationExist) {
      return ApiError(400, "Certification record already exists!");
    }

    const certificationData = {
      name,
      description: description || "",
      issuingOrganization,
      issueDate: {
        month: issueDate.month,
        year: issueDate.year,
      },
      expirationDate: {
        month: expirationDate.month || 0,
        year: expirationDate.year || 0,
      },
      credentialId: credentialId || "",
      credentialUrl: credentialUrl || "",
    };

    const certification = await prisma.certifications.create({
      data: certificationData,
    });

    if (!certification) {
      return ApiError(400, "Error creating certification record!");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Certification record added successfully.",
      data: certification,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: any, context: any) => {
    const certifications = await prisma.certifications.findMany({
      orderBy: [
        { issueDate: { year: "desc" } },
        { issueDate: { month: "desc" } },
        {
          createdAt: "desc",
        },
      ],
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Certification records fetched successfully.",
      meta: { total: certifications.length },
      data: certifications,
    });
  }),
);
