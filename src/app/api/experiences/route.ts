import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: any, context: any) => {
    const { companyName, role, startDate, endDate, description } =
      await request.json();

    if (!companyName || !role || !startDate.month || !startDate.year) {
      return ApiError(400, "Invalid payload!");
    }

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
        companyName,
        role,
      },
    });

    if (isExperienceExist) {
      return ApiError(400, "Experience record already exists!");
    }

    const experienceData = {
      companyName: companyName,
      role: role,
      startDate: {
        month: startDate.month,
        year: startDate.year,
      },
      endDate: {
        month: endDate.month || 0,
        year: endDate.year || 0,
      },
      description: description || "",
    };

    const experienceRecord = await prisma.experiences.create({
      data: experienceData,
    });

    if (!experienceRecord) {
      return ApiError(500, "Failed to create experience record!");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Experience record added successfully.",
      data: experienceRecord,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: any, context: any) => {
    const experiences = await prisma.experiences.findMany({
      orderBy: [
        { startDate: { year: "desc" } },
        { startDate: { month: "desc" } },
      ],
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Experiences fetched successfully.",
      meta: { total: experiences.length },
      data: experiences,
    });
  }),
);
