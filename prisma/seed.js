const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const user_email = String(process.env.user_email) || "";
const user_password = String(process.env.user_password) || "";
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
    await prisma.user.create({
      data: default_user,
    });
    console.log("Default user created");
  } else {
    console.log("Default user already exists");
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
