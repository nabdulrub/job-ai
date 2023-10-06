import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  className: string;
};

const JobAI = ({ size, className }: Props) => {
  const textSize =
    size === "sm"
      ? "text-base"
      : size === "md"
      ? "text-xl"
      : size === "lg"
      ? "text-2xl"
      : "text-base";

  return <h2 className={cn(className, `${textSize} font-semibold`)}>Job AI</h2>;
};

export default JobAI;
