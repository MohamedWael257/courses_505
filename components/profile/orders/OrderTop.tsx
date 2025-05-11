/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import LocalePath from "@/shared/LocalePath";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {};

export default function OrderTop({}: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-2 capitalize font-semibold  lg:text-2xl  md:text-xl text-lg text-start lg:leading-[50px]   leading-8 mb-3 "
      // href="/profile/orders"
      data-aos="fade-left"
      onClick={() => {
        router.back();
      }}
    >
      <RiArrowRightSLine
        className={`${locale == "ar" ? "" : "rotate-180"}`}
        size={25}
      />
      {t("Text.orderDetails")}
    </button>
  );
}
