"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import ResumeForm from "./ResumeForm"

type Props = {}

const ResumeHolder = (props: Props) => {
  const [formStep, setFormStep] = useState(0)

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin")
    },
  })

  return (
    <div className="h-[calc(100vh-50px)] w-full md:h-full">
      <ResumeForm
        formStep={formStep}
        setFormStep={setFormStep}
        session={session?.user}
      />
    </div>
  )
}

export default ResumeHolder
