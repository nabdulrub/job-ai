import { connectToDatabase } from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";

export const POST = async (req: Request, res: Response) => {
  try {
    const { id } = await req.json();
    await connectToDatabase();

    const updateNewUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isNewUser: false,
      },
    });

    return NextResponse.json({ message: "User Updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
};
