import React from "react";
import NewFeature from "./NewFeature";
import { Button } from "../ui/button";

type Props = {};

const Heading = (props: Props) => {
  return (
    <div className="grid justify-center place-items-center gap-4">
      <NewFeature /> {/*New feature announcer*/}
      <div className="text-center grid gap-4">
        <h1 className="md:text-6xl text-3xl font-bold max-w-4xl">
          Innovative Job Seeking with AI-Powered Resume Magic
        </h1>
        <p className="max-w-[38rem] mx-auto">
          Supercharge Your Job Hunt! Our AI-powered tool tailors cover letters
          and resumes for any job, helping both recent college graduates and job
          seekers land their dream positions with ease.
        </p>
      </div>
      <div className="md:flex-row flex-col flex gap-4 md:w-auto w-[200px] mt-4">
        <Button variant={"secondary"}>Learn More</Button>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Heading;
