"use client";
import { MdCalculate } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import React, { useEffect, useMemo, useState } from "react";
import Logo from "@/public/logo_white.png";

import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { LiaGiftSolid } from "react-icons/lia";
import { useLocale, useTranslations } from "next-intl";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Gifts } from "@/shared/Icons";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import Loader from "@/shared/Loader/Loader";

type Props = {
  points: any;
};

export default function PointsCard({ points }: Props) {
  const t = useTranslations("");

  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  const fetchData = async () => {
    try {
      const response = await axiosInstanceGeneralClient.get("settings");
      setSettings(response.data.data); // or process both responses if necessary
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      setIsLoadingFirstTime(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoadingFirstTime) {
    return <Loader />;
  }
  return (
    <>
      <div className=" mb-8 w-full grid lg:grid-cols-2 gap-3">
        {memoizedSession?.used_point > 0 && (
          <div className="bg-secprimary text-[#583614] flex items-center gap-4 ps-5 p-4 rounded-full">
            <BiSolidError size={30} />
            <h2 className=" text-base font-semibold   leading-5 text-start">
              {t("Text.pointsUsed", { count: memoizedSession?.used_point })}
            </h2>
          </div>
        )}
        <div className="bg-secprimary flex items-center gap-4 ps-5 p-4 rounded-full">
          <MdCalculate size={30} className=" text-primary" />
          <h2 className=" text-base  text-[#583614] font-semibold   leading-5 text-start">
            {t("Text.pointsUsedMin", { count: `${setting?.point_limit}` })}
          </h2>
        </div>
      </div>
      <div className="flex justify-between p-4 rounded-xl bg-darkprimary relative z-[1] overflow-hidden text-white h-[270px]">
        <div className="flex flex-col justify-between">
          <h2 className="lg:text-3xl md:text-xl text-lg   leading-10 font-bold text-start">
            {memoizedSession?.full_name}
          </h2>
          <div className="flex flex-col gap-3">
            <p className=" text-base   leading-6 font-normal text-start">
              {t("Text.pointsCurrent")}
            </p>
            <h2 className="lg:text-3xl md:text-xl text-lg   leading-10 font-bold text-start">
              {t("Text.point", { count: memoizedSession?.points ?? 0 })}
            </h2>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <ImageWithFallback
            src={Logo}
            width={1000}
            height={1000}
            alt="Logo"
            className="w-[108px] h-[65px] object-cover"
          />
          <LocalePath
            href="/profile/gifts"
            className="bg-[#FFFFFF2E] relative z-[50] w-fit grid grid-cols-[auto_1fr] items-center gap-3 backdrop-blur-sm py-2 px-8 rounded-3xl text-xl  font-medium   leading-8 border-[1px] border-white mt-3"

            // className="flex items-center relative z-[50]  justify-center gap-3 cursor-pointer bg-[#FFFFFF2E] backdrop-blur-sm py-2 px-8 rounded-3xl text-xl  font-medium   leading-8 mt-3 border border-white"
          >
            {t("BUTTONS.gifts")}
            <Gifts className="size-8" color={"#ffffff"} />
          </LocalePath>
        </div>
        <div className=" absolute z-[0] md:inline-block hidden top-[-65px] end-[-258px] bg-[#ffffff54] opacity-[0.2] w-[434px] h-[425px] rounded-full"></div>
        <div className=" absolute z-[0] md:inline-block hidden top-[-65px] end-[-220px] bg-[#ffffff1f] opacity-[0.3] w-[434px] h-[425px] rounded-full"></div>
        <div className="  absolute z-[0] md:inline-block hidden bottom-[-270px] end-[285px] bg-[#ffffff1f] opacity-50 w-[434px] h-[425px] rounded-full"></div>
      </div>
    </>
  );
}
