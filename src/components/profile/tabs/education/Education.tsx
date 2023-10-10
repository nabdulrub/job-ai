import { TEducation } from "@/lib/type"
import { Book, Trophy } from "lucide-react"
import React from "react"
import EducationCard from "./EducationCard"
import EducationDialog from "./EducationDialog"
import { Education } from "@prisma/client"

type Props = {
  education?: Education[]
}

const Education = ({ education }: Props) => {
  return (
    <div>
      <div className=" mb-6 flex items-center justify-between">
        <p className="4 flex items-center gap-2 text-2xl font-semibold">
          Your Education <Trophy />
        </p>
        <EducationDialog />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {education?.map((education) => (
          <EducationCard key={education.id} education={education} />
        ))}
      </div>
    </div>
  )
}

export default Education
