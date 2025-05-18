import React from "react";
import Heart from "@/assets/images/heart.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
const EmptyFavourits = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[400px] bg-white">
      <div>
        {/* Heart Icon */}
        <div className="flex justify-center mb-4">
          <div className=" p-4 rounded-full">
            <ImageWithFallback
              src={Heart}
              width={1790}
              height={900}
              className="w-[169px] h-[206px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="md:text-2xl text-xl   leading-10 text-darkprimary font-bold  mb-2 text-center w-3/4 mx-auto">
          {t("Text.readyToSaveYourProductsToFavourits")}
        </h2>
      </div>
    </div>
  );
};

export default EmptyFavourits;
