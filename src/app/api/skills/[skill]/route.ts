import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const { skillId } = context.params.skill;

    if (!skillId) {
      return ApiError(400, "Invalid payload!");
    }

    const skills = await prisma.skills.findUnique({
      where: {
        id: skillId,
      },
    });

    return sendResponse({
      status: 200,
      message: "Skill fetched successfully.",
      success: true,
      data: skills,
    });
  }),
);

export const PUT = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const { skillId } = context.params.skill;
    const { categoryId, name, level } = await request.json();

    if (!skillId || !name || !level || !categoryId) {
      return ApiError(400, "Invalid payload!");
    }

    const updatedSkill = await prisma.skills.update({
      where: {
        id: skillId,
      },
      data: {
        categoryId,
        name,
        level,
      },
    });

    return sendResponse({
      status: 200,
      message: "Skill updated successfully.",
      success: true,
      data: updatedSkill,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const { skillId } = context.params.skill;

    if (!skillId) {
      return ApiError(400, "Invalid payload!");
    }

    const deletedSkill = await prisma.skills.delete({
      where: {
        id: skillId,
      },
    });

    return sendResponse({
      status: 200,
      message: "Skill deleted successfully.",
      success: true,
      data: deletedSkill,
    });
  }),
);
