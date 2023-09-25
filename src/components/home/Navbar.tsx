import { getAuthSession } from "@/lib/nextauth";
import SignInButton from "../auth/SignInButton";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <nav className="flex justify-between">
      <div className="flex gap-8 items-center">
        <h2 className="font-bold text-xl">Job AI</h2>
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
        <Link href={"/signin"}>
          <Button variant={"outline"} title="Already have an account?">
            Login
          </Button>
        </Link>
        <Link href={"/register"}>
          <Button title="Sign up now!">Sign up</Button>
        </Link>
        {session?.user && <SignInButton />}
      </div>
    </nav>
  );
};

export default Navbar;
