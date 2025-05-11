"use client";

import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import Vector from "@/assets/images/vector.png";
import { HalfCircleLeft } from "../Icons";

type Props = {
  title: string;
  description: string;
  link?: boolean;
  path?: string;
  linkText?: string;
  showIcons?: boolean;
};

export default function CustomCard({
  title,
  description,
  link = false,
  path,
  linkText,
  showIcons = false,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="bg-secprimary">
      <div className="lg:h-[500px] h-screen xl:w-[60%] w-3/4 mx-auto text-center relative lg:pt-36 pt-8 container">
        <div className="relative z-40">
          <h2
            className={` ${
              locale === "ar"
                ? "lg:text-6xl md:text-4xl text-2xl md:!leading-[84px] !leading-8"
                : "lg:text-3xl text-2xl !leading-8"
            }   text-center  capitalize font-medium transition-all  hover:scale-105 `}
          >
            {title}
          </h2>
          <p className="my-4  text-center  font-normal text-xl  leading-10 text-darkprimary lg:w-[80%] mx-auto">
            {description}
          </p>
        </div>
        {link && (
          <div className="flex items-center justify-center gap-4 my-4">
            <LocalePath
              href={`/${path}`}
              className="text-base  font-normal leading-5  bg-primary text-white  hover:bg-white  hover:text-primary border border-primary p-4 px-8 rounded-full transition-colors"
            >
              {linkText}
            </LocalePath>
          </div>
        )}
        {showIcons && (
          <>
            <div className="absolute top-16 -start-24">
              <HalfCircleLeft color={"#FF7993"} />
            </div>
            <div className="absolute bottom-16 -end-24">
              <HalfCircleLeft color={"#FFBAA4"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
