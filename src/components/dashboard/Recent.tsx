"use client"

import { GeneratedResume } from "@prisma/client"
import RecentCardV2 from "./RecentCardV2"
import NoRecents from "./NoRecents"
import DashboardInfo from "@/context/DashboardContext"
import { PDFViewer } from "@react-pdf/renderer"
import ResumePDF from "../generated/ResumePDF"

type Props = {
  recents?: GeneratedResume[]
}

const Recent = ({ recents }: Props) => {
  if (recents?.length === 0)
    return (
      <DashboardInfo>
        <NoRecents />
      </DashboardInfo>
    )

  return (
    <DashboardInfo>
      <div className="flex  flex-col gap-4">
        <h2 className="flex items-center text-2xl font-semibold">
          Recent Resumes
        </h2>
        <div className="flex flex-col flex-wrap gap-4 md:flex-row">
          {recents?.map((recent) => {
            return (
              <>
                <RecentCardV2 recent={recent} />
                {/* <RecentCard
                date={r.date}
                title={r.title}
                description={r.description}
                image={r.image}
              /> */}
              </>
            )
          })}
        </div>
      </div>
    </DashboardInfo>
  )
}

export default Recent
