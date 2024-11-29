import {
  cloudinary,
  deleteImageFromCloudinary,
} from "@/helpers/FileUploader/FileUploader";
import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;
    const { url } = await request.json();

    if (!url) {
      return ApiError(400, "Invalid Payload!");
    }

    const publicId = url
      .split("/")
      .slice(-3)
      .join("/")
      .split(".")
      .slice(0, -1)
      .join(".");

    // const deleteURL = await cloudinary.uploader.destroy(publicId);
    const deleteURL = await deleteImageFromCloudinary(publicId);

    if (deleteURL && deleteURL.result !== "ok") {
      return ApiError(400, "Failed to delete image from Cloudinary");
    }

    const projectExist = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectExist) {
      return ApiError(400, "Project Not Found!");
    }

    const updatedProject = await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        images: projectExist.images.filter((image: string) => image !== url),
      },
    });

    return sendResponse({
      status: 201,
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  }),
);
