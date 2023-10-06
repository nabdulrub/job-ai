"use client";

import { TUserData, UserSession } from "@/lib/type";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Profile from "./tabs/Profile";

type Props = {
  session?: UserSession;
  user: TUserData | null | undefined;
};

const ProfileTabs = ({ session, user }: Props) => {
  const ProfileTabs = ["profile", "jobs", "projects", "education", "skills"];
  const ProfileContent = [];

  return (
    <div className="grid gap-8 xl:mx-40 lg:mx-20 md:mx-10 mx-4">
      <h2 className="text-3xl ml-2">Your Profile</h2>
      <Tabs defaultValue={ProfileTabs[0]}>
        <TabsList className="w-full flex items-center justify-start bg-transparent border-b-[2px] border-gray-200 rounded-none">
          {ProfileTabs.map((tab, i) => (
            <TabsTrigger
              value={tab}
              className="capitalize text-base data-[state=active]:bg-transprent data-[state=active]:shadow-none border-b-2 leading-7 w-full border-transparent rounded-none data-[state=active]:border-black"
              key={i}
            >
              <p>{tab}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-6">
          <TabsContent value="profile">
            <Profile user={user?.user} />
          </TabsContent>
        </div>
        <TabsContent value="jobs">jobs</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
