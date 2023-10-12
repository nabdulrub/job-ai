"use client"

import { RegisterSchema, TRegisterSchema } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Field from "../Field"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Form } from "../ui/form"
import ButtonLoading from "../ButtonLoading"
import { signIn } from "next-auth/react"

type Props = {}

const RegisterForm = (props: Props) => {
  const [viewPassword, setViewPassword] = useState(false)
  const [viewVerifyPassword, setViewVerifyPassword] = useState(false)

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
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      if (data.password !== data.verifyPassword) {
        return setError("verifyPassword", {
          message: "Passwords do not match",
        })
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/resume/form",
          redirect: true,
        })
      }

      const result = await response.json()

      reset()
      router.push("/signin")

      if (result.error.meta.target === "User_email_key") {
        return setError("email", {
          message: "Email already in use! Login Instead",
        })
      }
    } catch (error) {
      console.log("Error: ", error)
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
                loadingText="Registering..."
                isLoading={isSubmitting}
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
