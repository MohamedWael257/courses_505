"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs, Controller, Autoplay } from "swiper/modules";
import LocalePath from "../LocalePath";
import ImageWithFallback from "../ImageWithFallback";
// import { data } from "@/interfaces/types";

declare module "react" {
  interface CSSProperties {
    "--swiper-navigation-color"?: string;
    "--swiper-pagination-color"?: string;
    "--swiper-pagination-bullet-inactive-color"?: string;
    "--swiper-pagination-bullet-inactive-opacity"?: string;
    "--swiper-pagination-bullet-width"?: string;
    "--swiper-pagination-progressbar-size"?: string;
  }
}
type Data = {
  id: number;
  slug: string;
  cover: string;
  desc?: string;
  title?: string;
};
type Props = {
  data: Data[];
  link: string;
};

export default function CustomSwiper({ data, link }: Props) {
  const t = useTranslations("Home");

  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
  const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
  const swiper2Ref = useRef();
  const locale = useLocale();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      //@ts-ignore
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div data-aos="zoom-in">
      <Swiper
        // controller={{ control: firstSwiper }}
        loop={true}
        spaceBetween={15}
        slidesPerView={4}
        // watchSlidesProgress
        // onSwiper={setThumbsSwiper}
        // slideToClickedSlide={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          630: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          800: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1060: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
          1350: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
        }}
        // freeMode={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {data?.map((ele, index: React.Key) => {
          return (
            <SwiperSlide
              key={index}
              className="lg:h-[320px] h-96  overflow-hidden relative"
            >
              {link ? (
                <LocalePath
                  className="cursor-pointer"
                  href={`/${link}/${ele?.slug}`}
                >
                  <img
                    key={ele.slug}
                    width={400}
                    height={700}
                    className="w-full md:h-[300px] h-96 object-cover  rounded-lg "
                    src={ele.cover}
                    alt="img"
                  />
                </LocalePath>
              ) : (
                <img
                  key={ele.id}
                  width={400}
                  height={700}
                  className="w-full md:h-[300px] h-96 object-cover  rounded-lg "
                  src={ele.cover}
                  alt="img"
                />
              )}
              {ele.desc && (
                <p className=" font-medium text-xl   leading-8 text-start ps-4 text-dark">
                  {ele.desc}
                </p>
              )}
              {ele.title && (
                <p className=" font-medium text-xl   leading-8 text-start ps-4 text-dark">
                  {ele.title}
                </p>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
