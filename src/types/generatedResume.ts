export type jobs = {
  title?: string
  employer?: string
  location?: string
  dateRange?: string
  description?: string[]
}

export type projects = {
  title?: string
  location?: string
  dateRange?: string
  description?: string[]
}

export type educations = {
  school?: string
  degree?: string
  location?: string
  graduationDate?: string
}

export type generatedResume = {
  title?: string
  description?: string
  jobs?: jobs[]
  projects?: projects[]
  skills?: string[]
  educations?: educations
}

// tailorJob() function params
export type TailorJob = {
  jobDescription: string
  user: {
    jobExperience?: string
    education?: string
    projectExperience?: string
    skills?: string
    info?: string
  }
}
