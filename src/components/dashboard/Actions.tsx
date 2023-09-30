import React from "react";
import ActionCard from "./ActionCard";
import { Share2 } from "lucide-react";
import { ActionsData } from "@/data/ActionsData";

type Props = {};

const Actions = (props: Props) => {

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl flex items-center font-bold">
        <Share2 className="mr-2 bg-gray-200 w-7 h-7 p-[6px] rounded-sm" />{" "}
        Actions
      </h2>
      <div className="flex md:flex-row flex-col  gap-4">
        {ActionsData.map((v, i) => (
          <ActionCard
            image={v.image}
            key={i}
            title={v.title}
            description={v.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Actions;
