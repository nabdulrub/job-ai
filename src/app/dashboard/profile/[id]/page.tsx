import ProfileTabs from "@/components/profile/ProfileTabs"
import { connectToDatabase } from "@/lib/connectdb"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import { prisma } from "../../../../../prisma"

type Props = {
  params: {
    id: string
  }
}

const UserProfile = async ({ params: { id } }: Props) => {
  const session = await getAuthSession()

  if (!session?.user) {
    return redirect("/")
  }

  const getUserData = async (id: string) => {
    try {
      await connectToDatabase()
      const user = await prisma.resume.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              hashedPassword: false,
            },
          },
          jobs: true,
          projects: true,
          skills: true,
          education: true,
        },
      })

      return user
    } catch (error) {
      console.error("Error Fetch User Data:", error)
    } finally {
      prisma.$disconnect()
    }
  }

  const user = await getUserData(id)

  return (
    <div className="p-4 md:p-8">
      <ProfileTabs session={session.user} user={user} />
    </div>
  )
}

export default UserProfile
