"use client"

import { RegisterSchema, TRegisterSchema } from "@/types/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ButtonLoading from "../ButtonLoading"
import Field from "../Field"
import { Card, CardContent } from "../ui/card"
import { Form } from "../ui/form"

type Props = {}

const RegisterForm = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
  })

  const {
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = form

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      setLoading(true)
      if (data.password !== data.verifyPassword) {
        return setError("verifyPassword", {
          message: "Passwords do not match",
        })
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      })
      const result = await response.json()

      console.log(result)

      if (response.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/resume/form",
          redirect: true,
        })
      }

      reset()
      router.push("/signin")

      if (result.error.meta.target === "User_email_key") {
        return setError("email", {
          message: "Email already in use! Login Instead",
        })
      }
    } catch (error) {
      console.log("Error: ", error)
    } finally {
      setLoading(false)
    }
  }

  watch()
  return (
    <>
      <Card className="mx-auto max-w-lg border-none shadow-none">
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <Field
                  control={control}
                  name="firstname"
                  label="First Name"
                  type="text"
                />
                <Field
                  control={control}
                  name="lastname"
                  label="Last Name"
                  type="text"
                />
              </div>
              <Field
                control={control}
                name="email"
                label="Email"
                type="email"
              />
              <Field
                control={control}
                name="password"
                label="Password"
                password
              />

              <Field
                control={control}
                name="verifyPassword"
                label="Re-enter Password"
                password
              />

              <ButtonLoading
                type="submit"
                text="Register"
                loadingText={
                  isSubmitSuccessful ? "Logging in..." : "Registering..."
                }
                isLoading={loading}
                className="bg-teal-700 py-6 text-white hover:bg-teal-900"
                variant="secondary"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default RegisterForm
