"use client"

import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import DeleteButton from "../profile/partials/DeleteButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

type Props = {
  id: string
}

const RecentOptions = ({ id }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={`absolute right-4 top-2 ${
          open ? "text-gray-300" : null
        } cursor-pointer text-white transition-all duration-200 hover:text-gray-300`}
      >
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DeleteButton
          generatedResume
          className="h-7 w-full bg-gray-300 text-gray-800 hover:text-white"
          id={id}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RecentOptions
