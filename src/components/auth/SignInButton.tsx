"use client"

import { Button } from "../ui/button"
import { signIn, signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

type Props = {}

const SignOutButton = (props: Props) => {
  return (
    <Button
      onClick={() => signOut()}
      variant={"outline"}
      title="Already have an account?"
    >
      Sign Out <LogOut className="ml-2 h-4 w-4" />
    </Button>
  )
}

export default SignOutButton
