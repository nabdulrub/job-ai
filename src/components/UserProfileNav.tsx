import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { UserSession } from "@/lib/type";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  user?: UserSession;
};

const UserProfileNav = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="flex items-center justify-center border-[2px] border-black text-xl font-semibold transition-all duration-200 hover:cursor-pointer hover:border-gray-500 hover:text-gray-500">
          {user?.firstname[0]}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] w-fit mr-2">
        <div className="flex flex-col gap-2">
          <p>{user?.firstname + " " + user?.lastname}</p>
          <span className="block w-full h-[1px] bg-gray-300"></span>
          <p>{user?.email}</p>
          <div>
            <Button
              variant={"destructive"}
              className="mt-2 border-none"
              onClick={async () =>
                await signOut().catch((err) => console.error(err))
              }
            >
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileNav;
