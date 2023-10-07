"use client"

import { SignInSchema, TSignInSchema } from "@/lib/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

import Field from "../Field"
import { Form } from "../ui/form"
import ButtonLoading from "../ButtonLoading"

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

      if (response?.ok) {
        replace("/resume/form")
      }

      if (!response?.ok) {
        setError("password", { message: "Invalid Password or Email" })
        setError("email", { message: "Invalid Password or Email" })
      } else {
        replace("/")
        refresh()
      }
    } catch (err) {}
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
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
            <CardDescription>
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="cursor-pointer border-b-[1px] border-black transition-all duration-150 hover:text-black"
              >
                Register
              </Link>
            </CardDescription>

            <ButtonLoading
              type="submit"
              text="Login"
              loadingText="Logging in..."
              isLoading={isSubmitting}
              className="hover:bg-black hover:text-white"
              variant="secondary"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
