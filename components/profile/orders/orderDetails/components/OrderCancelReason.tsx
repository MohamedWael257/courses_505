"use client";
import React from "react";
import { useTranslations } from "next-intl";
type Props = {};

export default function OrderCancelReason({}: Props) {
  const t = useTranslations("");
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-start text-darkprimary   leading-8">
        {t("Text.orderCancelReason")}
      </h2>

      <p className="text-sm secondrydark font-medium text-start   leading-4">
        {t("Text.orderCancelReasonDesc")}
      </p>
    </div>
  );
}
