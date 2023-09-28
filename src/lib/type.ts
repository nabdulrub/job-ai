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

export const ResumeSchema = z.object({
  // Basic Info
  firstname: z
    .string()
    .nonempty("First name is required!")
    .max(50, "Name too long!"),
  lastname: z
    .string()
    .nonempty("Last name is required!")
    .max(75, "Name too long"),
  Userlocation: z.string().nonempty("Location is required for your resume!"),
  phone: z.number().nonnegative().min(4),

  // Job Experience
  jobTitle: z
    .string()
    .nonempty("Title is required!")
    .max(75, "Title too long!"),
  jobEmployer: z.string().nonempty("Employer is required"),
  jobLocation: z.string().nonempty("Location is required!"),
  jobStart: z.number().nonnegative("Invalid Date"),
  jobEnd: z.number().nonnegative("Invalid Date"),
});

export type ResumeSchema = z.infer<typeof ResumeSchema>;
