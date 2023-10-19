"use client"

import { ChangePasswordSchema, TChangePasswordSchema } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import ButtonLoading from "../ButtonLoading"
import Field from "../Field"
import { Form } from "../ui/form"
import { ToastAction } from "../ui/toast"
import { toast } from "../ui/use-toast"

type Props = {}

const ChangePassword = (props: Props) => {
  const router = useRouter()

  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: "",
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (data: TChangePasswordSchema) => {
    try {
      if (data.newPassword !== data.verifyNewPassword) {
        return setError("verifyNewPassword", {
          message: "Passwords do not match",
        })
      }

      const response = await fetch("/api/user/changepassword", {
        method: "PUT",
        body: JSON.stringify(data),
      })

      const result = await response.json()

      console.log(response)

      if (response.ok) {
        toast({
          title: "Password Changed!",
          description: "Your password has been successfully changed!",
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
      }

      if (!response.ok) {
        toast({
          title: "Failed to Change Password",
          description: "Failed to change your password, please try again!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-700 text-white"
            >
              Try Again
            </ToastAction>
          ),
          duration: 2000,
        })
      }

      if (result?.message === "Same Password") {
        return setError("newPassword", {
          message: "You're currently using this password",
        })
      }

      if (result.message === "Passwords Don't Match") {
        return setError("oldPassword", { message: "Wrong Password" })
      }

      reset()
      router.refresh()
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 md:flex-row">
          <Field
            control={control}
            name="oldPassword"
            label="Current Password"
            password
          />
          <Field
            control={control}
            name="newPassword"
            label="New Password"
            password
          />
          <Field
            control={control}
            name="verifyNewPassword"
            label="Verify New Password"
            password
          />
        </div>
        <div className="self-end">
          <ButtonLoading
            text="Change Password"
            loadingText="Changing..."
            isLoading={isSubmitting}
            variant={"secondary"}
          />
        </div>
      </form>
    </Form>
  )
}

export default ChangePassword
