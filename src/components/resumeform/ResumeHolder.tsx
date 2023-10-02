"use client";

import { UserSession } from "@/lib/type";
import { useEffect, useState } from "react";
import TextFadeIn from "./TextFadeIn";
import ResumeForm from "./ResumeForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  session: UserSession;
};

const ResumeHolder = ({ session }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const { data: userSession } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  if (!userSession?.user.isNewUser) return redirect("/signin");

  return (
    <div className="md:h-full  h-[calc(100vh-50px)] w-full">
      {!showForm && (
        <div className="mt-60">
          <TextFadeIn
            index={currentIndex}
            setIndex={setCurrentIndex}
            setForm={setShowForm}
          />
        </div>
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
