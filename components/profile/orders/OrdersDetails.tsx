"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { RiArrowLeftSLine } from "react-icons/ri";
import LocalePath from "@/shared/LocalePath";
import { useTranslations, useLocale } from "next-intl";
import EmptyOrders from "./EmptyOrders";
import { Input } from "@/shared/ui/input";
import Image from "next/image";
import CustomPagination from "@/shared/Pagination/CustomPagination";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import { useSocketContext } from "@/utils/providers/SocketProvider";
type Props = {
  orders: any;
  defaultType: any;
  current_page: any;
  paggination: any;
  refetch: any;
};

export default function OrdersDetails({
  orders,
  defaultType,
  current_page,
  paggination,
  refetch,
}: Props) {
  const t = useTranslations();
  const taps = [
    { id: 1, title: t("status.activee"), slug: "active" },
    {
      id: 2,
      title: t("status.delivered_to_customer"),
      slug: "delivered_to_customer",
    },
    { id: 3, title: t("status.cancelledd"), slug: "cancelled" },
    { id: 4, title: t("status.return"), slug: "returned" },
  ];
  const [active, setActive] = useState(defaultType);
  const Router = useRouter();
  const locale = useLocale();
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
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const { subscribeToUserNotifications, unsubscribeFromUserNotifications } =
    useSocketContext();
  useEffect(() => {
    const userID = memoizedSession?.id;
    if (userID) {
      subscribeToUserNotifications(userID, (notification) => {
        console.log("Received new notificaton:", notification);

        if (notification?.type == "order") {
          console.log("Received new notificaton:", notification);
          setTimeout(() => {
            refetch();
          }, 500);
        }
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
    <>
      <div className="sm:flex gap-4 items-center ">
        <div className=" flex-1 mb-3">
          <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
            {t("Text.ordersDetailsTitle", { count: orders.length })}
          </h2>
          <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start">
            {t("Text.ordersDetailsDesc")}
          </h2>
        </div>
        <div className="relative">
          <Input
            type="text"
            searchCustom
            searchButtonSubmitted
            className="2xl:w-[350px] xl:w-[275px] lxg:w-[648px] md:w-full ps-10 font-bold min-h-[42px] border-2 border-secondrydark rounded-xl"
            leftIcon={
              <IoSearch
                className="text-[#B0B0B0] me-2 cursor-pointer"
                size={25}
              />
            }
            // leftIcon={<SearchIcon />}
            placeholder={t("ordersSearch")}
          />
        </div>
      </div>
      <div className="buttons mb-8 w-full grid lg:grid-cols-4 grid-cols-2 gap-3">
        {taps.map((ele) => {
          return (
            <button
              key={ele?.id}
              className={` h-fit mt-3   font-medium   leading-6 grid place-content-center ${
                active == ele?.slug
                  ? " text-primary border-2 border-primary "
                  : " text-dark border-2 border-subborder "
              }  px-6 py-4 text-sm rounded-xl`}
              onClick={() => {
                setActive(ele?.slug);
                Router.replace(
                  `${locale == "ar" ? "" : "/en"}/profile/orders?status=${
                    ele?.slug
                  }&page=${1}`,
                  {
                    scroll: false,
                  }
                );
              }}
            >
              {ele?.title}
            </button>
          );
        })}
      </div>
      <div ref={containerRef} className="space-y-4">
        {orders?.length > 0 ? (
          orders?.map((ele: any, index: number) => {
            return (
              <div key={index} className="p-4 rounded-xl bg-white">
                <h2 className="text-text  text-lg font-medium   leading-7 text-start mb-3">
                  {t("Text.orderId", { count: " " })}
                  <span className="text-base font-medium   leading-6 text-secondrydark">
                    {ele?.uuid}
                  </span>
                </h2>
                <div className="flex items-center gap-2 md:gap-4 mt-4">
                  {/* <ImageWithFallback
                    src={ele?.item?.name?.media}
                    alt={"image"}
                    width={80}
                    height={80}
                    className="size-[85px] md:size-[100px] object-contain bg-greynormal rounded-lg "
                  /> */}
                  <div className="bg-greynormal p-3 rounded-xl flex justify-center items-center">
                    <ImageWithFallback
                      src={ele?.item?.image?.media}
                      alt={"image"}
                      width={80}
                      height={80}
                      className="size-[85px] md:size-[100px] object-contain  "
                    />
                  </div>
                  <div className="text-start flex-1 font-semibold space-y-1.5 md:space-y-3 ">
                    <p className="text-sm text-secondrydark font-normal">
                      {ele?.vendor?.username}
                    </p>
                    <p className="text-base font-medium text-text">
                      {ele?.item?.brand?.name}
                    </p>
                    <p className="text-sm text-secondrydark font-normal">
                      {ele?.item?.name}
                    </p>
                    <div className="flex justify-between gap-4 items-center">
                      <div className="space-y-3">
                        <span
                          className={`statuses ${ele?.status} cursor-pointer font-semibold mt-2 text-center w-fit`}
                        >
                          {t(`status.${ele?.status}`)}
                        </span>
                        <p className="text-sm text-text ">
                          {ele?.status == "pending"
                            ? ele?.created_at
                            : ele[`${ele?.status}_at`]}
                          {/* {ele?.created_at} */}
                        </p>
                      </div>
                      <LocalePath
                        // className="flex items-center p-2 rounded-xl border-[1px] border-subborder"

                        className="border border-platinum p-2 rounded-lg  flex items-center gap-1 md:gap-2.5 max-md:text-[10px] "
                        href={`/profile/orders/${ele?.uuid}`}
                        data-aos="fade-left"
                      >
                        {ele?.item?.quantity > 0 && (
                          <button className="mx-2 text-lg font-medium  text-text">
                            +{ele?.item?.quantity}
                          </button>
                        )}
                        <RiArrowLeftSLine
                          className={`${locale == "ar" ? "" : "rotate-180"}`}
                          size={25}
                        />
                      </LocalePath>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyOrders />
        )}
        {orders && orders.length > 0 && (
          <div className="py-8">
            <CustomPagination
              itemsPerPage={paggination?.per_page}
              totalItems={paggination?.total}
              totalPage={paggination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
    </>
  );
}
