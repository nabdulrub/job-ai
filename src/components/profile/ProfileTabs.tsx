"use client"

import { TUserData, UserSession } from "@/lib/type"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Profile from "./tabs/Profile"
import Jobs from "./tabs/Jobs"

type Props = {
  session?: UserSession
  user: TUserData | null | undefined
}

const ProfileTabs = ({ session, user }: Props) => {
  const ProfileTabs = ["profile", "jobs", "projects", "education", "skills"]
  const ProfileContent = []

  return (
    <div className="mx-4 grid gap-8 md:mx-10 lg:mx-20 xl:mx-40">
      <h2 className="ml-2 text-3xl">Your Profile</h2>
      <Tabs defaultValue={ProfileTabs[0]}>
        <TabsList className="flex w-full items-center justify-start rounded-none border-b-[2px] border-gray-200 bg-transparent">
          {ProfileTabs.map((tab, i) => (
            <TabsTrigger
              value={tab}
              className="data-[state=active]:bg-transprent w-full rounded-none border-b-2 border-transparent text-base capitalize leading-7 data-[state=active]:border-black data-[state=active]:shadow-none"
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
        <TabsContent value="jobs">
          <Jobs jobs={user?.jobs} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
