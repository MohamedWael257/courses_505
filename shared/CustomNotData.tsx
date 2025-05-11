import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NotData from "@/public/assets/images/noData.png";
import ImageWithFallback from "@/shared/ImageWithFallback";

export default function CustomNotData() {
  const t = useTranslations();
  return (
    <div className="containerr h-fit grid items-center py-8">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={NotData}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}

        <h2 className="text-center font-bold text-2xl my-4 text-sub">
          {t("validations.No data available")}
        </h2>
        <LocalePath
          href="/"
          className="base-btn mx-2 flex justify-center mt-5 bg-primary text-white px-16 py-4 rounded-xl"
        >
          {t("Back to home")}
        </LocalePath>

        {/* </div> */}
      </div>
    </div>
  );
}
