import { connectToDatabase } from "@/lib/connectdb";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { RegisterSchema } from "@/lib/type";

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { firstname, lastname, password, email } = RegisterSchema.parse(body);

    await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        hashedPassword,
        email,
      },
    });

    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
      },
    });

    const news = await prisma.newsletter.create({
      data: {
        email,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Zod Error Registering User!", error: error },
        { status: 415 }
      );
    }
    if (error) {
      return NextResponse.json(
        { message: "Error Registering User!", error: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error Registering User!", error: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
