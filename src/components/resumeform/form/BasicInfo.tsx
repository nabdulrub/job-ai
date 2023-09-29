import Field from "@/components/Field";
import React from "react";

type Props = {
  control: any;
};

const BasicInfo = ({ control }: Props) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <Field
          control={control}
          name="firstname"
          label="First Name"
          inputMode="text"
        />
        <Field
          control={control}
          name="lastname"
          label="Last Name"
          inputMode="text"
        />
        <Field
          control={control}
          name="location"
          label="Location"
          inputMode="text"
        />
        <Field
          control={control}
          name="phone"
          label="Mobile"
          inputMode="tel"
          type="number"
        />
      </div>
    </>
  );
};

export default BasicInfo;
