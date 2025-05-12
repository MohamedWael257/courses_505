"use client";
import React, { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslations } from "next-intl";
import SortFilterElement from "./SortFilterElement";
import { usePathname, useRouter } from "next/navigation";
import AppPagination from "@/shared/Pagination/AppPagination";
import StoreCard from "@/shared/card/StoreCard";
type Props = {
  data: any;
  paggination?: any;
  current_page: any;
  type?: "course" | "book";
};

export default function OffersProductDetails({
  data,
  paggination,
  current_page,
  type,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

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
  };
  return (
    <>
      <div
        ref={containerRef} // Attach the ref here
        className={`grid grid-cols-1 "md:grid-cols-2 lg:grid-cols-3  gap-6 `}
      >
        {/* {data?.map((item: any, index: number) => {
          return (
            <CoursesCard
              courseData={item}
              index={index}
              key={`course_${index}`}
            />
          );
        })} */}
        {[...Array(6)].map((item, index) => (
          <StoreCard
            type={type}
            data={item}
            index={index}
            key={`course_${index}`}
          />
        ))}
      </div>
      {data && data.length > 0 && (
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
    </>
  );
}
