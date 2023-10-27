import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { JobSchema, TJobSchema } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Job } from "@prisma/client"
import { PlusIcon, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ButtonLoading from "../../../ButtonLoading"
import Field from "../../../Field"
import { Button } from "../../../ui/button"
import { Checkbox } from "../../../ui/checkbox"
import { Form } from "../../../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Textarea } from "../../../ui/textarea"
import { ToastAction } from "../../../ui/toast"
import { toast } from "../../../ui/use-toast"
import DeleteButton from "../../DeleteButton"

type Props = {
  editMode?: boolean
  job?: Job
}

const JobDialog = ({ editMode, job }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const getYears = resumeYears()
  const router = useRouter()

  const form = useForm<TJobSchema>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      id: job?.id ? job.id : undefined,
      title: job?.title ? job.title : "",
      employer: job?.employer ? job.employer : "",
      location: job?.location ? job.location : "",
      startMonth: job?.startMonth ? job.startMonth : undefined,
      startYear: job?.startYear ? job.startYear : undefined,
      endMonth: job?.endMonth ? job.endMonth : undefined,
      endYear: job?.endYear ? job.endYear : undefined,
      description: job?.description ? job.description : "",
      present: job?.present ? job.present : false,
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: TJobSchema) => {
    try {
      const response = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Job Added!",
          description: "Add another job!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Dismiss
            </ToastAction>
          ),
          duration: 2000,
        })
        router.refresh()
        setIsOpen(false)
        reset()
      }

      if (!response.ok) {
        toast({
          title: "Failed to add job!",
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

  const onUpdate = async (data: TJobSchema) => {
    try {
      const response = await fetch("/api/job", {
        method: "PUT",
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Job Updated!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Dismiss
            </ToastAction>
          ),
          duration: 2000,
        })
        router.refresh()
        setIsOpen(false)
        reset()
      }

      if (!response.ok) {
        toast({
          title: "Failed to update job!",
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {editMode ? (
          <Button variant={"outline"} className="border-gray-400 px-2">
            Change Info
          </Button>
        ) : (
          <Button className="bg-amber-600  hover:bg-amber-900">
            Add Job <PlusIcon className="ml-1 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-30px)] max-w-[900px] md:w-full">
        <DialogHeader>
          <DialogTitle>
            {editMode ? `Edit ${job?.title}` : "Add New Job"}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to{" "}
            {editMode ? "edit the current job" : "add a new job for ai to use"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(editMode ? onUpdate : onSubmit)}>
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
                          value={
                            editMode
                              ? getValues("startYear")?.toString()
                              : undefined
                          }
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
                            value={editMode ? getValues("endMonth") : undefined}
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
                            value={
                              editMode
                                ? getValues("endYear")?.toString()
                                : undefined
                            }
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
                      rows={7}
                      placeholder="Description"
                      className="bg-white"
                    />
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-6 flex w-full md:mt-0">
              <div className="flex w-full justify-between">
                {editMode ? <DeleteButton id={job?.id} job /> : null}
                <ButtonLoading
                  text={editMode ? "Save Changes" : "Edit"}
                  loadingText={editMode ? "Editing..." : "Adding..."}
                  isLoading={isSubmitting}
                  buttonIcon={
                    editMode ? (
                      <Save className="ml-2 w-5" />
                    ) : (
                      <PlusIcon className="ml-1 w-5" />
                    )
                  }
                  className=" bg-green-800"
                />
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default JobDialog
