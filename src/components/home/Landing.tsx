import React from "react";
import Heading from "./Heading";
import Preview from "./Preview";
import Pricing from "./Pricing";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};

const Landing = async (props: Props) => {
  return (
    <div className="grid place-items-center md:gap-24 gap-16">
      <Heading />
      <Preview />
      <Pricing />
    </div>
  );
};

export default Landing;
