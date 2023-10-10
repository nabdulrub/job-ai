"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import ProjectDialog from "./ProjectDialog"
import { Project } from "@prisma/client"

type Props = {
  project?: Project
}

const ProjectCard = ({ project }: Props) => {
  const [viewAll, setViewAll] = useState(false)

  return (
    <Card className="w-full gap-2  bg-gray-100 shadow-none">
      <CardHeader className="flex flex-row items-end justify-between pb-4">
        <div className="grid gap-1">
          <CardTitle>{project?.title}</CardTitle>
          <CardDescription className="flex items-start gap-2 text-sm">
            <p>{project?.startMonth + " " + project?.startYear}</p>
            <p className="font-bold">-</p>
            <p>{project?.endMonth + " " + project?.endYear}</p>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <ProjectDialog project={project} editMode />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-gray-400">{project?.location}</p>
        <p>
          {!viewAll
            ? project?.description?.slice(0, 200)
            : project?.description}{" "}
          <button
            className="text-blue-600 hover:cursor-pointer"
            onClick={() => (!viewAll ? setViewAll(true) : setViewAll(false))}
          >
            {!viewAll ? "view all..." : "view less"}
          </button>
        </p>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
