import React from "react"
import { Button } from "../../ui/button"
import { ChevronLeft } from "lucide-react"
import useFormStepStore from "@/store/useFormStepStore"

type Props = {}

const PreviousButton = (props: Props) => {
  const { previousStep } = useFormStepStore()

  return (
    <Button
      className="absolute left-6 top-10 w-fit px-0 md:left-10"
      variant={"ghost"}
      onClick={previousStep}
    >
      <ChevronLeft strokeWidth={1.5} className="h-10 w-10" />
    </Button>
  )
}

export default PreviousButton
