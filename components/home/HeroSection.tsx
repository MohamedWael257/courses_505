/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import Vector from "@/assets/images/vector.png";
import { ArrowLeft } from "lucide-react";
import LocalePath from "@/shared/LocalePath";
import ImageWithFallback from "@/shared/ImageWithFallback";
import {
  Circle,
  HalfCircleLeft,
  HalfCircleRight,
  Square,
} from "@/shared/Icons";
type Props = {
  slider: any;
};
function HeroSection({ slider }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const text = "اكتشف  منصة التعليم الإلكتروني المتكاملة لتنمية مهاراتك";
  const words = text.split(" ");

  if (words.length <= 2) {
    return <p>{text}</p>; // Handle edge case
  }

  const firstWord = words[0];
  const lastTwoWords = words.slice(-2).join(" ");
  const middleWords = words.slice(1, -2);

  return (
    <>
      <div className="bg-secprimary relative">
        <div className="lg:h-screen h-[85vh] xl:w-[60%] w-3/4 mx-auto text-center relative lg:pt-52 pt-8 container">
          <div className="relative z-40">
            <h2
              className={` ${
                locale === "ar"
                  ? "lg:text-6xl md:text-4xl text-2xl md:!leading-[84px] !leading-8"
                  : "lg:text-3xl text-2xl !leading-8"
              }   text-center  capitalize font-medium transition-all  hover:scale-105 `}
            >
              <span className="text-error">{firstWord}</span>{" "}
              {middleWords.map((word, index) => (
                <span key={index} className="text-gray-500">
                  {word}{" "}
                </span>
              ))}
              <span className="text-error">{lastTwoWords}</span>{" "}
            </h2>
            <p className="my-4  text-center  font-normal text-xl  leading-10 text-primary lg:w-[80%] mx-auto">
              ابدأ رحلتك التعليمية الآن مع منصتنا التي تجمع لك أفضل الدورات
              المباشرة والمسجلة، وفرصة الوصول إلى مكتبة ضخمة من الكتب والملفات
              الرقمية، مع نظام محفظة ذكي وبرنامج إحالة يكافئك على نمو مجتمعنا
            </p>
            <div className="flex items-center justify-center gap-4 my-4">
              <LocalePath
                href="/courses"
                className="text-base  font-normal leading-5  bg-primary text-white  hover:bg-white  hover:text-primary border border-primary p-4 px-8 rounded-full transition-colors"
              >
                شاهد دوراتنا
              </LocalePath>
              <LocalePath
                href="/books"
                className="text-base  font-normal leading-5 border border-primary bg-white text-primary    hover:bg-primary  hover:text-white  p-4 px-8 rounded-full transition-colors"
              >
                استكشف المكتبه
              </LocalePath>
            </div>
          </div>
          <ImageWithFallback
            src={Vector}
            alt="Vector"
            width={800}
            height={500}
            className="w-[900px] h-[440px] absolute z-0 bottom-12 left-1/2 translate-x-[-50%]"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-52 z-0 hidden lg:flex justify-evenly items-center">
          <div className="flex items-center">
            <HalfCircleLeft />
            <Circle />
          </div>
          <Square />
          <div className="flex items-center">
            <Circle className={"*:fill-[#FF5F7E]"} />
            <HalfCircleRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
