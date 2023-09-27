import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type UserWelcomeProps = {
  name: string[];
};

const UserWelcome = ({ name }: UserWelcomeProps) => {
  const fullname = name.join(" ");

  return (
    <div>
      <h2>
        <CardTitle className=" text-2xl md:text-3xl">
          Welcome, {fullname}!
        </CardTitle>
        <CardDescription className="text-gray-600 md:text-md">
          Explore all your resumes and generate new cover letters and resumes on
          the fly!
        </CardDescription>
      </h2>
    </div>
  );
};

export default UserWelcome;
