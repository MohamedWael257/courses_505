import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Front from "@/public/assets/images/front.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import ErrorButton from "./buttons/ErrorButton";

export default function Custom400() {
  const t = useTranslations();
  return (
    <div className="containerr h-screen grid items-center">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={Front}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}

        <h2 className="text-center lg:w-[40%] w-3/4 mx-auto font-bold text-2xl my-4 text-darkprimarygrey">
          {t(
            "Access to the page or resource you were trying to access is blocked"
          )}
        </h2>
        <ErrorButton title={t("Back to home")} link="/" />
        {/* </div> */}
      </div>
    </div>
  );
}
