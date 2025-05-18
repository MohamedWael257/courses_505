"use client";
import React from "react";
import Courses from "@/assets/images/courses.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
import LocalePath from "@/shared/LocalePath";
const EmptyCourses = () => {
  const t = useTranslations("");
  return (
    <div className="flex items-center justify-center h-[400px] bg-gray-100">
      <div>
        {/* transactions Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ImageWithFallback
              src={Courses}
              width={900}
              height={900}
              className="w-[120px] h-[120px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="lg:text-2xl text-xl font-bold   leading-8 mb-2 text-center">
          لا يوجد دورات حتي الآن{" "}
        </h2>

        <p className=" mx-auto  text-[#6A6A6A] text-center text-lg font-medium   leading-6 text- mb-6">
          لم تقم بالاشتراك في الدورات من قبل{" "}
        </p>
        <LocalePath
          href={"/courses"}
          className="text-center w-fit flex mx-auto px-12 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-orange-600 transition duration-300"
        >
          تصفح الدورات
        </LocalePath>
      </div>
    </div>
  );
};

export default EmptyCourses;
