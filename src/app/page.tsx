import Landing from "@/components/home/Landing";
import { tailorJob } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) return redirect("/dashboard");

  return (
    <>
      <Landing />
    </>
  );
}
