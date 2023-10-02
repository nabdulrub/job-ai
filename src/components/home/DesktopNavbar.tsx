import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import SignOutButton from "../auth/SignInButton";
import { UserSession } from "@/lib/type";

export type NavbarProps = {
  session?: UserSession;
};

const DesktopNavbar = ({ session }: NavbarProps) => {
  return (
    <nav className="md:flex hidden justify-between relative px-12">
      <div className="flex gap-8 items-center justify-center">
        <Link href={"/"}>
          <h2 className="font-bold text-xl">Job AI</h2>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Pricing</Link>
          </li>
          <li>
            <Link href={"/"}>Newletter</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-4">
        {!session && (
          <>
            <Link href={"/signin"}>
              <Button variant={"outline"} title="Already have an account?">
                Login
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button title="Sign up now!">Sign up</Button>
            </Link>
          </>
        )}

        {session && (
          <>
            <div className="flex gap-4">
              <SignOutButton />
              {!session.isNewUser && (
                <Link href={"/dashboard"}>
                  <Button>Dashboard</Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavbar;
