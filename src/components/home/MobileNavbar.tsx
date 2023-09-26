import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "../auth/SignInButton";

type Props = {};

const MobileNavbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className="md:hidden block">
      <Sheet>
        <Link href={"/"}>
          <h2 className="absolute top-8 left-8 text-2xl font-semibold">
            Job AI
          </h2>
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
              <Link href={"/"}>
                <li className="text-xl font-normal flex items-center">
                  Home
                  <ChevronRight />
                </li>
              </Link>
              <Link href={"/"}>
                <li className="text-xl font-normal flex items-center">
                  Pricing
                  <ChevronRight />
                </li>
              </Link>
              <Link href={"/"}>
                <li className="text-xl font-normal flex items-center">
                  Newletter
                  <ChevronRight />
                </li>
              </Link>
            </ul>
            <div>
              {!session?.user && (
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
              )}

              {session?.user && (
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
