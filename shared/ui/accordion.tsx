import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";

import { cn } from "@/utils/helpers";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  iconColor?: string;
  iconWidth?: string;
  showIcon?: boolean;
};
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, iconColor, iconWidth, showIcon, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      // [&[data-state=open]>svg]:bg-[#965C221a] [&[data-state=open]>svg]:p-1 [&[data-state=open]>svg]:rounded-lg
      className={cn(
        "flex flex-1 items-center  py-4 font-medium transition-all ",
        showIcon
          ? "[&[data-state=open]>svg.icon-open]:block [&[data-state=open]>svg.icon-closed]:hidden [&[data-state=closed]>svg.icon-open]:hidden [&[data-state=closed]>svg.icon-closed]:block"
          : "justify-between [&[data-state=open]>svg]:rotate-180 ",
        className
      )}
      {...props}
    >
      {showIcon && (
        <>
          <Minus
            className={cn(
              "icon-open h-6 w-6 text-error shrink-0 transition-transform duration-200 mx-4"
            )}
          />
          <Plus
            className={cn(
              "icon-closed h-6 w-6 text-error shrink-0 transition-transform duration-200 mx-4"
            )}
          />
        </>
      )}
      {children}

      {!showIcon && (
        <ChevronDown
          className={`${
            iconWidth ? `h-${iconWidth} w-${iconWidth}` : "h-6 w-6"
          } ${
            iconColor ? `text-[#${iconColor}]` : "text-[#965C22]"
          } shrink-0 transition-transform duration-200`}
        />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
