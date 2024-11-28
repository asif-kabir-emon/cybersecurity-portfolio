import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: Request) => {
    const { name } = await request.json();

    if (!name) {
      return ApiError(400, "Invalid payload!");
    }

    const isExists = await prisma.skill_categories.findFirst({
      where: {
        name,
      },
    });

    if (isExists) {
      return ApiError(400, "Category already exists.");
    }

    const skill = await prisma.skill_categories.create({
      data: {
        name,
      },
    });

    if (!skill) {
      return ApiError(400, "Category could not be created.");
    }

    return sendResponse({
      status: 201,
      message: "Category created successfully.",
      success: true,
      data: skill,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: Request) => {
    const skills = (await prisma.skill_categories.findMany()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return sendResponse({
      status: 200,
      message: "Categories fetched successfully.",
      success: true,
      meta: {
        total: skills.length,
      },
      data: skills,
    });
  }),
);
