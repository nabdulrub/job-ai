import { ArrowRight } from "lucide-react"

type NewFeatureProps = {
  title?: string
  feature?: string
}

const NewFeature = ({
  title = "New Feature",
  feature = "Tailored cover letters in seconds",
}: NewFeatureProps) => {
  return (
    <div className="group flex w-fit items-center justify-center gap-1 rounded-xl border-2 border-gray-400 bg-white px-1 pr-2 text-sm text-gray-800">
      <div className="my-1 flex items-center justify-center rounded-lg border-2 border-gray-400 bg-white px-2 transition-all duration-300 group-hover:bg-black group-hover:text-white">
        <h3>{title}</h3>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div>
        <p>{feature}</p>
      </div>
    </div>
  )
}

export default NewFeature
