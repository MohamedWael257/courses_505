"use client";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import Cash from "@/assets/images/cash.png";
import Wallet from "@/assets/images/wallet-pay.png";
import Card from "@/assets/images/card-pay.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
type Props = {
  selectedTypePayment: any;
  setValue: any;
};

export default function CheckoutPaymentForm({
  selectedTypePayment,
  setValue,
}: Props) {
  const t = useTranslations("");
  const locale = useLocale();

  return (
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
          }}
          className="grid lg:grid-cols-2 gap-4"
        >
          <div
            className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-full ${
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
            <RadioGroupItem value={"cash"} id={t("Text.paymentUponReceipt")} />
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
            <RadioGroupItem value={"wallet"} id={t("Text.paymentViaWallet")} />
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
            <RadioGroupItem value={"cash"} id={t("Text.paymentUponReceipt")} />
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
            <RadioGroupItem value={"wallet"} id={t("Text.paymentViaWallet")} />
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
  );
}
