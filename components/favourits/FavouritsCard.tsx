"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function FavouritsCard() {
  const t = useTranslations("Text");
  return (
    <div className="flex gap-4 items-center pt-6 mb-4">
      <div className=" flex-1">
        <h2 className="capitalize text-darkprimaryprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
          {t("favourtis")}
        </h2>
      </div>
    </div>
  );
}
