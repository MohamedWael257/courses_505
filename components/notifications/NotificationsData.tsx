"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LocalePath from "@/shared/LocalePath";
import { useLocale, useTranslations } from "next-intl";
import axiosInstance from "@/utils/axiosClient";

import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Notificaation } from "@/shared/Icons";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import AppPagination from "@/shared/Pagination/AppPagination";
import UseSession from "@/store/UseSession";
import { SessionType } from "../Header";
import { useSocketContext } from "@/utils/providers/SocketProvider";
const NotificationsData = ({
  refetch,
  notifications,
  paggination,
  current_page,
}: any) => {
  console.log("🚀 ~ paggination:", paggination);

  const t = useTranslations("");
  const [activeNoti, setActiveNoti] = useState("");
  const markAsRead = async (id: any) => {
    await axiosInstance
      .get(`notifications/${id}`)
      .then((res: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res.data.message,
        });
        refetch();
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };
  const markALLAsRead = async () => {
    await axiosInstance
      .get(`notifications/mark-all-as-read`)
      .then((res: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res.data.message,
        });
        refetch();
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };

  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateURLParams = (params: { [key: string]: string | null }) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage });
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };
  const locale = useLocale();
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const { subscribeToUserNotifications, unsubscribeFromUserNotifications } =
    useSocketContext();
  useEffect(() => {
    const userID = memoizedSession?.id;
    if (userID) {
      subscribeToUserNotifications(userID, (notification) => {
        console.log("Received new notification:", notification);
        setTimeout(() => {
          refetch();
        }, 500);
      });
    }
    // Cleanup subscription when component unmounts
    return () => {
      if (userID) {
        unsubscribeFromUserNotifications(userID);
      }
    };
  }, [subscribeToUserNotifications, unsubscribeFromUserNotifications]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[632px] mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-darkprimary   leading-6 text-start">
            {t("Text.notifications")}
          </h1>

          <button
            onClick={markALLAsRead}
            className="text-primary font-medium underline"
          >
            {t("BUTTONS.markAsRead")}
          </button>
        </div>
        {/* </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
            <div className={`h-[700px] flex flex-col pe-2`}>
              {notifications.map((notification: any, index: number) => (
                <div
                  onClick={() => markAsRead(notification?.id)}
                  key={index}
                  className={`grid grid-cols-[auto_1fr] items-center gap-4 p-4 mb-4 rounded-xl bordser-b bsorder-b-secondrydark ${
                    notification?.is_readed
                      ? "bg-secprimary pointer-events-none cursor-not-allowed"
                      : " cursor-pointer"
                  }`}
                >
                  {/* Icon */}
                  <Notificaation className="size-8" />
                  {/* Details */}
                  <div>
                    <h2 className="font-medium text-darkprimary">
                      {notification?.title}
                    </h2>
                    <h2 className="font-medium text-darkprimary">
                      {notification?.body}
                    </h2>

                    <p className="text-sm text-secondrydark">
                      {notification?.created_at}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        {notifications && notifications.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={paggination?.per_page}
              totalItems={paggination?.total}
              totalPage={paggination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsData;
