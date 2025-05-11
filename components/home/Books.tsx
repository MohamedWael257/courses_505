"use client";
import BooksCard from "@/shared/card/BooksCard";
import CoursesCard from "@/shared/card/CoursesCard";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  books: any;
};

export default function Books({ books }: Props) {
  const t = useTranslations("Text");

  return (
    <>
      <section className="container py-16">
        <div className="flex gap-4 items-center mb-6">
          <div className=" flex-1" data-aos="fade-right">
            <h2 className="capitalize text-text font-bold lg:text-3xl text-xl text-start lg:leading-[50px]   leading-8">
              استكشف كتبنا المميزة
            </h2>
          </div>
          <LocalePath
            className=" w-fit border p-3 border-primary rounded-full gap-2   font-semibold text-sm   leading-5 text-center whitespace-nowrap text-primary  transition-colors "
            href="/"
            data-aos="fade-left"
          >
            المزيد من الكتب
          </LocalePath>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
          {[...Array(2)].map((item, index) => (
            <BooksCard bookData={item} index={index} key={`book_${index}`} />
          ))}
        </div>
      </section>
    </>
  );
}
