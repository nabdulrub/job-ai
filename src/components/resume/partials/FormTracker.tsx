import React from "react"
import JobAI from "../../branding/JobAI"

type Props = {}

const FormTracker = (props: Props) => {
  return (
    <div className="relative grid h-screen w-full place-content-center border-r-2 border-gray-200 bg-gray-100 p-8">
      <JobAI size="md" className="absolute left-10 top-10" />
      <div>
        <h2 className=" mb-1 text-4xl font-bold tracking-wide">
          Welcome to Job AI
        </h2>
        <p className="text-lg">
          We&apos;re excited to help you craft tailored resumes for your dream
          job.
        </p>
        <p className="border-gray-150 mt-4 w-fit rounded-xl border-2 px-3 py-1 font-bold">
          Let&apos;s get started 🚀
        </p>
      </div>
    </div>
  )
}

export default FormTracker
