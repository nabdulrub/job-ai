import { FileText, LayoutDashboard, Search } from "lucide-react";

export const unauthorizedLinks = [
  { title: "Home", path: "/" },
  { title: "Newsletter", path: "/" },
  { title: "Pricing", path: "/" },
];

export const authorizedLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="w-5" strokeWidth={2.1} />,
  },
  {
    title: "My Documents",
    path: "/",
    icon: <FileText className="w-5" strokeWidth={2.1} />,
  },
  {
    title: "Search Jobs",
    path: "/",
    icon: <Search className="w-5" strokeWidth={2.1} />,
  },
];
