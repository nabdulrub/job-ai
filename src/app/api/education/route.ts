import { connectToDatabase } from "@/lib/connectdb"
import { getAuthSession } from "@/lib/nextauth"
import { EducationSchema } from "@/types/type"
import { DeleteSchema } from "@/types/delete"
import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { prisma } from "../../../../prisma"
import isUserAuthentication from "@/use-cases/auth/isUserAuthenticated"

export const POST = async (req: Request, res: Response) => {
  try {
    await isUserAuthentication()

    await connectToDatabase()

    const body = await req.json()

    const { school, degree, gpa, location, graduationMonth, graduationYear } =
      EducationSchema.parse(body)

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

    const updateResume = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
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
    })

    return NextResponse.json({ updateResume }, { status: 201 })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Adding Education Info" },
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
      school,
      degree,
      gpa,
      location,
      graduationMonth,
      graduationYear,
      id,
    } = EducationSchema.parse(body)

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

    const updatedEducation = await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        education: {
          update: {
            where: {
              id: id,
            },
            data: {
              school,
              degree,
              gpa,
              location,
              graduationMonth,
              graduationYear,
            },
          },
        },
      },
    })

    return NextResponse.json({ updatedEducation }, { status: 201 })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Updating Education Info" },
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

    const deletedEducation = await prisma.education.delete({
      where: {
        id: id,
      },
    })

    if (!deletedEducation)
      return NextResponse.json(
        { message: "User does not any education!" },
        { status: 404 }
      )

    return NextResponse.json({ deletedEducation }, { status: 201 })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Deleting Education Info" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
