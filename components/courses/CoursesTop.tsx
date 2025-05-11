"use client";
import SortFilterElement from "@/components/offers/SortFilterElement";
import { Input } from "@/shared/ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

type Props = {
  data: any;
};

export default function CoursesTop({ data }: Props) {
  const t = useTranslations();
  return (
    <>
      <div className="bg-white">
        <div className="container py-8">
          <div className="sm:flex gap-4 items-center mb-4">
            <Input
              type="text"
              searchCustom
              searchButtonSubmitted
              className="2xl:w-[350px] xl:w-[275px] lxg:w-[648px] md:w-full !ps-12 font-medium min-h-[42px] border border-[#eeee] rounded-full placeholder:text-sm"
              leftIcon={
                <IoSearch
                  className="text-[#B0B0B0] me-2 cursor-pointer"
                  size={25}
                />
              }
              // leftIcon={<SearchIcon />}
              placeholder={t("ordersSearch")}
            />
            {/* {data?.length > 1 && ( */}
            <div className="relative">
              <SortFilterElement />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
}
