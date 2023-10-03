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
import Image from "next/image";

type RecentCardProps = {
  date?: string;
  title: string;
  image: string;
  description: string;
  action?: string;
  actionIcon?: React.ReactNode;
};

const RecentCard = ({
  title,
  image,
  date,
  description,
  action = "Download",
  actionIcon = <Download className="-ml-2 mr-1 w-4" />,
}: RecentCardProps) => {
  const overlayStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top ",
  };

  return (
    <Card className="group md:h-[220px] h-[200px] relative  items-center  rounded-[20px] overflow-hidden" style={overlayStyle}>
      <div className="absolute bg-white inset-0 bg-gradient-to-l from-gray-300 via-gray-200 to-white bottom-0 left-0 right-0 z-10 translate-y-[55%] group-hover:translate-y-[20%]  bg-cover md:bg-top bg-no-repeat transition-transform duration-300 ease-in-out">
        <CardHeader className="opacity-100">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>
            {description} - {date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="py-0 px-4 text-xs h-7 bg-black">
            {actionIcon} {action}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default RecentCard;
