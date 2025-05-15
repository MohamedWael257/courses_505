"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React from "react";
import LocalePath from "@/shared/LocalePath";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";

export default function Discover({ Discover, hidden = false }: any) {
  const t = useTranslations("Text");
  const locale = useLocale();

  return (
    <>
      <section className="container py-10 ">
        {!hidden && (
          <div className="flex gap-4 items-center mb-4">
            <div className="flex-1" data-aos="fade-right">
              <h2 className="capitalize text-darkprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
                {t("multidiscover")}
              </h2>
            </div>
            <LocalePath
              className=" w-fit flex items-center gap-2   font-semibold text-base   leading-5 text-center whitespace-nowrap text-primary  transition-colors"
              href="/categories"
              data-aos="fade-left"
            >
              {t("show_more")}
              <RiArrowLeftSLine
                className={`${locale == "ar" ? "" : "rotate-180"}`}
                size={25}
              />
            </LocalePath>
          </div>
        )}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-6 gap-4">
          {Discover?.map((item: any, index: number) => {
            return (
              <LocalePath
                key={`category_${index}`}
                href={`/categories/${item.slug}?main_category=${item.id}`}
                data-aos="zoom-in"
              >
                <div className="col-span-1 grid grid-cols-2 gap-6 justify-betwwen items-center p-4 rounded-xl border-[1px] border-[#F3F3F3] bg-[linear-gradient(161.9deg,rgba(255,255,255,0.4)_26.42%,rgba(215,174,234,0.068)_97.97%)]">
                  <h2 className="text-sm md:text-xl font-semibold md:leading-7 text-start text-darkprimary ">
                    {item?.title}
                  </h2>
                  <ImageWithFallback
                    src={item?.image?.media}
                    width={1790}
                    height={900}
                    className="w-[200px] md:h-[125px] h-[70px] object-coverr "
                    alt="hero"
                  />
                </div>
              </LocalePath>
            );
          })}
        </div>
      </section>
    </>
  );
}
