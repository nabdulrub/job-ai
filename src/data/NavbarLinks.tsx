import { FileText, LayoutDashboard, Search } from "lucide-react"

export const unauthorizedLinks = [
  { title: "Home", path: "/" },
  { title: "Newsletter", path: "#newsletter" },
  { title: "Pricing", path: "/pricing" },
]

export const authorizedLinks = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5" strokeWidth={2.1} />,
  },
  {
    title: "Resumes",
    path: "/all/resumes",
    icon: <FileText className="w-5" strokeWidth={2.1} />,
  },
  {
    title: "Discover",
    path: "/",
    icon: <Search className="w-5" strokeWidth={2.1} />,
  },
]
