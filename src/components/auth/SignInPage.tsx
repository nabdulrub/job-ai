import React from "react"
import SignInForm from "./SignInForm"
import Image from "next/image"
import auth from "../../../public/auth2.png"
import JobAI from "../branding/JobAI"
import AuthTabs from "./AuthTabs"
import { ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <Link href={"/"} className="absolute left-6 top-10 md:left-10">
        <Button variant={"ghost"} className="px-0">
          <ChevronLeft size={40} />
        </Button>
      </Link>
      <div className="-mt-24 flex-1 md:flex-1 lg:flex-[.9]  xl:flex-[0.7]">
        <div className="flex flex-col items-center gap-24">
          <JobAI size="lg" className="font-bold" />
          <div className="grid w-full gap-4">
            <div>
              <p className="text-center text-2xl font-bold">Welcome Back</p>
              <p className="text-center font-thin text-gray-400">
                Hey there! Enter your below details to login
              </p>
            </div>
            <div className="w-full">
              <AuthTabs />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-[0.7] md:block">
        <Image
          src={auth}
          alt="auth"
          className=" h-screen w-full object-cover"
        />
      </div>
    </div>
  )
}

export default SignInPage
