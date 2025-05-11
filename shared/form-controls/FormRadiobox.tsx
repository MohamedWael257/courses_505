import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

export interface FormRadioBoxProps {
  label?: React.ReactNode;
  name: string;
  options: { value: string; label: React.ReactNode }[];
  required?: boolean;
}

const FormRadioBox: React.FC<FormRadioBoxProps> = ({
  name,
  label,
  options,
  required,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col gap-2"
            >
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm font-medium   leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2"
                >
                  <RadioGroupItem value={option.value} required={required} />
                  <span>{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormRadioBox;
