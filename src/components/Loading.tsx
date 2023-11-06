import { Loader2 } from "lucide-react"
import React from "react"

type Props = {}

const Loading = (props: Props) => {
  return <Loader2 size={75} className="animate-spin" />
}

export default Loading
