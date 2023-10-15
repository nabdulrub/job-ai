"use client"

import React from "react"
import Heading from "./Heading"
import Preview from "./Preview"
import Pricing from "./Pricing"
import { Session } from "next-auth"
import { UserSession } from "@/lib/type"

type Props = {
  session?: UserSession
}

const Landing = ({ session }: Props) => {
  return (
    <div className="mt-20 grid place-items-center gap-16 p-4 md:gap-24 md:p-8">
      <Heading />
      <Preview />
      <Pricing session={session} />
    </div>
  )
}

export default Landing
