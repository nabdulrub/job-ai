import Landing from "@/components/home/Landing";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user.isNewUser) return redirect("/resume/form");
  if (session?.user.isNewUser === false) return redirect("/dashboard");

  return (
    <>
      <Landing />
    </>
  );
}
