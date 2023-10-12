"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Plan from "./Plan"

type Props = {
  isPricingPage?: boolean
}

const Pricing = ({ isPricingPage }: Props) => {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-2 text-center">
        <p className="opacity-50">Plans Pricing</p>
        <h2 className="text-3xl font-bold">Invest in Your Future</h2>
        <p className="max-w-[36rem]">
          Select Your Plan for Success! Our plans offer tailored cover letters
          and resumes for any job, ensuring you&apos;re well-prepared for your
          career journey.
        </p>
      </div>
      <Tabs
        defaultValue="monthly"
        className="flex w-full flex-col items-center gap-6"
      >
        <TabsList className="bg-gray-200 px-1 py-6">
          <TabsTrigger className="p-2" value="monthly">
            Monthly Billing
          </TabsTrigger>
          <TabsTrigger className="p-2" value="annual">
            Annual Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="monthly"
          className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <Plan
            isPlan={true}
            planPage={isPricingPage}
            title="Student Starter"
            description="Our recommended plan for students."
            price={15}
            duration="MONTHLY"
          />
          <Plan
            isPlan={false}
            planPage={isPricingPage}
            top
            topTitle="Unlimited"
            title="Career Accelerator"
            description="Our most popular plan for job seekers."
            price={35}
            duration="MONTHLY"
          />
        </TabsContent>
        <TabsContent
          value="annual"
          className="-mt-6 grid w-full grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <Plan
            isPlan={true}
            planPage={isPricingPage}
            title="Student Starter"
            description="Our recommended plan for students."
            price={80}
            duration="ANNUALLY"
          />
          <Plan
            isPlan={false}
            planPage={isPricingPage}
            top
            topTitle="Unlimited"
            title="Career Accelerator"
            description="Our most popular plan for job seekers."
            price={110}
            duration="ANNUALLY"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Pricing
