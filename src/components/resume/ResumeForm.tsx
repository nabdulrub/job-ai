"use client"

import useFormStepStore from "@/store/useFormStepStore"
import { FormTitle } from "@/data/resumeFormData"
import JobAI from "../branding/JobAI"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import FormTracker from "./partials/FormTracker"
import PreviousButton from "./partials/PreviousButton"
import SkipButton from "./partials/SkipButton"
import BasicInfo from "./form/BasicInfo"
import ProjectExperience from "./form/Project"
import Skills from "./form/Skills"
import WorkExperience from "./form/Work"

type Props = {}

const ResumeForm = (props: Props) => {
  const { activeStep } = useFormStepStore()
  const formSteps = [
    <BasicInfo key={`form-step-0`} />,
    <WorkExperience key={`form-step-1`} />,
    <ProjectExperience key={`form-step-2`} />,
    <Skills key={`form-step-3`} />,
  ]

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block md:flex-[.8]">
        <FormTracker />
      </div>
      <div className="block flex-1 md:hidden">
        <JobAI size="lg" className="ml-5 font-bold" />
      </div>
      <div className="flex-1">
        <Card
          className={`text-fade relative flex h-screen w-full flex-col  justify-center border-none  p-2 shadow-none md:p-8 md:px-20`}
        >
          <CardHeader>
            <CardTitle
              className={`text-2xl font-extrabold md:p-0 md:text-4xl  ${
                activeStep === 1 || activeStep === 3 ? "pt-12" : ""
              }`}
            >
              {FormTitle[activeStep]}
            </CardTitle>
          </CardHeader>
          <CardContent>{formSteps[activeStep]}</CardContent>
          <PreviousButton />
          <SkipButton />
        </Card>
      </div>
    </div>
  )
}

export default ResumeForm
