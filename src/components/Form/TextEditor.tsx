import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

type TextEditorProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
};

const TextEditor = ({
  name,
  type = "Text",
  label,
  placeholder,
  required = false,
}: TextEditorProps) => {
  const { control } = useFormContext();

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ color: [] }],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    // "code-block",
  ];

  return (
    <div>
      <Label htmlFor={name} className="text-[16px]">
        {label} {required && <span className="text-red-500 font-bold ">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <QuillEditor
              {...field}
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
              modules={quillModules}
              formats={quillFormats}
              className={`mt-1 ${
                error ? "border border-red-400" : "border border-gray-300"
              }`}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextEditor;
