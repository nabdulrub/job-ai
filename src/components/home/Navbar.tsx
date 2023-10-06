import { getAuthSession } from "@/lib/nextauth";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import DashboardNavbar from "../dashboard/DashboardNavbar";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return !session?.user ? (
    <>
      <DesktopNavbar session={session?.user} />
      <MobileNavbar session={session?.user} />
    </>
  ) : (
    <DashboardNavbar session={session?.user} />
  );
};

export default Navbar;
