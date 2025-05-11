import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Cute from "@/public/assets/images/cuate.png";
import ImageWithFallback from "@/shared/ImageWithFallback";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="containerr h-screen grid items-center">
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
        <h2 className="text-center font-bold text-2xl my-4 text-textgrey">
          {t("something went wrong")}
        </h2>
        <div className="flex justify-center mt-5 bg-primary text-white px-16 py-4 rounded-xl">
          <LocalePath href="/" className="base-btn mx-2">
            {t("Back to home")}
          </LocalePath>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
