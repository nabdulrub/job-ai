import { TJob } from "@/lib/type"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import JobDialog from "./JobDialog"
import DeleteButton from "./DeleteButton"

type Props = {
  job: TJob
}

const JobCard = ({ job }: Props) => {
  const [viewAll, setViewAll] = useState(false)

  return (
    <Card className="w-full gap-2  bg-gray-100 shadow-none">
      <CardHeader className="flex flex-row items-end justify-between pb-4">
        <div className="grid gap-1">
          <CardTitle>{job.title}</CardTitle>
          <CardDescription className="flex items-start gap-2 text-sm">
            <p>{job.startMonth + " " + job.startYear}</p>
            <p className="font-bold">-</p>
            {job.endMonth && job.endYear ? (
              <p>{job.endMonth + " " + job.endYear}</p>
            ) : (
              <p>{job.present && "Present"}</p>
            )}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <JobDialog job={job} editMode />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>{job.employer}</p>
          <p className="text-gray-400">{job.location}</p>
        </div>
        <p>
          {!viewAll ? job.description.slice(0, 200) : job.description}{" "}
          <button
            className="text-blue-600 hover:cursor-pointer"
            onClick={() => (!viewAll ? setViewAll(true) : setViewAll(false))}
          >
            {!viewAll ? "view all..." : "view less"}
          </button>
        </p>
      </CardContent>
    </Card>
  )
}

export default JobCard
