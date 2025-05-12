import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useTranslations } from "next-intl";

type FormCKEditorProps = {
  name: string;
  label?: string;
  labelExtra?: string;
  showRequired?: boolean;
  placeholder?: string;
  className?: string;
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ color: [] }],
      ["clean"],
    ],
    handlers: {
      image: function (this: any) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const range = this.quill.getSelection();
            if (range) {
              this.quill.insertEmbed(range.index, "image", reader.result);
            }
          };
          reader.readAsDataURL(file);
        };
      },
    },
  },
  clipboard: { matchVisual: false },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

const FormCKEditor: React.FC<FormCKEditorProps> = ({
  name,
  label,
  labelExtra,
  showRequired,
  placeholder,
  className = "",
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-secondary font-medium text-lg leading-6 my-2 px-2">
              {showRequired && <span className="text-error">*</span>}
              {label}{" "}
              {labelExtra && (
                <span className="text-sm text-placeholder mx-2">
                  {`( ${labelExtra} )`}
                </span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <ReactQuill
              className={className}
              value={field.value || ""}
              onChange={field.onChange}
              placeholder={placeholder}
              theme="snow"
              modules={modules}
              formats={formats}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCKEditor;
