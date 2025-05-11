"use client";

import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import Vector from "@/assets/images/vector.png";

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
              <svg
                width="95"
                height="95"
                viewBox="0 0 95 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.5005 95C34.9027 95 22.8209 89.9955 13.9129 81.0875C5.00494 72.1796 0.000490975 60.0977 0.000489473 47.4999C0.000487972 34.9022 5.00493 22.8203 13.9129 13.9124C22.8209 5.00438 34.9027 -7.80916e-05 47.5005 -8.05445e-05L47.5005 47.4999L47.5005 95Z"
                  fill="#FF7993"
                />
                <path
                  d="M95.0005 94.9999C82.4027 94.9999 70.3209 89.9955 61.4129 81.0875C52.5049 72.1795 47.5005 60.0977 47.5005 47.4999C47.5005 34.9022 52.5049 22.8203 61.4129 13.9123C70.3209 5.00433 82.4027 -0.000119617 95.0005 -0.00012207L95.0005 94.9999Z"
                  fill="#FF7993"
                />
              </svg>
            </div>
            <div className="absolute bottom-16 -end-24">
              <svg
                width="95"
                height="95"
                viewBox="0 0 95 95"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.5005 95C34.9027 95 22.8209 89.9955 13.9129 81.0875C5.00494 72.1796 0.000490975 60.0977 0.000489473 47.4999C0.000487972 34.9022 5.00493 22.8203 13.9129 13.9124C22.8209 5.00438 34.9027 -7.80916e-05 47.5005 -8.05445e-05L47.5005 47.4999L47.5005 95Z"
                  fill="#FFBAA4"
                />
                <path
                  d="M95.0005 94.9999C82.4027 94.9999 70.3209 89.9955 61.4129 81.0875C52.5049 72.1795 47.5005 60.0977 47.5005 47.4999C47.5005 34.9022 52.5049 22.8203 61.4129 13.9123C70.3209 5.00433 82.4027 -0.000119617 95.0005 -0.00012207L95.0005 94.9999Z"
                  fill="#FFBAA4"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
