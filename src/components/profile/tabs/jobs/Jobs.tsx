import { Job } from "@prisma/client"
import { Info, User } from "lucide-react"
import JobCard from "./JobCard"
import JobDialog from "./JobDialog"

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
      {jobs?.length === 0 ? (
        <p className="flex items-center gap-2 text-lg font-thin">
          You don&apos;t have any jobs <Info strokeWidth={0.8} />
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jobs?.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  )
}

export default Jobs
