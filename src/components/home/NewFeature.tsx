import { ArrowRight } from "lucide-react";

type NewFeatureProps = {
  title?: string;
  feature?: string;
};

const NewFeature = ({
  title = "New Feature",
  feature = "Tailored cover letters in seconds",
}: NewFeatureProps) => {
  return (
    <div className="flex gap-1 border-2 border-gray-400 w-fit px-1 rounded-xl items-center justify-center text-sm text-gray-800 group pr-2">
      <div className="flex items-center justify-center border-2 border-gray-400 my-1 px-2 rounded-lg group-hover:bg-black group-hover:text-white transition-all duration-300">
        <h3>{title}</h3>
        <ArrowRight className="w-4 h-4" />
      </div>
      <div>
        <p>{feature}</p>
      </div>
    </div>
  );
};

export default NewFeature;
