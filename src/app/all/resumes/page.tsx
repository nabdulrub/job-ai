import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"
import { prisma } from "../../../../prisma"
import RecentCardV2 from "@/components/dashboard/RecentCardV2"

type Props = {}

const Resumes = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect("/")

  const resumes = await prisma.generatedResume.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <div className="px-4 pt-4 md:px-10 md:pt-8">
      <div className="mb-6">
        <h2 className="text-3xl">Your Resumes</h2>
      </div>
      <div
        className={`grid grid-cols-1 gap-4 ${
          resumes.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {resumes?.map((recents) => (
          <RecentCardV2 key={recents.id} recent={recents} />
        ))}
      </div>
    </div>
  )
}

export default Resumes
