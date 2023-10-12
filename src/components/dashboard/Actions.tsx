import React from "react"
import ActionCard from "./ActionCard"
import { Share2 } from "lucide-react"
import { ActionsData } from "@/data/ActionsData"

type Props = {}

const Actions = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="flex items-center text-2xl font-semibold">Actions</h2>
      <div className="flex flex-col flex-wrap gap-4  md:flex-row">
        {ActionsData.map((v, i) => (
          <ActionCard
            image={v.image}
            key={i}
            title={v.title}
            description={v.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Actions
