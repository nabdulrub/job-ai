import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

type RecentCardProps = {
  title: string;
  image: string;
  description: string;
  action?: string;
  actionIcon?: React.ReactNode;
};

const RecentCard = ({ title, image, description, action = 'Download', actionIcon = <Download className="-ml-2 mr-1 w-4" /> }: RecentCardProps) => {
  return (
    <Card className="h-40 bg-mix-overlay  opacity-100 flex flex-col justify-end"
    style={{backgroundImage: `url(${image})`, backgroundSize: 'contain',backgroundRepeat: 'no-repeat', backgroundPosition:'right bottom '}}>
      <CardHeader className="opacity-100">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      <Button className="py-0 px-4 text-xs h-7 bg-black">
          {actionIcon} {action}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentCard;
