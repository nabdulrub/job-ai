import React from "react"
import RecentCard from "./RecentCard"
import { RecentsData } from "@/data/RecentsData"
import { Newspaper } from "lucide-react"
import RecentCardV2 from "./RecentCardV2"

type Props = {}

const Recent = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center text-2xl font-semibold">
        Recent Resumes
      </h2>
      <div className="flex flex-col flex-wrap gap-4 md:flex-row">
        {RecentsData.map((r) => {
          return (
            <>
              <RecentCardV2
                title={r.title}
                description={r.description}
                date={r.date}
              />
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
