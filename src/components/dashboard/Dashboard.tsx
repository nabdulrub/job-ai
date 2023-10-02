"use client";

import { UserSession } from "@/lib/type";
import ActionCard from "./ActionCard";
import UserWelcome from "./UserWelcome";
import Actions from "./Actions";
import Recent from "./Recent";

type Props = {
  session: UserSession;
};

const Dashboard = ({ session }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-12 items-start md:px-10">
      <UserWelcome name={[session.firstname, session.lastname]} />
      <div className="self-start w-full">
        <Actions />
      </div>
      <div className="self-start w-full">
       <Recent/>
      </div>
    </div>
  );
};

export default Dashboard;
