import { connectToDatabase } from "@/lib/connectdb";
import bcrypt from "bcrypt";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../prisma/index";
import { SignInSchema } from "./type";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      isNewUser: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    isNewUser: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = SignInSchema.parse(credentials);

        if (!credentials || !email || !password) return null;

        try {
          await connectToDatabase();
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user) {
            throw new Error("User does not exist!");
            return null;
          }

          const hashedPassword = user.hashedPassword || "";

          const isPasswordCorrect = await bcrypt.compare(
            password,
            hashedPassword
          );

          if (isPasswordCorrect) {
            return {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              isNewUser: user.isNewUser,
            };
          }

          return null;
        } catch (error) {
          return null;
        } finally {
          prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token) {
        return token;
      }
      return null;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.firstname;
        session.user.isNewUser = token.isNewUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signin",
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
