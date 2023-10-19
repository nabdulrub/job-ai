"use client"

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
import { CalendarDaysIcon, MoreHorizontal } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { GeneratedResume } from "@prisma/client"

type Props = {
  recent: GeneratedResume
}

const RecentCardV2 = ({ recent }: Props) => {
  const createdDate = recent.createdAt?.toDateString()
  return (
    <Card className="relative w-full min-w-[200px] flex-1 border-teal-400 bg-teal-800  shadow-none md:max-w-[450px]">
      <CardHeader>
        <Badge className="mb-2 w-fit bg-teal-400 text-black shadow-none hover:text-white">
          Resume
        </Badge>
        <CardTitle className="text-xl text-white">{recent.title}</CardTitle>
        <CardDescription className="text-gray-200">
          {recent.description?.slice(0, 80)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-200">
            <CalendarDaysIcon className="w-4" />
            <p className="text-sm ">
              Date: <span className="font-bold">{createdDate} </span>
            </p>
          </div>
          <div>
            <Link href={`/generated/resume/${recent.id}`}>
              <Button variant={"secondary"} className="h-7 px-3 text-xs ">
                View
              </Button>
            </Link>
          </div>
        </div>
        <MoreHorizontal className="absolute right-4 top-2 cursor-pointer text-white transition-all duration-200 hover:text-gray-300" />
      </CardContent>
    </Card>
  )
}

export default RecentCardV2
