import Landing from "@/components/home/Landing";
import { tailorJob } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
  const session = await getAuthSession();

  console.log(session?.user);

  return (
    <>
      <Landing />
    </>
  );
}
