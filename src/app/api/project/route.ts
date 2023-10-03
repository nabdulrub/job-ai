import { connectToDatabase } from "@/lib/connectdb";
import { getAuthSession } from "@/lib/nextauth";
import { ProjectSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "../../../../prisma";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      );

    await connectToDatabase();

    const body = await req.json();

    const {
      title,
      location,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
    } = ProjectSchema.parse(body);

    const resume = await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!resume)
      return NextResponse.json(
        { message: "User does not have resume!" },
        { status: 404 }
      );

    const newProject = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        projects: {
          create: {
            title,
            location,
            startMonth,
            startYear,
            endMonth,
            endYear,
            description,
          },
        },
      },
    });

    return NextResponse.json({ newProject }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 });
    }

    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error Adding Project Info" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
