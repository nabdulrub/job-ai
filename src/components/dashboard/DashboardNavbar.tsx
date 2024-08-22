"use client"

import { authorizedLinks } from "@/data/NavbarLinks"
import { UserSession } from "@/types/type"
import { Settings, Settings2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import JobAI from "../branding/JobAI"
import UserProfileNav from "../auth/UserProfileNav"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"

type Props = {}

const DashboardNavbar = (props: Props) => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const activeLinkStyles = "relative"

  const isAuthorizedPath = pathname.includes("/dashboard")

  return isAuthorizedPath ? (
    <div className="relative hidden h-full w-full max-w-[250px] border-r-2 border-gray-100 bg-gray-50 bg-opacity-40 py-10 shadow-lg shadow-gray-50 md:block md:h-screen">
      <div className="flex h-full flex-col items-center justify-between">
        <div className="grid w-full max-w-[170px] gap-12">
          <Link href={"/"}>
            <JobAI size="md" className="font-bold " />
          </Link>
          <ul className="-ml-4 flex flex-col gap-4">
            {authorizedLinks.map((path, i) => {
              const isActive = pathname === path.path
              return (
                <li key={i}>
                  <Button
                    variant={"ghost"}
                    className={`w-full justify-start ${
                      isActive && "bg-slate-100"
                    }`}
                  >
                    <Link
                      href={path.path}
                      className={`flex items-center gap-6 font-extrabold leading-[3rem] transition-all duration-200   ${
                        isActive
                          ? activeLinkStyles
                          : "border-transparent text-gray-400"
                      }`}
                    >
                      {path.icon} {path.title}
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="-mt-3 flex w-full items-center gap-4">
          <UserProfileNav user={session?.user} />
        </div>
      </div>
    </div>
  ) : null
}

export default DashboardNavbar
