import React from "react"
import ProjectCard from "./ProjectCard"
import { FolderGit, Info } from "lucide-react"
import ProjectDialog from "./ProjectDialog"
import { Project } from "@prisma/client"

type Props = {
  projects?: Project[]
}

const Projects = ({ projects }: Props) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="4 flex items-center gap-2 text-2xl font-semibold">
          Your Projects <FolderGit />
        </p>
        <ProjectDialog />
      </div>
      {projects?.length === 0 ? (
        <p className="flex items-center gap-2 text-lg font-thin">
          You don&apos;t have any projects <Info strokeWidth={0.8} />
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
