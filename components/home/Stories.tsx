"use client";
import GeneralSlider from "@/shared/CarouselSwiper/GeneralSlider";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { Rate } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import course from "@/assets/test.jpg";

type Props = {
  stories: any;
};

export default function Stories({ stories }: Props) {
  const t = useTranslations("");

  const [activeIndex, setActiveIndex] = useState(0);
  const desc = [
    t("Text.terrible"),
    t("Text.bad"),
    t("Text.normal"),
    t("Text.good"),
    t("Text.wonderful"),
  ];
  return (
    <div className="container lg:py-16">
      <h2 className="font-medium text-xl leading-7 text-center text-error bg-error/[.15] px-5 p-3 rounded-2xl w-fit mx-auto">
        قصص نجاح
      </h2>
      <p className="lg:text-4xl md:text-2xl text-lg font-medium leading-8 text-darkprimary text-center my-5">
        تجارب مُلهمة تستحق أن تُروى
      </p>
      <div className="relative h-fit w-full overflow-hidden">
        <GeneralSlider
          spaceBetween={8}
          // breakpoints={{
          //   640: {
          //     slidesPerView: 1,
          //     spaceBetween: 10,
          //   },
          //   768: {
          //     slidesPerView: 2,
          //     spaceBetween: 10,
          //   },

          //   1280: {
          //     slidesPerView: 3,
          //     spaceBetween: 10,
          //   },
          // }}
          slideClass="!w-full md:!w-1/2 lg:!w-1/3 my-4 pe-2 sm:pe-6"
          hideArrows
          className="hero-slider "
          extraSettings={{
            centeredSlides: true,
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
          }}
        >
          {[...Array(6)].map((item, index) => (
            <div className="bg-greynormal p-6 rounded-2xl w-full cursor-default  relative z-[9999] ">
              <div className="flex gap-2">
                <Rate
                  tooltips={desc}
                  className="!text-orange"
                  allowHalf
                  disabled
                  defaultValue={3}
                  value={3}
                />
              </div>
              <p className="my-4 text-darkprimary font-normal text-base leading-8 text-start">
                بدأت رحلتي مع المنصة بدورة تحليل بيانات، ومع كل فيديو كنت بحس
                إني باتطور فعلاً. الملفات الجاهزة اللي اشتريتها وفّرت عليّ وقت
                ومجهود
              </p>
              <div className="flex items-center gap-4 my-5">
                <ImageWithFallback
                  src={course}
                  width={1790}
                  height={900}
                  className="w-12 h-12 object-cover rounded-full"
                  // className="w-[169px] h-[206px] object-contain  "
                  alt="hero"
                  // style={{
                  //   mixBlendMode: "multiply",
                  // }}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-darkprimary font-medium text-base  leading-5 text-start">
                    محمد وائل
                  </span>
                  <span className="text-secondrytext font-medium text-base  leading-5 text-start">
                    مدرب
                  </span>
                </div>
              </div>
            </div>
          ))}
        </GeneralSlider>
        <div className="absolute top-[-225px] -start-[60px] z-10">
          <svg
            width="488"
            height="572"
            viewBox="0 0 488 572"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_80_278)">
              <ellipse
                cx="380"
                cy="360.5"
                rx="250"
                ry="230.5"
                fill="url(#paint0_linear_80_278)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_80_278"
                x="0"
                y="0"
                width="760"
                height="721"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="65"
                  result="effect1_foregroundBlur_80_278"
                />
              </filter>
              <linearGradient
                id="paint0_linear_80_278"
                x1="130"
                y1="360.5"
                x2="630"
                y2="360.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop offset="0.501752" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-[-225px] -end-[60px] z-10">
          <svg
            width="490"
            height="572"
            viewBox="0 0 490 572"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_80_277)">
              <ellipse
                cx="110"
                cy="360.5"
                rx="250"
                ry="230.5"
                fill="url(#paint0_linear_80_277)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_80_277"
                x="-270"
                y="0"
                width="760"
                height="721"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="65"
                  result="effect1_foregroundBlur_80_277"
                />
              </filter>
              <linearGradient
                id="paint0_linear_80_277"
                x1="360"
                y1="360.5"
                x2="-140"
                y2="360.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop offset="0.501752" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
