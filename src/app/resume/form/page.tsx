import ResumeHolder from "@/components/resume/ResumeHolder"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const ResumeFormPage = async (props: Props) => {
  const session = await getAuthSession()

  if (!session?.user) return redirect("/")

  return <ResumeHolder />
}

export default ResumeFormPage
