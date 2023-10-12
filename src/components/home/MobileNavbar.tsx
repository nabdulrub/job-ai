"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Menu, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { getAuthSession } from "@/lib/nextauth"
import SignInButton from "../auth/SignInButton"
import { NavbarProps } from "./DesktopNavbar"
import { unauthorizedLinks } from "@/data/NavbarLinks"
import JobAI from "../JobAI"
import { usePathname } from "next/navigation"

const MobileNavbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const path = usePathname()

  const loginPath = path === "/signin"
  const registerPath = path === "/register"

  return !loginPath && !registerPath ? (
    <div className="block md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Link href={"/"}>
          <JobAI size="lg" className="absolute left-8 top-8" />
        </Link>
        <SheetTrigger>
          <Menu className="absolute right-8 top-8 cursor-pointer" size={40} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Link href={"/"}>
              <SheetTitle className="text-2xl font-semibold">Job AI</SheetTitle>
            </Link>
          </SheetHeader>

          <div className="flex h-[calc(100%-50px)] flex-col justify-between">
            <ul className="mt-10 flex flex-col gap-12">
              {unauthorizedLinks.map((path, i) => (
                <Link href={path.path} key={i} onClick={() => setIsOpen(false)}>
                  <li className="flex items-center text-xl font-normal">
                    {path.title}
                    <ChevronRight />
                  </li>
                </Link>
              ))}
            </ul>
            <div>
              {!session ? (
                <div className="flex w-full gap-4">
                  <Link href={"/signin?auth=signin"} className="flex-1">
                    <Button
                      variant={"outline"}
                      title="Already have an account?"
                      className="w-full border-black text-black"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/signin?auth=register"}>
                    <Button title="Sign up now!" className="bg-black">
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <SignInButton />
                  <Link href={"/dashboard"} className="w-full">
                    <Button>Dashboard</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ) : null
}

export default MobileNavbar
