import ResumeHolder from "@/components/resume/ResumeHolder"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const ResumeFormPage = async (props: Props) => {
  const session = await getAuthSession()

  if (!session?.user) return redirect("/")

  return (
    <div className="p-4 md:p-8">
      <ResumeHolder />
    </div>
  )
}

export default ResumeFormPage
