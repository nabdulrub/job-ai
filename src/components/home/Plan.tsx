import { UserSession } from "@/types/type"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Details from "../pricing/Details"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

type PlanProps = {
  isPlan?: boolean
  title?: string
  description?: string
  price?: number
  top?: boolean
  topTitle?: string
  planPage?: boolean
  duration?: "MONTHLY" | "ANNUALLY"
  className?: string
  planId?: string
  session?: UserSession
}

const Plan = ({
  isPlan,
  planPage,
  title,
  description,
  price,
  top = false,
  topTitle,
  duration,
  className,
  planId,
  session,
}: PlanProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const durationCheck =
    duration === "MONTHLY"
      ? "per month"
      : duration === "ANNUALLY"
      ? "per year"
      : null

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      if (!session) return router.push("/signin?auth=signin")

      const response = await fetch("/api/stripe", {
        method: "POST",
        body: JSON.stringify({ planId }),
      })

      const result = await response.json()
      console.log(result)

      if (response.ok) {
        router.push(result.url)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className={className}>
        <div className="flex items-center justify-between px-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              {title}
              {top && (
                <span className="ml-1 rounded-2xl border-2 border-blue-600 px-2 text-sm text-blue-600">
                  {topTitle}
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <h2 className="flex items-start gap-[0.5px] text-5xl font-bold">
              <span className=" text-4xl">$</span>
              {price}
            </h2>
            <p className="ml-4 text-xs">{durationCheck}</p>
          </CardContent>
        </div>
        {planPage ? (
          <CardContent className=" ">
            {" "}
            <Details isStudentPlan={isPlan} />
          </CardContent>
        ) : (
          ""
        )}

        <CardContent className="borde-gray-900 border-t-2 pt-4">
          <Button
            className="w-full border-2 bg-black py-6 transition-all duration-300 hover:border-black hover:bg-white hover:text-black"
            disabled={loading}
          >
            {session ? "Manage Plan" : "Get Started"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default Plan
