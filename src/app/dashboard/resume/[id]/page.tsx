import ResumeViewer from "@/components/generated/ResumeViewer"
import { getAuthSession } from "@/lib/nextauth"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { prisma } from "../../../../../prisma"

type Props = {
  params: {
    id: string
  }
}

const GeneratedResume = async ({ params: { id } }: Props) => {
  const session = await getAuthSession()

  if (!session?.user) return redirect("/")

  const resume = await prisma.generatedResume.findFirst({
    where: {
      userId: session.user.id,
      id: id,
    },
    include: {
      jobs: true,
      projects: true,
      education: true,
      skills: true,
    },
  })

  return (
    <div className="h-full p-4 md:p-8">
      <Suspense fallback={<Loader2 size={60} className="animate-spin" />}>
        <ResumeViewer resume={resume} session={session.user} />
      </Suspense>
    </div>
  )
}

export default GeneratedResume
