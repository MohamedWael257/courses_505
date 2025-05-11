"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { Internet } from "../Icons";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { IoIosArrowDown } from "react-icons/io";
import flag_ar from "@/assets/flags/AR.svg";
import flag_en from "@/assets/flags/EN.svg";
import { Dropdown, MenuProps } from "antd";
import { setCookie } from "nookies";

export default function LocalSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const setLanguage = (nextLocale: string) => {
    Cookies.set("NEXT_LOCALE", nextLocale);
    const url = new URL(window.location.href);
    const searchParams = url.search;
    let newPathname = pathname;
    if (newPathname.startsWith("/en")) {
      newPathname = `${newPathname.slice(3)}/`; // Change to the new locale
    } else {
      newPathname = `/${nextLocale}${newPathname}`; // Add the new locale prefix
    }
    router.push(`${newPathname}${searchParams}`);
    // window.location.href=`${newPathname}${searchParams}`
  };
  // const setNextLocaleCookie = (locale: string) => {
  //   setCookie(null, "NEXT_LOCALE", locale, {
  //     maxAge: 30 * 24 * 60 * 60,
  //     path: "/",
  //   });
  // };
  // useEffect(() => {
  //   const locale = pathname.startsWith("/en") ? "en" : "ar";
  //   setNextLocaleCookie(locale || "ar");
  // }, [pathname]);
  const items: MenuProps["items"] = [
    {
      key: "ar",
      label: (
        <div
          onClick={() => setLanguage("ar")}
          className={`flex items-center gap-2 cursor-pointer ${
            locale == "ar" ? "pointer-events-none" : ""
          } `}
        >
          <ImageWithFallback
            src={flag_ar}
            width={24}
            height={16}
            className="w-6 h-4 object-contain"
            alt="Arabic Flag"
          />
          {t("locale.ar")}
        </div>
      ),
    },
    {
      key: "en",
      label: (
        <div
          onClick={() => setLanguage("en")}
          className={`flex items-center gap-2 cursor-pointer ${
            locale == "en" ? "pointer-events-none" : ""
          } `}
        >
          <ImageWithFallback
            src={flag_en}
            width={24}
            height={16}
            className="w-6 h-4 object-contain"
            alt="English Flag"
          />
          {t("locale.en")}
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      // open={dropdownOpen}
      // onOpenChange={setDropdownOpen}
      trigger={["click"]}
    >
      <div className="flex gap-1 lg:gap-2 items-center cursor-pointer">
        <ImageWithFallback
          src={locale === "ar" ? flag_ar : flag_en}
          width={24}
          height={16}
          className="w-6 h-4 object-contain"
          alt="Flag"
        />
        <p className="text-[10px] lg:text-sm font-normal   leading-4 text-start">
          {t(`locale.${locale}`)}
        </p>
        <IoIosArrowDown className="size-4 lg:size-5" />
      </div>
    </Dropdown>
  );
}
