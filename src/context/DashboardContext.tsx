import { ReactNode, createContext, useContext, useState } from "react"

type Props = {
  children: ReactNode
}

type DashboardContextProps = {
  isCreatingResume: boolean
  setIsCreatingResume: (isCreatingResume: boolean) => void
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined)

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)

  if (!context) {
    throw new Error("useDashboardContext must be used with in DashboardContext")
  }

  return context
}

const DashboardInfo = ({ children }: Props) => {
  const [isCreatingResume, setIsCreatingResume] = useState<boolean>(false)

  return (
    <DashboardContext.Provider
      value={{ isCreatingResume, setIsCreatingResume }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardInfo
