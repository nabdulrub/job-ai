import { getAuthSession } from "@/lib/nextauth"
import { NextResponse } from "next/server"

export default async function isUserAuthentication() {
  const session = await getAuthSession()

  if (!session?.user)
    return NextResponse.json(
      { messsage: "User Unauthenticated!" },
      { status: 401 }
    )
}
