"use client";
import React, { useRef, useState } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Rate } from "antd";
import AppPagination from "@/shared/Pagination/AppPagination";
import { updateURLParams } from "@/utils/helpers";

type Props = {
  rates: any;
  current_page: any;
  paggination: any;
};

export default function RatesDetails({
  rates,
  paggination,
  current_page,
}: Props) {
  const t = useTranslations("");
  const colors = ["#03A853", "#98D642", "#F3C221", "#DC8151", "#C54B4B"];
  const desc = [
    t("Text.terrible"),
    t("Text.bad"),
    t("Text.normal"),
    t("Text.good"),
    t("Text.wonderful"),
  ];

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
    // setTimeout(() => {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth", // for smooth scrolling
    //   });
    // }, 500);
  };
  return (
    <>
      <div ref={containerRef} className="space-y-4 bg-white">
        {rates?.map((ele: any, index: number) => {
          return (
            <div
              key={index}
              className={`border-b-[1px] pb-3 ${
                ele?.type == "product"
                  ? "border-greynormal"
                  : "bg-secprimary border-secondrydark"
              } p-4`}
            >
              <h2 className="text-darkprimary xl:text-xl md:text-lg text-base   leading-8 mb-6 font-medium">
                {t(`Text.${ele?.type}_type`)}
              </h2>
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 mb-2 ">
                <div className="bg-greynormal p-3 rounded-xl flex justify-center items-center">
                  <ImageWithFallback
                    src={
                      ele?.type == "product"
                        ? ele?.rateable?.main?.media
                        : ele?.rateable?.logo?.media
                    }
                    alt={"image"}
                    width={800}
                    height={800}
                    className="w-[100px] h-[100px] object-contain"
                  />
                </div>
                {ele?.type == "vendor" && (
                  <div className="flex flex-col gap-2">
                    {/* <LocalePath href={`/merchant/${ele?.rateable?.username}`}>
                      <h3 className="text-base font-medium bg-greynormal text-secondrydark p-3 rounded-lg">
                        {ele?.rateable?.username}
                      </h3>
                    </LocalePath> */}
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-medium   leading-5 text-start text-darkprimary ">
                        {ele?.rateable?.username}
                      </h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: ele?.rateable?.description,
                        }}
                        className="text-base font-normal  leading-6 text-start text-secondrydark line-clamp-2"
                      >
                        {/* {ele?.rateable?.description} */}
                      </p>
                    </div>
                  </div>
                )}
                {ele?.type == "product" && (
                  <div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-normal   leading-4 text-start text-secondrydark">
                        {ele?.rateable?.brand?.name}
                      </p>
                      <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-medium   leading-5 text-start text-darkprimary ">
                          {ele?.rateable?.name}
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ele?.rateable?.description,
                          }}
                          className="text-base font-normal  leading-6 text-start text-secondrydark line-clamp-2"
                        >
                          {/* {ele?.rateable?.description} */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 my-2">
                      <div className="flex  gap-2">
                        <span className=" font-bold text-lg    leading-5 text-start text-darkprimary">
                          {ele?.rateable?.price_after_discount
                            ? ele?.rateable?.price_after_discount
                            : ele?.rateable?.price}
                          {t("Text.SR")}
                        </span>
                        {ele?.rateable?.price_after_discount && (
                          <span className="text-base font-bold     leading-5 text-start text-secondrydark line-through">
                            {ele?.rateable?.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                  <Rate
                    tooltips={desc}
                    className="!text-[#03A853]"
                    allowHalf
                    disabled
                    defaultValue={ele?.rating}
                  />
                </div>{" "}
                <p className="lg:text-2xl text-lg font-semibold text-[#595959]   leading-8">
                  {ele?.avg_rate?.toFixed(1)}
                </p>
              </div>
              <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start lg:w-[80%] ">
                {ele?.review}
              </h2>
            </div>
          );
        })}
      </div>
      {rates && rates.length > 0 && (
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
