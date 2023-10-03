import { resumeMonths } from "@/data/resumeFormData";
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
  location: z.string().nonempty("Required!"),
  phone: z
    .string({ required_error: "Invalid" })
    .nonempty("Required!")
    .min(4, "Invalid Number"),
});

export type TBasicInfoSchema = z.infer<typeof BasicInfoSchema>;

export const JobSchema = z
  .object({
    title: z.string().nonempty("Title is required!").max(75, "Title too long!"),
    employer: z.string().nonempty("Employer is required"),
    location: z.string().nonempty("Location is required!"),
    present: z.boolean().default(false),
    startMonth: z.enum(resumeMonths as [string, ...string[]], {
      required_error: "Required!",
    }),
    startYear: z
      .number({ required_error: "Required" })
      .min(1950, "Required!")
      .max(new Date().getFullYear(), "Required!"),
    endMonth: z.enum(resumeMonths as [string, ...string[]]).optional(),

    endYear: z.number().min(1950).max(new Date().getFullYear()).optional(),
    description: z
      .string()
      .nonempty("Provide a brief description of your responsbilities"),
  })
  .refine(
    (data) => {
      return data.present || !!data.endMonth;
    },
    {
      message: "Required!",
      path: ["endMonth"],
    }
  )
  .refine(
    (data) => {
      return data.present || !!data.endYear;
    },
    {
      message: "Required!",
      path: ["endYear"],
    }
  );

export type TJobSchema = z.infer<typeof JobSchema>;

export const ProjectSchema = z.object({
  title: z.string().nonempty("Title is required!").max(75, "Title too long!"),
  location: z.string().nonempty("Location is required!"),
  startMonth: z.enum(resumeMonths as [string, ...string[]], {
    required_error: "Required",
  }),
  startYear: z
    .number({ required_error: "Required" })
    .min(1950, "Required!")
    .max(new Date().getFullYear(), "Required!"),
  endMonth: z.enum(resumeMonths as [string, ...string[]], {
    required_error: "Required",
  }),
  endYear: z
    .number({ required_error: "Required" })
    .min(1950, "Required")
    .max(new Date().getFullYear(), "Required!"),
  description: z.string(),
});

export type TProjectSchema = z.infer<typeof ProjectSchema>;

export const EducationSkillsSchema = z
  .object({
    skills: z.string().array().nonempty("Skills are Required!"),
    school: z.string().optional(),
    degree: z.string().optional(),
    gpa: z
      .number({ required_error: "Invalid" })
      .min(0, "Invalid GPA")
      .max(5, "Invalid GPA")
      .optional(),
    location: z.string().optional(),
    graduationMonth: z.enum(resumeMonths as [string, ...string[]]).optional(),
    graduationYear: z
      .number()
      .min(1950)
      .max(new Date().getFullYear())
      .optional(),
  })
  .refine(
    (data) => {
      return !data.school || !!data.degree;
    },
    {
      message: "Required!",
      path: ["degree"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.gpa;
    },
    {
      message: "Required!",
      path: ["gpa"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.graduationMonth;
    },
    {
      message: "Required!",
      path: ["graduationMonth"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.graduationYear;
    },
    {
      message: "Required!",
      path: ["graduationYear"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.location;
    },
    {
      message: "Required!",
      path: ["location"],
    }
  );

export type TEducationSkillsSchema = z.infer<typeof EducationSkillsSchema>;
