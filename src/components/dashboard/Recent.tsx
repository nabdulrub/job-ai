import React from "react"
import RecentCard from "./RecentCard"
import { RecentsData } from "@/data/RecentsData"
import { Newspaper } from "lucide-react"

type Props = {}

const Recent = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="flex items-center text-2xl font-bold">
        <Newspaper className="mr-2 h-8 w-8 rounded-sm bg-gray-200 p-[6px]" />{" "}
        Recent Resumes
      </h2>
      <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {RecentsData.map((r) => {
          return (
            <>
              <RecentCard
                date={r.date}
                title={r.title}
                description={r.description}
                image={r.image}
              />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Recent
