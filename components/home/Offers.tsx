"use client";
import React from "react";
import LocalePath from "@/shared/LocalePath";
import ProductCard from "@/shared/card/ProductCard";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";

export default function Offers({ offers }: any) {
  const t = useTranslations("Text");
  const locale = useLocale();
  return (
    <>
      <section className="bg-greynormal">
        <section className="container py-10">
          <div className="flex gap-4 items-center mb-4">
            <div className="flex-1" data-aos="fade-right">
              <h2 className="capitalize text-text font-bold lg:text-2xl md:text-xl text-lg text-start lg:leading-[50px]   leading-8">
                {t("offers")}
              </h2>
            </div>
            <LocalePath
              className=" w-fit flex items-center gap-2   font-semibold text-base   leading-5 text-center whitespace-nowrap text-primary  transition-colors  "
              href="/offers"
              data-aos="fade-left"
            >
              {t("show_more")}

              <RiArrowLeftSLine
                className={`${locale == "ar" ? "" : "rotate-180"}`}
                size={25}
              />
            </LocalePath>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {offers?.map((item: any, index: number) => {
              return (
                <ProductCard
                  productData={item}
                  index={index}
                  key={`offer_${index}`}
                />
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}
