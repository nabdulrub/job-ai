import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"
import { ClipboardCheck, Plus } from "lucide-react"

type ActionCardProps = {
  image: string
  title: string
  description: string
  action?: string
  actionIcon?: React.ReactNode
  secondary?: string
  secondaryIcon?: React.ReactNode
}

const ActionCard = ({
  image,
  title,
  description,
  action = "Create",
  actionIcon = <Plus className="-ml-2 mr-1 w-4" />,
  secondary = "Applied",
  secondaryIcon = <ClipboardCheck className="-ml-2 mr-1 w-4" />,
}: ActionCardProps) => {
  const overlayStyle = {
    backgroundImage: `url(${image})`,
  }
  return (
    <Card className=" relative flex flex-1 flex-col justify-end rounded-[20px]  border-[1px] border-gray-300 bg-gradient-to-r from-gray-100 via-white  to-gray-300 shadow-none">
      <div
        className="bg-mix-overlay absolute inset-0 rounded-[20px] bg-cover bg-no-repeat  opacity-40 md:bg-top "
        style={overlayStyle}
      ></div>

      <CardHeader className="relative">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex gap-2">
        <Button className="h-7 bg-black px-4 py-0 text-xs">
          {actionIcon} {action}
        </Button>
        <Button
          className="h-7 bg-white px-4 py-0 text-xs"
          variant={"secondary"}
        >
          {secondaryIcon} {secondary}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ActionCard
