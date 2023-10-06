"use client";

import { authorizedLinks } from "@/data/NavbarLinks";
import { usePathname } from "next/navigation";

import Link from "next/link";
import JobAI from "../JobAI";
import UserProfileNav from "../UserProfileNav";
import { UserSession } from "@/lib/type";
import { Settings, Settings2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  session?: UserSession;
};

const DashboardNavbar = ({ session }: Props) => {
  const currentPath = usePathname();

  const activeLinkStyles = "border-b-2 border-black text-black";

  return (
    <div className="border-b-[1px] border-gray-200 shadow-gray-50 shadow-lg pt-4 px-20 mx-10 absolute top-0 w-full -ml-8">
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <JobAI size="md" className="-mt-3 ml-10" />
        </Link>
        <ul className="flex gap-12">
          {authorizedLinks.map((path, i) => {
            const isActive = currentPath === path.path;
            return (
              <li key={i}>
                <Link
                  href={"/dashboard"}
                  className={`flex gap-2 items-center font-semibold border-b-2 leading-[3rem] hover:text-black transition-all duration-200 hover:border-black   ${
                    isActive
                      ? activeLinkStyles
                      : "border-transparent text-gray-400"
                  }`}
                >
                  {path.icon} {path.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="-mt-3 flex items-center gap-4">
          <Link href={`/profile/${session?.id}`}>
            <Button variant={"secondary"}>
              <Settings2 className="w-5" />
            </Button>
          </Link>
          <UserProfileNav user={session} />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
