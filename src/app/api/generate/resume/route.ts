import { connectToDatabase } from "@/lib/connectdb"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { NewResumeSchema } from "@/types/type"
import { DeleteSchema } from "@/types/delete"
import { NextResponse } from "next/server"
import { prisma } from "../../../../../prisma"
import {
  educations,
  generatedResume,
  projects,
  jobs,
} from "@/types/generatedResume"
import { ZodError } from "zod"
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

    const skills = resume?.skills.map((item) => item.name).join(", ")

    const jobs = resume?.jobs
      .map(
        (item) =>
          `${item.title}, ${item.employer}, from ${
            item.startMonth + ", " + item.startYear
          } to ${
            item.present ? "Present" : item.endMonth + ", " + item.endYear
          }, ${item.location}, ${item.description}`
      )
      .join(". ")

    const projects = resume?.projects
      .map(
        (item) =>
          `${item.title}, from ${item.startMonth + ", " + item.startYear} to ${
            item.endMonth + ", " + item.endYear
          }, ${item.location}, ${item.description}`
      )
      .join(". ")

    console.log("reached resume check -4")

    const education = resume?.education
      .map(
        (item) =>
          `School: ${item.school},  Degree: ${item.degree}, ${
            item.graduationMonth + ", " + item.graduationYear
          }, At: ${item.location}`
      )
      .join(". ")
    console.log("reached resume check -5")

    const newResume = await tailorJob({
      jobDescription: description + `job title: ${title}`,
      user: {
        jobExperience: jobs,
        education: education,
        projectExperience: projects,
        skills: skills,
      },
    })

    console.log("reached resume check -6")

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
              description: job.description?.join("*"),
            })),
          },
        },
        projects: {
          createMany: {
            data: parsedResume?.projects?.map((project: projects) => ({
              ...project,
              description: project.description?.join("*"),
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
              graduationDate: education.graduationDate,
            })),
          },
        },
      },
    })

    console.log("reached resume check -8")

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

export const DELETE = async (req: Request, res: Response) => {
  try {
    const session = await getUserSubscriptionPlan()

    if (!session?.user)
      return NextResponse.json(
        { message: "User Unauthenticated!" },
        { status: 401 }
      )

    await connectToDatabase()

    const body = await req.json()

    const { id } = DeleteSchema.parse(body)

    const resume = await prisma.generatedResume.delete({
      where: {
        id: id,
      },
      include: {
        jobs: true,
        education: true,
        projects: true,
        skills: true,
      },
    })

    if (!resume)
      return NextResponse.json(
        { message: "Resume does not exist" },
        { status: 404 }
      )

    return NextResponse.json({ data: resume }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.issues }, { status: 415 })
    }

    console.log(error)

    return NextResponse.json(
      { message: "Internal Server Error Deleting Resume" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
