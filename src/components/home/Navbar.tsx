import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "../auth/SignInButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

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
        {!session?.user && (
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

        {session?.user && (
          <>
            <div className="flex gap-4">
              <SignInButton />
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
