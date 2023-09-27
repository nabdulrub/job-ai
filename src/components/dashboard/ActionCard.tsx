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
import grid from "../../../public/grid.jpg";

type ActionCardProps = {
  title: string;
  description: string;
  action?: string;
  actionIcon?: React.ReactNode;
  secondary?: string;
  secondaryIcon?: React.ReactNode;
};

const ActionCard = ({
  title,
  description,
  action = "Create",
  actionIcon = <Plus className="-ml-2 mr-1 w-4" />,
  secondary = "Applied",
  secondaryIcon = <ClipboardCheck className="-ml-2 mr-1 w-4" />,
}: ActionCardProps) => {
  const newGrid = "../../../public/grid.jpg";

  return (
    <Card
      className="flex-1 shadow-none"
      style={{
        background: "linear-gradient(to right, #f0f0f0, #ffffff)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
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
