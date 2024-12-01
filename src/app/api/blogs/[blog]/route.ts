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

export const PATCH = authGuard(
  catchAsync(async (request: any, context: any) => {
    const blogId = context.params.blog;

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    const { title, content, tags } = JSON.parse(formData.get("data"));

    const blogExist = await prisma.blogs.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!blogExist) {
      return ApiError(400, "Blog Not Found!");
    }

    let image: string | null = blogExist.image || null;

    if (files.length) {
      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        // this will be used to upload the file
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const uploadCloudinary = (await uploadToCloudinary(
          fileUri,
          file.name,
          "portfolio/blogs",
        )) as {
          success: true;
          result: { secure_url: string; public_id: string };
        };
        image = uploadCloudinary.result.secure_url;
      }
    }

    const updatedBlog = await prisma.blogs.update({
      where: {
        id: blogId,
      },
      data: {
        title: title || blogExist.title,
        content: content || blogExist.content,
        tags: tags || blogExist.tags,
        image: image || blogExist.image,
      },
    });

    if (!updatedBlog) {
      return ApiError(400, "Failed to update blog.");
    }

    if (blogExist.image && image !== blogExist.image) {
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
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  }),
);

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
