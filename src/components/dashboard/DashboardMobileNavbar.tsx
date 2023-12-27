"use client"

import { authorizedLinks } from "@/data/NavbarLinks"
import { LogOut, Menu, Settings } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import JobAI from "../branding/JobAI"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { usePathname } from "next/navigation"

type Props = {}

const DashboardMobileNavbar = (props: Props) => {
  const { data: session } = useSession()
  const path = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  return path != "/resume/form" ? (
    <div className="block  md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Link href={"/"}>
          <JobAI size="lg" className="absolute left-8 top-8" />
        </Link>
        <SheetTrigger>
          <Menu className="absolute right-8 top-8 cursor-pointer" size={40} />
        </SheetTrigger>
        <SheetContent className="max-w-[300px]">
          <SheetHeader>
            <Link href={"/"}>
              <SheetTitle className="text-2xl font-semibold">Job AI</SheetTitle>
            </Link>
          </SheetHeader>

          <div className="flex h-[calc(100%-50px)] flex-col justify-between">
            <ul className="mt-10 flex flex-col gap-12">
              {authorizedLinks.map((path, i) => (
                <Link href={path.path} key={i} onClick={() => setIsOpen(false)}>
                  <li className="flex items-center text-xl font-normal">
                    {path.title}
                    <span className="ml-2">{path.icon}</span>
                  </li>
                </Link>
              ))}
            </ul>
            <div>
              {!session ? (
                <div className="flex w-full gap-4">
                  <Link href={"/signin"} className="flex-1">
                    <Button
                      variant={"outline"}
                      title="Already have an account?"
                      className="w-full border-black text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button
                      title="Sign up now!"
                      className="bg-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <p>{session.user.firstname + " " + session.user.lastname}</p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/profile/${session?.user.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant={"secondary"}>
                        <Settings className=" w-6" />
                      </Button>
                    </Link>
                    <Button onClick={() => signOut()} variant={"destructive"}>
                      <LogOut className="w-5 px-0" />{" "}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ) : null
}

export default DashboardMobileNavbar
