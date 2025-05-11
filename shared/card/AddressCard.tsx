"use client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Delete, Edit } from "../Icons";

type Props = {
  address: {
    id: string;
    lat: number;
    lng: number;
    location: string;
    address: string;
    property_number: string;
    details: string;
    is_default: boolean;
    city: {
      id: string;
      name: string;
    };
  };
  index: number;
  EditItem?: any;
  deleteItem?: any;
  setDefault?: any;
  disabledDeleteItem?: any;
  disabledEditItem?: any;
};

export default function AddressCard({
  EditItem,
  deleteItem,
  setDefault,
  address,
  disabledEditItem,
  disabledDeleteItem,
  index,
}: Props) {
  const googleAPIKey = "AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc";
  const t = useTranslations("");
  const locale = useLocale();
  return (
    <div
      // data-aos="fade-up"
      //data-aos-duration={`${index * 30}`}
      key={index}
      className={`flex items-center justify-between gap-2 space-x-2 bg-white  p-4 rounded-lg `}
    >
      <div
        className={`flex gap-3 ${
          locale == "ar" ? "w-[70%]" : "w-[65%]"
        } break-all items-center`}
      >
        <img
          className="lg:w-[150px] lg:h-[150px] w-20 h-20 object-contain rounded-2xl"
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${address.lat},${address.lng}&zoom=12&size=800x600&key=${googleAPIKey}`}
          alt="image"
          // width={400}
          // height={400}
        />
        <div className="flex flex-col gap-3">
          <div className="text-base text-text font-semibold md:line-clamp-none line-clamp-2 leading-6">
            {address.address}
          </div>
          <p className="text-base text-secondrydark font-semibold md:line-clamp-none line-clamp-2 leading-6">
            {address.details}
          </p>
          <div className="flex gap-2">
            {!disabledEditItem && (
              <Edit
                className="size-8 border border-secondrydark p-[5px] cursor-pointer rounded-xl"
                onClick={EditItem}
                // onClick={() => dispatch(getAddressById({ id: ele?.id }))}
              />
            )}
            {!disabledDeleteItem && (
              <Delete
                color={"#3E3E3E"}
                className="size-8 border border-secondrydark p-[5px] cursor-pointer rounded-xl"
                onClick={deleteItem}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-center gap-6 ${
          locale == "ar" ? "w-[30%]" : "w-[35%]"
        }`}
      >
        <button
          onClick={setDefault}
          className=" border border-primary w-6 h-6 rounded-full p-[3px]"
        >
          <div
            className={`${
              address.is_default == true ? " bg-primary" : "bg-white"
            } hover:bg-primary transition-colors w-full h-full rounded-full`}
          ></div>
        </button>

        {address.is_default == true ? (
          <p className="md:text-base text-[12px] font-semibold text-primary bg-secprimary p-2 rounded-xl   leading-7">
            {t("Text.default_location")}
          </p>
        ) : (
          <p>{"  "} </p>
        )}
      </div>
    </div>
  );
}
