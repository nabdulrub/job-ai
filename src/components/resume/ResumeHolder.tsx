"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import ResumeForm from "./ResumeForm"
import TextFadeIn from "./TextFadeIn"

type Props = {}

const ResumeHolder = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState(0)

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin")
    },
  })

  return (
    <div className="h-[calc(100vh-50px)] w-full md:h-full">
      {!showForm && (
        <div className="mt-60">
          <TextFadeIn
            index={currentIndex}
            setIndex={setCurrentIndex}
            setForm={setShowForm}
          />
        </div>
      )}

      {showForm && (
        <ResumeForm
          formStep={formStep}
          setFormStep={setFormStep}
          session={session?.user}
        />
      )}
    </div>
  )
}

export default ResumeHolder
