/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ProductCard from "@/shared/card/ProductCard";
import { Tabs, TabsProps } from "antd";
import { Input } from "@/shared/ui/input";
import { IoSearch } from "react-icons/io5";
import BooksCard from "@/shared/card/BooksCard";
import CoursesCard from "@/shared/card/CoursesCard";

type Props = {
  products: any;
  defaultType: any;
  refetch: any;
};
export interface tabs {
  id: number;
  title: string;
  slug: string;
}
export default function FavouritsDetails({
  products,
  defaultType,
  refetch,
}: Props) {
  const t = useTranslations("LABELS");
  const locale = useLocale();
  const router = useRouter();

  const [defaultActiveKey, setDefaultActiveKey] = useState(defaultType);

  const items: TabsProps["items"] = [
    {
      key: "course",
      label: "الدورات",
    },
    {
      key: "book",
      label: "الكتب",
    },
    {
      key: "file",
      label: "الملفات",
    },
  ];

  return (
    <>
      <section className="py-4 ">
        <div className="grid lg:grid-cols-[3fr_1fr] items-center gap-6">
          <Tabs
            defaultActiveKey={defaultActiveKey}
            items={items}
            onChange={(key) => {
              setDefaultActiveKey(key);
              router.replace(`/favourits?category=${key}`, { scroll: false });
            }}
            className="custom-tabs-wrapper lg:w-1/2"
          />
          <Input
            type="text"
            searchCustom
            searchButtonSubmitted
            className="!ps-12 font-medium min-h-[42px] border border-[#eeee] rounded-full placeholder:text-sm"
            leftIcon={
              <IoSearch
                className="text-[#B0B0B0] me-2 cursor-pointer"
                size={25}
              />
            }
            // leftIcon={<SearchIcon />}
            placeholder={t("search")}
          />
        </div>
        <div
          className={`my-6 grid grid-cols-1 ${
            defaultActiveKey == "book"
              ? "lg:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          } gap-4`}
        >
          {defaultActiveKey == "course" ? (
            <>
              {[...Array(3)].map((item, index) => (
                <CoursesCard
                  courseData={item}
                  index={index}
                  key={`course_${index}`}
                />
              ))}
            </>
          ) : defaultActiveKey == "book" ? (
            <>
              {[...Array(3)].map((item, index) => (
                <BooksCard
                  bookData={item}
                  index={index}
                  key={`book_${index}`}
                />
              ))}
            </>
          ) : (
            <>
              {[...Array(3)].map((item, index) => (
                <CoursesCard
                  courseData={item}
                  index={index}
                  key={`course_${index}`}
                />
              ))}
            </>
          )}
        </div>

        {/* {products && products?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products?.map((ele: any, index: number) => {
              return (
                <ProductCard
                  productData={ele}
                  index={index}
                  key={`offer_${index}`}
                  refetch={refetch}
                />
              );
            })}
          </div>
        )} */}
      </section>
    </>
  );
}
