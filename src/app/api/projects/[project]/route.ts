import { deleteImageFromCloudinary } from "@/helpers/FileUploader/FileUploader";
import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;

    const projectExist = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectExist) {
      return ApiError(400, "Project Not Found!");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Project fetched successfully.",
      data: projectExist,
    });
  }),
);

export const PATCH = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;

    const {
      title,
      description,
      technologies,
      startDate,
      endDate,
      github_link,
      live_demo,
      video_demo,
      tags,
    } = await request.json();

    const projectExist = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectExist) {
      return ApiError(400, "Project Not Found!");
    }

    if (title) {
      const projectExistWithTitle = await prisma.projects.findFirst({
        where: {
          title,
        },
      });

      if (projectExistWithTitle) {
        return ApiError(400, "Project with this title already exists.");
      }
    }

    const updatedData = {
      title: title || projectExist.title,
      description: description || projectExist.description,
      technologies: technologies || projectExist.technologies,
      startDate: {
        month: startDate.month || projectExist.startDate.month,
        year: startDate.year || projectExist.startDate.year,
      },
      endDate: {
        month: endDate.month || projectExist.endDate.month,
        year: endDate.year || projectExist.endDate.year,
      },
      github_link: github_link || projectExist.github_link,
      live_demo: live_demo || projectExist.live_demo,
      video_demo: video_demo || projectExist.video_demo,
      tags: tags || projectExist.tags,
    };

    const updatedProject = await prisma.projects.update({
      where: {
        id: projectId,
      },
      data: updatedData,
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

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const projectId = context.params.project;

    const projectExist = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectExist) {
      return ApiError(400, "Project Not Found!");
    }

    const deleteProject = await prisma.projects.delete({
      where: {
        id: projectId,
      },
    });

    if (!deleteProject) {
      return ApiError(400, "Failed to delete project.");
    }

    if (projectExist.images && projectExist.images.length) {
      for (const image of projectExist.images) {
        const publicId = image
          .split("/")
          .slice(-3)
          .join("/")
          .split(".")
          .slice(0, -1)
          .join(".");

        await deleteImageFromCloudinary(publicId);
      }
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Project deleted successfully.",
      data: deleteProject,
    });
  }),
);
