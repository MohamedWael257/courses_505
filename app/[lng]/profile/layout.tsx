"use client";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo, useEffect, useState } from "react";
import { SessionType } from "@/components/Header";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import LocalePath from "@/shared/LocalePath";
import useAccountLinks from "@/shared/header/useAccountLinks";
import ImageWithFallback from "@/shared/ImageWithFallback";
import MobileSheet from "@/shared/MobileSheet";
import LogoutButton from "@/components/profile/LogoutButton";
import UseSession from "@/store/UseSession";
import ProfileImage from "@/assets/images/profile.png";
import DeleteAccountButton from "@/components/profile/personal-account/DeleteAccountButton";
import { RS } from "@/shared/Icons";

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ReactNode;
}) {
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const pathname = usePathname();
  const locale = useLocale();
  // Clean path and remove query parameters
  const cleanPath = (path: string) => {
    const pathWithoutQuery = path.split("?")[0];
    return pathWithoutQuery.endsWith("/") && pathWithoutQuery !== "/"
      ? pathWithoutQuery.slice(0, -1)
      : pathWithoutQuery;
  };

  const cleanedPathname = cleanPath(pathname);
  const { accountMenuItems } = useAccountLinks();
  const t = useTranslations("NAV");
  const filteredAccountMenuItems = accountMenuItems;

  const pathSegments = cleanedPathname.split("/").filter(Boolean);
  const lastMeaningfulSegment = pathSegments
    .reverse()
    .find((segment) => isNaN(Number(segment)));

  const paths = [
    { name: "home", href: "/" },
    { name: "profile" },
    {
      name:
        lastMeaningfulSegment && lastMeaningfulSegment?.length >= 20
          ? "order_details"
          : lastMeaningfulSegment,
    }, // Default to "Profile" if segment is undefined
  ];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      <div className="container py-4">
        <div className="my-4">
          <AppBreadCrumbs paths={paths} />
        </div>
        <div className="container mt-10 lg:!hidden">
          {filteredAccountMenuItems && (
            <MobileSheet filteredAccountMenuItems={filteredAccountMenuItems} />
          )}
        </div>
        <section className="flex gap-8 my-4 px-2">
          {filteredAccountMenuItems && (
            <div className="hidden lg:flex w-[28%] min-w-[358px] h-min sticky top-16 flex-col gap-2">
              <div className="bg-greynormal rounded-2xl px-8 py-10">
                {/* {isClient && ( */}
                <div className="flex gap-3 items-center mb-6">
                  <ImageWithFallback
                    src={ProfileImage}
                    width={1000}
                    height={1000}
                    className="w-14 h-14 rounded-full object-cover"
                    alt="profile image"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="capitalize font-semibold lg:text-xl text-lg text-start lg:leading-8">
                      {"Guest User"}
                    </h2>
                    <h2 className="text-secondrydark text-base font-medium   leading-6 text-start">
                      {"No email provided"}
                    </h2>
                  </div>
                </div>
                {/* )} */}
                <ul>
                  {filteredAccountMenuItems.map((item: any, ind: number) => {
                    const isActive =
                      cleanPath(
                        `${locale == "ar" ? "" : "/en"}${item.path}`
                      ) === cleanedPathname;
                    return (
                      <li key={ind}>
                        <LocalePath
                          href={item.path}
                          scroll={!isActive}
                          className={clsx(
                            "flex gap-3 items-center px-3 mb-4 text-base py-4 font-normal",
                            {
                              "bg-white text-primary rounded-xl": isActive,
                            },
                            {
                              "flex items-center justify-between":
                                item.path.includes("wallet"),
                            }
                          )}
                        >
                          <div className="flex gap-3 items-center">
                            <span
                              className={clsx(
                                "w-6 h-6 min-w-6 min-h-6 rounded-full flex items-center justify-center",
                                {
                                  "download-app-section text-primary": isActive,
                                }
                              )}
                            >
                              {isActive ? item.activeIcon : item.icon}
                            </span>
                            <span
                              className={clsx("text-[16px] font-normal", {
                                "text-primary": isActive,
                                "text-[#3C4143]": !isActive,
                              })}
                            >
                              {item.name}
                            </span>
                          </div>
                          {item.path.includes("wallet") && (
                            <span className="text-darksuccess bg-success/10 text-base font-medium p-2 rounded-2xl flex items-center gap-2">
                              500 <RS className="*:fill-darksuccess" />
                            </span>
                          )}
                        </LocalePath>
                      </li>
                    );
                  })}
                  <LogoutButton />
                  <br />
                  <DeleteAccountButton />
                </ul>
              </div>
            </div>
          )}
          <div className="flex-grow w-0">{children}</div>
        </section>
      </div>
    </div>
  );
}
