import React from "react";
import LocalePath from "@/shared/LocalePath";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Unauthorized from "@/public/assets/images/unauthorized.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import ErrorButton from "./buttons/ErrorButton";

export default function Custom401() {
  const t = useTranslations();
  return (
    <div className="containerr h-fit grid items-center py-8">
      <div className="flex justify-center flex-col items-center">
        <ImageWithFallback
          width="500"
          height="500"
          src={Unauthorized}
          alt="not found icon"
          loading="lazy"
        />
        {/* <div className="error_section"> */}

        <h2 className="text-center font-bold text-2xl my-4 text-sub">
          {t("session_expired")}
        </h2>
        <ErrorButton title={t("NAV.login")} link="/auth/login" />
        {/* </div> */}
      </div>
    </div>
  );
}
