"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Controller, Control } from "react-hook-form";

// ✅ Use `react-quill-new` instead of `react-quill`
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // Import styles

interface IFieldInfo {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  errors?: any;
  control: Control<any>;
}

const RichTextEditor: React.FC<IFieldInfo> = ({ label, name, placeholder, required, errors, control }) => {
  const [isClient, setIsClient] = useState(false);

  // ✅ Ensure this component runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {/* Label */}
      <label className="text-sm font-medium pb-2 pl-3 text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Prevent rendering on SSR */}
      {isClient ? (
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? `${label} is required` : false }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder || "Write here..."}
              className="bg-white border border-gray-300 rounded-lg mt-2"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["link"],
                  ["clean"],
                ],
              }}
            />
          )}
        />
      ) : (
        <div className="h-40 flex items-center justify-center border border-gray-300 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading editor...</p>
        </div>
      )}

      {/* Error Message */}
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1 ml-3">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default RichTextEditor;
