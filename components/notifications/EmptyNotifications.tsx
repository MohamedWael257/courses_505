import React from "react";
import Bell from "@/assets/images/bell.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
const EmptyNotifications = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[450px]">
      <div>
        {/* bell Icon */}
        <div className="flex justify-center ">
          <ImageWithFallback
            src={Bell}
            width={1790}
            height={900}
            className="w-[100px] h-[100px] object-contain mb-2  "
            alt="hero"
          />
        </div>

        <h2 className="md:text-2xl text-xl   leading-8 text-darkprimary font-bold  mb-2 text-center">
          {t("Text.noNotifications")}
        </h2>
      </div>
    </div>
  );
};

export default EmptyNotifications;
