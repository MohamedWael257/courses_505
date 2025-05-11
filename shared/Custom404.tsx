import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Cute from "@/public/assets/images/cuate.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import ErrorButton from "./buttons/ErrorButton";

export default function Custom404() {
  const t = useTranslations();
  return (
    <div className="containerr h-fit grid items-center py-8">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={Cute}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}
        <h2 className="text-center font-bold text-2xl my-4  ">
          {t("page not found")}
        </h2>
        <h2 className="text-center lg:w-[40%] w-3/4 mx-auto font-bold text-2xl my-4 text-sub">
          {t("something went wrong")}
        </h2>
        <ErrorButton title={t("Back to home")} link="/" />

        {/* </div> */}
      </div>
    </div>
  );
}
