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

export const PATCH = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;
    const data = await request.json();

    if (!profileId) {
      return ApiError(400, "Invalid payload!");
    }

    const isProfileExist = await prisma.profiles.findUnique({
      where: {
        profileId: profileId,
      },
    });

    if (!isProfileExist) {
      return ApiError(404, "Profile not found!");
    }

    if (data.title && data.title !== isProfileExist.title) {
      const isTitleExist = await prisma.profiles.findFirst({
        where: {
          title: data.title,
        },
      });

      if (isTitleExist) {
        return ApiError(400, "Title already exist!");
      }

      data.title = data.title.trim();
      data.profileId = data.title.trim().toLowerCase().replace(" ", "-");
    }

    const updatedProfile = await prisma.profiles.update({
      where: {
        profileId: profileId,
      },
      data: {
        ...data,
      },
    });

    if (!updatedProfile) {
      return ApiError(400, "Failed to update profile!");
    }

    return sendResponse({
      status: 200,
      message: "Profile updated successfully.",
      success: true,
      data: updatedProfile,
    });
  }),
);
