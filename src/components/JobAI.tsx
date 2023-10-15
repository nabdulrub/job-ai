import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type Props = {
  size?: "sm" | "md" | "lg"
  className?: string
}

const JobAI = ({ size, className }: Props) => {
  const textSize =
    size === "sm"
      ? "text-base"
      : size === "md"
      ? "text-xl"
      : size === "lg"
      ? "text-2xl"
      : "text-base"

  return (
    <Link href={"/"}>
      <h2 className={cn(`${textSize}  font-semibold`, className)}>
        Job AI <sup className="-top-2 text-[12px] font-medium">BETA</sup>
      </h2>
    </Link>
  )
}

export default JobAI
