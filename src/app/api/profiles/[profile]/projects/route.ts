import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;

    const profileExist = await prisma.profiles.findUnique({
      where: {
        profileId: profileId,
      },
    });

    if (!profileExist) {
      return ApiError(400, "Project Not Found!");
    }

    const projects = await prisma.projects.findMany({
      where: {
        id: {
          in: profileExist.projects.ids,
        },
      },
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Profile projects fetched successfully.",
      data: {
        ...profileExist,
        projects: {
          is_active: profileExist.projects.is_active,
          ids: projects,
        },
      },
    });
  }),
);
