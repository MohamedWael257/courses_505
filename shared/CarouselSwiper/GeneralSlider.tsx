"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Grid,
  EffectCoverflow,
} from "swiper/modules";
import CustomNavigation from "./CustomNavigation";
import React, { ReactNode, useRef, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

import "@/styles/slider.scss";
import { SwiperModule, SwiperOptions } from "swiper/types";
interface SwiperBreakpoints {
  [width: number]: {
    slidesPerView: number;
    spaceBetween: number;
  };
}
interface GeneralSliderProps {
  children: ReactNode;
  className?: string;
  extraSettings?: SwiperOptions;
  extraModules?: SwiperModule[];
  onFlickityLoad?: any;
  slideClass?: string;
  spaceBetween?: any;
  onSwiperSlideChange?: (activeIndex: number) => void;
  showCustomArrows?: boolean;
  hideArrows?: boolean;
  withPagination?: boolean;
  swiperClassName?: string;
  breakpoints?: SwiperBreakpoints;
}

const GeneralSlider: React.FC<GeneralSliderProps> = ({
  children,
  className,
  extraSettings,
  extraModules = [],
  onFlickityLoad,
  hideArrows,
  slideClass,
  onSwiperSlideChange,
  showCustomArrows,
  withPagination = false,
  swiperClassName,
  spaceBetween = 0,
  breakpoints,
}) => {
  const swiperRef = useRef<any | null>(null);
  const options: any = {
    spaceBetween: `${spaceBetween}`,
    loop: true,
    slidesPerView: "auto",
    ...extraSettings,
    navigation: {
      enabled: true,
    },
  };

  const handleSlideChange = (swiper: any) => {
    if (onSwiperSlideChange) {
      onSwiperSlideChange(swiper.realIndex || 0);
    }
  };
  return (
    <div
      className={`relative w-full ${hideArrows ? "hide-arrows" : ""} ${
        className || ""
      }`}
    >
      {showCustomArrows && <CustomNavigation swiperRef={swiperRef} />}
      <Swiper
        //  style={{
        //   //@ts-ignore
        //   "--swiper-pagination-color": "#fff",
        //   "--swiper-pagination-bullet-inactive-color": "#fff",
        //   "--swiper-pagination-bullet-inactive-opacity": "1",
        //   "--swiper-pagination-bullet-width": "8px",
        //   "--swiper-pagination-progressbar-size": "8px",
        // }}
        spaceBetween={spaceBetween}
        ref={swiperRef}
        className={swiperClassName || ""}
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          Grid,
          EffectCoverflow,
          ...extraModules,
        ]}
        {...options}
        onSlideChange={handleSlideChange}
        pagination={withPagination ? { clickable: true } : false}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={breakpoints}
      >
        {React.Children?.map(children, (child, index) => (
          <SwiperSlide className={slideClass} key={index}>
            {({ isActive }) => (
              <div
                style={{
                  transform: `scale(${
                    isActive && extraSettings?.centeredSlides ? 1.1 : 1
                  })`,
                  transition: "transform 0.3s ease",
                  width: "100%",
                  height: "100%",
                }}
              >
                {child}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GeneralSlider;

{
  /* <GeneralSlider withPagination hideArrows className="hero-slider">
{sliders?.content?.map((item:any, index:number) =>{
  console.log("test" , item);
  
return (
  <div key={`hero_${index}`} className="hero-bg">
    <div className="content-wrapper text-primary relative">
      <Image
        src={item?.image}
        width={1790}
        height={900}
        className="w-full h-[130px] md:h-[450px] lg:h-[600px] object-cover"
        alt="hero"
      />
    </div>
  </div>
)})}
</GeneralSlider> */
}
