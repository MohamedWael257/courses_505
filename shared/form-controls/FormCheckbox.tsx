import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/shared/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

export interface FormCheckboxProps extends CheckboxProps {
  label?: React.ReactNode;
  name: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  className,
  required,
  ...props
}) => {
  const form = useFormContext();
  const {
    formState: { errors },
  } = form;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <label
              htmlFor={name}
              className={`${
                errors[name] && errors[name] ? "border border-[#ef233c]" : ""
              } flex items-center gap-2 text-sm font-medium   leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2`}
            >
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                required={required ? true : false}
                className={className}
              />
              <span className="-mt-[3px]">{label}</span>
            </label>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
