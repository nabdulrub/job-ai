import { connectToDatabase } from "@/lib/connectdb"
import { getAuthSession } from "@/lib/nextauth"
import {
  DeleteSchema,
  EducationSkillsSchema,
  ProjectSchema,
} from "@/types/type"
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
      skills,
      school,
      degree,
      gpa,
      location,
      graduationMonth,
      graduationYear,
    } = EducationSkillsSchema.parse(body)

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

    const skillsList: { name: string }[] = skills.map((name) => ({ name }))

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
      },
    })

    if (
      school &&
      degree &&
      gpa &&
      location &&
      graduationMonth &&
      graduationYear
    ) {
      const updatedEducation = await prisma.resume.update({
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
    }

    if (session.user.isNewUser) {
      const updateNewUser = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          isNewUser: false,
        },
      })
    }

    return NextResponse.json({ updateResume }, { status: 201 })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Adding Project Info" },
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

    const deletedSkill = await prisma.skill.delete({
      where: {
        id: id,
      },
    })

    if (!deletedSkill)
      return NextResponse.json(
        { message: "User does not have any skills!" },
        { status: 404 }
      )

    return NextResponse.json({ deletedSkill }, { status: 201 })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    return NextResponse.json(
      { message: "Internal Server Error Deleting Skill" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
