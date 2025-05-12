import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input, InputProps } from "@/shared/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { useFormContext } from "react-hook-form";

export interface FormInputProps extends InputProps {
  label?: React.ReactNode;
  labelExtra?: React.ReactNode;
  throwErrorCode?: boolean;
  throwErrorCodeMessage?: string;
  labelIcon?: any;
  showRequired?: any;
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  labelExtra,
  throwErrorCode,
  throwErrorCodeMessage,
  labelIcon,
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
          <div className="flex items-center gap-2">
            {labelIcon && labelIcon}
            {label && (
              <FormLabel className=" text-secondary font-medium text-lg   leading-6 my-2  px-2">
                {showRequired && <span className="text-error">*</span>}
                {t(label)}
                {labelExtra && (
                  <span className="text-[14px] text-placeholder mx-2">
                    {`( ${t(`${labelExtra}`)} )`}
                  </span>
                )}
              </FormLabel>
            )}
          </div>
          <FormControl>
            <>
              {throwErrorCode && (
                <p
                  role="alert"
                  style={{ color: "#ef233c " }}
                  className="text-error text-sm rtl:text-end"
                >
                  {throwErrorCode && throwErrorCodeMessage}
                </p>
              )}
              <Input
                error={errors[name]}
                throwErrorCode
                {...field}
                {...props}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
