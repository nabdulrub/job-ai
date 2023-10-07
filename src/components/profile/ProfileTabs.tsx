"use client"

import { TUserData, UserSession } from "@/lib/type"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Profile from "./tabs/Profile"
import Jobs from "./tabs/Jobs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select"
import { useState } from "react"

type Props = {
  session?: UserSession
  user: TUserData | null | undefined
}

const ProfileTabs = ({ session, user }: Props) => {
  const [currentTab, setCurrentTab] = useState("profile")
  const ProfileTabs = ["profile", "jobs", "projects", "education", "skills"]

  const ProfileContent = []

  return (
    <div className="mx-4 grid gap-8 md:mx-10 lg:mx-20 xl:mx-40">
      <h2 className="ml-2 text-3xl">Your Profile</h2>
      <Tabs
        defaultValue={ProfileTabs[0]}
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex w-full items-center justify-start rounded-none bg-transparent md:border-b-[2px] md:border-gray-200">
          <div className="hidden w-full items-center justify-start rounded-none bg-transparent md:flex md:border-b-[2px] md:border-gray-200">
            {ProfileTabs.map((tab, i) => (
              <TabsTrigger
                value={tab}
                className="data-[state=active]:bg-transprent flex w-full rounded-none border-b-2 border-transparent text-base capitalize leading-7 data-[state=active]:border-black data-[state=active]:shadow-none"
                key={i}
              >
                <p>{tab}</p>
              </TabsTrigger>
            ))}
          </div>

          <div className="block w-full md:hidden">
            <Select defaultValue={ProfileTabs[0]} onValueChange={setCurrentTab}>
              <SelectTrigger className="w-full text-lg capitalize text-black">
                <SelectValue placeholder="Tab" />
              </SelectTrigger>
              <SelectContent>
                {ProfileTabs.map((tab, i) => (
                  <SelectItem key={i} value={tab} className="capitalize">
                    {tab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
