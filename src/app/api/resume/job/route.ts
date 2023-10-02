import { connectToDatabase } from "@/lib/connectdb";
import { getAuthSession } from "@/lib/nextauth";
import { JobSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "../../../../../prisma";

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
      id,
      title,
      employer,
      location,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
      present,
    } = JobSchema.parse(body);

    const newResume = await prisma.resume.create({
      where: {
        user: id,
      },
      data: {
        jobs: [
          {
            title: title,
          },
        ],
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 });
    }

    return NextResponse.json(
      { message: "Internal Server Error Adding User Info" },
      { status: 500 }
    );
  }
};
