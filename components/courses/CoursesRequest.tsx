"use client";
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
          <svg
            width="121"
            height="121"
            viewBox="0 0 121 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 60.5C0 27.0868 27.0868 0 60.5 0C93.9132 0 121 27.0868 121 60.5C121 93.9132 93.9132 121 60.5 121C27.0868 121 0 93.9132 0 60.5Z"
              fill="#FF5F7E"
            />
          </svg>
        </div>
        <div className="absolute bottom-16 end-24">
          <svg
            width="170"
            height="169"
            viewBox="0 0 170 169"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M84.8359 169C62.4251 169 40.9322 160.097 25.0854 144.25C9.23859 128.404 0.335934 106.911 0.335932 84.5C0.335929 62.0892 9.23858 40.5963 25.0854 24.7494C40.9322 8.90261 62.4251 -4.38345e-05 84.8359 -4.81981e-05L84.8359 84.5L84.8359 169Z"
              fill="#E8FAFB"
            />
            <path
              d="M169.336 169C146.925 169 125.432 160.097 109.585 144.25C93.7386 128.404 84.8359 106.911 84.8359 84.5C84.8359 62.0892 93.7386 40.5962 109.585 24.7494C125.432 8.90254 146.925 -0.000117707 169.336 -0.00012207L169.336 169Z"
              fill="#E8FAFB"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
