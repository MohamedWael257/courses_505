import * as React from "react";
import { cn } from "@/utils/helpers";
import { useTranslations } from "next-intl";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: { message?: string } | null;
  placeholder?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, error, ...props }, ref) => {
    const t = useTranslations("LABELS");

    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:underline-offset-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error && error?.message && "border border-[#ef233c]"
        )}
        placeholder={placeholder ? t(placeholder) : ""}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
