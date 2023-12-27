import { create } from "zustand"

type CompletedStep = {
  step: number
  completed: boolean
}

type useFormStepStoreType = {
  activeStep: number
  status: CompletedStep[]
  setComplete: () => void
  nextStep: () => void
  previousStep: () => void
}

const initialStatus = [
  { step: 0, completed: false },
  { step: 1, completed: false },
  { step: 2, completed: false },
  { step: 3, completed: false },
]

const useFormStepStore = create<useFormStepStoreType>((set, get) => ({
  activeStep: 0,
  status: initialStatus,
  setComplete: () => {
    set((state) => ({
      status: state.status.map((step, index) =>
        step.step === state.activeStep ? { ...step, completed: true } : step
      ),
    }))
  },

  nextStep: () => {
    set((state) => ({
      activeStep:
        state.activeStep < 3 ? state.activeStep + 1 : state.activeStep,
    }))
  },

  previousStep: () => {
    set((state) => ({
      activeStep:
        state.activeStep > 0 ? state.activeStep - 1 : state.activeStep,
    }))
  },
}))

export default useFormStepStore
