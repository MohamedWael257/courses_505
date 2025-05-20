"use client";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import {
  Accordion as SharedAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import AppPagination from "@/shared/Pagination/AppPagination";
import { usePathname, useRouter } from "next/navigation";
import { updateURLParams } from "@/utils/helpers";
type Props = {
  faqs: {
    question: string;
    answer: string;
  }[];
  current_page: any;
  paggination: any;
};

export default function Faqs({ faqs, current_page, paggination }: Props) {
  const t = useTranslations("");
  const router = useRouter();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage }, router, pathname);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };
  return (
    <div className=" container md:py-10 py-6 ">
      <div ref={containerRef} className="lg:w-[80%] text-start">
        {faqs?.map((ele, index: number) => (
          <SharedAccordion
            type="single"
            className="bg-transparent my-2"
            collapsible
            key={index}
          >
            <AccordionItem
              value={`${ele.question}`}
              className="bg-white  border-b-2 border-b-[#F3F3F3] w-full px-2  transition-[2s_height]"
            >
              <AccordionTrigger
                icon
                className=" w-full  font-medium text-start   leading-6 text-base text-[#7F8995]"
              >
                {ele.question}
              </AccordionTrigger>

              <AccordionContent>{ele.answer}</AccordionContent>
            </AccordionItem>
          </SharedAccordion>
        ))}
        {faqs && faqs.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={paggination?.per_page}
              totalItems={paggination?.total}
              totalPage={paggination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
    </div>
  );
}
