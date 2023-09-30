import z from "zod";

export const SignInSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;

export const RegisterSchema = z.object({
  firstname: z
    .string()
    .nonempty("First name is required!")
    .max(50, "Name too long!"),
  lastname: z
    .string()
    .nonempty("Last name is required!")
    .max(75, "Name too long"),
  email: z.string().nonempty("Email is required!").email("Invalid Email"),
  password: z.string().nonempty("Password is required!"),
  verifyPassword: z.string().nonempty("Password does not match!"),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const NewsSchema = z.object({
  email: z
    .string()
    .email("This must be an email")
    .nonempty("Email is required!"),
});

export type TNewsSchema = z.infer<typeof NewsSchema>;

//Session Type

export type UserSession = {
  name: string;
  email: string;
  id: string;
  firstname: string;
  lastname: string;
  isNewUser: boolean;
};

export const BasicInfoSchema = z.object({
  firstname: z
    .string()
    .nonempty("First name is required!")
    .max(50, "Name too long!"),
  lastname: z
    .string()
    .nonempty("Last name is required!")
    .max(75, "Name too long"),
  location: z.string().nonempty("Location is required for your resume!"),
  phone: z.string().nonempty().min(4),
});

export type TBasicInfoSchema = z.infer<typeof BasicInfoSchema>;

export const JobSchema = z.object({
  jobs: z
    .object({
      title: z
        .string()
        .nonempty("Title is required!")
        .max(75, "Title too long!"),
      employer: z.string().nonempty("Employer is required"),
      location: z.string().nonempty("Location is required!"),
      startMonth: z.enum([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]),
      startYear: z.number().min(1950).max(new Date().getFullYear()),
      endMonth: z
        .enum([
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ])
        .nullable(),
      endYear: z.number().min(1950).max(new Date().getFullYear()).nullable(),
      present: z.boolean().default(false),
      description: z
        .string()
        .nonempty("Provide a brief description of your responsbilities"),
    })
    .array(),
});

export type TJobSchema = z.infer<typeof JobSchema>;

export const ProjectSchema = z.object({
  projects: z
    .object({
      title: z
        .string()
        .nonempty("Title is required!")
        .max(75, "Title too long!"),
      location: z.string().nonempty("Location is required!"),
      startMonth: z.enum([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]),
      startYear: z.number().min(1950).max(new Date().getFullYear()),
      endMonth: z
        .enum([
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ])
        .nullable(),
      endYear: z.number().min(1950).max(new Date().getFullYear()).nullable(),
      description: z.string(),
    })
    .array(),
});

export type TProjectSchema = z.infer<typeof ProjectSchema>;

export const EducationSkillsSchema = z.object({
  skills: z.string().nonempty().array(),

  education: z
    .object({
      school: z.string().nonempty(),
      degree: z.string().nonempty(),
      gpa: z.string().nonempty("Invalid GPA").max(4, "Invalid GPA"),
      location: z.string().nonempty("Location is required for your resume!"),
      graduation: z.string().nonempty("Invalid Date"),
    })
    .array(),
});

export type TEducationSkillsSchema = z.infer<typeof EducationSkillsSchema>;
