import { prisma } from "../../prisma"

export default async function subscribeToNewsletter(email: string) {
  return await prisma.newsletter.create({
    data: {
      email,
    },
  })
}
