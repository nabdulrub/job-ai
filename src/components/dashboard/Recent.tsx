import React from "react";
import RecentCard from "./RecentCard";
import { RecentsData } from "@/data/RecentsData";
import { Newspaper } from "lucide-react";

type Props = {};

const Recent = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl flex items-center font-bold">
        <Newspaper className="mr-2 bg-gray-200 w-8 h-8 p-[6px] rounded-sm" />{" "}
        Recent Resumes
      </h2>
      <div className="grid lg:grid-cols-4  md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
        {RecentsData.map((r) => {
          return (
            <>
              <RecentCard
                date={r.date}
                title={r.title}
                description={r.description}
                image={r.image}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
