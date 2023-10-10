import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import EducationDialog from "./EducationDialog"
import { Education } from "@prisma/client"

type Props = {
  education?: Education
}

const EducationCard = ({ education }: Props) => {
  return (
    <Card className="w-full gap-2  bg-gray-100 shadow-none">
      <CardHeader className="flex flex-row items-end justify-between pb-4">
        <div className="grid gap-1">
          <CardTitle>{education?.school}</CardTitle>
          <CardDescription className="flex items-start gap-2 text-sm">
            <p>
              Grad Date:{" "}
              {education?.graduationMonth + " " + education?.graduationYear}
            </p>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <EducationDialog education={education} editMode />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>GPA: {education?.gpa}</p>
          <p className="text-gray-400">{education?.location}</p>
        </div>
        <p>{education?.degree}</p>
      </CardContent>
    </Card>
  )
}

export default EducationCard
