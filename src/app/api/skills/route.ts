import { connectToDatabase } from "@/lib/connectdb";
import { getAuthSession } from "@/lib/nextauth";
import { EducationSkillsSchema, ProjectSchema } from "@/lib/type";
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
      skills,
      school,
      degree,
      gpa,
      location,
      graduationMonth,
      graduationYear,
    } = EducationSkillsSchema.parse(body);

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

    const skillsList: { name: string }[] = skills.map((name) => ({ name }));

    const updateResume = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        skills: {
          createMany: {
            data: skillsList.map((skillData) => ({
              ...skillData,
            })),
          },
        },

        education: {
          create: {
            school,
            degree,
            gpa,
            location,
            graduationMonth,
            graduationYear,
          },
        },
      },
    });

    return NextResponse.json({ updateResume }, { status: 201 });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 });
    }

    return NextResponse.json(
      { message: "Internal Server Error Adding Project Info" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
