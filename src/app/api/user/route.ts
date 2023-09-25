import { connectToDatabase } from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const users = await prisma.user.findMany({});
    return NextResponse.json({ users });
  } catch (error) {
  } finally {
  }
};
