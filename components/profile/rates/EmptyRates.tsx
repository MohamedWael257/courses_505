"use client";
import React from "react";
import Stars from "@/assets/images/stars.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
const EmptyRates = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div>
        {/* Stars Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ImageWithFallback
              src={Stars}
              width={900}
              height={900}
              className="w-[100px] h-[100px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="lg:text-2xl text-xl font-bold   leading-8 mb-2 text-center">
          {t("Text.emptyRates")}
        </h2>

        <p className=" mx-auto  text-[#6A6A6A] text-center text-lg font-medium   leading-6 text- mb-6">
          {t("Text.emptyRatesDesc")}
        </p>

        <LocalePath
          href={"/"}
          className="text-center w-fit flex mx-auto px-12 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          {t("BUTTONS.continueShopping")}
        </LocalePath>
      </div>
    </div>
  );
};

export default EmptyRates;
