"use client"

import { GeneratedResume } from "@prisma/client"
import NoRecents from "./NoRecents"
import RecentCardV2 from "./RecentCardV2"

type Props = {
  recents?: GeneratedResume[]
}

const Recent = ({ recents }: Props) => {
  if (recents?.length === 0) return <NoRecents />

  return (
    <div className="flex  flex-col gap-4">
      <h2 className="flex items-center text-2xl font-semibold">
        Recent Resumes
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  )
}

export default Recent
