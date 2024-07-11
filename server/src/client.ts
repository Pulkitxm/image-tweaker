import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = (() => {
  let prisma: PrismaClient | null = null;

  return () => {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  };
})();

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = global.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
