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

export const POST = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return ApiError(400, "Invalid Payload!");
    }

    const isProfileExist = await prisma.profiles.findUnique({
      where: {
        profileId: profileId,
      },
    });

    if (!isProfileExist) {
      return ApiError(404, "Profile not found!");
    }

    let image = "";
    if (file) {
      const fileBuffer = await file.arrayBuffer();

      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");
      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

      const uploadCloudinary = (await uploadToCloudinary(
        fileUri,
        `${isProfileExist.profileId}_${isProfileExist.id}`,
        "portfolio/profiles",
      )) as {
        success: true;
        result: { secure_url: string; public_id: string };
      };
      image = uploadCloudinary.result.secure_url;
    }

    if (!image) {
      return ApiError(400, "Failed to upload image!");
    }

    const updatedProfile = await prisma.profiles.update({
      where: {
        id: isProfileExist.id,
      },
      data: {
        image,
      },
    });

    if (!updatedProfile) {
      return ApiError(400, "Failed to update profile.");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Profile image updated successfully.",
      data: updatedProfile,
    });
  }),
);

export const DELETE = authGuard(
  catchAsync(async (request: Request, context: any) => {
    const profileId = context.params.profile;
    const isProfileExist = await prisma.profiles.findUnique({
      where: {
        profileId: profileId,
      },
    });

    if (!isProfileExist) {
      return ApiError(404, "Profile not found!");
    }

    if (!isProfileExist.image || isProfileExist.image === "") {
      return ApiError(404, "Profile image not found!");
    }

    const profileImage = isProfileExist.image;
    const publicId = profileImage
      .split("/")
      .slice(-3)
      .join("/")
      .split(".")
      .slice(0, -1)
      .join(".");

    const deleteImage = await deleteImageFromCloudinary(publicId);

    if (deleteImage && deleteImage.result !== "ok") {
      return ApiError(400, "Failed to delete image from Cloudinary");
    }

    const updatedProfile = await prisma.profiles.update({
      where: {
        id: isProfileExist.id,
      },
      data: {
        image: "",
      },
    });

    if (!updatedProfile) {
      return ApiError(400, "Failed to update profile.");
    }

    return sendResponse({
      status: 200,
      success: true,
      message: "Profile image deleted successfully.",
      data: updatedProfile,
    });
  }),
);
