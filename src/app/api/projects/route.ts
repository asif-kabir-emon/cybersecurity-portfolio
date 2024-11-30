import { uploadToCloudinary } from "@/helpers/FileUploader/FileUploader";
import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (req: any, res: any) => {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];
    const data = JSON.parse(formData.get("data"));

    if (!data.title || !data.description) {
      return ApiError(400, "Payload must contain title and description.");
    }

    const isExistProject = await prisma.projects.findFirst({
      where: {
        title: data.title,
      },
    });

    if (isExistProject) {
      return ApiError(400, "Project already exist.");
    }

    // compare start date and end date
    if (
      data.startDate &&
      data.endDate &&
      data.startDate.year &&
      data.endDate.year &&
      data.startDate.year > data.endDate.year
    ) {
      return ApiError(400, "Start year should be less than end year.");
    }

    if (
      data.startDate &&
      data.endDate &&
      data.startDate.year &&
      data.endDate.year &&
      data.startDate.year === data.endDate.year &&
      data.startDate.month &&
      data.endDate.month &&
      data.startDate.month > data.endDate.month
    ) {
      return ApiError(400, "Start month should be less than end month.");
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

    const project = await prisma.projects.create({
      data: {
        title: data.title,
        description: data.description,
        images: projectPhotos,
        technologies: data.technologies || [],
        startDate: {
          month:
            data?.startDate?.month === null ||
            data?.startDate?.year === null ||
            data?.startDate?.month === undefined ||
            data?.startDate?.year === undefined
              ? 0
              : data?.startDate?.month,
          year:
            data?.startDate?.month === null ||
            data?.startDate?.year === null ||
            data?.startDate?.month === undefined ||
            data?.startDate?.year === undefined
              ? 0
              : data?.startDate?.year,
        },
        endDate: {
          month: data?.isCurrentlyWorking
            ? 0
            : data?.endDate?.month === null ||
              data?.endData?.year === null ||
              data?.endDate?.month === undefined ||
              data?.endData?.year === undefined
            ? 0
            : data?.endDate?.month,
          year: data?.isCurrentlyWorking
            ? 0
            : data?.endDate?.month === null ||
              data?.endData?.year === null ||
              data?.endDate?.month === undefined ||
              data?.endData?.year === undefined
            ? 0
            : data?.endDate?.year,
        },
        github_link: data.github_link || "",
        live_demo: data.live_demo || "",
        video_demo: data.video_demo || "",
        tags: data.tags || [],
      },
    });

    if (!project) {
      return ApiError(500, "Failed to create project.");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (req: any, res: any) => {
    // sort by start date in descending order
    const projects = await prisma.projects.findMany({
      orderBy: [
        { startDate: { year: "desc" } },
        { startDate: { month: "desc" } },
      ],
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Projects fetched successfully.",
      meta: {
        total: projects.length,
      },
      data: projects,
    });
  }),
);
