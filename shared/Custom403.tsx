import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Forbidden from "@/public/assets/images/forbidden.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import ErrorButton from "./buttons/ErrorButton";

export default function Custom403() {
  const t = useTranslations();
  return (
    <div className="containerr h-fit grid items-center py-8">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={Forbidden}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}

        {/* <h2 className="text-center font-bold text-2xl my-4 text-sub">
          {t(
            "Access to the page or resource you were trying to access is blocked"
          )}
        </h2> */}
        <ErrorButton title={t("Back to home")} link="/" />

        {/* </div> */}
      </div>
    </div>
  );
}
