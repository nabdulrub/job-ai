import Dashboard from "@/components/dashboard/Dashboard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  } else if (session.user.isNewUser) {
    redirect("resume/form");
  }

  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
