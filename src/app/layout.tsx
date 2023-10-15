import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/home/Navbar"
import Providers from "@/components/Providers"
import Footer from "@/components/home/Footer"
import MobileNavbar from "@/components/home/MobileNavbar"
import { Analytics } from "@vercel/analytics/react"
import { getAuthSession } from "@/lib/nextauth"
import { Toaster } from "@/components/ui/toaster"
import { headers } from "next/headers"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job AI",
  description: "Applying to Jobs Simplified!",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

  return (
    <html lang="en">
      <body className={cn(inter.className, "relative mx-auto max-w-[120rem]")}>
        <Providers>
          <Navbar />
          <div className="flex">
            {session?.user && <DashboardNavbar />}
            <div
              className={`flex-1 ${
                session?.user && "mt-16 px-4 md:mt-0 md:px-0"
              }`}
            >
              {children}
            </div>
          </div>
          <Toaster />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
