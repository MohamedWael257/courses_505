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
  const updateURLParams = (params: { [key: string]: string | null }) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage });
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
    // setTimeout(() => {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth", // for smooth scrolling
    //   });
    // }, 500);
  };
  return (
    <div className=" container md:py-10 py-6">
      <div ref={containerRef} className="lg:w-3/4 text-start">
        {faqs?.map((ele, index: number) => (
          <SharedAccordion
            type="single"
            className="bg-transparent my-2"
            collapsible
            key={index}
          >
            <AccordionItem
              value={`${ele.question}`}
              className="bg-white  border-2 border-[#F3F3F3] w-full px-2 rounded-lg transition-[2s_height]"
            >
              <AccordionTrigger className=" w-full  font-medium text-start   leading-6 text-base text-[#7F8995]">
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
