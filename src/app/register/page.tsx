import RegisterForm from "@/components/auth/RegisterForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Register = async (props: Props) => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;
