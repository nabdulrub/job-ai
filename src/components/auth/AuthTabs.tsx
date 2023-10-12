"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import SignInForm from "./SignInForm"
import RegisterForm from "./RegisterForm"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type Props = {}

const AuthTabs = (props: Props) => {
  const searchParams = useSearchParams()

  const authType = searchParams.get("auth")

  return (
    <Tabs
      defaultValue={authType || "signin"}
      className="flex flex-col items-center justify-center"
    >
      <TabsList className="mb-4 flex w-fit items-center rounded-3xl px-2 py-7">
        <Link href="?auth=signin">
          <TabsTrigger value="signin" className="rounded-2xl px-14 py-3 ">
            Sign In
          </TabsTrigger>
        </Link>
        <Link href="?auth=register">
          <TabsTrigger value="register" className="rounded-2xl px-14 py-3 ">
            Register
          </TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="signin" className="w-full">
        <SignInForm />
      </TabsContent>
      <TabsContent value="register" className="w-full">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
