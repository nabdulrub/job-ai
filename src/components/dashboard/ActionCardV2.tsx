import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"

type Props = {}

const ActionCardV2 = (props: Props) => {
  return (
    <Card className="min-w-[250px] flex-1 border-none bg-teal-100 shadow-none transition-all duration-300 hover:bg-opacity-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg">New Resume</CardTitle>
          <CardDescription>Generate tailored resume</CardDescription>
        </div>
        <div>
          <Button
            variant={"secondary"}
            className="hover:bg-teak-500 bg-teal-600 text-white"
          >
            Create
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ActionCardV2
