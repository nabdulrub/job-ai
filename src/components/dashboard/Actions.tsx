"use client"

import React from "react"
import ActionCard from "./ActionCard"
import { Share2 } from "lucide-react"
import { ActionsData } from "@/data/ActionsData"
import ActionCardV2 from "./ActionCardV2"
import NewResumeDialog from "../generated/NewResumeDialog"
import DashboardInfo from "@/context/DashboardContext"

type Props = {}

const Actions = (props: Props) => {
  return (
    <DashboardInfo>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col flex-wrap gap-4  md:flex-row">
          <ActionCardV2
            title="New Resume"
            description="Generate a new tailored resume"
            cta="Create"
            dialog={<NewResumeDialog />}
          />
        </div>
      </div>
    </DashboardInfo>
  )
}

export default Actions
