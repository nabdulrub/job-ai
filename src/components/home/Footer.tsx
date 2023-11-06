"use client"

import React from "react"
import NewsletterForm from "../NewsletterForm"
import { usePathname } from "next/navigation"
import JobAI from "../JobAI"

type Props = {}

const Footer = (props: Props) => {
  const path = usePathname()

  const home = path === "/"
  const pricing = path === "/pricing"

  const authorizedPaths = home || pricing

  return authorizedPaths ? (
    <footer
      id="newsletter"
      className="relative bottom-0 mt-8 flex w-full flex-col items-center justify-center gap-4 bg-black p-16 text-center text-white"
    >
      <div>
        <JobAI size="lg" />
        <h2 className="mt-4">We are consistently adding new features!</h2>
        <p>Sign up for our newsletter to recieve emails about new features!</p>
      </div>
      <div className="w-full max-w-[400px]">
        <NewsletterForm />
      </div>
      <span className="mt-12 h-[1px] w-full bg-white"></span>
      <div className="mt-4 flex w-full flex-col items-center justify-between text-gray-400 md:flex-row">
        <p>
          © 2023 <JobAI size="sm" className="text-xs" />. All rights reserved.
        </p>
        <ul className="flex gap-4 ">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Cookies</li>
        </ul>
      </div>
    </footer>
  ) : null
}

export default Footer
