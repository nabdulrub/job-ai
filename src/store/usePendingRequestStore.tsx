import { create } from "zustand"

type usePendingRequestStoreType = {
  isPending: boolean
  setPending: (status: boolean) => void
}

const usePendingRequestStore = create<usePendingRequestStoreType>((set) => ({
  isPending: false,
  setPending: (status: boolean) => {
    set({
      isPending: status,
    })
  },
}))

export default usePendingRequestStore
