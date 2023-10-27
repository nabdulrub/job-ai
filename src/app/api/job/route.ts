import { connectToDatabase } from "@/lib/connectdb"
import { getAuthSession } from "@/lib/nextauth"
import { DeleteSchema, JobSchema } from "@/types/type"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { prisma } from "../../../../prisma"

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

    const {
      title,
      employer,
      location,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
      present,
    } = JobSchema.parse(body)

    const newdescription = description.replace(/•|(\n)/g, "")

    const resume = await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!resume)
      return NextResponse.json(
        { message: "User does not have resume!" },
        { status: 404 }
      )

    const newJob = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        jobs: {
          create: {
            title,
            employer,
            location,
            startMonth,
            startYear,
            endMonth,
            endYear,
            description: newdescription,
            present,
          },
        },
      },
    })

    return NextResponse.json({ newJob }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    console.log(error)

    return NextResponse.json(
      { message: "Internal Server Error Updating User Info" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const PUT = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      )

    await connectToDatabase()

    const body = await req.json()

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
    } = JobSchema.parse(body)

    const resume = await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!resume)
      return NextResponse.json(
        { message: "User does not have resume!" },
        { status: 404 }
      )

    const newdescription = description.replace(/•|(\n)/g, "")

    const newJob = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        jobs: {
          update: {
            where: {
              id: id,
            },
            data: {
              title,
              employer,
              location,
              startMonth,
              startYear,
              endMonth,
              endYear,
              description: newdescription,
              present,
            },
          },
        },
      },
    })

    return NextResponse.json({ newJob }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    console.log(error)

    return NextResponse.json(
      { message: "Internal Server Error Adding User Info" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession()

    if (!session?.user)
      return NextResponse.json(
        { messsage: "User Unauthenticated!" },
        { status: 401 }
      )

    await connectToDatabase()

    const body = await req.json()

    const { id } = DeleteSchema.parse(body)

    const newJob = await prisma.job.delete({
      where: {
        id,
      },
    })

    return NextResponse.json({ newJob }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    console.log(error)

    return NextResponse.json(
      { message: "Internal Server Error Deleting User Info" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
