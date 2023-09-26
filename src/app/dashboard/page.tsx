import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) return redirect("/");

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Dashboard;
