"use client"

import ButtonLoading from "@/components/ButtonLoading"
import Field from "@/components/Field"
import { Form } from "@/components/ui/form"
import useFormStepStore from "@/store/useFormStepStore"
import { handleToast } from "@/lib/toast"
import { BasicInfoSchema, TBasicInfoSchema, UserSession } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

type Props = {}

const BasicInfo = (props: Props) => {
  const { data: session } = useSession()
  const { nextStep, status, activeStep, setComplete } = useFormStepStore()
  const isStepComplete = status[activeStep].completed

  const form = useForm<TBasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      firstname: session?.user.firstname ? session.user.firstname : "",
      lastname: session?.user.lastname ? session.user.lastname : "",
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
      if (!isStepComplete) {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(data),
        })

        if (response?.ok) {
          handleToast({
            title: "Step one done!",
            description: "Lets keep going, just a few more to go!",
            actionText: "Next Step",
          })
          reset()
          setComplete()
          nextStep()
        }

        if (!response?.ok) {
          handleToast({
            title: "Failed to submit info",
            description: "Please try again!",
            actionText: "Dismiss",
          })
        }
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
              type={isStepComplete ? "button" : "submit"}
              loadingText="Moving on..."
              isLoading={isSubmitting}
              onClick={() => (isStepComplete ? nextStep() : null)}
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
