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
import { TResumeSchema, ResumeSchema, UserSession } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../Field";
import { Input } from "../ui/input";

type Props = {
  session?: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const ResumeForm = ({ formStep, setFormStep, session }: Props) => {
  const form = useForm<TResumeSchema>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      firstname: session?.firstname ? session.firstname : "",
      lastname: session?.lastname ? session.lastname : "",
      location: "",
      phone: 0,
      jobs: [{}],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors },
  } = form;

  const jobsField = useFieldArray({
    control,
    name: "jobs",
  });

  console.log(errors);

  const onSubmit = async (data: TResumeSchema) => {
    console.log("clicked");
    console.log(data);
    // Add your submission logic here (e.g., API requests, state updates)
  };

  return (
    <Card className="text-fade shadow-none relative max-w-[800px] w-full">
      <CardHeader>
        <CardTitle>
          Fill out your resume manually for more accurate results!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 0 && <BasicInfo control={control} />}
            {formStep === 1 && (
              <WorkExperience
                control={control}
                fieldArray={jobsField}
                register={register}
              />
            )}
            {formStep === 2 && <ProjectExperience control={control} />}
            {formStep === 3 && <Skills control={control} />}
            <div className="flex justify-between mt-16">
              {formStep > 0 && (
                <StepsBtn
                  variant={"secondary"}
                  setFormStep={setFormStep}
                  text="Previous"
                  goPrev
                />
              )}

              {formStep < 3 && (
                <StepsBtn setFormStep={setFormStep} text="Next" goNext />
              )}

              {formStep === 3 && (
                <Button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-900"
                >
                  {isSubmitting ? "Finishing up..." : "Finish"}
                  <Check className="w-5 ml-2 -mr-1" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
