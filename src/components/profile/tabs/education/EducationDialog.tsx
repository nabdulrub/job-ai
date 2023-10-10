"use client"

import { resumeMonths, resumeYears } from "@/data/resumeFormData"
import { EducationSchema } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Education } from "@prisma/client"
import { PlusIcon, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ButtonLoading from "../../../ButtonLoading"
import Field from "../../../Field"
import { Button } from "../../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import { Form } from "../../../ui/form"
import { Input } from "../../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { ToastAction } from "../../../ui/toast"
import { toast } from "../../../ui/use-toast"
import DeleteButton from "../../DeleteButton"

type Props = {
  education?: Education
  editMode?: boolean
}

const EducationDialog = ({ education, editMode }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const getYears = resumeYears()
  const router = useRouter()

  const form = useForm<Education>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      id: education?.id ? education.id : undefined,
      school: education?.school ? education.school : "",
      degree: education?.id ? education.id : "",
      gpa: education?.gpa ? education.gpa : undefined,
      location: education?.location ? education.location : "",
      graduationMonth: education?.graduationMonth
        ? education.graduationMonth
        : undefined,
      graduationYear: education?.graduationYear
        ? education.graduationYear
        : undefined,
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: Education) => {
    try {
      const response = await fetch("/api/education", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Education Updated!",
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
          title: "Failed to edit info!",
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
          <Button className=" bg-teal-500  hover:bg-teal-700">
            Add Education <PlusIcon className="ml-1 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-30px)] max-w-[900px] md:w-full">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Your Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to
            {editMode ? " edit the education" : " add the education"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex w-full justify-between">
              <DeleteButton id={education?.id} education />
              <ButtonLoading
                text={editMode ? "Save Changes" : "Add Education"}
                loadingText={editMode ? "Saving..." : "Adding..."}
                isLoading={isSubmitting}
                buttonIcon={<Save className="-mr-2 ml-1 w-5" />}
                className=" bg-green-700"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EducationDialog
