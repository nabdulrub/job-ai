import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/home/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/home/Footer";
import MobileNavbar from "@/components/home/MobileNavbar";
import { Analytics } from "@vercel/analytics/react";
import { getAuthSession } from "@/lib/nextauth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job AI",
  description: "Applying to Jobs Simplified!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "max-w-[120rem] mx-auto md:p-8 p-4 relative pb-[200px]"
        )}
      >
        <Providers>
          <Navbar />
          <div className="mt-20">{children}</div>
          <Analytics />
          {!session?.user && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
