import { TJob, TUser } from "@/lib/type"
import React from "react"
import JobCard from "./JobCard"
import { PlusIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import JobDialog from "./JobDialog"
import { Job } from "@prisma/client"

type Props = {
  jobs?: Job[]
}

const Jobs = ({ jobs }: Props) => {
  return (
    <div>
      <div className=" mb-6 flex items-center justify-between">
        <p className="4 flex items-center gap-2 text-2xl font-semibold">
          Your Jobs <User />
        </p>
        <JobDialog />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  )
}

export default Jobs
