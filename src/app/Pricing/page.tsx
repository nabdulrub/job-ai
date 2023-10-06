import PricingPage from "@/components/pricing/PricingPage";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (session?.user) redirect("/dashboard");
  return (
    <>
      <PricingPage />
    </>
  );
};

export default page;
