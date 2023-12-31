import { getAuthSession } from "@/lib/nextauth"
import DesktopNavbar from "./DesktopNavbar"
import MobileNavbar from "./MobileNavbar"
import DashboardNavbar from "../dashboard/DashboardNavbar"
import DashboardMobileNavbar from "../dashboard/DashboardMobileNavbar"

type Props = {}

const Navbar = async (props: Props) => {
  const session = await getAuthSession()

  return !session?.user ? (
    <>
      <MobileNavbar session={session?.user} />
      <DesktopNavbar session={session?.user} />
    </>
  ) : (
    <>
      <DesktopNavbar session={session?.user} />
      <DashboardMobileNavbar />
    </>
  )
}

export default Navbar
