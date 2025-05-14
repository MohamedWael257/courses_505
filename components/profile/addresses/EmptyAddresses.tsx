"use client";
import React from "react";
import Location from "@/assets/images/location.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { FaPlus } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import { CancelAddOrUpdateAddresses } from "@/store/address.slice";
const EmptyAddresses = ({ setIsOpen, setAuthStage }: any) => {
  const t = useTranslations("");
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center justify-center h-[600px] bg-greynormal p-6 rounded-2xl">
      <div>
        {/* Location Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <ImageWithFallback
              src={Location}
              width={1790}
              height={900}
              className="w-[100px] h-[100px] object-contain  "
              alt="hero"
            />
          </div>
        </div>

        <h2 className="lg:text-2xl text-xl font-bold   leading-8 mb-2 text-center">
          {t("Text.noAddresses")}
        </h2>

        <p className=" mx-auto  text-[#6A6A6A] text-center text-lg font-medium   leading-6 text- mb-6">
          {t("Text.addAddresses")}
        </p>

        <button
          onClick={() => {
            setIsOpen(true);
            setAuthStage("location");
            dispatch(CancelAddOrUpdateAddresses());
          }}
          className="text-center flex mx-auto items-center gap-2 px-7 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-orange-600 transition duration-300"
        >
          <FaPlus size={20} />
          {t("BUTTONS.addNewAddress")}
        </button>
      </div>
    </div>
  );
};

export default EmptyAddresses;
