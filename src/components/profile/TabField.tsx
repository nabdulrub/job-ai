import React from "react";

type TabFieldProps = {
  label?: string;
  text?: string | number | null;
};

const TabField = ({ label, text }: TabFieldProps) => {
  return (
    <div className="grid gap-1 w-full">
      <label className="font-semibold">{label}</label>
      <p className="border-b-2 border-gray-300">{text}</p>
    </div>
  );
};

export default TabField;
