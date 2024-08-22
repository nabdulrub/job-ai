"use client"

import { SignInSchema, TSignInSchema } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent } from "../ui/card"

import ButtonLoading from "../ButtonLoading"
import Field from "../Field"
import { Form } from "../ui/form"

type Props = {}

const SignInForm = (props: Props) => {
  const { refresh, replace } = useRouter()

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (response?.error) {
        setError("password", { message: "Invalid Password or Email" })
      } else {
        replace("/dashboard")
        refresh()
      }
    } catch (err) {}
  }

  return (
    <Card className="mx-auto max-w-lg border-none shadow-none">
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Field control={control} name="email" label="Email" type="email" />

            <Field
              control={control}
              name="password"
              label="Password"
              password
            />

            <ButtonLoading
              type="submit"
              text="Sign In"
              loadingText="Signing in..."
              isLoading={isSubmitting}
              className="bg-indigo-500 py-6 text-white hover:bg-indigo-800"
              variant="secondary"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
