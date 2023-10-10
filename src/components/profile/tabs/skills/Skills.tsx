import { Skill } from "@prisma/client"
import { Award } from "lucide-react"
import React from "react"
import SkillCard from "./SkillCard"
import SkillsDialog from "./SkillsDialog"

type Props = {
  skills?: Skill[]
}

const Skills = ({ skills }: Props) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="4 flex items-center gap-2 text-2xl font-semibold">
          Your Skills <Award className="w-5" />
        </p>
        <SkillsDialog />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skills?.map((skill) => <SkillCard skill={skill} key={skill.id} />)}
      </div>
    </div>
  )
}

export default Skills
