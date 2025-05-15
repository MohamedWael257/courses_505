"use client";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { useDirection } from "@radix-ui/react-direction";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";
import LogoutButton from "@/components/profile/LogoutButton";

import { Skeleton } from "./ui/skeleton";
import LocalePath from "./LocalePath";
import { useSession } from "../store/auth.slice";
import useAccountLinks from "./header/useAccountLinks";

interface MobileSheetProps {
  filteredAccountMenuItems?: any;
}

const MobileSheet: React.FC<MobileSheetProps> = ({
  filteredAccountMenuItems,
}) => {
  const session = useSession();
  const locale = useLocale();

  const t = useTranslations("NAV");
  const router = useRouter();
  const pathname = usePathname();
  const { accountMenuItems } = useAccountLinks();

  const [open, setOpen] = useState(false);

  // Clean path and remove query parameters
  const cleanPath = (path: string) => {
    const pathWithoutQuery = path.split("?")[0];
    return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
      ? pathWithoutQuery.slice(0, -1)
      : pathWithoutQuery;
  };

  const cleanedPathname = cleanPath(pathname);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex gap-4 items-center border-b-secondrydark">
        <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[#FCFBFD] pulse-shadow">
          <AlignJustify className="text-primary w-8 h-8" />
        </div>
        <p className="font-bold hover:text-primary">{t("Show side list")}</p>
      </SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "right" : "left"}
        className="max-w-[100vw] w-72 flex flex-col p-0 pt-8 bg-[#F4F4F4]"
      >
        {/* <SheetHeader></SheetHeader> */}
        <ScrollArea className="grow " dir="ltr">
          <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className={`  ${locale == "ar" ? "px-4" : "ps-2 pe-3"}`}
          >
            <nav>
              {filteredAccountMenuItems ? (
                <div className="flex  flex-col gap-2">
                  <div className="  rounded-2xl  px-2">
                    <ul>
                      {filteredAccountMenuItems?.map(
                        (item: any, ind: number) => {
                          const isActive =
                            cleanPath(item.path) === cleanedPathname;
                          return (
                            <React.Fragment key={ind}>
                              <li onClick={() => setOpen(false)}>
                                <LocalePath
                                  href={item.path}
                                  scroll={!isActive}
                                  className={clsx(
                                    "flex gap-3 items-center mb-4 text-base py-4",
                                    {
                                      "bg-secprimary text-primary rounded-xl":
                                        isActive,
                                    }
                                  )}
                                >
                                  <span
                                    className={clsx(
                                      "w-6 h-6 min-w-6 min-h-6 rounded-full flex items-center justify-center",
                                      {
                                        "download-app-section text-primary":
                                          isActive,
                                      }
                                    )}
                                  >
                                    {isActive ? item.activeIcon : item.icon}
                                  </span>
                                  <span
                                    className={clsx(
                                      "text-[16px] font-semibold",
                                      {
                                        "text-primary": isActive,
                                        "text-darkprimary": !isActive,
                                      }
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                </LocalePath>
                              </li>
                            </React.Fragment>
                          );
                        }
                      )}

                      {/* Logout */}
                      <LogoutButton setOpen={setOpen} />
                    </ul>
                  </div>
                </div>
              ) : (
                <Skeleton className="hidden lg:block p-8 w-[24%] min-w-[328px] gap-2 bg-[#FCFBFD] rounded-2xl !h-auto sticky top-28" />
              )}
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
