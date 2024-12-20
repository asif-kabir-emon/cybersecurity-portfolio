import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sendResponse } from "@/utils/sendResponse";
import { ApiError } from "@/utils/apiError";
import { catchAsync } from "@/utils/handleApi";
import { createToken } from "@/utils/jwtToken";

const prisma = new PrismaClient();

export const POST = catchAsync(async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return ApiError(400, "Invalid payload!");
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    return ApiError(404, "User not found!");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    String(isUserExist?.password),
  );

  if (!isPasswordValid) {
    return ApiError(401, "Incorrect Credential!");
  }

  const payload = { id: isUserExist.id, email: isUserExist.email };
  const jwtSecret = String(process.env.JWT_SECRET) || "";
  const jwtExpiresIn = String(process.env.JWT_EXPIRES_IN) || "1h";
  const token = createToken(payload, jwtSecret, { expiresIn: jwtExpiresIn });

  if (!token) {
    return ApiError(500, "Internal Server Error!");
  }

  return sendResponse({
    status: 200,
    message: "Successfully logged in.",
    success: true,
    data: {
      accessToken: token,
    },
  });
});
