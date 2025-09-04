/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare global {
  var prisma: import("@prisma/client").PrismaClient;
}