import { connectToDatabase } from "@/lib/connectdb"
import { stripe } from "@/utils/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "../../../../../prisma"

export const POST = async (req: Request, res: Response) => {
  const body = await req.text()
  const sig = headers().get("stripe-signature") as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

    console.log(event)
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : `Unknown Error`
      }`,
      { status: 400 }
    )
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (!session?.metadata?.userId) {
    return new Response(null, { status: 200 })
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )
    await connectToDatabase()

    await prisma.user.update({
      where: {
        id: session?.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await connectToDatabase()

    await prisma.user.update({
      where: {
        id: session?.metadata.userId,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return new Response(null, { status: 200 })
}
