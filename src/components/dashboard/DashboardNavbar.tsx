"use client"

import { authorizedLinks } from "@/data/NavbarLinks"
import { UserSession } from "@/lib/type"
import { Settings2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import JobAI from "../JobAI"
import UserProfileNav from "../UserProfileNav"
import { Button } from "../ui/button"

type Props = {
  session?: UserSession
}

const DashboardNavbar = ({ session }: Props) => {
  const currentPath = usePathname()

  const activeLinkStyles = "border-b-2 border-black text-black"

  return (
    <div className="mx-10 -ml-8 hidden w-full border-b-[1px] border-gray-200 px-20 pt-4 shadow-lg shadow-gray-50 lg:block">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <JobAI size="md" className="-mt-3 ml-10" />
        </Link>
        <ul className="flex gap-12">
          {authorizedLinks.map((path, i) => {
            const isActive = currentPath === path.path
            return (
              <li key={i}>
                <Link
                  href={"/dashboard"}
                  className={`flex items-center gap-2 border-b-2 font-semibold leading-[3rem] transition-all duration-200 hover:border-black hover:text-black   ${
                    isActive
                      ? activeLinkStyles
                      : "border-transparent text-gray-400"
                  }`}
                >
                  {path.icon} {path.title}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="-mt-3 flex items-center gap-4">
          <Link href={`/profile/${session?.id}`}>
            <Button className="bg-black">My Resume</Button>
          </Link>
          <UserProfileNav user={session} />
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar
