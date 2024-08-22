import { prisma } from "../../prisma"

export default async function initializeResume(userId: string) {
  return await prisma.resume.create({
    data: {
      userId,
    },
  })
}
