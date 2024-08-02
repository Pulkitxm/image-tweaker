import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "./lib/constants";

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

if (NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;
