import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, FieldError, Control } from "react-hook-form";

interface CustomSelectProps {
  label: string;
  options: { label: string; value: string }[];
  placeholder: string;
  name: string;
  control: Control<any>; // `any` can be replaced with your form type
  rules?: object;
  error?: FieldError;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder,
  name,
  control,
  rules,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-800 font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full border rounded-md px-4 py-2 bg-white text-base focus:outline-primary">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default CustomSelect;
