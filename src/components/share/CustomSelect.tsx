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
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder,
  name,
  control,
  rules,
  error,
  required
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-800 font-medium"> {label} {required && <span className="text-red-500">*</span>}</label> 
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full border rounded-md px-4  bg-white text-base focus:outline-primary">
                <SelectValue
                  placeholder={placeholder}
                />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {options.map((option) => (
                  <SelectItem
                    className={`hover:bg-background ${field.value === option.value && "bg-background"}`}
                    key={option.value}
                    value={option.value}
                  >
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
