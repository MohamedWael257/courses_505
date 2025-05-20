"use client";
import React, { useRef } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import course from "@/assets/test.jpg";
import EmptyDownloads from "./EmptyDownloads";
import AppPagination from "@/shared/Pagination/AppPagination";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { updateURLParams } from "@/utils/helpers";

type Props = {
  downloads: any;
  pagination: any;
  current_page: number;
};

export default function DownloadsIndex({
  downloads,
  pagination,
  current_page,
}: Props) {
  const locale = useLocale();
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
    <>
      <div ref={containerRef}>
        <h2 className="text-xl font-bold mb-4 text-start text-darkprimary   leading-8">
          التنزيلات (0)
        </h2>
        {/* {downloads?.length > 0 ? (
        <> */}
        <div className="grid gap-6 items-center">
          {[...Array(3)].map((item: any, index) => (
            <div className="grid grid-cols-3 gap-4 items-center border-b border-b-secprimary py-2 ">
              <div className="grid grid-cols-[auto_1fr] gap-4 items-center col-span-2">
                <ImageWithFallback
                  src={course}
                  width={900}
                  height={900}
                  className="w-[150px] h-[100px] object-cover rounded-2xl"
                  alt="hero"
                />
                <h2 className="text-lg font-medium text-start text-darkprimary   leading-6 break-words">
                  ملف عرض تقديمي للشمول المالي للسنه
                </h2>
              </div>
              <button className="text-center w-fit flex items-center justify-end gap-2 mx-auto px-5 py-3 bg-secprimary text-primary font-medium rounded-full text-base  shadow-md">
                تحميل
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0059 0.5C11.5581 0.5 12.0059 0.947715 12.0059 1.5V9.00004L12.5884 9.00002C12.764 8.99989 12.9797 8.99974 13.1561 9.02181L13.1595 9.02223C13.2859 9.03799 13.862 9.10983 14.1363 9.67543C14.4113 10.2422 14.1093 10.7424 14.044 10.8506L14.0416 10.8546C13.9494 11.0077 13.8152 11.1785 13.7049 11.3191L13.6812 11.3493C13.3865 11.7252 13.0046 12.2094 12.6241 12.6004C12.4343 12.7955 12.217 12.9967 11.9861 13.1556C11.7809 13.2968 11.4307 13.5 11 13.5C10.5693 13.5 10.2191 13.2968 10.0139 13.1556C9.78297 12.9967 9.56571 12.7955 9.37588 12.6004C8.99545 12.2094 8.61348 11.7252 8.31885 11.3493L8.29511 11.3191C8.18477 11.1785 8.05062 11.0076 7.95841 10.8546L7.95597 10.8506C7.89065 10.7424 7.58872 10.2423 7.86368 9.67543C8.13804 9.10983 8.71408 9.03799 8.84053 9.02223L8.84387 9.02181C9.02031 8.99974 9.23596 8.99989 9.4116 9.00002L10.0059 9.00004V1.5C10.0059 0.947715 10.4536 0.5 11.0059 0.5Z"
                    fill="#4F008C"
                  />
                  <path
                    d="M4.78581 8.49937C5.33774 8.47963 5.76916 8.0162 5.74942 7.46427C5.72968 6.91233 5.26625 6.48091 4.71431 6.50065C2.21694 6.58998 -0.0721684 8.49245 0.00174217 11.2115C0.0186841 11.8348 0.244458 12.5541 0.566364 13.5796L0.619183 13.748C1.55688 16.7399 3.24993 19.6815 7.18007 20.3752C7.8879 20.5002 8.66774 20.5001 9.95881 20.5H12.0413C13.3324 20.5001 14.1122 20.5002 14.82 20.3752C18.7502 19.6815 20.4432 16.7399 21.3809 13.748L21.4337 13.5796C21.7556 12.5541 21.9814 11.8348 21.9984 11.2115C22.0723 8.49244 19.7832 6.58998 17.2858 6.50065C16.7338 6.48091 16.2704 6.91233 16.2507 7.46427C16.2309 8.0162 16.6624 8.47963 17.2143 8.49937C18.8323 8.55725 20.0376 9.7414 19.9991 11.1572C19.9908 11.4624 19.8679 11.8879 19.4725 13.1498C18.6165 15.8809 17.2951 17.9074 14.4724 18.4057C13.959 18.4963 13.3662 18.5 11.9303 18.5H10.0698C8.63393 18.5 8.04115 18.4963 7.52773 18.4057C4.70497 17.9074 3.38358 15.8809 2.52765 13.1498C2.13216 11.8879 2.0093 11.4624 2.001 11.1572C1.96252 9.7414 3.16777 8.55725 4.78581 8.49937Z"
                    fill="#4F008C"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* </>
      ) : (
        <EmptyDownloads />
      )} */}

        {downloads && downloads.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={pagination?.per_page}
              totalItems={pagination?.total}
              totalPage={pagination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
    </>
  );
}
