"use client"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Tag, TagInput } from "@/components/ui/tag-input"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { EducationSkillsSchema, TEducationSkillsSchema } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog } from "@radix-ui/react-dialog"
import { Award, Check, Plus, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Props = {}

const SkillsDialog = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const router = useRouter()

  const form = useForm<TEducationSkillsSchema>({
    resolver: zodResolver(EducationSkillsSchema),
    defaultValues: {
      skills: [],
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: TEducationSkillsSchema) => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (response.ok) {
        reset()
        toast({
          title: "Added Skill",
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
        reset()
        router.refresh()
        setIsOpen(false)
      }
      if (!response.ok) {
        toast({
          title: "Failed to add skill!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-800 text-white hover:text-black"
            >
              Sure!
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button className=" bg-purple-500  hover:bg-purple-700">
            Add Skills <PlusIcon className="ml-1 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[calc(100%-30px)] max-w-[900px] md:w-full">
          <DialogHeader className="-mb-2">
            <DialogTitle>Add skills</DialogTitle>
            <DialogDescription>
              Fill out the form below to add skills
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Field
                  control={control}
                  name="skills"
                  render={(field) => (
                    <TagInput
                      {...field}
                      maxTags={20}
                      placeholderWhenFull="Limit Reached!"
                      placeholder="Enter all your skills! Click Enter after each skill!"
                      tags={tags}
                      size={"sm"}
                      textStyle={"bold"}
                      className="sm:min-w-[450px]"
                      setTags={(newTags: Tag[]) => {
                        setTags(newTags)
                        const filteredTags = newTags.map((v: Tag) => v.text)
                        setValue(
                          "skills",
                          filteredTags as [string, ...string[]]
                        )
                      }}
                    />
                  )}
                />
              </div>
              <ButtonLoading
                text="Add"
                loadingText="Adding..."
                isLoading={isSubmitting}
                buttonIcon={<Plus className="-mr-2 ml-1 w-5" />}
                className="bg-green-600"
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SkillsDialog
