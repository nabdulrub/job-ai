"use client"

import NewResumeDialog from "../generated/NewResumeDialog"
import ActionCardV2 from "./ActionCardV2"

type Props = {}

const Actions = (props: Props) => {
  return (
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
  )
}

export default Actions
