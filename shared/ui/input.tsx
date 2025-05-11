import * as React from "react";

import { useTranslations } from "next-intl";
import { cn } from "@/utils/helpers";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  searchCustom?: boolean;
  searchButtonSubmitted?: boolean;
  placeholder?: string;
  fixedWidthIcon?: boolean;
  throwErrorCode?: any;
  error?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon,
      rightIcon,
      searchCustom,
      searchButtonSubmitted,
      placeholder,
      throwErrorCode,
      error,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("LABELS");

    return (
      <div className="relative w-full main-input-container">
        {leftIcon && (
          <span className="absolute ltr:left-0 rtl:right-0 top-1/2 px-4 -translate-y-1/2 ppointer-events-none w-10">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border focus-visible:!outline-none border-input bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground    ",
            className,
            leftIcon ? "ltr:pl-10 rtl:pr-10" : "",
            rightIcon ? "ltr:pr-10 rtl:pl-10" : "",
            // throwErrorCode ? "border border-[#ef233c]" : "",
            error && error?.message ? "border border-[#ef233c]" : ""
          )}
          ref={ref}
          placeholder={t(placeholder)}
          {...props}
        />

        {rightIcon && (
          <span
            className={`absolute ltr:right-[10px] ${
              searchButtonSubmitted && "ltr:!right-0 ltr:!pr-0"
            } ltr:left-[unset] rtl:left-0  top-1/2 -translate-y-1/2 ${
              searchCustom ? "px-0" : "px-2"
            }  ${
              props?.fixedWidthIcon ? "w-max" : "w-10"
            } 
             pr-2 flex rightIcon-input`}
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
