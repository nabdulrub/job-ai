"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { NewResumeSchema, TNewResume } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import Field from "../Field"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { Textarea } from "../ui/textarea"
import ButtonLoading from "../ButtonLoading"
import { toast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import usePendingRequestStore from "@/store/usePendingRequestStore"

type NewResumeProps = {
  cta?: string
  className?: string
}

const NewResumeDialog = ({ cta, className }: NewResumeProps) => {
  const { isPending, setPending } = usePendingRequestStore()

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<any>({})
  const [btnClr, setBtnClr] = useState("bg-teal-600 hover:bg-teal-500")

  const form = useForm<TNewResume>({
    resolver: zodResolver(NewResumeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form

  console.log(isPending)

  const onSubmit = async (data: TNewResume) => {
    try {
      setPending(true)
      const response = await fetch("/api/generate/resume", {
        method: "POST",
        body: JSON.stringify(data),
      })
      const result = await response.json()
      console.log(result.data)

      if (result?.message === "Not Subscribed") {
        return (
          toast({
            title: "You are not subscribed!",
            action: (
              <Link href={"/pricing"}>
                <ToastAction
                  altText="Back to form"
                  className="bg-teal-500 text-white hover:text-black"
                >
                  Subscribe
                </ToastAction>
              </Link>
            ),
            duration: 5000,
          }),
          setIsOpen(false)
        )
      }

      if (response.ok) {
        toast({
          title: "Resume Generated!",
          action: <ToastAction altText="Back to form">Dismiss</ToastAction>,
          duration: 2000,
        })
        router.refresh()
        setData(JSON.parse(result.data))
        setIsOpen(false)
        reset()
      }

      if (!response.ok) {
        toast({
          title: "Failed to Generate!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-800 text-white hover:text-black"
            >
              Try Again
            </ToastAction>
          ),
          duration: 2000,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(className, "")}>
        <Button
          variant={"secondary"}
          disabled={isPending}
          className={`text-white transition-all duration-300 ${btnClr}`}
        >
          {isPending ? "Creating Resume..." : cta}
        </Button>
      </DialogTrigger>
      .
      <DialogContent className="w-[calc(100%-2rem)] max-w-[900px]">
        <DialogHeader className="-mb-2">
          <DialogTitle>Tailor New Resume</DialogTitle>
          <DialogDescription>
            Provide the title and job description of the job to generate a new
            resume!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Field
              control={control}
              label="Job Title"
              name={`title`}
              placeholder="ex. Software Engineer"
            />
            <Field
              label="Description"
              name={`description`}
              control={control}
              render={(field) => (
                <Textarea
                  {...field}
                  value={data?.newResume?.workExperience[0]?.employer}
                  rows={7}
                  placeholder="Provide the job description in the job post..."
                />
              )}
            />
            <ButtonLoading
              text="Generate"
              loadingText="Tailoring..."
              isLoading={isSubmitting}
              variant="secondary"
              className="mt-4 self-end"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewResumeDialog
