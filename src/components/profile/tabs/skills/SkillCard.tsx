import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Skill } from "@prisma/client"
import React from "react"
import DeleteButton from "../../DeleteButton"

type Props = {
  skill?: Skill
}

const SkillCard = ({ skill }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p className="text-lg font-semibold">{skill?.name}</p>
          <DeleteButton x skill id={skill?.id} />
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default SkillCard
