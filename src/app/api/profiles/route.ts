import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export const POST = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const { id } = authenticatedRequest.user;
    const { name, title, bio } = await request.json();

    if (!id) {
      return ApiError(400, "Unauthorized: Invalid user.");
    }

    if (!name || !title) {
      return ApiError(400, "Invalid payload!");
    }

    const profile = await prisma.profiles.create({
      data: {
        userId: id,
        name: name,
        title: title,
        bio: bio || "",
        resume: "",
        contactInfo: {
          email: "",
          phone: "",
          address: "",
          github: "",
          linkedin: "",
          whatsapp: "",
          telegram: "",
          twitter: "",
          youtube: "",
        },
      },
    });

    return sendResponse({
      status: 201,
      message: "Profile created successfully.",
      success: true,
      data: profile,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: Request) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const { id } = authenticatedRequest.user;

    if (!id) {
      return ApiError(400, "Unauthorized: Invalid user.");
    }

    const profile = await prisma.profiles.findUnique({
      where: {
        userId: id,
      },
    });

    return sendResponse({
      status: 200,
      message: "Profiles fetched successfully.",
      success: true,
      data: profile,
    });
  }),
);

export const PATCH = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const authenticatedRequest = request as AuthenticatedRequest;
    const { id } = authenticatedRequest.user;
    const data = await request.json();

    if (!id) {
      return ApiError(400, "Unauthorized: Invalid user.");
    }

    const isProfileExist = await prisma.profiles.findUnique({
      where: {
        userId: id,
      },
    });

    if (!isProfileExist) {
      return ApiError(404, "Profile not found!");
    }

    const updatedProfile = await prisma.profiles.update({
      where: {
        userId: id,
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
