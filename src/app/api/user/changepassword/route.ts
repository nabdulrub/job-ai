import { connectToDatabase } from "@/lib/connectdb";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "../../../../../prisma";
import { ChangePasswordSchema } from "@/lib/type";
import bcrypt from "bcrypt";

export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { message: "User Unauthenticated!" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await req.json();

    const { oldPassword, newPassword } = ChangePasswordSchema.parse(body);

    const getOldPassword = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    const comparePassword = await bcrypt.compare(
      oldPassword,
      getOldPassword?.hashedPassword as string
    );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 415 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
