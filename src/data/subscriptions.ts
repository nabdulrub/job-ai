export type SubscriptionPlan = {
  id: string
  name: string
  description: string
  stripePriceId: string
  price: number
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Student Starter",
    description:
      "Generate Tailored Resumes and Cover Letters, daily limit of 15 of each a day.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PLAN_ID as string,
    price: 15,
  },
  {
    id: "premium",
    name: "Career Accelerator",
    description: "Generate Unlimited Tailored Resumes and Cover Letters.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID as string,
    price: 35,
  },
]
