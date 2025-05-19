import React from "react";
import { useFormContext } from "react-hook-form";
import Select, { Props } from "react-select";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useTranslations } from "next-intl";
interface FormSelectProps extends Props {
  options: { label: string; value: string }[];
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  [x: string]: any;
}

const FormSelect: React.FC<FormSelectProps> = ({
  options,
  name,
  label,
  value,
  defaultValue,
  customStyle,
  showRequired,
  onChange,
  placeholder,
  ...props
}) => {
  const form = useFormContext();
  const t = useTranslations("LABELS");
  const {
    formState: { errors },
  } = form;
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "100%",
      minHeight: "58px",
      backgroundColor: "#ffffff",
      borderColor:
        errors[name] && errors[name]?.message
          ? "#ef233c"
          : customStyle
          ? "#e2e8f0"
          : "#FCFCFB",
      borderRadius: "9999px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px", // 👈 Change this to desired size
      color: "#2d2d2db2", // Optional: placeholder color
    }),
  };

  const defualutStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "100%",
      minHeight: "58px",
      backgroundColor: "#ffffff",
      borderColor: "#FCFCFB",
      borderRadius: "9999px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px", // 👈 Apply consistent size here too
      color: "#2d2d2db2",
    }),
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            {label && (
              <FormLabel className=" text-secondary font-medium text-lg leading-6 my-2  px-2">
                {showRequired && <span className="text-error">*</span>}
                {t(label)}{" "}
              </FormLabel>
            )}
          </div>

          <Select
            {...field}
            options={options}
            onChange={(option) => {
              //@ts-ignore
              form.setValue(name, option.value as string);
            }}
            styles={customStyle ? customStyles : defualutStyles}
            defaultValue={options.find((option) => option.value == field.value)}
            value={options.find((option) => option.value == field.value)}
            placeholder={t(placeholder)}
            {...props}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
