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
import CustomBtn from "@/shared/buttons/CustomBtn";
import { RS } from "@/shared/Icons";
type Props = {
  data: any;
  location_id: any;
  code: any;
  locations: any;
  memoizedSession: any;
  form: any;
  setValue: any;
  watch: any;
  getValues: any;
  isLoading: boolean;
};
export default function CheckoutSummary({
  data,
  location_id,
  code,
  locations,
  memoizedSession,
  form,
  setValue,
  watch,
  getValues,
  isLoading,
}: Props) {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
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

  return (
    <div className="bg-greynormal shadow-md rounded-xl h-fit p-4 border border-secprimary">
      <h2
        // data-aos="fade-right"
        className="capitalize text-darkprimary font-bold lg:text-2xl text-xl text-start  leading-6"
      >
        {t("Text.orderSummary")}
      </h2>
      <div className="bg-greynormal shadow-md rounded-xl h-fit p-4">
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
          <span className="text-darkprimary">{t("Text.orderDiscount")}</span>
          <span className="flex items-center gap-2 text-success">
            -10
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
        <button
          type="submit"
          className="flex gap-3 items-center justify-center mt-3 text-center w-full bg-primary text-white p-4 rounded-full hover:bg-white hover:text-primary border border-primary transition-colors font-semibold"
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
        {/* <div className="!pt-2">
          <CustomBtn
            title={"تابع للدفع"}
            buttonType="submit"
            loader={isLoading}
            disabled={isLoading}
            button
            className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
            rightIcon={
              <TbArrowNarrowLeft
                className={`${locale == "ar" ? "" : "rotate-180 me-4"} text-white`}
              />
            }
          />
        </div> */}
      </div>
    </div>
  );
}
