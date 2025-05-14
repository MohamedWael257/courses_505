"use client";
import React, { useEffect, useState } from "react";
import LocalePath from "../LocalePath";
import Logo from "@/public/logo.png";
import ImageWithFallback from "../ImageWithFallback";
import { useLocale, useTranslations } from "next-intl";
import Teleport from "../Teleport/Teleport";
import SideMenu from "./SideMenu";
import { usePathname } from "next/navigation";
import { GreenDiscountIcon } from "../Icons";
import { NavItems } from "./NavbarLinks";

const HeaderNavItems = ({
  className,
  toggleDrawer,
}: {
  className?: string;
  toggleDrawer?: () => void;
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  const router = usePathname();

  // Clean path and remove query parameters
  const cleanPath = (path: string) => {
    const pathWithoutQuery = path.split("?")[0];
    return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
      ? pathWithoutQuery.slice(0, -1)
      : pathWithoutQuery;
  };

  const activeLink = cleanPath(router);
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`text-text font-semibold lg:h-fit w-full py-5 ${
        className ? className : ""
      }`}
    >
      <div className="flex gap-6 flex-wrap items-center">
        {NavItems?.length > 0 &&
          NavItems?.map((el, index: number) => {
            const isActive =
              activeLink ===
              cleanPath(`${locale == "ar" ? "" : "/en"}/${el.path}`);

            return (
              <LocalePath
                className={`${
                  isActive ? "text-primary font-bold" : ""
                } text-base hover:text-primary cursor-pointer font-medium   leading-5 text-center text-dark lg:inline-block hidden`}
                href={`${el.path}`}
                key={`header_link_${index}`}
              >
                {t(`NAV.${el?.name}`)}
              </LocalePath>
            );
          })}
      </div>

      <Teleport to="body">
        {isOpen && (
          <SideMenu
            direction="right"
            bg="bg-white"
            title={
              <div className="flex gap-1 text-xl items-center">
                <ImageWithFallback
                  src={Logo}
                  width={600}
                  height={600}
                  className="w-6 h-6 object-contain"
                  alt="Logo"
                />
                {t("Text.departments")}
              </div>
            }
            close={() => setOpen(false)}
          >
            <div className="flex gap-2 flex-col flex-wrap px-4">
              {NavItems?.length > 0 &&
                NavItems?.map((el, index: number) => (
                  <LocalePath
                    className={`${
                      activeLink ===
                      cleanPath(`${locale == "ar" ? "" : "/en"}/${el.path}`)
                        ? "text-primary font-bold"
                        : ""
                    } text-lg cursor-pointer font-medium   leading-5 text-start border-b-2 py-5 border-b-greynormal text-dark`}
                    href={`${el.path}`}
                    key={`header_link_${index}`}
                    onClick={() => setOpen(false)}
                  >
                    {t(`NAV.${el.name}`)}
                  </LocalePath>
                ))}
            </div>
          </SideMenu>
        )}
      </Teleport>
    </div>
  );
};

export default HeaderNavItems;
