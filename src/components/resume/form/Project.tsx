"use client"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { useFormStepContext } from "@/context/FormSteps"
import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { ProjectSchema, TProjectSchema, UserSession } from "@/types/type"
import { handleNext, handlePrev } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight, GanttChartSquare, Plus } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
  session?: UserSession
  formStep: number
  setFormStep: (forStep: number) => void
}

const ProjectExperience = ({ session, formStep, setFormStep }: Props) => {
  const { isStepCompleted, setComplete } = useFormStepContext()
  const isComplete = isStepCompleted[formStep]?.completed

  const getYears = resumeYears()

  const form = useForm<TProjectSchema>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      location: "",
      startMonth: undefined,
      startYear: undefined,
      endMonth: undefined,
      endYear: undefined,
      description: "",
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const onSubmit = async (data: TProjectSchema) => {
    try {
      const response = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Doing Great, Project Added!",
          description: "Add another project!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Add More
            </ToastAction>
          ),
          duration: 2000,
        })
        reset()
        setComplete(formStep)
      }

      if (!response.ok) {
        toast({
          title: "Failed to add project!",
          description: "Please try again...",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-800 text-white hover:text-black"
            >
              Sure
            </ToastAction>
          ),
          duration: 2000,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleNextError = () => {
    if (isComplete) {
      return handleNext(setFormStep)
    }
    toast({
      title: "No Added Projects",
      description: `You must add a project to proceed!\n Hint: Press the "Add Project" button`,
      action: (
        <ToastAction altText="Back to form" className="bg-red-800 text-white">
          Dismiss
        </ToastAction>
      ),
      duration: 3000,
    })
  }

  watch()
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-md text-thin flex items-center gap-2 text-gray-500 md:text-xl">
              Your Project Experience
            </h2>
            <div className="flex gap-2">
              {isComplete && (
                <>
                  <ButtonLoading
                    text="Add Project"
                    loadingText="Adding..."
                    type="submit"
                    className="hidden md:block"
                    isLoading={isSubmitting}
                  />
                  <ButtonLoading
                    type="submit"
                    isLoading={isSubmitting}
                    className="md:hidden"
                    buttonIcon={<Plus className="w-5 md:ml-[3px]" />}
                  />
                </>
              )}
            </div>
          </div>
          <div className="job-experience-scroll relative flex max-h-[575px]  flex-col gap-4 overflow-auto scroll-smooth px-1 pb-6 md:h-auto md:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2 md:flex-row">
                <Field
                  control={control}
                  label="Project Title"
                  name={`title`}
                  placeholder="Enter Project Title"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="Project Location"
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex w-full flex-1 gap-[1px]">
                  <Field
                    label="Start Date"
                    name={`startMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="rounded-br-none rounded-tr-none border-r-0 bg-white">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {resumeMonths.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Field
                    label="&#8205;"
                    name={`startYear`}
                    control={control}
                    render={(field) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(parseInt(val))
                        }}
                      >
                        <SelectTrigger className="flex-1 rounded-bl-none rounded-tl-none border-l-0 bg-white">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getYears.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-1 gap-[1px]">
                  <Field
                    label="End Date"
                    name={`endMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="rounded-br-none rounded-tr-none border-r-0 bg-white">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {resumeMonths.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Field
                    label="&#8205;"
                    name={`endYear`}
                    control={control}
                    render={(field) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(parseInt(val))
                        }}
                      >
                        <SelectTrigger className="rounded-bl-none rounded-tl-none border-l-0 bg-white">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getYears.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <Field
                label="Description"
                name={`description`}
                control={control}
                render={(field) => (
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Describe the Project"
                    className="bg-white"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            {isComplete ? (
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 bg-gray-200"
                onClick={handleNextError}
              >
                Skills & Education
                <ChevronRight className="-mr-2 w-5" />
              </Button>
            ) : (
              <ButtonLoading
                text="Add Project"
                loadingText="Adding..."
                type="submit"
                isLoading={isSubmitting}
                className=""
                buttonIcon={<Plus className="w-5 md:ml-[3px]" />}
              />
            )}
          </div>
        </form>
      </Form>
    </>
  )
}

export default ProjectExperience
