import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;

    if (!profileId) {
      return ApiError(400, "Invalid payload!");
    }

    const profile = await prisma.profiles.findUnique({
      where: {
        profileId: profileId,
      },
    });

    if (!profile) {
      return ApiError(404, "Profile not found!");
    }

    return sendResponse({
      status: 200,
      message: "Profile fetched successfully.",
      success: true,
      data: profile,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;
    console.log(profileId);

    if (!profileId) {
      return ApiError(400, "Invalid payload!");
    }

    const profile = await prisma.profiles.delete({
      where: {
        profileId: profileId,
      },
    });

    if (!profile) {
      return ApiError(404, "Profile not found!");
    }

    return sendResponse({
      status: 200,
      message: "Profile deleted successfully.",
      success: true,
      data: profile,
    });
  }),
);
