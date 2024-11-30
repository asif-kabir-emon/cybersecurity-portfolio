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
      status: 200,
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  }),
);

export const POST = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;
    console.log(projectId);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    const projectExist = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectExist) {
      return ApiError(400, "Project Not Found!");
    }

    const projectPhotos: string[] = [];

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
          "portfolio/projects",
        )) as {
          success: true;
          result: { secure_url: string; public_id: string };
        };
        projectPhotos.push(uploadCloudinary.result.secure_url || "");
      }
    }

    const updatedProject = await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        images: [...projectExist.images, ...projectPhotos],
      },
    });

    if (!updatedProject) {
      return ApiError(400, "Failed to update project.");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  }),
);

export const PATCH = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;

    const { reorderedImagesArray } = await request.json();

    if (!reorderedImagesArray) {
      return ApiError(400, "Invalid Payload!");
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
        images: reorderedImagesArray,
      },
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Project fetched successfully.",
      data: updatedProject,
    });
  }),
);
