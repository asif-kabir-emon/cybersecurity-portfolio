import {
  deleteImageFromCloudinary,
  uploadToCloudinary,
} from "@/helpers/FileUploader/FileUploader";
import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = authGuard(
  catchAsync(async (request: any, context: any) => {
    const blogId = context.params.blog;

    const blogExist = await prisma.blogs.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blogExist) {
      return ApiError(400, "Blog Not Found!");
    }

    const deletedBlog = await prisma.blogs.delete({
      where: {
        id: blogId,
      },
    });

    if (!deletedBlog) {
      return ApiError(400, "Failed to delete blog.");
    }

    if (blogExist.image) {
      const publicId = blogExist.image
        .split("/")
        .slice(-3)
        .join("/")
        .split(".")
        .slice(0, -1)
        .join(".");

      await deleteImageFromCloudinary(publicId);
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Blog deleted successfully.",
      data: deletedBlog,
    });
  }),
);
