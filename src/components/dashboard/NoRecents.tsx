import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import NewResumeDialog from "../generated/NewResumeDialog"

type Props = {}

const NoRecents = (props: Props) => {
  return (
    <div className="grid md:h-full md:place-items-center">
      <Card className=",md:p-20 border-gray-100 bg-gray-100 shadow-none md:justify-self-center">
        <CardHeader>
          <CardTitle>Oh Oh, We Couldn&apos;t Find Any Resumes</CardTitle>
          <CardDescription>
            We weren&apos;t able to find any resumes in our records
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-end md:justify-center">
          <NewResumeDialog cta="Create Resume" className="" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default NoRecents
