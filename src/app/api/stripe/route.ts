import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"
import { stripe } from "@/utils/stripe"
import { NextResponse } from "next/server"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { planId } = body

    const billingUrl = absoluteUrl("/pricing")
    const userPlan = await getUserSubscriptionPlan()
    const isCurrentPlan = userPlan.stripePriceId === planId

    if (
      userPlan.isSubscribed &&
      userPlan.stripeSubscriptionId &&
      isCurrentPlan
    ) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userPlan.stripeCustomerId || "",
        return_url: billingUrl,
      })

      return NextResponse.json({ url: stripeSession.url }, { status: 200 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card", "paypal"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],

      metadata: {
        userId: userPlan.user.id,
      },
    })

    return NextResponse.json({ url: stripeSession.url }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
