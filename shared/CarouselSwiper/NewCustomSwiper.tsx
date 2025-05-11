'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Swiper, SwiperClass } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import {
  Navigation,
  Thumbs,
  Controller,
  Autoplay,
  Pagination,
} from 'swiper/modules';
interface CarouselSwiperProps {
  productImages: string[];
  mainImage: string[];
  selectColor: any;
}
declare module 'react' {
  interface CSSProperties {
    '--swiper-navigation-color'?: string;
    '--swiper-pagination-color'?: string;
    '--swiper-pagination-bullet-inactive-color'?: string;
    '--swiper-pagination-bullet-inactive-opacity'?: string;
    '--swiper-pagination-bullet-width'?: string;
    '--swiper-pagination-progressbar-size'?: string;
  }
}
// const breakpoints={{
//     300: {
//       slidesPerView: 1,
//       spaceBetween: 5,
//     },
//     630: {
//       slidesPerView: 2,
//       spaceBetween: 5,
//     },
//     800: {
//       slidesPerView: 2,
//       spaceBetween: 5,
//     },
//     1060: {
//       slidesPerView: 3,
//       spaceBetween: 5,
//     },
//     1350: {
//       slidesPerView: 3,
//       spaceBetween: 5,
//     },
//   }};
type Props = {
  children: React.ReactNode;
  loop?: boolean;
  spaceBetween?: number;
  slidesPerView?: number;
  watchSlidesProgress?: boolean;
  //   onSwiper?: string;
  slideToClickedSlide?: boolean;
  //   breakpoints?: any;
  freeMode?: boolean;
  className?: string;
};

export default function NewCustomSwiper({
  children,
  loop = false,
  spaceBetween = 5,
  slidesPerView = 1,
  watchSlidesProgress = false,
  //   onSwiper,
  slideToClickedSlide = false,
  //   breakpoints,
  freeMode = false,
  className = 'mySwiper',
}: Props) {
  const t = useTranslations('Home');

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
  // const projectimages = projects.map((ele) => {
  //   const firstImage = ele.project_medias.find((img) => img.type === "image");
  //   return firstImage;
  // });

  return (
    <Swiper
      controller={{ control: firstSwiper }}
      loop={loop}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      watchSlidesProgress={watchSlidesProgress}
      onSwiper={setThumbsSwiper}
      slideToClickedSlide={slideToClickedSlide}
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        630: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1060: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1350: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      }}
      freeMode={freeMode}
      modules={[Autoplay, Pagination, Navigation, Thumbs, Controller]}
      className={className}
    >
      {children}
    </Swiper>
  );
}
