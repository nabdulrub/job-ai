import React from "react"
import TabField from "../../TabField"
import { Info, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChangePassword from "@/components/auth/ChangePassword"
import ProfileDialog from "./ProfileDialog"
import { User } from "@prisma/client"

type Props = {
  user?: User
}

const Profile = ({ user }: Props) => {
  return (
    <div className="grid gap-12">
      <div>
        <div className="flex items-center justify-between">
          <p className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            My Info <Info />
          </p>
          <ProfileDialog user={user} />
        </div>
        <div className="grid grid-cols-1 gap-8  ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <TabField label="First Name" text={user?.firstname} />
            <TabField label="Last Name" text={user?.lastname} />
            <TabField label="Phone Number" text={user?.phone} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <TabField label="Email" text={user?.email} />
            <TabField label="Location" text={user?.location} />
          </div>
        </div>
      </div>
      <span className="block h-[2px] w-full bg-gray-100"></span>
      <div>
        <div className="flex items-center justify-between">
          <p className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            Security <Lock />
          </p>
        </div>
        <ChangePassword />
      </div>
    </div>
  )
}

export default Profile
