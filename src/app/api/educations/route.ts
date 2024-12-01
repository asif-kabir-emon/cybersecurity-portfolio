import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: any, context: any) => {
    const { school, degree, fieldOfStudy, startDate, endDate, grade } =
      await request.json();

    if (
      !school ||
      !degree ||
      !fieldOfStudy ||
      !startDate.month ||
      !startDate.year
    ) {
      return ApiError(400, "Invalid payload!");
    }

    if (endDate && (!endDate.month || !endDate.year)) {
      return ApiError(400, "Invalid payload!");
    }

    if (endDate && startDate.year > endDate.year) {
      return ApiError(400, "Start date cannot be greater than end date!");
    }

    if (
      endDate &&
      startDate.year === endDate.year &&
      startDate.month > endDate.month
    ) {
      return ApiError(
        400,
        "Start date cannot be greater than end date as both start and end year same!",
      );
    }

    const isEducationExist = await prisma.educations.findFirst({
      where: {
        school,
        degree,
      },
    });

    if (isEducationExist) {
      return ApiError(400, "Education record already exists!");
    }

    const educationData = {
      school,
      degree,
      fieldOfStudy,
      startDate: {
        month: startDate.month,
        year: startDate.year,
      },
      endDate: {
        month: endDate.month || 0,
        year: endDate.year || 0,
      },
      grade: grade || "",
    };

    const education = await prisma.educations.create({
      data: educationData,
    });

    if (!education) {
      return ApiError(500, "Failed to add education record!");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Education record added successfully.",
      data: education,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: any, context: any) => {
    const educations = await prisma.educations.findMany({
      orderBy: [
        { startDate: { year: "desc" } },
        { startDate: { month: "desc" } },
      ],
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Educations fetched successfully.",
      data: educations,
    });
  }),
);
