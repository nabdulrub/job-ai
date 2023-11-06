import Loading from "@/components/Loading"
import { Loader2 } from "lucide-react"
import React from "react"

type Props = {}

const loading = (props: Props) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Loading />
    </div>
  )
}

export default loading
