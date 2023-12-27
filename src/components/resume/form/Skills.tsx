"use client"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tag, TagInput } from "@/components/ui/tag-input"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { useFormStepContext } from "@/store/FormSteps"
import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { EducationSkillsSchema, TEducationSkillsSchema } from "@/types/type"
import { handlePrev } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Award, Check, GraduationCap } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useFormStepStore from "@/store/useFormStepStore"
import { handleToast } from "@/lib/toast"

type Props = {}

const Skills = (props: Props) => {
  const { data: session } = useSession()

  const [tags, setTags] = useState<Tag[]>([])
  const router = useRouter()

  const { nextStep, status, activeStep, setComplete } = useFormStepStore()
  const isStepComplete = status[activeStep].completed

  const getYears = resumeYears()

  const form = useForm<TEducationSkillsSchema>({
    resolver: zodResolver(EducationSkillsSchema),
    defaultValues: {
      skills: [],
      school: "",
      degree: "",
      gpa: undefined,
      location: "",
      graduationMonth: undefined,
      graduationYear: undefined,
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const onSubmit = async (data: TEducationSkillsSchema) => {
    try {
      if (!isStepComplete) {
        const response = await fetch("/api/skills", {
          method: "POST",
          body: JSON.stringify(data),
        })

        if (response?.ok) {
          handleToast({
            title: "Info Submitted!, Redirecting...",
          })
          reset()
          setComplete()
          router.push(`/profile/${session?.user.id}`)
        }

        if (!response?.ok) {
          handleToast({
            title: "Failed to add submit info!",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-md mb-4 flex items-center gap-[2px] font-thin text-gray-500 md:text-xl">
            Your Skills
          </h2>
          <div className="mb-4 border-b-[1px] border-gray-200 pb-2">
            <Field
              control={control}
              label="Skills"
              name="skills"
              render={(field) => (
                <TagInput
                  {...field}
                  maxTags={20}
                  placeholderWhenFull="Limit Reached!"
                  placeholder="Enter all your skills! Click Enter after each skill!"
                  tags={tags}
                  size={"md"}
                  textStyle={"bold"}
                  className="sm:min-w-[450px]"
                  setTags={(newTags: Tag[]) => {
                    setTags(newTags)
                    const filteredTags = newTags.map((v: Tag) => v.text)
                    setValue("skills", filteredTags as [string, ...string[]])
                  }}
                />
              )}
            />
          </div>

          <h2 className="text-md mb-2 mt-6 flex items-center gap-[2px] font-thin text-gray-500 md:text-xl">
            Your Education
          </h2>
          <div className="job-experience-scroll relative flex max-h-[575px]  flex-col gap-4 overflow-auto px-1 pb-6 md:h-auto md:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-4">
              <div className="flex flex-col gap-2 md:flex-row">
                <Field
                  control={control}
                  label="School"
                  name={`school`}
                  placeholder="Enter School Name"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="School Location"
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Field
                  control={control}
                  label="Degree Acquired"
                  name={`degree`}
                  placeholder="e.g. Bachelors in Computer Science"
                  className="bg-white"
                />

                <div className="flex w-full flex-1 gap-[1px]">
                  <Field
                    label="Graduation Date"
                    name={`graduationMonth`}
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
                    name={`graduationYear`}
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
                <Field
                  control={control}
                  label="GPA"
                  size={0.3}
                  name={`gpa`}
                  render={(field) => (
                    <Input
                      max={5}
                      min={1}
                      onChange={(v) => {
                        setValue("gpa", parseInt(v.target.value))
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <ButtonLoading
              text="Finish"
              loadingText="Finalizing..."
              isLoading={isSubmitting}
              buttonIcon={<Check className="-mr-2 ml-1 w-5" />}
              className=" bg-green-600 shadow-none hover:bg-green-900"
            />
          </div>
        </form>
      </Form>
    </>
  )
}

export default Skills
