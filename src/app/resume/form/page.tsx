import ResumeHolder from "@/components/resume/ResumeHolder"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const ResumeFormPage = async (props: Props) => {
  const session = await getAuthSession()

  if (!session?.user) return redirect("/")

  return (
    <div className="py-4 md:p-0">
      <ResumeHolder />
    </div>
  )
}

export default ResumeFormPage
