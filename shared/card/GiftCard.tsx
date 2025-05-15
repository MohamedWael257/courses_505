"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  gift: any;
  index: any;
  handelUse: any;
  LoadingComplete: boolean;
};

export default function GiftCard({
  LoadingComplete,
  gift,
  index,
  handelUse,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <div
        // data-aos="fade-up"
        //data-aos-duration={`${index * 30}`}
        key={index}
        className={`flex items-center justify-between p-4 mb-2 border border-greynormal rounded-lg `}
      >
        <div className="flex gap-3 items-center">
          <div className="text-start">
            <p className="text-lg text-darkprimary font-semibold   leading-7">
              {gift.title}
            </p>
            <p className="text-base  text-darkprimary font-normal   leading-5">
              {t("Text.point", {
                count: gift?.price ?? 0,
              })}
            </p>
          </div>
        </div>
        <button
          onClick={handelUse}
          className="py-3 px-8 !w-fit !bg-secprimary !text-primary  rounded-xl !border !border-primary"
        >
          {t("BUTTONS.useNow")}
        </button>
      </div>
    </>
  );
}
