import React from "react";
import Heading from "./Heading";
import Preview from "./Preview";
import Pricing from "./Pricing";

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
