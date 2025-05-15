"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React from "react";
import { useTranslations } from "next-intl";
type Props = {};

export default function ChatHeader({}: Props) {
  const t = useTranslations("");
  return (
    <>
      <div className="flex flex-start items-center gap-3 ">
        <div className="w-14 h-14 rounded-full bg-greynormal  "></div>
        <div className="flex flex-col gap-2">
          <p className="text-xl text-darkprimary font-bold text-start   leading-5 ">
            Doom-دووم
          </p>
          <p className="text-base   leading-6 text-start text-secondrydark">
            {t("Text.chatsHeader")}
          </p>
        </div>
      </div>
      <div className="h-0.5 bg-greynormal mt-3 mb-6"></div>
    </>
  );
}
