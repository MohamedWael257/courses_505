import React from "react";

import { useRouter } from "next/router";
import {
  Pagination as SharedPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useLocale, useTranslations } from "next-intl";

const AppPagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  totalPage,
}: any) => {
  // const { t } = useTranslation(["global"]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastPage = totalPages;
  const t = useTranslations("BUTTONS");
  const locale = useLocale();

  // Logic for getting the pages to show
  const getPager = () => {
    let pagesToShow = 3;
    let startsFromNumber;
    let pages = [];

    if (totalPages <= pagesToShow) {
      startsFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startsFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startsFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startsFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }

    // Add the first page only if currentPage is greater than 2
    if (currentPage > 2) {
      pages.push(1);
    }

    // Add "..." if there are more pages beyond the first shown page
    if (startsFromNumber > 2) {
      pages.push(<span key="ellipsis">...</span>);
    }

    // Add the middle pages
    for (let i = startsFromNumber; i < startsFromNumber + pagesToShow; i++) {
      pages.push(i);
    }

    // Add "..." if there are more pages beyond the last shown page
    if (totalPages > startsFromNumber + pagesToShow - 1) {
      pages.push(<span key="ellipsis">...</span>);
    }

    // Add the last page if it's not already shown
    if (totalPages !== pages[pages.length - 1]) {
      pages.push(totalPages);
    }
    // return pages;
    return Array.from(new Set(pages)); // Convert Set to Array
  };

  const pager = getPager();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <>
      <SharedPagination dir={locale === "ar" ? "rtl" : "ltr"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              //@ts-ignore
              label={t("previous")}
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
              className={`min-h-[50px] rounded-full bg-white border-[rgba(210, 53, 52, 0.10)] border-solid border-[1px] hover:cursor-pointer ${
                currentPage === 1 &&
                "!cursor-not-allowed !text-primary !border-primary"
              }`}
            />
          </PaginationItem>

          {pager.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {typeof pageNumber === "number" ? (
                <PaginationLink
                  onClick={() => paginate(pageNumber)}
                  className={`${
                    pageNumber === currentPage
                      ? "!bg-primary !text-[#ffffff] !pointer-events-none"
                      : "bg-white border-[#F1F1FF] border-solid border-[1px]"
                  } rounded-full min-h-[50px]   text-[#BCBCBC] font-[Din-Next-bold,sans-serif] w-[50px] hover:bg-white hover:text-primaryLight hover:border-primaryLight hover:cursor-pointer`}
                >
                  {pageNumber}
                </PaginationLink>
              ) : (
                <PaginationEllipsis>{pageNumber}</PaginationEllipsis>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                paginate(
                  totalPage === currentPage ? totalPage : currentPage + 1
                )
              }
              // @ts-ignore
              label={t("next")}
              className={`min-h-[50px] rounded-full bg-white border-[rgba(210, 53, 52, 0.10)] border-solid border-[1px] hover:cursor-pointer ${
                totalPage === currentPage &&
                "!cursor-not-allowed !text-primary !border-primary"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </SharedPagination>
    </>
  );
};

export default AppPagination;
