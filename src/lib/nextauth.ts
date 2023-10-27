import { connectToDatabase } from "@/lib/connectdb"
import bcrypt from "bcrypt"
import {
  DefaultSession,
  NextAuthOptions,
  User,
  getServerSession,
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../prisma"
import { SignInSchema } from "../types/type"
import { setCookie } from "nookies"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstname: string
      name: string
      lastname: string
      email: string
      location: string
      phone: string
    }
  }
  interface User {
    lastname: string
    firstname: string
    location: string
    phone: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    firstname: string
    lastname: string
    location: string
    phone: string
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = SignInSchema.parse(credentials)

        if (!credentials || !email || !password) return null

        try {
          await connectToDatabase()
          const verifyUser = await prisma.user.findFirst({
            where: { email },
          })

          if (!verifyUser) {
            return null
          }

          const hashedPassword = verifyUser.hashedPassword || ""

          const isPasswordCorrect = await bcrypt.compare(
            password,
            hashedPassword
          )

          if (isPasswordCorrect) {
            return {
              id: verifyUser.id,
              email: verifyUser.email,
              firstname: verifyUser.firstname,
              lastname: verifyUser.lastname,
              location: verifyUser.location,
              phone: verifyUser.phone,
            }
          }

          return null
        } catch (error) {
          return null
        } finally {
          prisma.$disconnect()
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, isNewUser }) => {
      if (user) {
        token.id = user.id
        token.firstname = user.firstname
        token.lastname = user.lastname
        token.phone = user.phone
        token.location = user.location
      }
      return token
    },

    session: ({ session, token, trigger }) => {
      if (token) {
        session.user.id = token.id
        session.user.firstname = token.firstname
        session.user.lastname = token.lastname
        session.user.phone = token.phone
        session.user.location = token.location
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT,
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
    newUser: "/resume/form",
  },
}

export const getAuthSession = () => {
  return getServerSession(authOptions)
}
