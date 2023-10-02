import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ClipboardCheck, Plus } from "lucide-react";

type ActionCardProps = {
  image: string;
  title: string;
  description: string;
  action?: string;
  actionIcon?: React.ReactNode;
  secondary?: string;
  secondaryIcon?: React.ReactNode;
};

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
  };
  return (
    <Card className=" relative flex-1 flex flex-col justify-end shadow-none h-[200px] rounded-[20px] bg-gradient-to-r from-gray-100 via-white to-gray-300  border-[1px] border-gray-300">
      <div
        className="absolute inset-0 bg-mix-overlay opacity-40 rounded-[20px] bg-cover  md:bg-top bg-no-repeat "
        style={overlayStyle}
      ></div>

      <CardHeader className="relative">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 relative">
        <Button className="py-0 px-4 text-xs h-7 bg-black">
          {actionIcon} {action}
        </Button>
        <Button
          className="py-0 px-4 text-xs h-7 bg-white"
          variant={"secondary"}
        >
          {secondaryIcon} {secondary}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
