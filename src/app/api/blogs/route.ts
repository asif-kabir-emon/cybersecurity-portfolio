import { uploadToCloudinary } from "@/helpers/FileUploader/FileUploader";
import { ApiError } from "@/utils/apiError";
import { authGuard } from "@/utils/authGuard";
import { catchAsync } from "@/utils/handleApi";
import { sendResponse } from "@/utils/sendResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = authGuard(
  catchAsync(async (request: any, context: any) => {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const { title, content, tags } = JSON.parse(formData.get("data"));

    if (!title || !content) {
      return ApiError(400, "Payload must contain title and content.");
    }

    const isExistBlog = await prisma.blogs.findFirst({
      where: {
        title,
      },
    });

    if (isExistBlog) {
      return ApiError(400, "Blog already exist.");
    }

    let image: string | null = null;

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
        image = uploadCloudinary.result.secure_url;
      }
    }

    const blog = await prisma.blogs.create({
      data: {
        title,
        content,
        tags,
        image: image || null,
      },
    });

    if (!blog) {
      return ApiError(500, "Failed to create blog.");
    }

    return sendResponse({
      status: 201,
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });
  }),
);

export const GET = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const blogs = await prisma.blogs.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return sendResponse({
      status: 200,
      success: true,
      message: "Blogs fetched successfully.",
      data: blogs,
    });
  }),
);
