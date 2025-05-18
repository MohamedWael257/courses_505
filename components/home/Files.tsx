"use client";
import React from "react";
import GeneralSlider from "@/shared/CarouselSwiper/GeneralSlider";
import LocalePath from "@/shared/LocalePath";
import ProductCard from "@/shared/card/ProductCard";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";
import FilesCard from "@/shared/card/FilesCard";

export default function Files({ files }: any) {
  const t = useTranslations("Text");
  const locale = useLocale();

  return (
    <>
      <section className="container py-16">
        <div className="flex gap-4 items-center mb-6">
          <div className=" flex-1" data-aos="fade-left">
            <h2 className="capitalize text-darkprimary font-bold lg:text-3xl text-xl text-start lg:leading-[50px]   leading-8">
              استكشاف الملفات الرقمية{" "}
            </h2>
          </div>
          <LocalePath
            className=" w-fit border p-3 border-primary rounded-full gap-2   font-semibold text-sm   leading-5 text-center whitespace-nowrap text-primary  transition-colors "
            href="/"
            dataAos="fade-right"
          >
            المزيد من القوالب
          </LocalePath>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((item, index) => (
            <FilesCard fileData={item} index={index} key={`offer_${index}`} />
          ))}
        </div>
      </section>
    </>
  );
}
