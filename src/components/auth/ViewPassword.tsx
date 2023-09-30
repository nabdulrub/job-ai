"use client";

import { Eye, EyeOff } from "lucide-react";

type Props = {
  view: boolean;
  setView: ((view: boolean) => void) | undefined;
};

const ViewPassword = ({ view, setView }: Props) => {
  return view && setView ? (
    <EyeOff
      strokeWidth={1}
      onClick={() => (view ? setView(false) : setView(true))}
      className="absolute right-4 top-2 w-5 h-5 cursor-pointer"
    />
  ) : (
    <Eye
      strokeWidth={1}
      onClick={() => (view && setView ? setView(false) : setView(true))}
      className="absolute right-4 top-2 w-5 h-5 cursor-pointer"
    />
  );
};

export default ViewPassword;
