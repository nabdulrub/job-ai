import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type PlanProps = {
  title: string;
  description: string;
  price: number;
  top?: boolean;
  topTitle?: string;
  duration: "MONTHLY" | "ANNUALLY";
  className?: string;
};

const Plan = ({
  title,
  description,
  price,
  top = false,
  topTitle,
  duration,
  className,
}: PlanProps) => {
  const durationCheck =
    duration === "MONTHLY"
      ? "per month"
      : duration === "ANNUALLY"
      ? "per year"
      : null;

  return (
    <Card className={className}>
      <div className="flex items-center justify-between px-2">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center">
            {title}
            {top && (
              <span className="text-sm border-2 border-blue-600 text-blue-600 px-2 ml-1 rounded-2xl">
                {topTitle}
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <h2 className="text-5xl font-bold flex items-start gap-[0.5px]">
            <span className=" text-4xl">$</span>
            {price}
          </h2>
          <p className="text-xs ml-4">{durationCheck}</p>
        </CardContent>
      </div>
      <CardContent className="border-t-2 borde-gray-900 pt-4">
        <Button className="w-full py-6 bg-black hover:bg-white border-2 hover:border-black hover:text-black transition-all duration-300">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default Plan;
