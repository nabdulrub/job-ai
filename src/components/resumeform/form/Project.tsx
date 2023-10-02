import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { resumeMonths, resumeYears } from "@/data/resumeFormData";
import { ProjectSchema, TProjectSchema, UserSession } from "@/lib/type";
import { handleNext, handlePrev } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, GanttChartSquare, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  session: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const ProjectExperience = ({ session, formStep, setFormStep }: Props) => {
  const [added, setAdded] = useState(0);

  const getYears = resumeYears();

  const form = useForm<TProjectSchema>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      location: "",
      startMonth: undefined,
      startYear: undefined,
      endMonth: undefined,
      endYear: undefined,
      description: "",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = (data: TProjectSchema) => {
    try {
      toast({
        title: "Doing Great, Project Added!",
        description: "Add another project!",
        action: (
          <ToastAction
            altText="Back to form"
            className="bg-green-800 text-white hover:text-black"
          >
            Add More
          </ToastAction>
        ),
        duration: 2000,
      });
      console.log(data);
      reset();
      setAdded((v) => v + 1);
    } catch (error) {
      toast({
        title: "Failed to add project!",
        description: "Please try again...",
        action: (
          <ToastAction
            altText="Back to form"
            className="bg-red-800 text-white hover:text-black"
          >
            Sure
          </ToastAction>
        ),
        duration: 2000,
      });
    }
  };

  const handleNextError = () => {
    if (isSubmitSuccessful) {
      return handleNext(setFormStep);
    }
    toast({
      title: "No Added Projects",
      description: `You must add a project to proceed!\n Hint: Press the "Add Project" button`,
      action: (
        <ToastAction altText="Back to form" className="bg-red-800 text-white">
          Dismiss
        </ToastAction>
      ),
      duration: 3000,
    });
  };

  const projectsAmount = `${added} project${added <= 1 ? "" : "s"}`;

  watch();
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl text-md font-semibold flex gap-2 items-center">
              Project Experience <GanttChartSquare className="w-6" />{" "}
            </h2>
            <div className="flex gap-2">
              <Button
                type="button"
                title={`You have ${projectsAmount} added`}
                className={`${
                  added > 0 && "border-orange-500 text-xl"
                } hover:bg-none border-2 font-extrabold hover:no-underline`}
                variant={"link"}
              >
                {added}
              </Button>
              <Button className="flex items-center" type="submit">
                {isSubmitting ? (
                  "Adding..."
                ) : (
                  <>
                    <span className="md:block hidden">Add Project</span>
                    <Plus className="w-5 md:ml-[3px]" />
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row  gap-4 overflow-auto max-h-[575px] md:h-auto pb-6 px-1 job-experience-scroll scroll-smooth">
            <div className="grid grid-cols-1 gap-4 flex-1">
              <div className="flex flex-col md:flex-row gap-2">
                <Field
                  control={control}
                  label="Project Title"
                  name={`title`}
                  placeholder="Enter Project Title"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="Project Location"
                  className="bg-white"
                />
              </div>
              <div className="flex md:flex-row flex-col gap-2">
                <div className="flex flex-1 gap-[1px] w-full">
                  <Field
                    label="Start Date"
                    name={`startMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="bg-white rounded-tr-none border-r-0 rounded-br-none">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {resumeMonths.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Field
                    label="&#8205;"
                    name={`startYear`}
                    control={control}
                    render={(field) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(parseInt(val));
                        }}
                      >
                        <SelectTrigger className="bg-white flex-1 rounded-tl-none border-l-0 rounded-bl-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getYears.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-1 gap-[1px]">
                  <Field
                    label="End Date"
                    name={`endMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white rounded-tr-none border-r-0 rounded-br-none">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {resumeMonths.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Field
                    label="&#8205;"
                    name={`endYear`}
                    control={control}
                    render={(field) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(parseInt(val));
                        }}
                      >
                        <SelectTrigger className="bg-white rounded-tl-none border-l-0 rounded-bl-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getYears.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <Field
                label="Description"
                name={`description`}
                control={control}
                render={(field) => (
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Describe the Project"
                    className="bg-white"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between mt-16">
            <Button
              type="button"
              className={`absolute bottom-6 right-6 bg-orange-600 hover:bg-orange-300 hover:text-black shadow-none`}
              onClick={handleNextError}
            >
              Skills & Education
              <ChevronRight className="w-5l -mr-2" />
            </Button>
            <Button
              variant={"secondary"}
              type="button"
              className="absolute bottom-6 left-6"
              onClick={() => handlePrev(setFormStep)}
            >
              Previous
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProjectExperience;
