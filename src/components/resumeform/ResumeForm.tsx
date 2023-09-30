import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BasicInfo from "./form/BasicInfo";
import WorkExperience from "./form/Work";
import ProjectExperience from "./form/Project";
import Skills from "./form/Skills";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import StepsBtn from "./StepsBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { UserSession } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../Field";
import { Input } from "../ui/input";

type Props = {
  session: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const ResumeForm = ({ formStep, setFormStep, session }: Props) => {
  return (
    <Card className="text-fade shadow-none relative max-w-[800px] overflow-y-auto w-full">
      <CardHeader>
        <CardTitle>
          Fill out your resume manually for more accurate results!
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formStep === 0 && (
          <BasicInfo
            session={session}
            setFormStep={setFormStep}
            formStep={formStep}
          />
        )}
        {formStep === 1 && (
          <WorkExperience setFormStep={setFormStep} formStep={formStep} />
        )}
        {formStep === 2 && <ProjectExperience control={control} />}
        {formStep === 3 && <Skills control={control} />}
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
