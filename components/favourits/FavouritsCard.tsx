"use client";
import React from "react";
import DeletFavouritsButton from "./DeletFavouritsButton";
import { useTranslations } from "next-intl";

type Props = {
  count: number;
  refetch: any;
};

export default function FavouritsCard({ count, refetch }: Props) {
  const t = useTranslations("Text");
  return (
    <div className="flex gap-4 items-center pt-6 mb-4">
      <div className=" flex-1">
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
          {t("favourtis")}
          <span className="text-secondrydark"> ({count})</span>
        </h2>
      </div>
      <DeletFavouritsButton refetch={refetch} />
    </div>
  );
}
