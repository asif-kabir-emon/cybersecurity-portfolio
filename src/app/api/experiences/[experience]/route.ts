import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = authGuard(
  catchAsync(async (request: any, context: any) => {
    const experienceId = context.params.experience;
    const { companyName, role, startDate, endDate, description } =
      await request.json();

    if (endDate && endDate.year !== 0 && startDate.year > endDate.year) {
      return ApiError(400, "Start year cannot be greater than end year!");
    }

    if (
      endDate &&
      endDate.year !== 0 &&
      endDate.month !== 0 &&
      startDate.year === endDate.year &&
      startDate.month > endDate.month
    ) {
      return ApiError(
        400,
        "Start month cannot be greater than end month as both start and end year same!",
      );
    }

    const isExperienceExist = await prisma.experiences.findFirst({
      where: {
        id: experienceId,
      },
    });

    if (!isExperienceExist) {
      return ApiError(404, "Data Not Found!");
    }

    if (startDate && (!startDate.month || !startDate.year)) {
      return ApiError(400, "Invalid payload!");
    }

    if (
      isExperienceExist.companyName !== companyName &&
      isExperienceExist.role !== role
    ) {
      const isExperienceExist = await prisma.experiences.findFirst({
        where: {
          companyName,
          role,
        },
      });

      if (isExperienceExist) {
        return ApiError(400, "Experience record already exists!");
      }
    }

    const experienceData = {
      companyName: companyName || isExperienceExist.companyName,
      role: role || isExperienceExist.role,
      startDate: {
        month: startDate.month || isExperienceExist.startDate.month,
        year: startDate.year || isExperienceExist.startDate.year,
      },
      endDate: {
        month: endDate.month || isExperienceExist.endDate.month || 0,
        year: endDate.year || isExperienceExist.endDate.year || 0,
      },
      description: description || isExperienceExist.description,
    };

    const updatedExperience = await prisma.experiences.update({
      where: {
        id: experienceId,
      },
      data: experienceData,
    });

    if (!updatedExperience) {
      return ApiError(500, "Failed to update experience record!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Experience record updated successfully.",
      data: updatedExperience,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: any, context: any) => {
    const experienceId = context.params.experience;

    const isExperienceExist = await prisma.experiences.findFirst({
      where: {
        id: experienceId,
      },
    });

    if (!isExperienceExist) {
      return ApiError(404, "Data Not Found!");
    }

    const deletedExperience = await prisma.experiences.delete({
      where: {
        id: experienceId,
      },
    });

    if (!deletedExperience) {
      return ApiError(500, "Failed to delete experience record!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Experience record deleted successfully.",
      data: deletedExperience,
    });
  }),
);
