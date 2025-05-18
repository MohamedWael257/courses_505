"use client";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React from "react";
import { CgFormatSlash } from "react-icons/cg";
import { TiStar } from "react-icons/ti";
import { useLocale } from "use-intl";
import course from "@/assets/test.jpg";

type Props = {
  data: any;
};

export default function CourseDetialsTop({ data }: Props) {
  const locale = useLocale();
  const paths = [
    { name: "الدورات", href: "/courses" },
    { name: "أساسيات العمل الحر" },
  ];
  return (
    <div className="bg-secprimary">
      <div className=" flex justify-start relative container md:py-10 py-6">
        <div className="h-fit lg:w-1/2">
          <AppBreadCrumbs
            icon
            // TranslateTitle
            stopTranslate
            paths={paths}
          />
          <div className="flex justify-start items-center gap-2 my-3">
            <p className="w-fit text-base font-medium leading-4 text-start text-darkprimary bg-text/30 p-2 px-4 rounded-full">
              غير أكاديمي
            </p>
            <p className="w-fit text-base font-medium leading-4 text-start text-primary bg-secprimary p-2 px-4  rounded-full">
              مسجلة{" "}
            </p>
          </div>
          <h2
            className={` ${
              locale === "ar"
                ? "lg:text-[40px] md:text-2xl text-lg md:!leading-[65px] !leading-8"
                : "lg:text-2xl text-lg !leading-8"
            }   text-start  font-medium transition-all  hover:scale-105 `}
          >
            أساسيات العمل الحر: خطواتك الأولى نحو دخل مستقل
          </h2>
          <p className="my-4  text-start  font-normal text-base  leading-8 text-darkprimary ">
            هل تفكر في دخول عالم العمل الحر ولا تعرف من أين تبدأ؟ في هذا الكورس
            العملي، ستتعلّم كيفية تحديد مهاراتك، إنشاء ملف تعريفي احترافي،
            التسويق لنفسك عبر المنصات المختلفة، وإدارة مشاريعك بفعالية.
          </p>
          <div className="my-4 flex gap-2 items-center">
            <TiStar color="#FF8861" size={25} />
            <div className="   text-lg font-semibold flex gap-1 items-center">
              {data?.rate.toFixed(1) || "4.5"}
              <span className="text-secondrydark">(30)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className=" font-medium text-base  leading-5 text-start text-secondrydark">
              مقدمة من
            </span>
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
            <span className=" font-medium text-base  leading-5 text-start text-primary">
              محمد وائل
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
