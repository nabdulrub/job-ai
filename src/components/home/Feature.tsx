import React from "react"

type FeatureProps = {
  icon?: React.ReactNode
  title?: string
  description?: string
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="w-full px-2 md:max-w-[500px] md:p-0 lg:max-w-[300px]">
      <div className="mb-2 w-fit rounded-full bg-gray-50 p-2">
        <div className="rounded-full bg-gray-100 p-[6px]">{icon}</div>
      </div>
      <div className="grid gap-2">
        <p className="text-lg font-extrabold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Feature
