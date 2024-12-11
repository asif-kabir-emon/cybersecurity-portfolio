import React from "react";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";

// Define the type for the MultiSelector props
type MultiSelectorProps = {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  required?: boolean;
};

const MultiSelector = ({
  name,
  options,
  label,
  placeholder = "Select...",
  required = false,
}: MultiSelectorProps) => {
  const { control } = useFormContext();

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? `${label || "This field"} is required` : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              {...field}
              isMulti
              options={options}
              value={field.value}
              onChange={(selected) => field.onChange(selected)}
              classNamePrefix="react-select"
              placeholder={placeholder}
              className="w-full border-black focus:ring-0 focus:ring-black"
              styles={{
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#f3f4f6",
                  borderRadius: "5px",
                  padding: "2px 6px",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#374151",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#9ca3af",
                  ":hover": { color: "#f87171" },
                }),
              }}
            />
            {error && (
              <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MultiSelector;
