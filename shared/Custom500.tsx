import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Back from "@/public/assets/images/back.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import ErrorButton from "./buttons/ErrorButton";

export default function Custom500() {
  const t = useTranslations();
  return (
    <div className="containerr h-fit grid items-center py-8">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={Back}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}
        <h2 className="text-center font-bold text-2xl  ">
          {t("something went wrongg")}
        </h2>
        <ErrorButton title={t("Back to home")} link="/" />

        {/* </div> */}
      </div>
    </div>
  );
}
