import {
  Award,
  Briefcase,
  ClipboardList,
  ListChecks,
  Loader2,
} from "lucide-react"
import React, { Suspense } from "react"
import Feature from "./Feature"
import FeatureImg from "../../../public/Features.svg"
import Image from "next/image"

type Props = {}

const Features = (props: Props) => {
  return (
    <div className="flex w-full max-w-[1400px] flex-col items-center justify-center gap-24">
      <div className="flex flex-col gap-2 text-center">
        <p className="opacity-50">Features</p>
        <h2 className="text-3xl font-bold">AI-Enhanced Resume Tailoring</h2>
        <p className="max-w-[36rem]">
          Elevate your resume with AI-Enhanced Resume Tailoring, optimizing
          every application to match your unique skills and the job&apos;s
          requirements seamlessly.
        </p>
      </div>
      <div className="gap-50 flex w-full flex-col items-center justify-center gap-12 md:ml-[75px] lg:flex-row">
        <div className="grid flex-1 gap-8 md:gap-24">
          <Feature
            icon={<Briefcase />}
            title="Tailored Job Experience"
            description="Tailoring ensures your resume shines by optimizing your job-related details to match each unique job description, increasing your chances of success."
          />
          <Feature
            icon={<ClipboardList />}
            title="Tailored Project Experience"
            description="Customize your project history to precisely match each job, elevating your resume's impact."
          />
        </div>
        <div className="hidden w-full max-w-[500px] shadow-2xl lg:block">
          <Image
            src={FeatureImg}
            alt="feature-img"
            className="w-full"
            priority
          />
        </div>
        <div className="grid flex-1 gap-8 md:gap-24 lg:ml-[75px]">
          <Feature
            icon={<ListChecks />}
            title="Skills Optimization"
            description="Fine-tune your skillset to match job requirements, ensuring your resume highlights your strengths effectively"
          />
          <Feature
            icon={<Award />}
            title="Tailored Education Details"
            description="Customize your educational background to align seamlessly with each job, enhancing your resume's relevance"
          />
        </div>
        <div className="block w-full max-w-[500px] shadow-2xl lg:hidden">
          <Image
            src={FeatureImg}
            alt="feature-img"
            className="w-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default Features
