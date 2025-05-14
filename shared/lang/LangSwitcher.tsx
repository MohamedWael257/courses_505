"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { Internet } from "../Icons";

const LangSwitcher: React.FC = () => {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const setLanguage = (locale: string) => {
    const lang = locale === "ar" ? "en" : "ar";

    Cookies.set("NEXT_LOCALE", lang);
    const url = new URL(window.location.href);
    const searchParams = url.search;

    // Ensure only valid paths are used in the router.push
    let newPathname = pathname;

    // Adjust the pathname according to the locale
    if (newPathname.startsWith("/en")) {
      newPathname = `/${lang}/${newPathname.slice(3)}`; // Change to the new locale
    } else {
      newPathname = `/${lang}${newPathname}`; // Add the new locale prefix
    }

    // Use router.push to navigate to the new URL
    router.push(`${newPathname}${searchParams}`);
  };

  return (
    <button
      className={`flex items-center gap-1 text-dark  font-bold`}
      onClick={() => setLanguage(locale)}
    >
      <span className=" inline-flex    leading-[1] mx-2">
        {t(`locale.${locale}`)}
      </span>
      <Internet />
    </button>
  );
};

export default LangSwitcher;
