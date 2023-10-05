import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

export type CompletedStep = {
  step: number;
  completed: boolean;
};

type YourContextType = {
  isStepCompleted: CompletedStep[];
  setComplete: (formStep: number) => void;
};

export const FormStepContext = createContext<YourContextType | undefined>(
  undefined
);

export const useFormStepContext = () => {
  const context = useContext(FormStepContext);

  if (!context) {
    throw new Error("useFormStepContext must be used with in FormContext");
  }

  return context;
};

const FormSteps = ({ children }: Props) => {
  const [isStepCompleted, setIsStepCompleted] = useState<CompletedStep[]>([
    { step: 0, completed: false },
    { step: 1, completed: false },
    { step: 2, completed: false },
    { step: 3, completed: false },
  ]);

  const setComplete = (formStep: number) => {
    setIsStepCompleted((prevIsStepCompleted) => {
      return prevIsStepCompleted.map((step, index) => {
        if (index === formStep) {
          return { ...step, completed: true };
        } else {
          return step;
        }
      });
    });
  };

  return (
    <FormStepContext.Provider value={{ isStepCompleted, setComplete }}>
      {children}
    </FormStepContext.Provider>
  );
};

export default FormSteps;
