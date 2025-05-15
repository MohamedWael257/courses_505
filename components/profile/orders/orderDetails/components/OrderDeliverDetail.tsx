"use client";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useTranslations } from "next-intl";
import ImageWithFallback from "@/shared/ImageWithFallback";
import flag_ar from "@/assets/flags/AR.svg";

type Props = {
  deliverDetails: any;
};

export default function OrderDeliverDetail({ deliverDetails }: Props) {
  const t = useTranslations("");
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-xl text-darkprimary font-bold mb-4 text-start">
        {t("Text.deliverDetailsTitle")}
      </h2>
      <p className="text-lg  text-darkprimary font-bold mb-4 text-start">
        {deliverDetails?.client?.name}
      </p>
      <div className="flex  text-darkprimary gap-2 items-center">
        <ImageWithFallback
          src={deliverDetails?.client?.country?.image || flag_ar}
          width={1000}
          height={1000}
          className="w-6 h-4 object-cover"
          alt="Arabic Flag"
        />
        <p className="text-lg text-secondrydark font-medium">
          {deliverDetails?.client?.phone}
        </p>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
        <HiLocationMarker size={30} />
        <div>
          <h2 className="text-xl font-medium mb-4 text-start mt-2">
            {t("Text.address", {
              count: deliverDetails?.location?.property_number,
            })}
          </h2>
          {deliverDetails?.location?.location}
        </div>
      </div>
    </div>
  );
}
