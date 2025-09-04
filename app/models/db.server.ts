import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") {
  if (!globalThis.__prisma) {
    globalThis.__prisma = prisma;
  }
}

export { prisma };