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
import { UserSession } from "@/lib/type"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { error } from "console"

type Props = {
  user?: UserSession
}

const UserProfileNav = ({ user }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="mx-auto w-full max-w-[200px] bg-teal-100 bg-opacity-75 outline-none">
        <Button
          variant={"outline"}
          className={`w-full font-bold ${open && "bg-gray-200"}`}
        >
          <p>{user?.firstname + " " + user?.lastname}</p>
          <ChevronDown size={20} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mb-2 w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile/${user?.id}`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Billing</DropdownMenuItem>
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
