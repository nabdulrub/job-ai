import SignInForm from "@/components/auth/SignInForm"
import SignInPage from "@/components/auth/SignInPage"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const SignIn = async (props: Props) => {
  const session = await getAuthSession()

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <>
      <SignInPage />
    </>
  )
}

export default SignIn
