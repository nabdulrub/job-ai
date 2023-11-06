"use client"

import { TUserData, UserSession } from "@/types/type"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import Profile from "./tabs/profile/Profile"
import Jobs from "./tabs/jobs/Jobs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select"
import { useState } from "react"
import Projects from "./tabs/projects/Projects"
import Education from "./tabs/education/Education"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { table } from "console"
import Skills from "./tabs/skills/Skills"

type Props = {
  session?: UserSession
  user?: TUserData | null | undefined
}

const ProfileTabs = ({ session, user }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab")
  const [currentTab, setCurrentTab] = useState(selectedTab || "profile")
  const ProfileTabs = ["profile", "jobs", "projects", "education", "skills"]

  return (
    <div className="mx-4 grid gap-8 ">
      <h2 className="ml-2 text-3xl">Your Profile</h2>
      <Tabs
        defaultValue={ProfileTabs[0]}
        value={currentTab}
        onValueChange={setCurrentTab}
      >
        <TabsList className="flex w-full items-center justify-start rounded-none bg-transparent md:border-b-[2px] md:border-gray-200">
          <div className="hidden w-full items-center justify-start rounded-none bg-transparent md:flex md:border-b-[2px] md:border-gray-200">
            {ProfileTabs.map((tab, i) => (
              <Link href={`?tab=${tab}`} key={i} className="flex-1">
                <TabsTrigger
                  value={tab}
                  className="data-[state=active]:bg-transprent flex w-full rounded-none border-b-2 border-transparent text-base capitalize leading-7 data-[state=active]:border-black data-[state=active]:shadow-none"
                >
                  <p>{tab}</p>
                </TabsTrigger>
              </Link>
            ))}
          </div>

          <div className="block w-full md:hidden">
            <Select defaultValue={currentTab} onValueChange={setCurrentTab}>
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
          <TabsContent value="jobs">
            <Jobs jobs={user?.jobs} />
          </TabsContent>
          <TabsContent value="projects">
            <Projects projects={user?.projects} />
          </TabsContent>
          <TabsContent value="education">
            <Education education={user?.education} />
          </TabsContent>
          <TabsContent value="skills">
            <Skills skills={user?.skills} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
