import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BasicInfo from "./form/BasicInfo";
import WorkExperience from "./form/Work";
import ProjectExperience from "./form/Project";
import Skills from "./form/Skills";
import { Button } from "../ui/button";
import { handleNext, handlePrev } from "@/lib/utils";
import { Check } from "lucide-react";
import StepsBtn from "./StepsBtn";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { ResumeSchema } from "@/lib/type";

type Props = {
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const ResumeForm = ({ formStep, setFormStep }: Props) => {
  const form = useForm<ResumeSchema>({});

  return (
    <Card className="text-fade shadow-none relative">
      <CardHeader>
        <CardTitle>
          Fill out your resume manually for more accurate results!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <Form {...form}>
            {formStep === 0 && <BasicInfo />}
            {formStep === 1 && <WorkExperience />}
            {formStep === 2 && <ProjectExperience />}
            {formStep === 3 && <Skills />}
            <div className="flex justify-between mt-16">
              {formStep > 0 && (
                <StepsBtn
                  variant={"secondary"}
                  setFormStep={setFormStep}
                  text="Previous"
                  goPrev
                />
              )}
              {formStep < 3 ? (
                <StepsBtn setFormStep={setFormStep} text="Next" goNext />
              ) : (
                <Button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-900"
                >
                  Finish
                  <Check className="w-5 ml-2 -mr-1" />
                </Button>
              )}
            </div>
          </Form>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
