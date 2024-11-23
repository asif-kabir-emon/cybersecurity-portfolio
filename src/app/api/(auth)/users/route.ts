import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      // Return error message
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Incorrect Payload",
        }),
        {
          status: 400,
        },
      );
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // console.log(isUserExist);

    if (!isUserExist) {
      // Return error message
      return new NextResponse(
        JSON.stringify({
          status: 404,
          message: "Not found",
        }),
        {
          status: 404,
        },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      String(isUserExist?.password),
    );

    if (!isPasswordValid) {
      // Return error message
      return new NextResponse(
        JSON.stringify({
          status: 401,
          message: "Incorrect Credential",
        }),
        {
          status: 401,
        },
      );
    }

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Successfully Logged In",
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    // Return a server error if an unexpected exception occurs
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      }),
      {
        status: 500,
      },
    );
  }
};
