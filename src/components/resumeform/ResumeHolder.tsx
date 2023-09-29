"use client";

import { UserSession } from "@/lib/type";
import { useEffect, useState } from "react";
import TextFadeIn from "./TextFadeIn";
import ResumeForm from "./ResumeForm";

type Props = {
  session?: UserSession;
};

const ResumeHolder = ({ session }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(0);

  return (
    <div className="h-[calc(100vh-300px)] grid place-items-center">
      {!showForm && (
        <TextFadeIn
          index={currentIndex}
          setIndex={setCurrentIndex}
          setForm={setShowForm}
        />
      )}

      {showForm && (
        <ResumeForm
          formStep={formStep}
          setFormStep={setFormStep}
          session={session}
        />
      )}
    </div>
  );
};

export default ResumeHolder;
