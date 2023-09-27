import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();

  console.log(session?.user);
  if (!session?.user) return redirect("/");

  return <>Welcome, This is being worked on!</>;
};

export default Dashboard;
