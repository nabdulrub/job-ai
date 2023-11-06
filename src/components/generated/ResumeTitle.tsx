import React from "react"
import { Badge } from "../ui/badge"

type ResumeTitleProps = {
  title?: string | null
  description?: string | null
  date?: Date
}

const ResumeTitle = ({ title, description, date }: ResumeTitleProps) => {
  const createdDate = date?.toDateString()
  return (
    <div className="text-center md:text-start">
      <div>
        <Badge className="text-bold mb-1 px-4 py-1 text-white">Job Info</Badge>
        <p className="mt-2 text-sm text-gray-600">{createdDate}</p>
        <h3 className="text-2xl tracking-wide md:text-3xl">{title}</h3>
      </div>
      <p className="mt-2 max-w-[800px] text-sm md:text-base">{description}</p>
    </div>
  )
}

export default ResumeTitle
