import { resumeMonths } from "@/data/resumeFormData"
import { Education, Job, Project, Skill, User } from "@prisma/client"
import z from "zod"

// USER SIGN IN SCHEMA
export const SignInSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid Email"),
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Password must be at least 6 characters"),
})

export type TSignInSchema = z.infer<typeof SignInSchema>

// USER REGISTERATION SCHEMA
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
  password: z
    .string()
    .nonempty("Password is required!")
    .min(6, "Invalid Password"),
  verifyPassword: z.string().nonempty("Password does not match!"),
})

export type TRegisterSchema = z.infer<typeof RegisterSchema>

// USER CHANGE PASSWORD SCHEMA
export const ChangePasswordSchema = z.object({
  oldPassword: z.string().nonempty("Old password is required!"),
  newPassword: z
    .string()
    .nonempty("Password is required!")
    .min(6, "6 Characters Minimum"),
  verifyNewPassword: z.string().nonempty("Password does not match!"),
})

export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>

// NEWSLETTER EMAIL SCHEMA LANDING PAGE
export const NewsSchema = z.object({
  email: z
    .string()
    .email("This must be an email")
    .nonempty("Email is required!"),
})

export type TNewsSchema = z.infer<typeof NewsSchema>

// USER SESSION SCHEMA
export type UserSession = {
  name: string
  email: string
  id: string
  firstname: string
  lastname: string
  isNewUser: boolean
}

// RESUME BASIC INFO SCHEMA
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
})

export type TBasicInfoSchema = z.infer<typeof BasicInfoSchema>

// RESUME JOB EXPERIENCE SCHEMA
export const JobSchema = z
  .object({
    id: z.string().optional(),
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
      return data.present || !!data.endMonth
    },
    {
      message: "Required!",
      path: ["endMonth"],
    }
  )
  .refine(
    (data) => {
      return data.present || !!data.endYear
    },
    {
      message: "Required!",
      path: ["endYear"],
    }
  )

export type TJobSchema = z.infer<typeof JobSchema>

// RESUME PROJECT EXPERIENCE SCHEMA
export const ProjectSchema = z.object({
  id: z.string().optional(),
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
})

export type TProjectSchema = z.infer<typeof ProjectSchema>

// RESUME EDUCATION & SKILLS SCHEMA
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
      return !data.school || !!data.degree
    },
    {
      message: "Required!",
      path: ["degree"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.gpa
    },
    {
      message: "Required!",
      path: ["gpa"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.graduationMonth
    },
    {
      message: "Required!",
      path: ["graduationMonth"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.graduationYear
    },
    {
      message: "Required!",
      path: ["graduationYear"],
    }
  )
  .refine(
    (data) => {
      return !data.school || !!data.location
    },
    {
      message: "Required!",
      path: ["location"],
    }
  )

export type TEducationSkillsSchema = z.infer<typeof EducationSkillsSchema>

// RESUME EDUCATION SCHEMA
export const EducationSchema = z.object({
  id: z.string().optional(),
  school: z.string().optional(),
  degree: z.string().optional(),
  gpa: z
    .number({ required_error: "Invalid" })
    .min(0, "Invalid GPA")
    .max(5, "Invalid GPA")
    .optional(),
  location: z.string().optional(),
  graduationMonth: z.enum(resumeMonths as [string, ...string[]]).optional(),
  graduationYear: z.number().min(1950).max(new Date().getFullYear()).optional(),
})

// DATABASE COMPLETE RESUME TYPE
export type TUserData = {
  user: User
  jobs: Job[]
  projects: Project[]
  skills: Skill[]
  education: Education[]
}

// DELETING RECORDS SCHEMA
export const DeleteSchema = z.object({
  id: z.string().nonempty(),
})

export type TDeleteSchema = z.infer<typeof DeleteSchema>

export const NewResumeSchema = z.object({
  title: z.string().nonempty("Title is required!"),
  description: z.string().nonempty("Description is required!"),
})

export type TNewResume = z.infer<typeof NewResumeSchema>
