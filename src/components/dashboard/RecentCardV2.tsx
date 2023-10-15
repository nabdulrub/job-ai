import Image from "next/image"
import React from "react"
import mockResume from "../../../public/resume-mock.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { CalendarDaysIcon, MoreHorizontal, MoreVertical } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type Props = {
  date?: string
  title: string
  description: string
}

const RecentCardV2 = ({ title, description, date }: Props) => {
  return (
    <Card className="relative w-full min-w-[200px] flex-1 border-teal-400 bg-teal-800  shadow-none">
      <CardHeader>
        <Badge className="mb-2 w-fit bg-teal-400 text-black shadow-none hover:text-white">
          Resume
        </Badge>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        <CardDescription className="text-gray-200">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-200">
            <CalendarDaysIcon className="w-4" />
            <p className="text-sm ">Date: {date}</p>
          </div>
          <div>
            <Button variant={"secondary"} className="h-7 px-3 text-xs ">
              View
            </Button>
          </div>
        </div>
        <MoreHorizontal className="absolute right-4 top-2 cursor-pointer text-white transition-all duration-200 hover:text-gray-300" />
      </CardContent>
    </Card>
  )
}

export default RecentCardV2
