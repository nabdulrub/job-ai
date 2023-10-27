"use client"

import React from "react"
import Heading from "./Heading"
import Preview from "./Preview"
import Pricing from "./Pricing"
import { Session } from "next-auth"
import { UserSession } from "@/types/type"
import Features from "./Features"

type Props = {
  session?: UserSession
}

const Landing = ({ session }: Props) => {
  return (
    <div className="mt-10 grid place-items-center gap-16 p-4 md:gap-24 md:p-8">
      <Heading />
      <Preview />
      <Features />
      <Pricing session={session} />
    </div>
  )
}

export default Landing
