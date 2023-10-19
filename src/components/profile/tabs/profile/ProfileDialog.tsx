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
} from "../../../ui/dialog"
import { Button } from "../../../ui/button"
import Field from "../../../Field"
import { Form } from "../../../ui/form"
import DeleteButton from "../../DeleteButton"
import ButtonLoading from "../../../ButtonLoading"
import { Save } from "lucide-react"
import { ToastAction } from "../../../ui/toast"
import { toast } from "../../../ui/use-toast"
import { BasicInfoSchema, TBasicInfoSchema } from "@/types/type"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

type Props = {
  user?: Omit<User, "isNewUser" | "email" | "hashedPassword">
}

const ProfileDialog = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const form = useForm<TBasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      firstname: user?.firstname ? user.firstname : "",
      lastname: user?.lastname ? user.lastname : "",
      phone: user?.phone ? user.phone : "",
      location: user?.location ? user.location : "",
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: TBasicInfoSchema) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({
          title: "Info Updated!",
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
        <Button>Edit Info</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-30px)] max-w-[900px] md:w-full">
        <DialogHeader>
          <DialogTitle>Edit Your Information</DialogTitle>
          <DialogDescription>
            Fill out the form below to edit your info.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="job-experience-scroll relative flex max-h-[575px]  flex-col gap-4 overflow-auto scroll-smooth px-1 pb-6 md:h-auto md:flex-row">
              <div className="grid min-w-full flex-1  grid-cols-1 gap-4">
                <div className="flex flex-col gap-2 md:flex-row">
                  <Field
                    control={control}
                    label="First Name"
                    name={`firstname`}
                    placeholder="First Name"
                    className="bg-white"
                  />
                  <Field
                    control={control}
                    label="Last Name"
                    name={`lastname`}
                    placeholder="Last Name"
                    className="bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <Field
                    control={control}
                    label="Phone Number"
                    name={`phone`}
                    placeholder="Phone Number"
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
              </div>
            </div>
            <DialogFooter className="mt-6 flex w-full md:mt-0">
              <div className="flex w-full justify-between">
                <ButtonLoading
                  text="Save Changes"
                  loadingText="Saving..."
                  isLoading={isSubmitting}
                  buttonIcon={<Save className="ml-2 w-5" />}
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

export default ProfileDialog
