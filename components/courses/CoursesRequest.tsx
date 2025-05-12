"use client";
import { Circle, HalfCircleLeft } from "@/shared/Icons";
import LocalePath from "@/shared/LocalePath";
import { useLocale } from "next-intl";
import React from "react";

type Props = {};

export default function CoursesRequest({}: Props) {
  const locale = useLocale();
  return (
    <div className="container bg-[#96E8ED] rounded-2xl p-14 my-12 relative">
      <div className="h-[300px]  lg:w-2/5  mx-auto text-center grid justify-celnter items-center ">
        <div className="relative z-40">
          <h2
            className={` ${
              locale === "ar"
                ? "lg:text-[40px] md:text-2xl text-lg md:!leading-[64px] !leading-8"
                : "lg:text-2xl text-lg !leading-8"
            }   text-center  capitalize font-medium `}
          >
            اطلب ملفًا احترافيًا يناسب احتياجك
          </h2>
          <p className="my-4  text-center  font-medium text-base  leading-8 text-darkprimary  mx-auto">
            وفّر وقتك وجهدك عبر طلب ملف مصمّم خصيصًا لك. سواء كنت بحاجة إلى
            نموذج عمل، جدول احترافي، أو عرض تقديمي، فريقنا جاهز لتنفيذه بدقة
            وتسليمه لك في أسرع وقت ممكن.
          </p>
          <div className="flex items-center justify-center gap-4 ">
            <LocalePath
              href={`/requestQuote`}
              className="text-base  font-normal leading-5  bg-primary text-white  hover:bg-white  hover:text-primary border border-primary p-4 px-8 rounded-full transition-colors"
            >
              اطلب ملف مخصص الآن
            </LocalePath>
          </div>
        </div>

        <div className="absolute top-16 start-24">
          <Circle className="size-[121px] *:fill-[#FF5F7E]" />
        </div>
        <div className="absolute bottom-16 end-24">
          <HalfCircleLeft className="size-[170px] *:fill-[#E8FAFB]" />
        </div>
      </div>
    </div>
  );
}
