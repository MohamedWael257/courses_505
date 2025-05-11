"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearCart } from "@/store/cartStore.slice";
import axiosInstance from "@/utils/axiosClient";

import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Loader } from "lucide-react";
import { updateUser } from "@/store/auth.slice";
import Success from "@/assets/images/success2.gif";
type Props = {
  data: any;
  location_id: any;
  payment_method: any;
  shipping_type: any;
  shipping_Value: any;
  code: any;
  locations: any;
  memoizedSession: any;
};
export default function CheckoutSummary({
  data,
  location_id,
  payment_method,
  shipping_type,
  shipping_Value,
  code,
  locations,
  memoizedSession,
}: Props) {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const UpdateProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");

      dispatch(updateUser(response.data.data));
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
    }
  };
  const handleSubmit = async () => {
    if (locations?.length > 0) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("location_id", `${location_id}`);
      formData.append("payment_method", `${payment_method}`);
      formData.append("shipping_type", `${shipping_type}`);
      if (code) {
        formData.append("code", `${code}`);
      }
      await axiosInstance
        .post("orders", formData)
        .then((res: any) => {
          UpdateProfile();
          Swal.fire({
            title: res?.data?.message,
            showConfirmButton: false,
            imageUrl: `${Success.src}`,
            footer: `<p id="swal2-footer"> ${t("Text.goToMyOrders")}</p>`,
            customClass: {
              popup: "custom-popup-class",
              title: "custom-title-class",
              footer: "custom-footer-class",
            },
            padding: "1rem",
            didOpen: () => {
              const footerLink = document.getElementById("swal2-footer");

              if (footerLink) {
                footerLink.addEventListener("click", () => {
                  Swal.close();
                  router.replace(
                    `${locale == "ar" ? "" : "/en"}/profile/orders`
                  );
                  dispatch(clearCart());
                });
              }
            },
          });
          setTimeout(() => {
            Swal.close();
            router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
            dispatch(clearCart());
          }, 3000);
          setIsLoading(false);
        })
        .catch((err: any) => {
          ShowAlertMixin({
            type: 15,
            icon: "error",
            title: err?.response?.data?.message,
          });
          setIsLoading(false);
        });
    } else {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: t("validations.You have no added addresses"),
      });
    }
  };
  return (
    <div>
      <h2
        data-aos="fade-right"
        className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4"
      >
        {t("Text.orderSummary")}
      </h2>
      <div className="bg-white shadow-md rounded-xl h-fit p-4">
        <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
          <div>
            <span className="text-text">{t("Text.orderItems")} </span>
            <span className="text-secondrydark">
              ({data?.products} {t("Text.orderItem")})
            </span>
          </div>
          <span className="text-secondrydark">
            {data?.subTotal} {"  "}
            {t("Text.SR")}
          </span>
        </div>
        {/* <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
          <span className="text-text">{t("Text.orderShipping")}</span>
          <span className="font-semibold text-success">{t("Text.free")}</span>
        </div> */}
        {data?.max_discount_value > 0 && (
          <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
            <span className="text-text">{t("Text.orderDiscount")}</span>
            <span className="font-semibold text-success">
              {data?.max_discount_value} {"  "}
              {t("SR")}
            </span>
          </div>
        )}
        {data?.discount > 0 && (
          <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
            <span className="text-text">{t("Text.orderDiscount")}</span>
            <span className="font-semibold text-success">
              {data?.discount} {"  "}
              {data?.discount_type == "value" ? `${t("SR")}` : `%`}
            </span>
          </div>
        )}
        {shipping_Value && (
          <div className="flex justify-between items-center my-5 font-normal text-base   leading-4">
            <span className="text-text">{t("Text.orderShipping")}</span>
            <span className="font-semibold text-success">
              {shipping_Value} {t("Text.SR")}
            </span>
          </div>
        )}
        {data?.commission > 0 && (
          <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
            <span className="text-text">{t("Text.orderTax")}</span>
            <span className="font-semibold text-success">
              {data?.commission} {"  "}
              {data?.commissionType == "value" ? t("SR") : `%`}
            </span>
          </div>
        )}
      <div className="h-0.5 bg-greynormal my-2"></div>
      <div className="flex justify-between items-center my-5  font-normal text-base   leading-4">
          <div>
            <span className="font-bold text-text">
              {t("Text.orderTotal")} {"  "}
            </span>
            <span className="font-bold text-secondrydark">
              {t("Text.orderTax")}
            </span>
          </div>
          <span className="font-bold text-gray-900">
            {+data?.total + +shipping_Value} {t("Text.SR")}
          </span>
        </div>
        <br />

        <button
          onClick={() => {
            if (memoizedSession) {
              handleSubmit();
            } else {
              ShowAlertMixin({
                type: 15,
                icon: "error",
                title: t("session_expired"),
              });
            }
          }}
          className="flex gap-3 items-center justify-center mt-3 text-center w-full bg-primary text-white p-4 rounded-lg font-semibold"
          disabled={isLoading}
        >
          {t("BUTTONS.followPayment")}
          {isLoading ? (
            <Loader className="w-8 h-8 text-white bg-transparent !animate-spin" />
          ) : (
            <TbArrowNarrowLeft
              className={`${locale == "ar" ? "" : "rotate-180 me-4"}`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
