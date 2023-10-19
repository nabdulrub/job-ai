import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Button } from "../ui/button"

type ActionCardProps = {
  title?: string
  description?: string
  dialog?: React.ReactNode
  cta?: string
}

const ActionCardV2 = ({ title, description, dialog, cta }: ActionCardProps) => {
  return (
    <Card className="min-w-[250px] flex-1 border-none bg-teal-100 shadow-none transition-all duration-300 hover:bg-opacity-80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div>
          {dialog && React.cloneElement(dialog as React.ReactElement, { cta })}
        </div>
      </CardHeader>
    </Card>
  )
}

export default ActionCardV2
