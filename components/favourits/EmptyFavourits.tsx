import React from "react";
import Heart from "@/assets/images/heart.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
const EmptyFavourits = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[600px]">
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

        <h2 className="md:text-2xl text-xl   leading-8 text-text font-bold  mb-2 text-center">
          {t("Text.readyToSaveYourProductsToFavourits")}
        </h2>

        <p className="w-3/4 mx-auto text-center text-secondrydark md:text-xl text-lg font-medium   leading-6 mb-6">
          {t(
            "Text.clickOnTheHeartIconToAddYourFavoriteProductsToTheWishlistSuccessfully"
          )}
        </p>

        <LocalePath
          href={"/"}
          className="text-center w-fit flex mx-auto px-12 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
        >
          {t("BUTTONS.shopNow")}
        </LocalePath>
      </div>
    </div>
  );
};

export default EmptyFavourits;
