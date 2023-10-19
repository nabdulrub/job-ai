import React from "react"
import NewFeature from "./NewFeature"
import { Button } from "../ui/button"
import Image from "next/image"
import pattern from "../../../public/pattern.svg"

type Props = {}

const Heading = (props: Props) => {
  return (
    <div className="bg-red grid w-full place-items-center justify-center gap-4">
      <Image
        src={pattern}
        alt="pattern"
        width={1500}
        className="absolute top-0 -z-10"
      />
      <NewFeature /> {/*New feature announcer*/}
      <div className="grid gap-4 text-center">
        <h1 className="max-w-4xl text-3xl font-bold md:text-6xl">
          Innovative Job Seeking with AI-Powered Resume Magic
        </h1>
        <p className="mx-auto max-w-[38rem]">
          Supercharge Your Job Hunt! Our AI-powered tool tailors cover letters
          and resumes for any job, helping both recent college graduates and job
          seekers land their dream positions with ease.
        </p>
      </div>
      <div className="mt-4 flex w-[200px] flex-col gap-4 md:w-auto md:flex-row">
        <Button variant={"secondary"}>Learn More</Button>
        <Button className="bg-black">Get Started</Button>
      </div>
    </div>
  )
}

export default Heading
