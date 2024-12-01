import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = authGuard(
  catchAsync(async (request: any, context: any) => {
    const educationId = request.params.education;
    const { school, degree, fieldOfStudy, startDate, endDate, grade } =
      await request.json();

    const isEducationExist = await prisma.educations.findFirst({
      where: {
        id: educationId,
      },
    });

    if (!isEducationExist) {
      return ApiError(404, "Data Not Found!");
    }

    if (startDate && (!startDate.month || !startDate.year)) {
      return ApiError(400, "Invalid payload!");
    }

    if (endDate && (!endDate.month || !endDate.year)) {
      return ApiError(400, "Invalid payload!");
    }

    if (endDate && startDate.year > endDate.year) {
      return ApiError(400, "Start date cannot be greater than end date!");
    }

    if (
      startDate &&
      endDate &&
      startDate.year === endDate.year &&
      startDate.month > endDate.month
    ) {
      return ApiError(
        400,
        "Start date cannot be greater than end date as both start and end year same!",
      );
    }

    if (
      isEducationExist.school !== school &&
      isEducationExist.degree !== degree
    ) {
      const isEducationExist = await prisma.educations.findFirst({
        where: {
          school,
          degree,
        },
      });

      if (isEducationExist) {
        return ApiError(400, "Education record already exists!");
      }
    }

    const updatedEducationData = {
      school: school || isEducationExist.school,
      degree: degree || isEducationExist.degree,
      fieldOfStudy: fieldOfStudy || isEducationExist.fieldOfStudy,
      startDate: {
        month: startDate.month || isEducationExist.startDate.month,
        year: startDate.year || isEducationExist.startDate.year,
      },
      endDate: {
        month: endDate.month || isEducationExist.endDate.month || 0,
        year: endDate.year || isEducationExist.endDate.year || 0,
      },
      grade: grade || isEducationExist.grade || "",
    };

    const education = await prisma.educations.update({
      where: {
        id: educationId,
      },
      data: updatedEducationData,
    });

    if (!education) {
      return ApiError(500, "Failed to update education.");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Education updated successfully.",
      data: education,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: any, context: any) => {
    const educationId = request.params.education;

    const isEducationExist = await prisma.educations.findFirst({
      where: {
        id: educationId,
      },
    });

    if (!isEducationExist) {
      return ApiError(404, "Data Not Found!");
    }

    const education = await prisma.educations.delete({
      where: {
        id: educationId,
      },
    });

    if (!education) {
      return ApiError(500, "Failed to delete education.");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Education deleted successfully.",
      data: education,
    });
  }),
);
