import { connectToDatabase } from "@/lib/connectdb"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { NewResumeSchema } from "@/types/type"
import { NextResponse } from "next/server"
import { prisma } from "../../../../../prisma"
import {
  educations,
  generatedResume,
  projects,
  jobs,
} from "@/types/generatedResume"
import { ZodError } from "zod"
import { getAuthSession } from "@/lib/nextauth"
import { tailorJob } from "@/lib/gpt"

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getUserSubscriptionPlan()

    if (!session?.user)
      return NextResponse.json(
        { message: "User Unauthenticated!" },
        { status: 401 }
      )

    if (!session.isSubscribed) {
      return NextResponse.json({ message: "Not Subscribed" }, { status: 401 })
    }

    await connectToDatabase()

    const body = await req.json()

    const { title, description } = NewResumeSchema.parse(body)

    const resume = await prisma.resume.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            location: true,
            phone: true,
          },
        },
        jobs: true,
        projects: true,
        skills: true,
        education: true,
      },
    })

    if (!resume)
      return NextResponse.json(
        { message: "User does not have resume!" },
        { status: 404 }
      )

    const newResume = await tailorJob({
      jobDescription: description + `job title: ${title}`,
      user: {
        jobExperience: JSON.stringify(resume?.jobs),
        education: JSON.stringify(resume?.education),
        projectExperience: JSON.stringify(resume?.projects),
        skills: JSON.stringify(resume?.skills),
        info: JSON.stringify(resume?.user),
      },
    })

    if (!newResume)
      return NextResponse.json(
        { message: "New Resume was not made!" },
        { status: 404 }
      )

    const parsedResume = JSON.parse(newResume)

    const saveResume = await prisma.generatedResume.create({
      data: {
        userId: session?.user.id,
        title: parsedResume?.title,
        description: parsedResume?.description,
        jobs: {
          createMany: {
            data: parsedResume?.jobs?.map((job: jobs) => ({
              ...job,
              description: job.description?.toString(),
            })),
          },
        },
        projects: {
          createMany: {
            data: parsedResume?.projects?.map((project: projects) => ({
              ...project,
              description: project.description?.toString(),
            })),
          },
        },
        skills: {
          createMany: {
            data: parsedResume?.skills?.map((skill: string) => ({
              name: skill,
            })),
          },
        },
        education: {
          createMany: {
            data: parsedResume?.educations?.map((education: educations) => ({
              ...education,
              graduationDate: education.graduationDate?.toString(),
            })),
          },
        },
      },
    })

    return NextResponse.json({ data: newResume }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    console.log(error)

    return NextResponse.json(
      { message: "Internal Server Error Genearting Resume" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
