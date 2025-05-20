"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect } from "react";
import ShowAlertMixin from "../ShowAlertMixin";
import { Notificaation } from "../Icons";
import AppDrawer from "../drawers/AppDrawer";
import EmptyNotifications from "@/components/notifications/EmptyNotifications";
import { Dropdown, MenuProps, Spin } from "antd";
import LocalePath from "../LocalePath";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

const NotificationsDrawer = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // const {data} = await getNotifications();
      // setNotifications(data)
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  const handleMarkAll = async () => {
    try {
      // const res = await markAllAsNotificationsRead();
      // if (res?.status == "success") {
      //   // toast.success(res?.message);
      //   setNotifications((prev) =>
      //     prev.map((item) => ({ ...item, is_readed: true }))
      //   );
      // }
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, is_readed: true }))
      );
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    }
  };

  const handleMarkRead = async (notificationId: string) => {
    try {
      // const res = await markAsNotificationRead(notificationId);
      // if (res?.status == "success") {
      //   // toast.success(res?.message);
      //   setNotifications((prev) =>
      //     prev.map((item) =>
      //       item.id === notificationId ? { ...item, is_readed: true } : item
      //     )
      //   );
      // }
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notificationId ? { ...item, is_readed: true } : item
        )
      );
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    }
  };
  // const items: MenuProps["items"] = loading
  //   ? [
  //       {
  //         label: <Spin spinning={loading} />,
  //         key: "loading",
  //         disabled: true,
  //       },
  //     ]
  //   : notifications?.length > 0
  //   ? [
  //       ...notifications.map((item: any) => ({
  //         key: `search_${item.id}`,
  //         label: (
  //           <li
  //             key={`notifications_${item?.id}`}
  //             onClick={
  //               item?.is_readed ? undefined : () => handleMarkRead(item?.id)
  //             }
  //             className={`flex items-center gap-4 p-4 rounded-2xl text-gray-500 ${
  //               item?.is_readed ? " bg-white" : "bg-greynormal cursor-pointer"
  //             } `}
  //           >
  //             <figure className="size-12 flex-center-content rounded-full bg-[#3512390D]">
  //               <Notificaation />
  //             </figure>
  //             <div className="flex-1 flex items-center justify-between">
  //               <div className="space-y-3">
  //                 <h6 className=" font-bold text-text-gray">{item?.title}</h6>
  //                 <p className=" text-sm font-semibold">{item?.created_time}</p>
  //               </div>
  //               {!item?.is_readed && (
  //                 <span className="size-2.5 bg-primary rounded-full"></span>
  //               )}
  //             </div>
  //           </li>
  //         ),
  //       })),

  //       {
  //         label: (
  //           <LocalePath
  //             href={`/notifications`}
  //             className="!text-primary text-lg text-start font-medium flex gap-2 items-center justify-start w-fit whitespace-nowrap"
  //           >
  //             {t("Show more")} ({notifications.length})
  //             <RiArrowLeftSLine
  //               className={`${locale === "ar" ? "" : "rotate-180"}`}
  //               size={25}
  //             />
  //           </LocalePath>
  //         ),
  //         key: "all",
  //       },
  //     ]
  //   : [
  //       {
  //         label: (
  //           <span className="text-gray-500">{t("LABELS.no_history")}</span>
  //         ),
  //         key: "empty",
  //         disabled: true,
  //       },
  //     ];
  // const items: MenuProps["items"] = loading
  //   ? [
  //       {
  //         label: <Spin spinning={loading} />,
  //         key: "loading",
  //         disabled: true,
  //       },
  //     ]
  //   : [
  //       ...[...Array(25)].map((item: any, index: number) => ({
  //         key: `search_${index}`,
  //         label: (
  //           <li
  //             key={`notifications_${index}`}
  //             onClick={
  //               item?.is_readed ? undefined : () => handleMarkRead(item?.id)
  //             }
  //             className={`grid grid-cols-[1fr_auto] items-center gap-4 p-4 rounded-2xl text-gray-500 ${
  //               item?.is_readed ? " bg-white" : "bg-greynormal cursor-pointer"
  //             } `}
  //           >
  //             <figure className="size-10 grid place-content-center rounded-full bg-secprimary">
  //               <Notificaation className="*:fill-primary size-6" />
  //             </figure>
  //             <div className="grid grid-cols-[1fr_auto] items-center text-secondrydark">
  //               <div className="space-y-3">
  //                 <h6 className=" font-semibold text-darkprimary text-sm leading-6 text-start ">
  //                   هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
  //                 </h6>

  //                 <p className="  text-sm font-normal leading-8 text-start">
  //                   الاثنين 25 نوفمبر 2024 , 2:30 م
  //                 </p>
  //               </div>
  //               {!item?.is_readed && (
  //                 <span className="size-2.5 bg-primary rounded-full"></span>
  //               )}
  //             </div>
  //           </li>
  //         ),
  //       })),

  //       {
  //         label: (
  //           <LocalePath
  //             href={`/notifications`}
  //             className="!text-primary text-lg text-start font-medium flex gap-2 items-center justify-start w-fit whitespace-nowrap"
  //           >
  //             {t("Show more")} ({notifications.length})
  //             <RiArrowLeftSLine
  //               className={`${locale === "ar" ? "" : "rotate-180"}`}
  //               size={25}
  //             />
  //           </LocalePath>
  //         ),
  //         key: "all",
  //       },
  //     ];
  return (
    <>
      {/* <Dropdown
        trigger={["click"]}
        menu={{ items }}
        overlayStyle={{ height: "600px" }}
        overlayClassName="search-drop-down"
      >
        <button className="relative">
          <p className="bg-error/90 w-2 h-2 rounded-full absolute top-[-2px] start-[2px]"></p>
          <Notificaation className=" size-6" />
        </button>
      </Dropdown> */}
      <button onClick={() => setOpen(true)} className="relative">
        <p className="bg-error/90 w-2 h-2 rounded-full absolute top-[-2px] start-[2px]"></p>
        <Notificaation className=" size-6" />
      </button>
      <AppDrawer
        title={
          <div className="flex items-center justify-between  ">
            <h5 className="text-2xl font-bold">{t("Text.notifications")}</h5>
            {notifications && (
              <button
                onClick={handleMarkAll}
                className="text-sm text-primary underline font-semibold"
              >
                {t("Text.seen_mark")}
              </button>
            )}
          </div>
        }
        placement="left"
        open={open}
        loading={loading}
        handleClose={() => setOpen(false)}
        rootClassName=""
      >
        {/* {notifications.length ? (
          <ul className="space-y-4">
            {notifications?.map((item) => (
              <li
                key={`notifications_${item?.id}`}
                onClick={
                  item?.is_readed ? undefined : () => handleMarkRead(item?.id)
                }
                className={`flex items-center gap-4 p-4 rounded-2xl text-gray-500 ${
                  item?.is_readed ? " bg-white" : "bg-greynormal cursor-pointer"
                } `}
              >
                <figure className="size-12 flex-center-content rounded-full bg-[#3512390D]">
                  <Notificaation />
                </figure>
                <div className="flex-1 flex items-center justify-between">
                  <div className="space-y-3">
                    <h6 className=" font-bold text-text-gray">{item?.title}</h6>
                    <p className=" text-sm font-semibold">
                      {item?.created_time}
                    </p>
                  </div>
                  {!item?.is_readed && (
                    <span className="size-2.5 bg-primary rounded-full"></span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNotifications />
        )} */}
        <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
          <div className={`h-[calc(100vh-100px)] flex flex-col pe-2`}>
            <ul className="space-y-4">
              {/* {notifications?.map((item) => ( */}
              {[...Array(25)].map((item, index) => (
                <li
                  key={`notifications_${item?.id}`}
                  onClick={
                    item?.is_readed ? undefined : () => handleMarkRead(item?.id)
                  }
                  className={`grid grid-cols-[1fr_auto] items-center gap-4 p-4 rounded-2xl text-gray-500 ${
                    item?.is_readed
                      ? " bg-white"
                      : "bg-greynormal cursor-pointer"
                  } `}
                >
                  <figure className="size-10 grid place-content-center rounded-full bg-secprimary">
                    <Notificaation className="*:fill-primary size-6" />
                  </figure>
                  <div className="grid grid-cols-[1fr_auto] items-center text-secondrydark">
                    <div className="space-y-3">
                      <h6 className=" font-semibold text-darkprimary text-sm leading-6 text-start ">
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
                      </h6>

                      <p className="  text-sm font-normal leading-8 text-start">
                        الاثنين 25 نوفمبر 2024 , 2:30 م
                      </p>
                    </div>
                    {!item?.is_readed && (
                      <span className="size-2.5 bg-primary rounded-full"></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </AppDrawer>
    </>
  );
};

export default NotificationsDrawer;
