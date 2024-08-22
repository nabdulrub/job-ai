"use client"

import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { UserSession } from "@/types/type"
import { Button } from "../ui/button"
import Link from "next/link"
import { ChevronDown, Loader2 } from "lucide-react"
import { error } from "console"

type Props = {
  user?: UserSession
}

const UserProfileNav = ({ user }: Props) => {
  const [open, setOpen] = useState(false)

  const firstname = user?.firstname && user.firstname
  const lastname = user?.lastname && user.lastname
  const name = firstname + " " + lastname

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="mx-auto w-full max-w-[200px] bg-teal-100 bg-opacity-75 outline-none">
        <Button
          variant={"outline"}
          className={`w-full font-bold ${open && "bg-gray-200"}`}
        >
          <p>
            {firstname && lastname ? (
              name
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </p>
          <ChevronDown size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-2 w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/dashboard/profile/${user?.id}`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={"/dashboard/billing"}>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="w-full cursor-pointer bg-red-500 text-white"
          onClick={() => signOut().catch((e) => console.error(e))}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfileNav
