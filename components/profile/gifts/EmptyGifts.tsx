"use client";
import React from "react";
import Gifts from "@/assets/images/gifts.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
const EmptyGifts = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div>
        {/* transactions Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ImageWithFallback
              src={Gifts}
              width={900}
              height={900}
              className="w-[120px] h-[120px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="lg:text-2xl text-xl font-bold   leading-8 mb-2 text-center">
          {t("Text.emptyGifts")}
        </h2>

        <p className=" mx-auto  text-[#6A6A6A] text-center text-lg font-medium   leading-6 text- mb-6">
          {t("Text.emptyGiftsDesc")}
        </p>
      </div>
    </div>
  );
};

export default EmptyGifts;
