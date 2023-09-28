import { handleNext, handlePrev } from "@/lib/utils";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

interface StepsButtonProps extends ButtonProps {
  goNext?: boolean;
  goPrev?: boolean;
  text: string;
  setFormStep: (forStep: number) => void;
}

const StepsBtn = ({
  goNext,
  goPrev,
  setFormStep,
  text,
  ...props
}: StepsButtonProps) => {
  const Direction = () => {
    if (goNext) return handleNext(setFormStep);
    if (goPrev) return handlePrev(setFormStep);
  };

  return (
    <Button
      {...props}
      type="button"
      className={`duration-200 ${goPrev && "absolute bottom-4 left-4"} ${
        goNext && "absolute bottom-4 right-4"
      }`}
      onClick={() => Direction()}
    >
      {text}
    </Button>
  );
};

export default StepsBtn;
