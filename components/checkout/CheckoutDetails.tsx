"use client";
import LocationIcon from "@/assets/icons/location";
import ImageWithFallback from "@/shared/ImageWithFallback";
// import LocationText from "@/shared/LocationText";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { AuthStage, SessionType } from "../Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CancelAddOrUpdateAddresses,
  toggleItemToDefault,
} from "@/store/address.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import FastShip from "@/assets/images/fast-ship.png";
import TimeShip from "@/assets/images/time-ship.png";
import Cash from "@/assets/images/cash.png";
import Wallet from "@/assets/images/wallet-pay.png";
import Card from "@/assets/images/card-pay.png";
import UseSession from "@/store/UseSession";

type Props = {
  data: any;
  locations: any;
  setShipping_type: any;
  setPayment_method: any;
  setting: any;
  setShipping_Value: any;
  // refresh: any;
};

export default function CheckoutDetails({
  data,
  locations,
  setShipping_type,
  setPayment_method,
  setShipping_Value,
  setting,
}: // refresh,
Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("locationData");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const setDefault = (id: string) => {
    // showAlert(
    //   t,
    //   t("Text.deleteFavourits"),
    //   t("Text.deleteFavouritsDesc"),
    //   false,
    //   t("BUTTONS.confirm"),
    //   true,
    //   "warning",
    //   () =>
    dispatch(
      toggleItemToDefault({
        id: id,
        message: t("Messages.locationSavedSuccessfully"),
      })
    );
    // );
  };
  const formSchema = yup.object({
    location: yup.string().required("this_field_is_required"),
    payment_method: yup.string().required("this_field_is_required"),
    shipping_type: yup.string().required("this_field_is_required"),
  });
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      location: "",
      shipping_type: "",
      payment_method: "",
    },
  });
  const { setValue, watch } = form;

  const selectedTypeShipping = watch("shipping_type"); // Watch TypeVerify changes
  const selectedTypePayment = watch("payment_method"); // Watch TypeVerify changes
  useEffect(() => {
    if (selectedTypeShipping) {
      setShipping_type(selectedTypeShipping);
    }
    if (selectedTypePayment) {
      setPayment_method(selectedTypePayment);
    }
  }, [selectedTypeShipping, selectedTypePayment]);
  return (
    <>
      {/* Order */}
      <div>
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8  mb-4">
          {t("Text.order")}
        </h2>

        <div className="bg-white shadow-md rounded-xl h-fit p-4">
          <h2 className="text-base font-bold     leading-5 text-start text-secondrydark">
            {t("Text.orderProducts", { count: data?.data?.length })}
          </h2>
          <div className="h-0.5 bg-greynormal my-4"></div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {data?.data?.map((ele: any, index: number) => (
              <div
                key={index}
                data-aos="zoom-in"
                //data-aos-duration={`${index * 30}`}
                className="grid grid-cols-[auto_1fr] items-center gap-2"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={ele?.product?.main?.media}
                    alt={"ele?.product"}
                    width={800}
                    height={800}
                    className="w-[100px] h-[100px] object-contain"
                  />
                  <p className="bg-greynormal w-6 h-6 grid place-content-center rounded-full absolute top-0 start-2 shadow-card-shadow">
                    X{ele?.quantity}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-base font-normal   leading-4 text-start text-secondrydark">
                    {ele?.product?.vendor?.username}
                  </p>
                  <h2 className="text-sm font-normal   leading-5 text-start text-text ">
                    {ele?.product?.name}
                  </h2>
                  {/* <p className="text-base font-normal    leading-4 text-start text-secondrydark">
                    بسكويت بندق
                  </p> */}
                  <p className=" font-bold text-base    leading-5 text-start text-text">
                    {ele?.product?.price}
                    {"  "} {t("SR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      {/* shipping location */}
      <div data-aos="flip-left">
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4">
          {t("LABELS.address")}
        </h2>
        <div className="bg-white shadow-md rounded-xl h-fit p-4">
          <h2 className="text-base font-bold     leading-5 text-start text-secondrydark">
            {t("Text.shippingLocation")}
          </h2>
          <div className="h-0.5 bg-greynormal my-4"></div>

          <div className="flex justify-between items-center">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <LocationIcon className="size-6" />
              {/* <div className="flex flex-col items-start font-bold text-secondrytext">
                {t("Text.deliver_to")}
                {memoizedSession ? (
                  <>
                    {locations?.length > 0 ? (
                      <LocationText className="text-base leading-6 font-medium text-dark" />
                    ) : (
                      <h2 className="lg:text-lg text-base font-bold   leading-8 mb-2 text-start text-dark">
                        {t("Text.noAddresses")}
                      </h2>
                    )}
                  </>
                ) : (
                  <LocationText className="text-base leading-6 font-medium text-dark" />
                )}
              </div> */}
            </div>
            {memoizedSession && (
              <>
                {locations?.length > 0 ? (
                  <button
                    // href="/profile/addresses"
                    onClick={() => {
                      setAuthStage("locationData");
                      setIsOpen(true);
                    }}
                    className=" w-fit flex items-center gap-2   font-semibold text-base   leading-5 text-center whitespace-nowrap text-primary  transition-colors  mt-4 sm:mt-0"
                    data-aos="fade-left"
                  >
                    {t("BUTTONS.change")}
                    <RiArrowLeftSLine
                      className={`${locale == "ar" ? "" : "rotate-180"}`}
                      size={25}
                    />{" "}
                  </button>
                ) : (
                  <button
                    // href="/profile/addresses"
                    onClick={() => {
                      setIsOpen(true);
                      setAuthStage("location");
                      dispatch(CancelAddOrUpdateAddresses());
                    }}
                    className="font-semibold text-base   leading-5 text-center whitespace-nowrap text-primary  transition-colors  mt-4 sm:mt-0"
                    data-aos="fade-left"
                  >
                    {t("BUTTONS.addNewAddress")}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <br />

      {/* shipping type */}

      <div data-aos="flip-right">
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4">
          {t("Text.shippingType")}
        </h2>
        <div className="bg-white shadow-md rounded-xl h-fit p-4">
          <RadioGroup
            dir={`${locale == "ar" ? "rtl" : "ltr"}`}
            value={selectedTypeShipping}
            onValueChange={(value) => {
              setValue("shipping_type", value);
              setShipping_type(value);
              setShipping_Value(
                value == "normal"
                  ? setting?.normal_delivery_fee
                  : setting?.fast_delivery_fee
              );
            }}
            className="grid  gap-4"
          >
            <div
              className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-lg ${
                selectedTypeShipping == "normal"
                  ? "border-primary"
                  : "border-greynormal"
              }`}
            >
              <label htmlFor="normal">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <ImageWithFallback
                    src={FastShip}
                    width={500}
                    height={500}
                    alt="cash"
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <div>
                      <span className="text-lg text-text font-medium mb-2">
                        {t("Text.normalShipping")}
                      </span>
                      <span className="text-lg text-secondrydark font-medium mb-2">
                        {t("Text.normalShippingDesc")}
                      </span>
                    </div>
                    <p className="text-xl text-primary font-semibold mb-2 text-start">
                      {setting?.normal_delivery_fee} {"  "} {t("SR")}
                    </p>
                  </div>
                </div>
              </label>
              <RadioGroupItem value="normal" id="normal" />
            </div>
            <div
              className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-lg ${
                selectedTypeShipping == "fast"
                  ? "border-primary"
                  : "border-greynormal"
              }`}
            >
              <label htmlFor="fast">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <ImageWithFallback
                    src={TimeShip}
                    width={500}
                    height={500}
                    alt="cash"
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <div>
                      <span className="text-lg text-text font-medium mb-2">
                        {t("Text.quickShipping")}
                      </span>
                      <span className="text-lg text-secondrydark font-medium mb-2">
                        {t("Text.quickShippingDesc")}
                      </span>
                    </div>
                    <p className="text-xl text-primary font-semibold mb-2 text-start">
                      {setting?.fast_delivery_fee} {"  "} {t("SR")}
                    </p>
                  </div>
                </div>
              </label>
              <RadioGroupItem value="fast" id="fast" />
            </div>
          </RadioGroup>
        </div>
      </div>
      <br />

      {/* payment type */}
      <div data-aos="flip-left">
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-4">
          {t("Text.paymentType")}
        </h2>
        <div className="bg-white shadow-md rounded-xl h-fit p-4">
          <RadioGroup
            dir={`${locale == "ar" ? "rtl" : "ltr"}`}
            value={selectedTypePayment}
            onValueChange={(value) => {
              setValue("payment_method", value);
              setPayment_method(value);
            }}
            className="grid  gap-4"
          >
            <div
              className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-lg ${
                selectedTypePayment == "cash"
                  ? "border-primary"
                  : "border-greynormal"
              }`}
            >
              <label htmlFor={t("Text.paymentUponReceipt")}>
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <ImageWithFallback
                    src={Cash}
                    width={500}
                    height={500}
                    alt="cash"
                    className="w-6 h-6 object-contain"
                  />
                  <div>{t("Text.paymentUponReceipt")}</div>
                </div>
              </label>
              <RadioGroupItem
                value={"cash"}
                id={t("Text.paymentUponReceipt")}
              />
            </div>
            <div
              className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-lg ${
                selectedTypePayment == "wallet"
                  ? "border-primary"
                  : "border-greynormal"
              }`}
            >
              <label htmlFor={t("Text.paymentViaWallet")}>
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <ImageWithFallback
                    src={Wallet}
                    width={500}
                    height={500}
                    alt="cash"
                    className="w-6 h-6 object-contain"
                  />
                  <div>{t("Text.paymentViaWallet")}</div>
                </div>
              </label>
              <RadioGroupItem
                value={"wallet"}
                id={t("Text.paymentViaWallet")}
              />
            </div>
            <div
              className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-lg ${
                selectedTypePayment == "card"
                  ? "border-primary"
                  : "border-greynormal"
              }`}
            >
              <label htmlFor={t("Text.Payment by card")}>
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <ImageWithFallback
                    src={Card}
                    width={500}
                    height={500}
                    alt="cash"
                    className="w-6 h-6 object-contain"
                  />
                  <div>{t("Text.Payment by card")}</div>
                </div>
              </label>
              <RadioGroupItem value={"card"} id={t("Text.Payment by card")} />
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* <AppDialog
        width={
          authStage == "location"
            ? "w-[700px]"
            : authStage == "locationconfirm"
              ? "w-[580px]"
              : ""
        }
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      /> */}
      <AppDialog
        width={
          authStage === "location"
            ? "w-[650px]"
            : authStage === "locationconfirm"
            ? "w-[580px]"
            : authStage === "locationData"
            ? "w-[700px]"
            : ""
        }
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        refresh={locations?.length == 0 ? true : false}
      />
    </>
  );
}
