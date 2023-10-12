import React from "react"
import SignInForm from "./SignInForm"
import Image from "next/image"
import auth from "../../../public/auth2.png"
import JobAI from "../JobAI"
import AuthTabs from "./AuthTabs"

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="-mt-24 flex-1 md:flex-[.9]  lg:flex-[0.7]">
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
      <div className="hidden md:block md:flex-1">
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
