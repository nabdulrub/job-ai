"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "../auth/SignInButton";
import { NavbarProps } from "./DesktopNavbar";
import { unauthorizedLinks } from "@/data/NavbarLinks";
import JobAI from "../JobAI";

const MobileNavbar = ({ session }: NavbarProps) => {
  return (
    <div className="md:hidden block">
      <Sheet>
        <Link href={"/"}>
          <JobAI size="lg" />
        </Link>
        <SheetTrigger>
          <Menu className="cursor-pointer absolute right-8 top-8" size={40} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Link href={"/"}>
              <SheetTitle className="text-2xl font-semibold">Job AI</SheetTitle>
            </Link>
          </SheetHeader>

          <div className="flex flex-col justify-between h-[calc(100%-50px)]">
            <ul className="flex flex-col gap-12 mt-10">
              {unauthorizedLinks.map((path, i) => (
                <Link href={path.path} key={i}>
                  <li className="text-xl font-normal flex items-center">
                    {path.title}
                    <ChevronRight />
                  </li>
                </Link>
              ))}
            </ul>
            <div>
              {!session ? (
                <div className="flex gap-4 w-full">
                  <Link href={"/signin"} className="flex-1">
                    <Button
                      variant={"outline"}
                      title="Already have an account?"
                      className="w-full border-black text-black"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button title="Sign up now!" className="bg-black">
                      Sign up
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <SignInButton />
                  <Link href={"/dashboard"} className="w-full">
                    <Button>Dashboard</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
