import React from "react";
import Pricing from "../home/Pricing";
import Details from "./Details";
import Plan from "../home/Plan";
import PricingHero from "./PricingHero";

type Props = {};

const PricingPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div>
        <PricingHero/>
      </div>
      <Pricing isPricingPage={true}/>
    </div>
  );
};

export default PricingPage;
