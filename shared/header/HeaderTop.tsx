"use client";
import React from "react";
import LocalePath from "../LocalePath";
import LocalSwitcher from "../lang/LocalSwitcher";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
export default function HeaderTop({ settings }: any) {
  const t = useTranslations("NAV");
  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  const router = useRouter();

  return (
    <div className="bg-greynormal">
      <div className=" w-full lg:h-12 h-fit lg:py-8 py-4 container   lg:flex justify-between items-center">
        <div className="flex  justify-between gap-3">
          <div className="lg:hidden inline-block">
            <LocalSwitcher />
          </div>
          <div
            onClick={() => router.push(`tel:+${setting?.whatsapp}`)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <IoCallOutline size={20} />
            <p className="text-sm font-normal   leading-4 text-start text-secondrytext">
              {setting?.whatsapp}
            </p>
          </div>
          <div
            onClick={() => router.push(`mailto:${setting?.email}`)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <IoMailOutline size={20} />
            <p className="text-sm font-normal   leading-4 text-start text-secondrytext">
              {setting?.email}
            </p>
          </div>
        </div>

        <div className="lg:flex hidden gap-3 flex-wrap mt-3 lg:mt-0 items-center">
          <LocalSwitcher />

          <div className="text-secondrytext">|</div>
          <LocalePath
            className="font-normal text-secondrytext text-sm text-start   leading-8"
            href="/privacy"
          >
            {t("return-policy")}
          </LocalePath>
          <div className="text-secondrytext">|</div>

          <LocalePath
            className="font-normal text-secondrytext text-sm text-start   leading-8"
            href="/faqs"
          >
            {t("faqs")}
          </LocalePath>
          <div className="text-secondrytext">|</div>
          <LocalePath
            className="font-normal text-secondrytext text-sm text-start   leading-8"
            href="/technical-support"
          >
            {t("technical-support")}
          </LocalePath>
        </div>
      </div>
    </div>
  );
}
