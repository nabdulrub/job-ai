import React from "react";
import ActionCard from "./ActionCard";
import { Share2 } from "lucide-react";

type Props = {};

const Actions = (props: Props) => {
  const btns = [1, 2, 3];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl flex items-center font-bold">
        <Share2 className="mr-2 bg-gray-200 w-7 h-7 p-[6px] rounded-sm" />{" "}
        Actions
      </h2>
      <div className="flex md:flex-row flex-col gap-4">
        {btns.map((v, i) => (
          <ActionCard
            key={i}
            title="Create a Resume"
            description="Create your first resume to launch your career today. In seconds do
            ifniwfn."
          />
        ))}
      </div>
    </div>
  );
};

export default Actions;
