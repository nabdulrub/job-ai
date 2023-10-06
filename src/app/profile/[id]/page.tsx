import ProfileTabs from "@/components/profile/ProfileTabs";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "../../../../prisma";
import { connectToDatabase } from "@/lib/connectdb";

type Props = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const getUserData = async (id: string) => {
    try {
      await connectToDatabase();
      const user = await prisma.resume.findFirst({
        where: {
          userId: session.user.id,
        },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
              location: true,
              phone: true,
              hashedPassword: false,
            },
          },
          jobs: true,
          projects: true,
          skills: true,
          education: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error Fetch User Data:", error);
    }
  };

  const user = await getUserData(id);

  return <ProfileTabs session={session.user} user={user} />;
};

export default UserProfile;
