const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const user_email = String(process.env.user_email) || "";
const user_password = String(process.env.user_password) || "";
const user_name = String(process.env.user_name) || "Test User";
const user_title = String(process.env.user_title) || "Test Title";
const salt_rounds = Number(process.env.SALT_ROUNDS);

async function main() {
  const hashed_password = await bcrypt.hash(user_password, salt_rounds);
  const default_user = {
    email: user_email,
    password: hashed_password,
  };

  const existingUser = await prisma.user.findUnique({
    where: { email: default_user.email },
  });

  if (!existingUser) {
    const user = await prisma.user.create({
      data: default_user,
    });
    const profile = await prisma.profiles.create({
      data: {
        userId: user.id,
        name: user_name,
        title: user_title,
        bio: "",
      },
    });

    console.log("Default user created successfully");
  }

  if (existingUser) {
    const existingProfile = await prisma.profiles.findUnique({
      where: { userId: existingUser.id },
    });

    if (!existingProfile) {
      const profile = await prisma.profiles.create({
        data: {
          userId: existingUser.id,
          name: user_name,
          title: user_title,
          bio: "",
        },
      });

      console.log("Default profile created successfully");
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
