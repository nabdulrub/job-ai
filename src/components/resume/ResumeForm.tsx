"use client"

import { UserSession } from "@/lib/type"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import BasicInfo from "./form/BasicInfo"
import ProjectExperience from "./form/Project"
import Skills from "./form/Skills"
import WorkExperience from "./form/Work"
import FormSteps from "@/context/FormSteps"

type Props = {
  session?: UserSession
  formStep: number
  setFormStep: (forStep: number) => void
}

const ResumeForm = ({ formStep, setFormStep, session }: Props) => {
  const marginCheck = formStep === 0 ? "mt-60" : "mt-40"

  return (
    <FormSteps>
      <Card
        className={`text-fade relative mx-auto w-full max-w-[900px] overflow-y-auto shadow-none ${marginCheck}`}
      >
        <CardHeader>
          <CardTitle>
            Fill out your resume manually for more accurate results!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formStep === 0 && (
            <BasicInfo
              session={session}
              setFormStep={setFormStep}
              formStep={formStep}
            />
          )}
          {formStep === 1 && (
            <WorkExperience setFormStep={setFormStep} formStep={formStep} />
          )}
          {formStep === 2 && (
            <ProjectExperience
              session={session}
              setFormStep={setFormStep}
              formStep={formStep}
            />
          )}
          {formStep === 3 && (
            <Skills setFormStep={setFormStep} formStep={formStep} />
          )}
        </CardContent>
      </Card>
    </FormSteps>
  )
}

export default ResumeForm
