import React from "react"
import { Button } from "../../ui/button"
import { ChevronRight } from "lucide-react"
import useFormStepStore from "@/store/useFormStepStore"

type Props = {}

const SkipButton = (props: Props) => {
  const { nextStep, activeStep } = useFormStepStore()

  return (
    activeStep == 2 && (
      <Button
        className="absolute right-6 top-10 w-fit px-0 pl-4 md:right-10"
        variant={"ghost"}
        onClick={nextStep}
      >
        Skip <ChevronRight strokeWidth={1.5} className="h-10 w-10" />
      </Button>
    )
  )
}

export default SkipButton
