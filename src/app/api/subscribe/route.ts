import { connectToDatabase } from "@/lib/connectdb"
import { NewsSchema } from "@/types/type"
import { prisma } from "../../../../prisma"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { email } = NewsSchema.parse(body)

    await connectToDatabase()

    const news = await prisma.newsletter.create({
      data: {
        email,
      },
    })

    return NextResponse.json({ news }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Zod Error Subscribing" },
        { status: 415 }
      )
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
