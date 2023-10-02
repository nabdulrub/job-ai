import { connectToDatabase } from "@/lib/connectdb";
import bcrypt from "bcrypt";
import {
  DefaultSession,
  NextAuthOptions,
  User,
  getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../prisma/index";
import { SignInSchema } from "./type";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      firstname: string;
      name: string;
      lastname: string;
      email: string;
      isNewUser: boolean;
    };
  }
}

type NewUser = User & {
  isNewUser: boolean;
  lastname: string;
  firstname: string;
};

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
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = SignInSchema.parse(credentials);

        if (!credentials || !email || !password) return null;

        try {
          await connectToDatabase();
          const verifyUser = await prisma.user.findFirst({
            where: { email },
          });

          if (!verifyUser) {
            throw new Error("User does not exist");
            return null;
          }

          const hashedPassword = verifyUser.hashedPassword || "";

          const isPasswordCorrect = await bcrypt.compare(
            password,
            hashedPassword
          );

          if (isPasswordCorrect) {
            return {
              id: verifyUser.id,
              email: verifyUser.email,
              firstname: verifyUser.firstname,
              lastname: verifyUser.lastname,
              isNewUser: verifyUser.isNewUser,
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
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.firstname = (user as NewUser).firstname;
        token.lastname = (user as NewUser).lastname;
        token.isNewUser = (user as NewUser).isNewUser;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.isNewUser = token.isNewUser;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT,
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
