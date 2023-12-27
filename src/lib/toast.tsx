import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"

type ToastPreferences = {
  title: string
  description?: string
  actionText?: string
  duration?: number
  variant?: "default" | "destructive"
}

export const handleToast = (preferences: ToastPreferences) => {
  const { title, variant, description, actionText, duration } = preferences

  toast({
    title: title,
    variant: variant,
    description: description,
    duration: duration ? duration : 2000,
    action: actionText ? (
      <ToastAction
        altText="Back to form"
        className={`${
          variant === "destructive" ? "bg-red-800" : "bg-green-800"
        } text-white hover:text-black`}
      >
        {actionText}
      </ToastAction>
    ) : undefined,
  })
}
