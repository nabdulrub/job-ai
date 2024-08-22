import authService from "@/services/authService"
import { prisma } from "../../../prisma"

type NewUserType = {
  firstname: string
  lastname: string
  email: string
  password: string
}

const auth = authService()

export default async function newUser(user: NewUserType) {
  const { firstname, lastname, password, email } = user

  const hashedPassword = auth.encryptPassword(password)

  return await prisma.user.create({
    data: {
      firstname,
      lastname,
      hashedPassword,
      email,
    },
  })
}
