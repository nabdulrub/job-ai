import React from "react"
import ActionCard from "./ActionCard"
import { Share2 } from "lucide-react"
import { ActionsData } from "@/data/ActionsData"
import ActionCardV2 from "./ActionCardV2"

type Props = {}

const Actions = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col flex-wrap gap-4  md:flex-row">
        {ActionsData.map((v, i) => (
          <ActionCardV2 key={i} />
        ))}
      </div>
    </div>
  )
}

export default Actions
