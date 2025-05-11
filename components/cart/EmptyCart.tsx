"use client";
import React from "react";
import Cart from "@/assets/images/cart.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
const EmptyCart = () => {
  const t = useTranslations("Text");
  return (
    <div className="bg-greynormal flex items-center justify-center h-[600px]">
      <div>
        {/* Cart Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full">
            <ImageWithFallback
              src={Cart}
              width={1790}
              height={900}
              className="w-[109px] h-[106px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="md:text-2xl text-xl   leading-8 text-dark font-bold  mb-2 text-center">
          {t("emptyCart")}
        </h2>
        <p className=" mx-auto lg:w-1/2  text-[#6A6A6A] text-center text-base font-medium  leading-8 text- mb-6">
          ابدأ رحلتك في التعلّم الرقمي أو حمّل أدوات تساعدك في تطوير مهاراتك
          وتحقيق أهدافك. تصفّح منتجاتنا التعليمية وابدأ بإضافة ما يناسبك إلى
          سلتك، بخطوات بسيطة ونتائج ملموسة.
        </p>
        <LocalePath
          href={"/"}
          className="text-center w-fit flex mx-auto px-12 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          {t("shopping")}
        </LocalePath>
      </div>
    </div>
  );
};

export default EmptyCart;
