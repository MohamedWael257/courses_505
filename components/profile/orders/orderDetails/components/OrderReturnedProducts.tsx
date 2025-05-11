"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
type Props = {
  products: any;
  vendor: any;
};

export default function OrderReturnedProducts({ products, vendor }: Props) {
  const t = useTranslations("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4">
        <h2 className="text-lg text-text font-bold mb-4 text-start">
          {t("Text.orderProductsReturn", { count: `${products?.length}` })}
        </h2>

        {products?.map((ele: any, index: number) => {
          return (
            <div
              key={index}
              className="border-b-[1px] pb-3 mb-3 border-greynormal"
            >
              <div className="flex items-center gap-3 mb-2 ">
                <div className="bg-greynormal p-3 rounded-xl flex justify-center items-center">
                  <ImageWithFallback
                    src={ele?.image?.media}
                    alt={"image"}
                    width={800}
                    height={800}
                    className="w-[80px] h-[80px] object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-base font-normal   leading-4 text-start text-secondrydark">
                    {vendor?.username}
                  </p>
                  <p className="text-lg font-medium   leading-6 line-clamp-1 text-start text-text">
                    {ele?.brand?.name}
                  </p>
                  <p className="text-base font-normal    leading-4 text-start text-secondrydark">
                    {ele?.name}
                  </p>{" "}
                  <div className="flex gap-2">
                    <p className="text-lg text-text font-semibold   leading-5">
                      {ele?.price_after_discount > 0
                        ? ele?.price_after_discount
                        : ele?.unit_price}{" "}
                      {t("Text.SR")}
                    </p>
                    {ele?.price_after_discount > 0 && (
                      <p className="text-lg text-secondrydark font-normal line-through">
                        {ele?.unit_price} {"  "}
                        {t("Text.SR")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
