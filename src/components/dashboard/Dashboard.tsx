"use client"

import { UserSession } from "@/lib/type"
import ActionCard from "./ActionCard"
import UserWelcome from "./UserWelcome"
import Actions from "./Actions"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Recent from "./Recent"

type Props = {}

const Dashboard = (props: Props) => {
  const { data: userSession } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/")
    },
  })

  const session = userSession?.user

  if (session?.isNewUser === true) redirect("/resume/form")

  return (
    <div className="flex flex-col items-start justify-center gap-12 md:px-10">
      <UserWelcome name={[session?.firstname, session?.lastname]} />
      <div className="w-full self-start">
        <Actions />
      </div>
      <div className="w-full self-start">
        <Recent />
      </div>
    </div>
  )
}

export default Dashboard
