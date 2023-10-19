import { connectToDatabase } from "@/lib/connectdb"
import { NextResponse } from "next/server"
import { prisma } from "../../../../prisma"
import { getAuthSession } from "@/lib/nextauth"
import { BasicInfoSchema } from "@/types/type"
import { ZodError } from "zod"

export const GET = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      )

    await connectToDatabase()
    const users = await prisma.user.findMany()
    return NextResponse.json({ users })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal Errorr" }, { status: 500 })
  }
}

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      )

    await connectToDatabase()

    const body = await req.json()

    const { firstname, lastname, location, phone } = BasicInfoSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstname,
        lastname,
        location,
        phone,
      },
    })

    return NextResponse.json({ updatedUser }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Adding User Info" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
