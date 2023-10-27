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
import RecentOptions from "./RecentOptions"

type Props = {
  recent: GeneratedResume
}

const RecentCardV2 = ({ recent }: Props) => {
  const createdDate = recent.createdAt?.toDateString()
  return (
    <Card className="relative w-full flex-1 border-teal-400 bg-teal-800  shadow-none md:min-w-[300px]">
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
        <RecentOptions id={recent.id} />
      </CardContent>
    </Card>
  )
}

export default RecentCardV2
