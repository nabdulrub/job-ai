import Landing from "@/components/home/Landing"
import { getAuthSession } from "@/lib/nextauth"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getAuthSession()
  const subscription = await getUserSubscriptionPlan()

  return (
    <>
      <Landing session={session?.user} />
    </>
  )
}
