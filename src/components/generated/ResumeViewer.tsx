"use client"

import { PDFViewer } from "@react-pdf/renderer"
import React from "react"
import ResumePDF from "./ResumePDF"
import { databaseResume, generatedResume } from "@/types/generatedResume"
import { UserSession } from "@/types/type"

type Props = {
  resume: databaseResume
  session: UserSession
}

const ResumeViewer = ({ resume, session }: Props) => {
  return (
    <PDFViewer className="h-full w-full">
      <ResumePDF resume={resume} session={session} />
    </PDFViewer>
  )
}

export default ResumeViewer
