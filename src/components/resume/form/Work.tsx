"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { JobSchema, TJobSchema } from "@/types/type"
import { ChevronRight, Plus } from "lucide-react"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useFormStepStore from "@/store/useFormStepStore"
import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { handleToast } from "@/lib/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type Props = {}

const WorkExperience = (props: Props) => {
  const { nextStep, status, activeStep, setComplete } = useFormStepStore()
  const isStepComplete = status[activeStep].completed
  const getYears = resumeYears()

  const form = useForm<TJobSchema>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      employer: "",
      location: "",
      startMonth: undefined,
      startYear: undefined,
      endMonth: undefined,
      endYear: undefined,
      description: "",
      present: false,
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = form

  const onSubmit = async (data: TJobSchema) => {
    try {
      if (!isStepComplete) {
        const response = await fetch("/api/job", {
          method: "POST",
          body: JSON.stringify(data),
        })

        if (response?.ok) {
          handleToast({
            title: "Job Added!",
            description: "Add another job!",
            actionText: "Add More",
          })
          reset()
          setComplete()
        }

        if (!response?.ok) {
          handleToast({
            title: "Failed to add job!",
            description: "Please try again...",
            actionText: "Dismiss",
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleNextError = () => {
    if (isStepComplete) return nextStep()

    handleToast({
      title: "No Added Jobs",
      description:
        "You must add a job to continue!\n Hint: Press the Add Job button",
      variant: "destructive",
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <h2 className="mb-4 text-xl font-thin text-gray-500">
              Your Job Experience
            </h2>
            {isStepComplete && (
              <ButtonLoading
                text="Add Job"
                loadingText="Adding..."
                className=" z-20"
                isLoading={isSubmitting}
                type="submit"
                buttonIcon={<Plus className="ml-[3px] w-5" />}
              />
            )}
          </div>
          <div className="job-experience-scroll relative flex max-h-[575px]  flex-col gap-4 overflow-auto scroll-smooth px-1 pb-6 md:h-auto md:flex-row">
            <div className="grid min-w-full flex-1  grid-cols-1 gap-4">
              <div className="flex flex-col gap-2 md:flex-row">
                <Field
                  control={control}
                  label="Job Title"
                  name={`title`}
                  placeholder="Job Title"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="Location"
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Field
                  control={control}
                  label="Employer"
                  name={`employer`}
                  placeholder="Employer"
                  className="bg-white"
                />

                <div className="flex w-full flex-[0.7] gap-[1px]">
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

                <div className="flex flex-1 gap-2">
                  <div className="flex flex-1 gap-[1px]">
                    <Field
                      label="End Date"
                      name={`endMonth`}
                      rules={{
                        required: !!getValues("present"),
                      }}
                      control={control}
                      render={(field) => (
                        <Select
                          onValueChange={field.onChange}
                          disabled={getValues(`present`)}
                        >
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
                      rules={{
                        required: !!getValues("present"),
                      }}
                      control={control}
                      render={(field) => (
                        <Select
                          disabled={getValues(`present`)}
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
                  <Field
                    label="&#8205;"
                    name={`present`}
                    size={0.1}
                    control={control}
                    render={(field) => (
                      <div className="flex items-center gap-1">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(val) => {
                            if (val) {
                              setValue("endMonth", undefined)
                              setValue("endYear", undefined)
                            }
                            field.onChange(val)
                          }}
                        />
                        <label className="text-sm font-semibold">
                          Present?
                        </label>
                      </div>
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
                    placeholder="Description"
                    className="bg-white"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              {isSubmitSuccessful || isStepComplete ? (
                <Button
                  type="button"
                  variant={"outline"}
                  className={`border-gray-300 bg-gray-200`}
                  onClick={handleNextError}
                >
                  Project Experience
                  <ChevronRight className="-mr-2 w-5" />
                </Button>
              ) : (
                <ButtonLoading
                  text="Add Job"
                  loadingText="Adding..."
                  className=" z-20"
                  isLoading={isSubmitting}
                  type="submit"
                  buttonIcon={<Plus className="ml-[3px] w-5" />}
                />
              )}
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default WorkExperience
