import { storeSubscriptionPlans } from "@/data/subscriptions"
import { prisma } from "../../prisma"
import { connectToDatabase } from "./connectdb"
import { getAuthSession } from "./nextauth"
import { stripe } from "@/utils/stripe"

export async function getUserSubscriptionPlan() {
  const session = await getAuthSession()

  if (!session?.user || !session) return null

  await connectToDatabase()

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  })

  if (!user) return null

  const isSubscribed =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (plan) => plan.stripePriceId === user.stripePriceId
      )
    : null

  let isCanceled = false
  if (isSubscribed && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )

    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
    ...session,
  }
}
