import Loading from "@/components/Loading"

type Props = {}

const loading = (props: Props) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Loading />
    </div>
  )
}

export default loading
