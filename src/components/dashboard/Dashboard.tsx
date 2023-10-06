"use client";

import { UserSession } from "@/lib/type";
import ActionCard from "./ActionCard";
import UserWelcome from "./UserWelcome";
import Actions from "./Actions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Recent from "./Recent";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: userSession } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const session = userSession?.user;

  // if (session?.isNewUser === true) redirect("/resume/form");

  return (
    <div className="flex flex-col justify-center gap-12 items-start md:px-10">
      <UserWelcome name={[session?.firstname, session?.lastname]} />
      <div className="self-start w-full">
        <Actions />
      </div>
      <div className="self-start w-full">
        <Recent />
      </div>
    </div>
  );
};

export default Dashboard;
