import { handleNext, handlePrev } from "@/lib/utils"
import React from "react"
import { Button, ButtonProps } from "../ui/button"
import { FieldErrors } from "react-hook-form"
import { TBasicInfoSchema } from "@/lib/type"

interface StepsButtonProps extends ButtonProps {
  goNext?: boolean
  goPrev?: boolean
  text: string
  errors: FieldErrors<TBasicInfoSchema>
  setFormStep: (forStep: number) => void
}

const StepsBtn = ({
  goNext,
  goPrev,
  setFormStep,
  text,
  errors,
  ...props
}: StepsButtonProps) => {
  const Direction = async () => {
    if (goNext) {
      if (Object.keys(errors).length > 0) return null
      if (Object.keys(errors).length <= 0) return handleNext(setFormStep)
    }

    if (goPrev) return handlePrev(setFormStep)
  }

  return (
    <Button
      {...props}
      className={`duration-200 ${goPrev && "absolute bottom-4 left-4"} ${
        goNext && "absolute bottom-4 right-4"
      }`}
      onClick={() => Direction()}
    >
      {text}
    </Button>
  )
}

export default StepsBtn
