import { connectToDatabase } from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Errorr" }, { status: 500 });
  }
};
