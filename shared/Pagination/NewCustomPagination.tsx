/* eslint-disable @next/next/no-img-element */
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

type Props = {
  pagination: any;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  page?: any;
  active?: any;
  currentPage?: any;
  children: any;
};
export default function NewCustomPagination({
  pagination,
  setPage,
  page,
  currentPage,
  active,
  children,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const totalPages = pagination;
  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.unshift(
        <button
          key={i}
          className={`w-12 h-12 font-medium text-lg    leading-7 text-center rounded-full border-2 border-secondrydark ${
            currentPage === i
              ? "bg-secondrydark text-white"
              : "text-secondrydark bg-white hover:bg-secondrydark hover:text-white transition-colors"
          }`}
          onClick={() => handlePaggination(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return buttons.reverse();
  };
  const handlePaggination = (i: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
    setTimeout(() => {
      router.replace(
        `${
          locale === "ar" ? "" : "/en"
        }/${page}?product_type=${active}&page=${i}`,
        {
          scroll: false,
        }
      );
      // setPage(i);
    }, 500); // Adjust the timeout duration as needed
    // setPage(i);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth scrolling
      });
      setTimeout(() => {
        router.replace(
          `${locale == "ar" ? "" : "/en"}/${page}?product_type=${active}&page=${
            currentPage + 1
          }`,
          {
            scroll: false,
          }
        );
        // setPage(page + 1);
      }, 500);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth scrolling
      });
      setTimeout(() => {
        router.replace(
          `${locale === "ar" ? "" : "/en"}/${page}?product_type=${active}&page=${
            currentPage - 1
          }`,
          {
            scroll: false,
          }
        );
        // setPage(page - 1);
      }, 500);
    }
  };

  return (
    <>
      {children}

      {totalPages > 1 && (
        <div className="mt-8 p-4 flex justify-evenly items-center xl:w-1/3 mx-auto">
          <button
            className={`p-2 rounded-full border-2 border-secondrydark ${
              currentPage === 1
                ? "bg-secondrydark text-white cursor-not-allowed"
                : "text-secondrydark bg-white hover:bg-secondrydark hover:text-white transition-colors"
            }`}
            onClick={() => {
              locale == "ar" ? handlePreviousPage() : handlePreviousPage();
            }}
            // disabled={page ===  1 }
          >
            {locale == "ar" ? (
              <MdKeyboardArrowRight size={30} />
            ) : (
              <MdOutlineKeyboardArrowLeft size={30} />
            )}
          </button>
          {renderPagination()}
          <button
            className={`p-2 rounded-full border-2 border-secondrydark ${
              currentPage === totalPages
                ? "bg-secondrydark text-white cursor-not-allowed"
                : "text-secondrydark bg-white hover:bg-secondrydark hover:text-white transition-colors"
            }`}
            onClick={() => {
              locale == "ar" ? handleNextPage() : handleNextPage();
            }}
            // disabled={page === totalPages }
          >
            {locale == "ar" ? (
              <MdOutlineKeyboardArrowLeft size={30} />
            ) : (
              <MdKeyboardArrowRight size={30} />
            )}
          </button>
        </div>
      )}
      <div className="flex justify-center">
        {/* <LocalePath
          href="/our-projects"
          className=" w-fit  text-base font-normal   leading-5 text-center bg-white hover:bg-thirdy transition-colors  whitespace-nowrap text-primary border-[1px] border-primary  hover:border-thirdy px-10 py-2 rounded-full mt-3 sm:mt-0"
        >
          {t("Show moree")}
        </LocalePath> */}
      </div>
    </>
  );
}
