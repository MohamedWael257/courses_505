"use client";
import React, { useState, useEffect, SetStateAction, useMemo } from "react";
import LocalePath from "../LocalePath";
import { useTranslations } from "next-intl";
import { Skeleton } from "../ui/skeleton";
import { Cart4, Heart, Notificaation, Person, Spinner } from "../Icons";
import { MdKeyboardArrowDown } from "react-icons/md";
import LangSwitcher from "../lang/LangSwitcher";

export default function HeaderPages({
  memoizedSession,
  totalPrice,
  productCount,
  mainLoader,
  favCount,
}: any) {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations("Text");
  useEffect(() => {
    setIsClient(true); // Set client state
  }, []);
  return (
    <div className="flex items-center 2xl:gap-4 gap-2">
      <LangSwitcher />
      {/* {mainLoader ? (
        <Skeleton className="!bg-primary w-28 h-12" />
      ) : (
        <div className="relative">
          <p className="bg-white w-6 h-6 grid place-content-center rounded-full absolute -top-2 -end-3 shadow-card-shadow">
            {productCount}
          </p>
          <LocalePath
            href="/cart"
            className="flex items-center gap-2 bg-primary text-white rounded-xl p-3 max-w-40 "
          >
            <Cart4 className="size-6" />
            {totalPrice} {t("SR")}
          </LocalePath>
        </div>
      )} */}
      <div className="relative">
        <p className="bg-error/90 text-[10px] p-[6px] text-white w-3 h-3 grid place-content-center rounded-full absolute -top-[4px] -start-0 shadow-card-shadow">
          {productCount}
        </p>
        <LocalePath href="/cart">
          <Cart4 color="#21003b" className="size-6" />
        </LocalePath>
      </div>
      <div className="relative">
        <p className="bg-error/90 text-[10px] p-[6px] text-white w-3 h-3 grid place-content-center rounded-full absolute -top-[4px] -start-0 shadow-card-shadow">
          {favCount}
        </p>
        <LocalePath href="/favourits">
          <Heart className="size-6" />
        </LocalePath>
      </div>

      <LocalePath href="/notifications" className="relative">
        <p className="bg-error/90 w-2 h-2 rounded-full absolute top-[-2px] start-[2px]"></p>
        <Notificaation className=" size-6" />
      </LocalePath>

      {/* {isClient && (
        <>
          {memoizedSession ? (
            <LocalePath
              href="/profile/addresses"
              className="xl:grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
            >
              <Person className="size-6" />
              <span className="hidden xl:inline-block">
                {memoizedSession.full_name}
              </span>
              <MdKeyboardArrowDown
                size={25}
                className="hidden xl:inline-block"
              />
            </LocalePath>
          ) : (
            <LocalePath
              href="/auth/login"
              className="xl:grid grid-cols-[auto_1fr] items-center gap-2 bg-greynormal rounded-xl p-3 max-w-64"
            >
              <Person className="size-6" />
              <span className="hidden xl:inline-block">{t("auth")}</span>
            </LocalePath>
          )}
        </>
      )} */}

      <LocalePath
        href="/auth/login"
        className="xl:grid grid-cols-[auto_1fr] items-center gap-2 bg-primary text-white rounded-full text-sm font-medium p-3 max-w-64"
      >
        <Person />
        <span className="hidden xl:inline-block">{t("auth")}</span>
        {/* <MdKeyboardArrowDown size={25} /> */}
      </LocalePath>
    </div>
  );
}
