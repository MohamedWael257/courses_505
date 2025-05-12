import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input, InputProps } from "@/shared/ui/input";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DateIcon } from "../Icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
// import "dayjs/locale/ar";
export interface FormInputDateProps extends InputProps {
  label?: React.ReactNode;
  labelExtra?: React.ReactNode;
  labelIcon?: any;
  showRequired?: boolean;
  name: string;
  className?: any;
}

const FormInputDate: React.FC<FormInputDateProps> = ({
  name,
  label,
  labelExtra,
  labelIcon,
  showRequired,
  className,
  ...props
}) => {
  const [dateActive, setDateActive] = useState(false);

  const form = useFormContext();
  const t = useTranslations("LABELS");
  const {
    formState: { errors },
  } = form;
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - 10));
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            {labelIcon && labelIcon}
            {label && (
              <FormLabel className="text-secondary font-medium text-xl   leading-6 my-2 px-2">
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
            <div className="relative app-form">
              <DatePicker
                className="px-5"
                suffixIcon={<DateIcon />}
                placeholder="Select a date"
                onChange={(date: any) => field.onChange(date)}
                name={name}
                allowClear
                format={{ format: "YYYY-MM-DD", type: "mask" }}
                // maxDate={
                //   new Date(
                //     new Date().setFullYear(new Date().getFullYear() - 10)
                //   )
                // }
                maxDate={dayjs(formattedDate)}
                // picker="week"
                // picker="date"
                value={field.value ? dayjs(field.value) : null} // استخدام dayjs لتحويل القيمة
                status={errors[name] && errors[name]?.message && "error"}
              />
              {/* <DatePicker
                open={dateActive}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: any) => field.onChange(date)}
                className={`  rounded-md p-2 w-full  ${className} border ${
                  errors[name] && errors[name]?.message
                    ? "border-[#ef233c]"
                    : ""
                }`}
                onCalendarOpen={() => setDateActive(true)}
                onCalendarClose={() => setDateActive(false)}
                dateFormat="yyyy-MM-dd"
                maxDate={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 10)
                  )
                }
                placeholderText="Select a date"
                isClearable={true}
                name={name}
                icon={<DateIcon className="size-6" />}
                // {...props}
              /> */}
              {/* <DateIcon
                onClick={() => setDateActive(true)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              /> */}
              {/* Icon Positioning */}
            </div>
            {/* <Input type="date" {...field} {...props} /> */}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputDate;
