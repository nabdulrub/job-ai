import { Education } from "@prisma/client"
import { Info, Trophy } from "lucide-react"
import EducationCard from "./EducationCard"
import EducationDialog from "./EducationDialog"

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
      {education?.length === 0 ? (
        <p className="flex items-center gap-2 text-lg font-thin">
          You don&apos;t have any education <Info strokeWidth={0.8} />
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education?.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Education
