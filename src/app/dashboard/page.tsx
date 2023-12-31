import Dashboard from "@/components/dashboard/Dashboard"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession()

  if (!session?.user) return redirect("/")

  return (
    <div className="h-full p-4 md:p-8">
      <Dashboard session={session.user} />
    </div>
  )
}

export default DashboardPage
