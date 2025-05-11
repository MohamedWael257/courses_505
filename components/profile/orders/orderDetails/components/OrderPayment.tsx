import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
import React from "react";
import Cash from "@/assets/images/cash.png";
import Wallet from "@/assets/images/wallet-pay.png";
import Card from "@/assets/images/card-pay.png";
type Props = {
  payment_method: any;
};

export default function OrderPayment({ payment_method }: Props) {
  const t = useTranslations("");
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-start">
        {t("Text.paymentMethod")}
      </h2>
      <div className="flex gap-2 items-center">
        <ImageWithFallback
          src={
            payment_method == "cash"
              ? Cash
              : payment_method == "wallet"
              ? Wallet
              : Card
          }
          width={500}
          height={500}
          alt="cash"
          className="w-6 h-6 object-contain"
        />
        <div>
          <p className="text-lg text-dark font-medium mb-2">
            {t(`status.${payment_method}`)}
          </p>
        </div>
      </div>
    </div>
  );
}
