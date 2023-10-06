import { BrainCircuit } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const PricingHero = (props: Props) => {
  return (
    <div className="flex items-center gap-10">
        <div className="flex flex-col gap-3">
          <p className="flex gap-2 items-center text-sm ">
          <BrainCircuit color="blue"/> AI Generated <span className="text-blue-600 border-b border-blue-600">Resume & CV</span> tailored to YOU
          </p>
          <h2 className="text-4xl font-bold">Unlocking Value, Empowering Choices.<br/> Your Resume, Your Way.</h2>
          <p className="text-sm text-gray-500">Unleashing the Power of Personalized Resumes.</p>
        </div>
        <div>
     

        </div>
    </div>
  );
};

export default PricingHero;
