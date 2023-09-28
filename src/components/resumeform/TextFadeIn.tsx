"use client";

import { resumeFormData } from "@/data/resumeFormData";
import { useEffect } from "react";

type Props = {
  index: number;
  setIndex: (index: number) => void;
  setForm: (val: boolean) => void;
};

const TextFadeIn = ({ index, setIndex, setForm }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === resumeFormData.length - 1) {
          clearInterval(interval);
          setForm(true);
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [index]);

  const phrase = resumeFormData[index];

  return (
    <p
      key={phrase}
      className="text-fade text-3xl text-center md:text-6xl font-thin bg-gradient-to-r from-red-600  to-blue-500 text-transparent bg-clip-text p-6"
    >
      {phrase}
    </p>
  );
};

export default TextFadeIn;
