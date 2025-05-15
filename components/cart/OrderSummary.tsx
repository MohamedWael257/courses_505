"use client";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React, { useEffect, useState } from "react";
import LocalePath from "@/shared/LocalePath";
import Teleport from "@/shared/Teleport/Teleport";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";
import EmptyCoupons from "@/components/profile/coupons/EmptyCoupons";
import CopyToClipboard from "@/shared/CopyToClipboard";
import { FaRegCopy } from "react-icons/fa";

import { Dialog, DialogContent } from "@/shared/ui/dialog";
import axiosInstance from "@/utils/axiosClient";
import LoaderSection from "@/shared/LoaderSection/LoaderSection";
import Loader from "@/shared/Loader/Loader";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { GreenDiscountIcon } from "@/shared/Icons";

const OrderSummary: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const coupons: any = [];
  const type = "قسائم محفوظة";
  const coupon_code = "ELEC5";
  const handleSubmit = (value: string) => {
    if (value === coupon_code) {
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: t("Successful operation"),
      });
    } else {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: t("Invalid coupon code"),
      });
    }
  };
  // const handleSubmit = async () => {
  //     if (validCouponDiscount) {
  //       setValidCouponDiscount(false);
  //       setCouponCode("");
  //       notify("success", "The coupon has been successfully cancelled");
  //       return;
  //     }

  //     try {
  //       setLoadingApplyCoupon(true);
  //       const response = await axiosInstance.post(
  //         "/user/cart/apply_coupon",
  //         {
  //           code: couponCode,
  //           cart_id: data?.data?.id,
  //           // welcome_coupon: couponCode,
  //         }
  //       );

  //       const result = response.data;

  //       if (result?.status === "success") {
  //         setCartData(result?.data);
  //         notify(
  //           "success",
  //           result.message ||
  //             "Coupon applied successfully" ||
  //             "Successful operation"
  //         );
  //         setValidCouponDiscount(true);
  //         //@ts-ignore
  //         setValue("code", couponCode);
  //       } else {
  //         notify("error", result.message || "Failed to apply coupon");
  //       }
  //     } catch (error: any) {
  //       const errorMessage =
  //         error?.message;
  //       notify("error", errorMessage);
  //     } finally {
  //       setLoadingApplyCoupon(false);
  //     }
  //   };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(couponInput);
    }
  };
  const [data, setData] = useState<any>(null);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCartData = async () => {
    setIsLoading(true);
    setIsFetching(true);
    setIsError(false);
    try {
      const response = await axiosInstance.get("cart");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
      setIsLoadingFirstTime(false);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);
  const [loadingRemoveCoupon, setLoadingRemoveCoupon] = useState(false);
  // Local state to store the cart data
  const [cartData, setCartData] = useState<any>(null);

  // Update cartData when the API data changes
  useEffect(() => {
    if (data) {
      setCartData(data?.data); // Assuming data has a "data" field that contains the necessary information
      setLoadingRemoveCoupon(false);
    }
  }, [data]);
  return (
    <>
      {isLoadingFirstTime && data?.data?.length == 0 ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-white shadow-md rounded-xl h-fit p-4">
            <h2 className="capitalize text-darkprimary font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
              {t("Text.orderSummary")}
            </h2>
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder={t("Text.enterCoupon")}
                className="w-full px-3 py-4 border border-greynormal rounded-lg text-start"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="mt-2 text-primary font-semibold absolute inset-y-0 end-3"
                onClick={() => handleSubmit(couponInput)}
              >
                {t("BUTTONS.confirm")}
              </button>
            </div>
            <div
              onClick={() => {
                setIsDialogOpen(true);
              }}
              className="flex cursor-pointer items-center justify-between gap-2  text-success p-4 my-3 bg-secsuccess border-dashed border border-success text-xs font-bold   leading-5 text-start rounded-lg"
            >
              <GreenDiscountIcon className="size-5" />
              <p className="text-base font-normal   leading-4  ">
                {t("BUTTONS.viewOffers")}
              </p>
              <MdKeyboardArrowLeft
                className={`${locale == "ar" ? "" : "rotate-180 me-4"}`}
                size={25}
              />
            </div>
            <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
              <div>
                <span className="text-darkprimary">
                  {t("Text.orderItems")}{" "}
                </span>
                <span className="text-secondrydark">
                  ({cartData?.length} {t("Text.orderItem")})
                </span>
              </div>
              <span className="text-secondrydark">70.00 {t("Text.SR")}</span>
            </div>
            <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
              <span className="text-darkprimary">
                {t("Text.orderShipping")}
              </span>
              <span className="font-semibold text-success">
                {t("Text.free")}
              </span>
            </div>
            <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
              <span className="text-darkprimary">
                {t("Text.orderDiscount")}
              </span>
              <span className="font-semibold text-success">
                20.00 {t("Text.SR")}
              </span>
            </div>
            <div className="h-0.5 bg-greynormal my-2"></div>
            <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
              <div>
                <span className="font-bold text-darkprimary">
                  {t("Text.orderTotal")}
                </span>
                <span className="font-bold text-secondrydark">
                  {t("Text.orderTax")}
                </span>
              </div>
              <span className="font-bold text-gray-900">
                {data?.subTotal} {t("Text.SR")}
              </span>
            </div>
            <br />
            <LocalePath
              href="/checkout"
              className="flex gap-3 items-center justify-center mt-3 text-center w-full bg-primary text-white p-4 rounded-lg font-semibold"
            >
              {t("BUTTONS.completeOrder")}
              <TbArrowNarrowLeft
                className={`${locale == "ar" ? "" : "rotate-180 me-4"}`}
                size={30}
              />
            </LocalePath>
          </div>
          <br />
          <div className="bg-white p-4 rounded-xl flex justify-between items-center">
            <div>{t("Text.cash")}</div>
            <div>{t("Text.credit")}</div>
            <div>{t("Text.bankTransfer")}</div>
          </div>
        </div>
      )}

      {isDialogOpen && (
        <Teleport to="body">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-[90%] xl:w-[500px] max-w-[90%] xl:max-w-[60%] bg-white border-2 border-greynormal"
            >
              <ScrollArea
                className="grow  w-full"
                dir={locale === "en" ? "ltr" : "rtl"}
              >
                <div className={`h-[600px] flex flex-col pe-2`}>
                  {coupons.length > 0 ? (
                    <div className="p-4 bg-white rounded-lg shadow ">
                      {coupons.map((coupon: any, index: number) => (
                        <div
                          key={index}
                          className={`relative p-4 px-8 rounded-xl border-2 border-dashed ${
                            type == "قسائم محفوظة"
                              ? "border-success"
                              : "border-primary"
                          } `}
                        >
                          <div
                            className={` absolute z-[0] top-1/2 transform -translate-y-1/2 start-[-7px]  bg-white border-2 border-dashed ${
                              type == "قسائم محفوظة"
                                ? "border-t-success border-r-transparent border-b-success border-l-success"
                                : " border-t-primary border-r-transparent border-b-primary border-l-primary"
                            } h-[30px] w-[30px] rounded-full`}
                          ></div>
                          <div
                            className={` absolute z-[0] top-1/2 transform -translate-y-1/2 end-[-7px]  bg-white border-2 border-dashed ${
                              type == "قسائم محفوظة"
                                ? "border-t-success border-r-success border-b-success border-l-transparent"
                                : " border-t-primary border-r-primary border-b-primary border-l-transparent"
                            } h-[30px] w-[30px] rounded-full`}
                          ></div>

                          <div
                            className={`flex justify-start flex-col gap-3 ${
                              type == "قسائم محفوظة" ? "mb-14" : "mb-4"
                            }`}
                          >
                            <h2>ELEC5 :كود</h2>
                            <div className="flex gap-2 items-center">
                              dateicon
                              <p> 25 - 30 نوفمبر</p>
                            </div>
                            <div className="flex gap-2 items-center text-xl font-bold   leading-5 text-start text-success">
                              <GreenDiscountIcon className="size-5" />
                              {t("Text.discount", { count: 25 })}
                            </div>
                          </div>
                          {type == "قسائم محفوظة" && (
                            <div className="flex justify-center items-center text-success bg-secsuccess absolute bottom-0 start-0 w-full h-16">
                              <CopyToClipboard text="ELEC5" />
                              <FaRegCopy size={25} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyCoupons />
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
};

export default OrderSummary;
