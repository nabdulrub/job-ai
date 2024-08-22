import { RegisterSchema } from "@/types/type"
import newUser from "@/use-cases/auth/register"
import initializeResume from "@/use-cases/initializeResume"
import subscribeToNewsletter from "@/use-cases/subscribeToNewsletter"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json()
    const { firstname, lastname, password, email } = RegisterSchema.parse(body)

    const user = await newUser({ firstname, lastname, password, email })
    const resume = await initializeResume(user.id)
    const news = await subscribeToNewsletter(email)

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Zod Error Registering User!", error: error },
        { status: 415 }
      )
    }

    return NextResponse.json(
      { message: "Error Registering User!", error: error },
      { status: 400 }
    )
  }
}
