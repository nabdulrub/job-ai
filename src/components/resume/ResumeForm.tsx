"use client"

import { UserSession } from "@/types/type"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import BasicInfo from "./form/BasicInfo"
import ProjectExperience from "./form/Project"
import Skills from "./form/Skills"
import WorkExperience from "./form/Work"
import FormSteps from "@/context/FormSteps"
import FormTracker from "./FormTracker"
import JobAI from "../JobAI"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FormTitle } from "@/data/resumeFormData"

type Props = {
  session?: UserSession
  formStep: number
  setFormStep: (forStep: number) => void
}

const ResumeForm = ({ formStep, setFormStep, session }: Props) => {
  return (
    <FormSteps>
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
                className={`text-2xl font-extrabold md:p-0 md:text-4xl ${
                  formStep === 3 && "pt-12"
                } ${formStep === 1 && "pt-12"}`}
              >
                {FormTitle[formStep]}
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
            <Button
              className="absolute left-6 top-10 w-fit px-0 md:left-10"
              variant={"ghost"}
              onClick={() => formStep > 0 && setFormStep((prev) => prev - 1)}
            >
              <ChevronLeft strokeWidth={1.5} className="h-10 w-10" />
            </Button>
            {formStep === 2 && (
              <Button
                className="absolute right-6 top-10 w-fit px-0 pl-4 md:right-10"
                variant={"ghost"}
                onClick={() => setFormStep((prev) => prev + 1)}
              >
                Skip <ChevronRight strokeWidth={1.5} className="h-10 w-10" />
              </Button>
            )}
          </Card>
        </div>
      </div>
    </FormSteps>
  )
}

export default ResumeForm
