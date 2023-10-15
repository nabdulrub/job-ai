"use client"

import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import SignOutButton from "../auth/SignInButton"
import { UserSession } from "@/lib/type"
import { unauthorizedLinks } from "@/data/NavbarLinks"
import JobAI from "../JobAI"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export type NavbarProps = {
  session?: UserSession
}

const DesktopNavbar = ({ session }: NavbarProps) => {
  const path = usePathname()

  const home = path === "/"
  const pricing = path === "/pricing"

  const authorizedPaths = home || pricing

  return authorizedPaths ? (
    <nav className="relative hidden justify-between p-4 px-12 md:flex md:px-24 md:py-8">
      <div className="flex items-center justify-center gap-8">
        <Link href={"/"}>
          <JobAI size="md" />
        </Link>
        <ul className="flex gap-4">
          {unauthorizedLinks.map((path, i) => (
            <li key={i} className="hover:text-gray-500">
              <Link href={path.path}>{path.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4">
        {!session && (
          <>
            <Link href={"/signin?auth=signin"}>
              <Button variant={"outline"} title="Already have an account?">
                Login
              </Button>
            </Link>
            <Link href={"/signin?auth=register"}>
              <Button title="Sign up now!">Sign up</Button>
            </Link>
          </>
        )}

        {session && (
          <>
            <div className="flex gap-4">
              {!session.isNewUser && (
                <Link href={"/dashboard"}>
                  <Button
                    variant={"outline"}
                    className="rounded-full bg-gray-700 text-white shadow-none"
                  >
                    Dashboard <ChevronRight size={20} className="-mr-2 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  ) : null
}

export default DesktopNavbar
