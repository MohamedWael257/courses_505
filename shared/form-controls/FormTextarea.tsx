import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Textarea, TextareaProps } from "@/shared/ui/textarea";
import { useTranslations } from "next-intl";

interface FormTextareaProps extends TextareaProps {
  label?: React.ReactNode;
  name: string;
  placeholder?: any;
  showRequired?: any;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  showRequired,
  ...props
}) => {
  const form = useFormContext();
  const t = useTranslations("LABELS");
  const {
    formState: { errors },
  } = form;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className=" text-secondary font-medium text-lg   leading-6 my-2 px-2">
              {showRequired && <span className="text-error">*</span>}
              {t(label)}{" "}
            </FormLabel>
          )}
          <FormControl>
            <Textarea error={errors[name]} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
