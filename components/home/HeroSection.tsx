/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import Vector from "@/assets/images/vector.png";
import { ArrowLeft } from "lucide-react";
import LocalePath from "@/shared/LocalePath";
import ImageWithFallback from "@/shared/ImageWithFallback";
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
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 200C73.4788 200 48.0434 189.464 29.2898 170.711C10.5362 151.957 0.000488281 126.522 0.000488281 100C0.000488281 73.4783 10.5362 48.0429 29.2898 29.2893C48.0434 10.5357 73.4788 -2.94836e-05 100 -3.46475e-05L100 100L100 200Z"
                fill="#7233A3"
              />
              <path
                d="M200 200C173.479 200 148.043 189.464 129.29 170.711C110.536 151.957 100 126.522 100 100C100 73.4783 110.536 48.0429 129.29 29.2892C148.043 10.5356 173.479 -0.000116906 200 -0.00012207L200 200Z"
                fill="#7233A3"
              />
            </svg>
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z"
                fill="#FFBAA4"
              />
            </svg>
          </div>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="200" fill="#AE8ACA" />
          </svg>
          <div className="flex items-center">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z"
                fill="#FF5F7E"
              />
            </svg>
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M99.9995 200C126.521 200 151.957 189.464 170.71 170.711C189.464 151.957 200 126.522 200 100C200 73.4783 189.464 48.0429 170.71 29.2893C151.957 10.5357 126.521 -2.94836e-05 99.9995 -3.46475e-05L99.9995 100L99.9995 200Z"
                fill="#66DEE5"
              />
              <path
                d="M-0.000488281 200C26.5212 200 51.9565 189.464 70.7102 170.711C89.4638 151.957 99.9995 126.522 99.9995 100C99.9995 73.4783 89.4638 48.0429 70.7102 29.2892C51.9566 10.5356 26.5212 -0.000116906 -0.000464439 -0.00012207L-0.000488281 200Z"
                fill="#66DEE5"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
