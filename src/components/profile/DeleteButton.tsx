"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { useRouter } from "next/navigation"
import { Delete, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import ButtonLoading from "../ButtonLoading"

type Props = {
  id?: string
  job?: boolean
  project?: boolean
  skill?: boolean
  education?: boolean
  x?: boolean
}

const DeleteButton = ({ id, job, project, skill, education, x }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const url = `/api/${
    job
      ? "job"
      : project
      ? "project"
      : skill
      ? "skills"
      : education
      ? "education"
      : ""
  }`

  const onDelete = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      })
      if (response.ok) {
        toast({
          title: "Record Deleted!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Dismiss
            </ToastAction>
          ),
          duration: 2000,
        })
        setOpen(false)
        router.refresh()
      }

      if (!response.ok) {
        toast({
          title: "Failed to delete!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-800 text-white hover:text-black"
            >
              Dismiss
            </ToastAction>
          ),
          duration: 2000,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {x ? (
          <X className="text-red-800" />
        ) : (
          <Button
            type="button"
            className="w-full flex-1"
            variant={"destructive"}
          >
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-50px)]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogDescription>
            This record will be gone forever!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonLoading
            type="button"
            text="Delete"
            loadingText="Deleting..."
            onClick={onDelete}
            className="mx-auto max-w-[100px]"
            variant="destructive"
            isLoading={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton
