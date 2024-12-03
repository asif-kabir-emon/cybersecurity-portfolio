import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: Request) => {
    const { name, title, bio } = await request.json();

    if (!name || !title) {
      return ApiError(400, "Invalid payload!");
    }

    const profile = await prisma.profiles.create({
      data: {
        name: name,
        title: title,
        bio: bio || "",
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
    const profiles = await prisma.profiles.findMany();

    return sendResponse({
      status: 200,
      message: "Profiles fetched successfully.",
      success: true,
      meta: {
        total: profiles.length,
      },
      data: profiles,
    });
  }),
);
