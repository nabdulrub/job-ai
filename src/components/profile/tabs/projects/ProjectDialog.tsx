import { ProjectSchema, TProjectSchema } from "@/types/type"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import { Button } from "../../../ui/button"
import { GanttChartSquare, PlusIcon, Save } from "lucide-react"
import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../../../ui/use-toast"
import { ToastAction } from "../../../ui/toast"
import { Form } from "../../../ui/form"
import Field from "../../../Field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Textarea } from "../../../ui/textarea"
import DeleteButton from "../../partials/DeleteButton"
import ButtonLoading from "../../../ButtonLoading"
import { useRouter } from "next/navigation"
import { Project } from "@prisma/client"

type Props = {
  editMode?: boolean
  project?: Project
}

const ProjectDialog = ({ editMode, project }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const getYears = resumeYears()

  const form = useForm<TProjectSchema>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      id: project?.id ? project.id : undefined,
      title: project?.title ? project.title : "",
      location: project?.location ? project.location : "",
      startMonth: project?.startMonth ? project.startMonth : undefined,
      startYear: project?.startYear ? project.startYear : undefined,
      endMonth: project?.endMonth ? project.endMonth : undefined,
      endYear: project?.endYear ? project.endYear : undefined,
      description: project?.description ? project.description : "",
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
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
          title: "Failed to add project!",
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

  const onUpdate = async (data: TProjectSchema) => {
    try {
      const response = await fetch("/api/project", {
        method: "PUT",
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Project Updated!",
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
          title: "Failed to update project!",
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
          <Button className=" bg-lime-600  hover:bg-lime-900">
            Add Project
            <PlusIcon className="ml-1 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-30px)] max-w-[900px] md:w-full">
        <DialogHeader>
          <DialogTitle>
            {editMode ? `Edit ${project?.title}` : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to{" "}
            {editMode
              ? "edit the current project"
              : "add a new project for ai to use"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(editMode ? onUpdate : onSubmit)}>
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
                          value={
                            editMode
                              ? getValues("startYear").toString()
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
                          value={
                            editMode
                              ? getValues("endYear").toString()
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
            <DialogFooter className="mt-6 flex w-full md:mt-0">
              <div className="flex w-full justify-between">
                {editMode ? <DeleteButton id={project?.id} project /> : null}
                <ButtonLoading
                  text={editMode ? "Save Changes" : "Add"}
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

export default ProjectDialog
