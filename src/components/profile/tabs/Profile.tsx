import { TUser } from "@/lib/type";
import React from "react";
import TabField from "../TabField";
import { Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChangePassword from "@/components/auth/ChangePassword";

type Props = {
  user?: TUser;
};

const Profile = ({ user }: Props) => {
  return (
    <div className="grid gap-12">
      <div>
        <div className="flex justify-between items-center">
          <p className="mb-4 text-2xl font-semibold flex gap-2 items-center">
            My Info <Info />
          </p>
          <Button>Edit</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8 grid-cols-1 ">
          <TabField label="First Name" text={user?.firstname} />
          <TabField label="Last Name" text={user?.lastname} />
          <TabField label="Phone Number" text={user?.phone} />
          <TabField label="Email" text={user?.email} />
          <TabField label="Location" text={user?.location} />
        </div>
      </div>
      <span className="block h-[2px] w-full bg-gray-100"></span>
      <div>
        <div className="flex justify-between items-center">
          <p className="mb-4 text-2xl font-semibold flex gap-2 items-center">
            Security <Lock />
          </p>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
};

export default Profile;
