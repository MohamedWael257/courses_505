/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/utils/axiosClient";
import LoaderSection from "@/shared/Loader/Loader";
import EmptyCart from "./EmptyCart";
import {
  addItem,
  decreaseItemQuantity,
  removeItem,
} from "@/store/cartStore.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import debounce from "debounce";
import CartCard from "@/shared/card/CartCard";
import LocalePath from "@/shared/LocalePath";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Teleport from "@/shared/Teleport/Teleport";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { ScrollArea } from "@/shared/ui/scroll-area";
import EmptyCoupons from "../profile/coupons/EmptyCoupons";
import { useLocale, useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import CouponCard from "@/shared/card/CouponCard";
import Cash from "@/assets/images/cash.png";
import MasterCart from "@/assets/images/master.png";
import Visaa from "@/assets/images/visa.png";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import UseSession from "@/store/UseSession";
import { SessionType } from "../Header";
import { useRouter } from "next/navigation";
import { GreenDiscountIcon, RS } from "@/shared/Icons";
import RelatedCourses from "../courses/RelatedCourses";

export default function CartCopmonent({ code }: { code: string }) {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [coupons, setCoupons] = useState<any>(null);
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  // const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(false);

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({}); // Track loading states for each item

  const dispatch = useDispatch<AppDispatch>();

  // const fetchCartData = async () => {
  //   try {
  //     const [response1, response2] = await Promise.all([
  //       axiosInstance.get(
  //         `cart${
  //           code
  //             ? `?code=${code}`
  //             : validCouponDiscount && couponCode
  //             ? `?code=${couponCode}`
  //             : ""
  //         }`
  //       ),
  //       memoizedSession && axiosInstance.get("vouchers"),
  //     ]);
  //     setData(response1.data);
  //     if (memoizedSession) {
  //       setCoupons(response2.data.data);
  //     }
  //   } catch (error: any) {
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "error",
  //       title: error?.response?.data?.message,
  //     });
  //   } finally {
  //     setIsLoadingFirstTime(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchCartData();
  // }, [loadingStates, code]);
  const [cartData, setCartData] = useState<any>(null);
  // useEffect(() => {
  //   if (data) {
  //     setCartData(data?.data);
  //   }
  // }, [data]);

  //Increment
  const incrementQuantity = async (id: any, item: any) => {
    setLoadingStates((prev) => ({ ...prev, [item?.id]: true }));
    try {
      // const formData = new FormData();
      // formData.append("type", "increment");
      // formData.append("quantity", `${item?.quantity}`);
      // const response = await axiosInstance.patch(`cart/${id}`, formData);
      // if (response.data?.status == "success") {
      dispatch(addItem(item));
      // }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [item?.id]: false })); // Reset loading for the specific item
    }
  };
  const debouncedAddToCart = debounce(async (id, item) => {
    await incrementQuantity(id, item);
  }, 300);
  const handleAddToCart = (item: any, quantity: number) => {
    // if (quantity < item?.product?.stock) {
    const updatedItem = {
      id: item.product.id,
      product: item.product,
      quantity: quantity + 1,
    };
    debouncedAddToCart(item?.id, updatedItem);
    // } else {
    //   if (item?.product?.stock > 0) {
    //     ShowAlertMixin({
    //       type: 15,
    //       icon: "error",
    //       title: t("validations.Only nubmer left in stock", {
    //         number: quantity,
    //       }),
    //     });
    //   }
    // }
  };

  //Decrement
  const decrementQuantity = async (id: any, item: any) => {
    setLoadingStates((prev) => ({ ...prev, [item?.id]: true }));
    try {
      // const formData = new FormData();
      // formData.append("type", "decrement");
      // formData.append("quantity", `${item?.quantity}`);

      // const response = await axiosInstance.patch(`cart/${id}`, formData);
      // if (response.data?.status == "success") {
      dispatch(decreaseItemQuantity(item));
      // }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [item?.id]: false }));
    }
  };
  const debouncedDecreaseQuantity = debounce(async (id, item) => {
    await decrementQuantity(id, item);
  }, 300);
  const removeFromCart = async (productID: any, itemId: any) => {
    setLoadingStates((prev) => ({ ...prev, [productID]: true }));
    try {
      // const response = await axiosInstance.delete(`cart/${itemId}`);
      // if (response.data?.status == "success") {
      dispatch(removeItem({ id: productID }));
      // }
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [productID]: false }));
    }
  };
  const handleDecreaseQuantity = (item: any, quantity: number) => {
    if (quantity > 1) {
      const updatedItem = {
        id: item.product.id,
        product: item.product,
        quantity: quantity - 1,
      };
      // dispatch(decreaseItemQuantity(updatedItem));
      debouncedDecreaseQuantity(item?.id, updatedItem);
    } else {
      removeFromCart(item?.product?.id, item.id);
    }
  };

  //Remove
  const handleRemoveFromCart = (item: any) => {
    removeFromCart(item?.product?.id, item.id);
  };

  //Handel Couppon
  const [LoadingApplyCoupon, setLoadingApplyCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState<any>("");
  const [validCouponDiscount, setValidCouponDiscount] = useState(false);
  const [validCouponError, setValidCouponError] = useState(false);

  // End Status Coupon
  useEffect(() => {
    if (code) {
      setCouponCode(code);
      setValidCouponDiscount(true);
    } else {
      setCouponCode("");
      setValidCouponDiscount(false);
    }
  }, [code]);
  const handleCouponEvent = async () => {
    if (validCouponDiscount) {
      setValidCouponDiscount(false);
      setCouponCode("");
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: "The coupon has been successfully cancelled",
      });
      router.replace(`${locale == "ar" ? "" : "/en"}/cart?code=`, {
        scroll: false,
      });
      return;
    }
    try {
      setLoadingApplyCoupon(true);
      const response = await axiosInstance.get(`cart?code=${couponCode}`);

      const result = response.data;

      if (result?.status === "success") {
        setData(result);

        if (result?.message == "Voucher applied successfully") {
          setValidCouponDiscount(true);
          ShowAlertMixin({
            type: 15,
            icon: "success",
            title: result.message,
          });
          router.replace(
            `${locale == "ar" ? "" : "/en"}/cart?code=${couponCode}`,
            { scroll: false }
          );
        } else {
          ShowAlertMixin({
            type: 15,
            icon: "info",
            title: result.message,
          });
          setValidCouponError(true);
        }
        // @ts-ignore
        // setValue("code", couponCode);
      } else {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: result.message || "Failed to apply coupon",
        });
        setValidCouponError(true);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
      setValidCouponError(true);
    } finally {
      setLoadingApplyCoupon(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && couponCode) {
      handleCouponEvent();
    }
  };

  return (
    <>
      {/* {isLoadingFirstTime ? (
        <LoaderSection />
      ) : data?.data?.length > 0 ? ( */}
      <div className="container grid lg:grid-cols-[2fr_1fr] gap-4 my-8">
        {/* CartDetails */}
        <div key="CartDetails" className="h-fit grid gap-4 mb-4">
          {/* {cartData?.map((ele: any, index: number) => {
            return (
              <CartCard
                Key={index}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleAddToCart={handleAddToCart}
                handleUpdateCart={handleUpdateCart}
                handleRemoveFromCart={handleRemoveFromCart}
                cartData={ele}
                index={index}
                loading={loadingStates[ele.product.id] || false} // Pass loading state for the specific item
              />
            );
          })} */}
          {[...Array(3)].map((item: any, index) => (
            <CartCard
              Key={index}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              cartData={item}
              index={index}
              loading={loadingStates[item?.product?.id] || false} // Pass loading state for the specific item
            />
          ))}
        </div>

        {/* OrderSummary */}
        <div

        // data-aos="fade-right"
        >
          <div className="bg-greynormal shadow-md rounded-2xl h-fit p-4 border border-secprimary">
            <h2 className="capitalize text-darkprimary font-medium lg:text-xl text-lg text-start lg:leading-[50px]   leading-8">
              {t("Text.orderSummary")}
            </h2>

            {/* {memoizedSession && (
              <> */}
            <div className="mb-4 grid grid-cols-[1fr_auto] items-center gap-3">
              <input
                type="text"
                placeholder={t("Text.enterCoupon")}
                className={`w-full px-3 py-4 border ${
                  validCouponError
                    ? "border-error"
                    : validCouponDiscount
                    ? "border-primary"
                    : "border-greynormal"
                }  rounded-full text-start focus-visible:!outline-none bg-white border border-greynormal`}
                value={couponCode}
                disabled={validCouponDiscount}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyDown={handleKeyDown}
                // onBlur={handleCouponEvent}
              />
              <button
                className={`${
                  validCouponError || validCouponDiscount
                    ? "text-error"
                    : "text-primary"
                } font-semibold border border-primary text-primary rounded-full w-24 h-14 `}
                onClick={() => {
                  if (validCouponError) {
                    setValidCouponError(false);
                    setCouponCode("");
                  } else {
                    handleCouponEvent();
                  }
                }}
                disabled={LoadingApplyCoupon || !couponCode}
              >
                {LoadingApplyCoupon ? (
                  <Loader className="text-primary w-8 h-4 animate-spin" />
                ) : validCouponDiscount || validCouponError ? (
                  t("BUTTONS.cancel")
                ) : (
                  t("BUTTONS.confirm")
                )}
              </button>
            </div>
            {validCouponError && (
              <p className="text-error text-sm font-bold leading-5">
                {t("Text.return_write_code")}
              </p>
            )}
            {validCouponDiscount && (
              <div className="flex items-center text-success font-normal text-base   leading-4">
                {t("Text.success_code", {
                  discount:
                    data?.max_discount_value > 0
                      ? data?.max_discount_value
                      : data?.discount,
                })}
                {"  "}
                {data?.max_discount_value > 0 ? (
                  <>{t("SR")}</>
                ) : (
                  <>{data?.discount_type == "value" ? `${t("SR")}` : `%`}</>
                )}
              </div>
            )}
            {/* </>
            )} */}
            {coupons?.length > 0 && (
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
            )}
            <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
              <div>
                <span className="text-darkprimary">المبلغ الإجمالي</span>
              </div>
              <span className="flex items-center gap-2 text-darkprimary">
                500
                <RS className="*:fill-darkprimary" />
              </span>
            </div>
            <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
              <div>
                <span className="text-darkprimary">الشحن</span>
              </div>
              <span className="flex items-center gap-2 text-darkprimary">
                20
                <RS className="*:fill-darkprimary" />
              </span>
            </div>
            {/* {data?.discount > 0 && ( */}
            <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
              <span className="text-darkprimary">
                {t("Text.orderDiscount")}
              </span>
              <span className="flex items-center gap-2 text-success">
                10
                <RS className="*:fill-success" />
              </span>
            </div>
            {/* )} */}
            <div className="h-0.5 bg-subborder my-2"></div>
            <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
              <div>
                <span className="text-darkprimary">{t("Text.orderTotal")}</span>
              </div>
              <span className="flex items-center gap-2 text-darkprimary">
                500 <RS className="*:fill-darkprimary" />
              </span>
            </div>
            <br />
            <LocalePath
              href={`/checkout?code=${validCouponDiscount ? couponCode : ""}`}
              className=" block my-3 text-center w-full bg-primary text-white p-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors border-2 border-primary"
            >
              {t("BUTTONS.completeOrder")}
            </LocalePath>
          </div>
        </div>
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
                          <>
                            <CouponCard
                              type={""}
                              key={index}
                              index={index}
                              coupon={coupon}
                            />
                            <br />
                          </>
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
      </div>
      {/* ) : (
        <>
          <EmptyCart />
          <RelatedCourses courses={null} />
        </>
      )} */}
    </>
  );
}
