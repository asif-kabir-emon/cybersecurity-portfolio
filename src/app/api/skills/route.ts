import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: Request) => {
    const { categoryId, name, level } = await request.json();

    if (!name || !level || !categoryId) {
      return ApiError(400, "Invalid payload!");
    }

    const skill = await prisma.skills.create({
      data: {
        categoryId,
        name,
        level,
      },
    });

    return sendResponse({
      status: 201,
      message: "Skill created successfully.",
      success: true,
      data: skill,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: Request) => {
    const skills = await prisma.skills.findMany();

    return sendResponse({
      status: 200,
      message: "Skills fetched successfully.",
      success: true,
      meta: {
        total: skills.length,
      },
      data: skills,
    });
  }),
);
