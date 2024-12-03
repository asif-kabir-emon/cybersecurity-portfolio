import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = authGuard(
  catchAsync(async (request: any, context: any) => {
    const certificationId = context.params.certification;
    const {
      name,
      description,
      issuingOrganization,
      issueDate,
      expirationDate,
      credentialId,
      credentialUrl,
    } = await request.json();

    const isCertificationExist = await prisma.certifications.findUnique({
      where: {
        id: certificationId,
      },
    });

    if (!isCertificationExist) {
      return ApiError(404, "Certification record not found!");
    }

    if (issueDate && (!issueDate.month || !issueDate.year)) {
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

    if (
      isCertificationExist.name !== name &&
      isCertificationExist.issuingOrganization !== issuingOrganization
    ) {
      const isCertificationExist = await prisma.certifications.findFirst({
        where: {
          name,
          issuingOrganization,
        },
      });

      if (isCertificationExist) {
        return ApiError(400, "Certification record already exists!");
      }
    }

    const updatedCertificationData = {
      name: name || isCertificationExist.name,
      description: description || isCertificationExist.description,
      issuingOrganization:
        issuingOrganization || isCertificationExist.issuingOrganization,
      issueDate: {
        month: issueDate.month || isCertificationExist.issueDate.month,
        year: issueDate.year || isCertificationExist.issueDate.year,
      },
      expirationDate: {
        month:
          expirationDate.month ||
          isCertificationExist.expirationDate.month ||
          0,
        year:
          expirationDate.year || isCertificationExist.expirationDate.year || 0,
      },
      credentialId: credentialId || isCertificationExist.credentialId,
      credentialUrl: credentialUrl || isCertificationExist.credentialUrl,
    };

    const updatedCertification = await prisma.certifications.update({
      where: {
        id: certificationId,
      },
      data: updatedCertificationData,
    });

    if (!updatedCertification) {
      return ApiError(400, "Failed to update certification record!");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Certification record added successfully.",
      data: updatedCertification,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: any, context: any) => {
    const certificationId = context.params.certification;

    const isCertificationExist = await prisma.certifications.findUnique({
      where: {
        id: certificationId,
      },
    });

    if (!isCertificationExist) {
      return ApiError(404, "Certification record not found!");
    }

    const deletedCertification = await prisma.certifications.delete({
      where: {
        id: certificationId,
      },
    });

    if (!deletedCertification) {
      return ApiError(400, "Failed to delete certification record!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Certification record deleted successfully.",
    });
  }),
);
