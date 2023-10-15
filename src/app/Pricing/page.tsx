import PricingPage from "@/components/pricing/PricingPage"
import { getAuthSession } from "@/lib/nextauth"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

const page = async (props: Props) => {
  const session = await getUserSubscriptionPlan()

  if (session?.isSubscribed) redirect("/dashboard")

  return (
    <div className="p-4 md:p-8">
      <PricingPage />
    </div>
  )
}

export default page
