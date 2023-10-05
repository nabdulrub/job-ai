import { connectToDatabase } from "@/lib/connectdb";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export const GET = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      );

    await connectToDatabase();
    const resume = await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
        jobs: true,
        projects: true,
        skills: true,
        education: true,
      },
    });
    return NextResponse.json({ resume });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Errorr" }, { status: 500 });
  }
};
