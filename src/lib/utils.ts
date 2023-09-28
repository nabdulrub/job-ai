import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleNext = (setFormStep: (forStep: number) => void) => {
  return setFormStep((prev) => {
    if (prev === 3) {
      return prev;
    }
    return prev + 1;
  });
};

export const handlePrev = (setFormStep: (forStep: number) => void) => {
  return setFormStep((prev) => {
    if (prev === 0) {
      return prev;
    }
    return prev - 1;
  });
};
