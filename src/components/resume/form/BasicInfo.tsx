"use client"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import { BasicInfoSchema, TBasicInfoSchema, UserSession } from "@/lib/type"
import { handleNext } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"

type Props = {
  session?: UserSession
  formStep: number
  setFormStep: (forStep: number) => void
}

const BasicInfo = ({ session, formStep, setFormStep }: Props) => {
  const form = useForm<TBasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      firstname: session?.firstname ? session.firstname : "",
      lastname: session?.lastname ? session.lastname : "",
      location: "",
      phone: "",
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: TBasicInfoSchema) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (response?.ok) {
        toast({
          title: "Step one done!",

          description: "Lets keep going, just a few more to go!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Next Step
            </ToastAction>
          ),
        })
        handleNext(setFormStep)
        reset()
      }

      if (!response?.ok) {
        toast({
          title: "Failed to submit info",
          variant: "destructive",
          description: "Please try again!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-gray-100 text-black "
            >
              Dismiss
            </ToastAction>
          ),
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  watch()
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-4 text-xl font-thin text-gray-500">
            Your Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            <Field
              control={control}
              name="firstname"
              label="First Name"
              inputMode="text"
              placeholder="ex. John"
              description="This is your first name"
            />
            <Field
              control={control}
              name="lastname"
              label="Last Name"
              inputMode="text"
              placeholder="ex. Doe"
              description="This is your surname name"
            />
            <Field
              control={control}
              name="location"
              label="Location"
              inputMode="text"
              placeholder="ex. New York, NY"
              description="This the location employers will see"
            />
            <Field
              control={control}
              name="phone"
              label="Mobile"
              inputMode="tel"
              placeholder="ex. 1234567890"
              description="This your personal phone number"
            />
          </div>
          <div className="mt-14 flex justify-between">
            <ButtonLoading
              text="Next"
              loadingText="Moving on..."
              isLoading={isSubmitting}
              variant="outline"
              className="border-gray-300 bg-gray-200"
              buttonIcon={<ChevronRight className="-mr-2 w-5" />}
            />
          </div>
        </form>
      </Form>
    </>
  )
}

export default BasicInfo
