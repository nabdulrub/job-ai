import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  var catchedPrisma: PrismaClient;
}

export let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.catchedPrisma) {
    global.catchedPrisma = new PrismaClient();
  }
  prisma = global.catchedPrisma;
}
