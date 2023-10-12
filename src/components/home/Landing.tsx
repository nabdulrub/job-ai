"use client"

import React from "react"
import Heading from "./Heading"
import Preview from "./Preview"
import Pricing from "./Pricing"

type Props = {}

const Landing = (props: Props) => {
  return (
    <div className="mt-20 grid place-items-center gap-16 p-4 md:gap-24 md:p-8">
      <Heading />
      <Preview />
      <Pricing />
    </div>
  )
}

export default Landing
