import React from "react";
import Coupons from "@/assets/images/coupons2.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
const EmptyCoupons = () => {
  const t = useTranslations("Text");
  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div>
        {/* Coupons Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ImageWithFallback
              src={Coupons}
              width={900}
              height={900}
              className="w-[100px] h-[100px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="lg:text-2xl text-xl font-bold   leading-8 mb-2 text-center ">
          {t("noCoupons")}
        </h2>

        <p className=" mx-auto lg:w-3/4  text-[#6A6A6A] text-center text-lg font-medium   leading-6 text- mb-6">
          {t("noCouponsDesc")}
        </p>
      </div>
    </div>
  );
};

export default EmptyCoupons;
