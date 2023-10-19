"use client"

import { PDFViewer } from "@react-pdf/renderer"
import React from "react"
import ResumePDF from "./ResumePDF"
import { generatedResume } from "@/types/generatedResume"

type Props = {
  resume: generatedResume
}

const ResumeViewer = ({ resume }: Props) => {
  return (
    <PDFViewer className="h-full w-full">
      <ResumePDF resume={resume} />
    </PDFViewer>
  )
}

export default ResumeViewer
