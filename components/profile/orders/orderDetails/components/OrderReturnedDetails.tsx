"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
type Props = {
  returnDetails: any;
};

export default function OrderReturnedDetails({ returnDetails }: Props) {
  const t = useTranslations("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4">
        <h2 className="text-lg text-darkprimary font-bold mb-4 text-start">
          {t("Text.OrderReturnTitle")}
        </h2>
        <p className="text-base font-medium   leading-6 text-secondrydark">
          {returnDetails?.desc}
        </p>
        <img
          alt={t("Text.OrderReturnTitle")}
          src={returnDetails?.image?.media}
          className="w-full h-80 object-contain"
        />
      </div>
    </>
  );
}
