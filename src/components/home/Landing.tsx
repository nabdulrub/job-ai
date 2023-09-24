import React from "react";
import Heading from "./Heading";
import Preview from "./Preview";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div className="mt-20 grid place-items-center md:gap-24 gap-16">
      <Heading />
      <Preview />
    </div>
  );
};

export default Landing;
