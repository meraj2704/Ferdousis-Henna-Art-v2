"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, FieldError, Control } from "react-hook-form";

interface CustomComboboxProps {
  label: string;
  options?: { label: string; value: string }[];
  placeholder: string;
  name: string;
  control: Control<any>;
  rules?: object;
  error?: FieldError;
  required?: boolean;
  setData?: any;
  disabled?: boolean;
}

const CustomCombobox: React.FC<CustomComboboxProps> = ({
  label,
  options,
  placeholder,
  name,
  control,
  rules,
  error,
  required,
  setData,
  disabled
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-800 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const [open, setOpen] = useState(false);
          return (
            <Popover open={open} onOpenChange={setOpen} >
              <PopoverTrigger asChild className="bg-background w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between border rounded-md px-4 bg-white text-base focus:outline-primary"
                  disabled={disabled}
                >
                  {field.value
                    ? (options?.find((option) => option.value === field.value) || { label: '' }).label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full bg-background p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${label.toLowerCase()}...`}
                  />
                  <CommandList>
                    <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                    <CommandGroup>
                      {options?.map((option, index) => (
                        <CommandItem
                          key={index}
                          value={option.value}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? "" : currentValue
                            );
                            setOpen(false);
                            setData(option);
                            console.log("currentValue: " + currentValue);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default CustomCombobox;
