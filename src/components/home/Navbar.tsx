import { getAuthSession } from "@/lib/nextauth";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <>
      <DesktopNavbar session={session?.user} />
      <MobileNavbar session={session?.user} />
    </>
  );
};

export default Navbar;
