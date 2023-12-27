import { z } from "zod"

export const DeleteSchema = z.object({
  id: z.string().nonempty(),
})

export type TDeleteSchema = z.infer<typeof DeleteSchema>

export const NewResumeSchema = z.object({
  title: z.string().nonempty("Title is required!"),
  description: z.string().nonempty("Description is required!"),
})

export type TNewResume = z.infer<typeof NewResumeSchema>
