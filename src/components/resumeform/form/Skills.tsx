import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { resumeMonths, resumeYears } from "@/data/resumeFormData";
import {
  EducationSkillsSchema,
  TEducationSkillsSchema,
  UserSession,
} from "@/lib/type";
import { handlePrev } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Award, Check, GraduationCap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  session: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const Skills = ({ session, formStep, setFormStep }: Props) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const { data: userSession, update } = useSession();

  const updateNewUser = async () => {
    await update({
      ...userSession,
      user: {
        ...userSession?.user,
        isNewUser: false,
      },
    });
  };

  const getYears = resumeYears();

  const form = useForm<TEducationSkillsSchema>({
    resolver: zodResolver(EducationSkillsSchema),
    defaultValues: {
      skills: [],
      school: "",
      degree: "",
      gpa: undefined || 0,
      location: "",
      graduationMonth: undefined,
      graduationYear: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = (data: TEducationSkillsSchema) => {
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
      updateNewUser();
      console.log(userSession);
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="md:text-xl text-md font-semibold flex gap-[2px] items-center mb-4">
            Skills <Award className="w-5" />
          </h2>
          <div className="mb-4">
            <Field
              control={control}
              label="Skills"
              name="skills"
              render={(field) => (
                <TagInput
                  {...field}
                  maxTags={20}
                  placeholderWhenFull="Limit Reached!"
                  placeholder="Enter all your skills! Click Enter after each skill!"
                  tags={tags}
                  size={"sm"}
                  textStyle={"bold"}
                  className="sm:min-w-[450px]"
                  setTags={(newTags: Tag[]) => {
                    setTags(newTags);
                    const filteredTags = newTags.map((v: Tag) => v.text);
                    setValue("skills", filteredTags as [string, ...string[]]);
                  }}
                />
              )}
            />
          </div>

          <h2 className="md:text-xl text-md font-semibold flex gap-[2px] items-center mb-2 mt-6">
            Education <GraduationCap className="w-5" />
          </h2>
          <div className="relative flex flex-col md:flex-row  gap-4 overflow-auto max-h-[575px] md:h-auto pb-6 px-1 job-experience-scroll">
            <div className="grid grid-cols-1 gap-4 flex-1">
              <div className="flex flex-col md:flex-row gap-2">
                <Field
                  control={control}
                  label="School"
                  name={`school`}
                  placeholder="Enter School Name"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="School Location"
                  className="bg-white"
                />
              </div>
              <div className="flex md:flex-row flex-col gap-2">
                <Field
                  control={control}
                  label="Degree Acquired"
                  name={`degree`}
                  placeholder="e.g. Bachelors in Computer Science"
                  className="bg-white"
                />

                <div className="flex flex-1 gap-[1px] w-full">
                  <Field
                    label="Graduation Date"
                    name={`graduationMonth`}
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
                    name={`graduationYear`}
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
                <Field
                  control={control}
                  label="GPA"
                  size={0.3}
                  name={`gpa`}
                  render={(field) => (
                    <Input
                      max={5}
                      min={1}
                      onChange={(v) => {
                        setValue("gpa", parseInt(v.target.value));
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="submit"
              className={`absolute bottom-6 right-6 bg-green-600 hover:bg-green-900 shadow-none`}
            >
              Finish
              <Check className="w-5 ml-1 -mr-2" />
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

export default Skills;
