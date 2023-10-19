import { UserSession } from "@/types/type"
import UserWelcome from "./UserWelcome"
import Actions from "./Actions"

import Recent from "./Recent"
import { prisma } from "../../../prisma"
import ResumePDF from "../generated/ResumePDF"

type Props = {
  session: UserSession
}

const Dashboard = async ({ session }: Props) => {
  const recentResumes = await prisma.generatedResume.findMany({
    where: {
      userId: session.id,
    },
  })

  return (
    <div className="flex h-full flex-col items-start  gap-12 md:px-10">
      <UserWelcome name={[session?.firstname, session?.lastname]} />
      <div className="w-full self-start">
        <Actions />
      </div>
      <div className="w-full self-start md:h-[calc(100%-300px)]">
        <Recent recents={recentResumes} />
      </div>
    </div>
  )
}

export default Dashboard
