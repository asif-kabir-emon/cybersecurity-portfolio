import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const categoryId = context.params.category;

    if (!categoryId) {
      return ApiError(400, "Invalid payload!");
    }

    const category = await prisma.skill_categories.findUnique({
      where: {
        id: categoryId,
      },
    });
    console.log(category);

    if (!category) {
      return ApiError(404, "Category not found.");
    }

    return sendResponse({
      status: 200,
      message: "Category fetched successfully.",
      success: true,
      data: category,
    });
  }),
);

export const PUT = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const categoryId = context.params.category;
    const { name } = await request.json();

    if (!categoryId || !name) {
      return ApiError(400, "Invalid payload!");
    }

    const findCategory = await prisma.skill_categories.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!findCategory) {
      return ApiError(404, "Category not found.");
    }

    const updatedCategory = await prisma.skill_categories.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return sendResponse({
      status: 200,
      message: "Category updated successfully.",
      success: true,
      data: updatedCategory,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const categoryId = context.params.category;

    if (!categoryId) {
      return ApiError(400, "Invalid payload!");
    }

    const findCategory = await prisma.skill_categories.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!findCategory) {
      return ApiError(404, "Category not found.");
    }

    await prisma.skill_categories.delete({
      where: {
        id: categoryId,
      },
    });

    return sendResponse({
      status: 200,
      message: "Category deleted successfully.",
      success: true,
    });
  }),
);
