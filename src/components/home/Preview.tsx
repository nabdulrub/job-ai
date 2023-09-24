import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import preview from "../../../public/preview.png";

type Props = {};

const Preview = (props: Props) => {
  return (
    <div className="bg-black rounded-3xl w-full md:px-12 px-4 pt-8 flex md:flex-row flex-col overflow-hidden items-center justify-between max-w-6xl">
      <div className="flex flex-col md:items-start items-center gap-4 text-white pb-8">
        <div className="md:text-start text-center">
          <h2 className="font-bold md:text-3xl text-xl">
            Apply to Jobs in Seconds!
          </h2>
          <p className="font-thin mt-4">
            Let AI tailor your resumes and cover letters.
          </p>
        </div>
        <div className="mt-2 flex gap-4">
          <Button variant={"outline"}>View Plans</Button>
          <Button className="bg-white text-black hover:bg-black border-[1px] hover:text-white hover:border-white">
            Get Started
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={preview}
          height={500}
          width={500}
          alt="preview"
          className="md:-mb-[13rem] -mb-[8rem] -ml-4"
        />
      </div>
    </div>
  );
};

export default Preview;
