import Landing from "@/components/home/Landing";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <Landing />
    </>
  );
}
