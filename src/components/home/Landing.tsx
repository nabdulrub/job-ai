"use client";

import React from "react";
import Heading from "./Heading";
import Preview from "./Preview";
import Pricing from "./Pricing";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div className="grid place-items-center md:gap-24 gap-16">
      <Heading />
      <Preview />
      <Pricing />
    </div>
  );
};

export default Landing;
