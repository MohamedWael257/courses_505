import React from "react";
import CopyToClipboard from "../CopyToClipboard";
import { FaRegCopy } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { DateIcon, GreenDiscountIcon } from "../Icons";

type Props = { index: any; type: any; coupon: any };

export default function CouponCard({ index, type, coupon }: Props) {
  const t = useTranslations("");
  return (
    <>
      <div
        // data-aos="fade-up"
        //data-aos-duration={`${index * 30}`}
        key={index}
        className={`relative  p-4 px-8 rounded-xl border-2 border-dashed ${
          type == "" ? "border-success" : "border-primary"
        } `}
      >
        {type == "expired" && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/70 z-[99999]"></div>
        )}
        <div
          className={` absolute z-[0] top-1/2 transform -translate-y-1/2 right-[-7px]  bg-white border-2 border-dashed ${
            type == ""
              ? "border-t-success border-r-transparent border-b-success border-l-success"
              : " border-t-primary border-r-transparent border-b-primary border-l-primary"
          } h-[36px] w-[36px] rounded-full`}
        ></div>
        <div
          className={` absolute z-[0] top-1/2 transform -translate-y-1/2 left-[-7px]  bg-white border-2 border-dashed ${
            type == ""
              ? "border-t-success border-r-success border-b-success border-l-transparent"
              : " border-t-primary border-r-primary border-b-primary border-l-transparent"
          } h-[36px] w-[36px] rounded-full`}
        ></div>

        <div
          className={`flex justify-start flex-col gap-3 ${
            type == "" ? "mb-14" : "mb-4"
          }`}
        >
          <h2>
            {t("Text.couponCode")} : {coupon?.code}
          </h2>
          <div className="flex gap-2 items-center">
            <DateIcon />
            <p> {coupon?.duration}</p>
          </div>
          <div className="flex gap-2 items-center text-xl font-bold   leading-5 text-start text-success">
            <GreenDiscountIcon className="size-6" />
            {t("Text.discount", {
              count: `${coupon?.discount}`,
              type: `${coupon?.discount_type == "value" ? `${t("SR")}` : `%`}`,
            })}
          </div>
        </div>
        {type == "" && (
          <div className="flex justify-center items-center text-success bg-secsuccess absolute bottom-0 start-0 w-full h-16">
            <CopyToClipboard text={coupon?.code} />
            <FaRegCopy size={25} />
          </div>
        )}
      </div>
    </>
  );
}
