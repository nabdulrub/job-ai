import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React, { Suspense } from "react"
import { prisma } from "../../../../../prisma"
import ResumePDF from "@/components/generated/ResumePDF"
import { PDFViewer } from "@react-pdf/renderer"
import ResumeViewer from "@/components/generated/ResumeViewer"
import { Loader2 } from "lucide-react"

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
