"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Delete, Edit } from "../Icons";
import { Switch } from "../ui/switch";

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
  const [checked, setChecked] = useState(false);

  return (
    <div
      // data-aos="fade-up"
      //data-aos-duration={`${index * 30}`}
      key={index}
      className={` bg-white  p-4 rounded-2xl flex flex-col gap-2 `}
    >
      <div className="flex justify-between items-center">
        <p className="text-darkprimaryprimary text-lg leading-6 text-start font-medium ">
          أحمد محمد عبده
        </p>
        <div className="flex items-center gap-2">
          <p>تعيين كعنوان أساسي</p>
          <Switch checked={checked} onCheckedChange={setChecked} />
        </div>
      </div>
      <div className="font-normal text-sm leading-5 text-start text-sub flex flex-col gap-2">
        <p>ahmed16@gmail.com</p>
        <p>+966 123456789</p>
        <p>الرياض، منطقة الشقراء، شارع منتصر متفرع من حي الحسينيه</p>
      </div>

      <div className="flex items-center gap-3">edit delte</div>
    </div>
  );
}
