"use client";
import React from "react";
import { useTranslations } from "next-intl";
type Props = {
  invoice: any;
};

export default function OrderInvoice({ invoice }: Props) {
  const t = useTranslations("");
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4 text-start flex items-center gap-2">
        <svg
          width="32"
          height="32"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.83366 1.66602H5.00033C2.50033 1.66602 1.66699 3.15768 1.66699 4.99935V5.83268V17.4993C1.66699 18.191 2.45033 18.5827 3.00033 18.166L4.42533 17.0993C4.75866 16.8493 5.22533 16.8827 5.52533 17.1827L6.90866 18.5744C7.23366 18.8994 7.76699 18.8994 8.09199 18.5744L9.49199 17.1743C9.78366 16.8827 10.2503 16.8493 10.5753 17.0993L12.0003 18.166C12.5503 18.5743 13.3337 18.1827 13.3337 17.4993V3.33268C13.3337 2.41602 14.0837 1.66602 15.0003 1.66602H5.83366ZM4.97533 11.6743C4.51699 11.6743 4.14199 11.2993 4.14199 10.841C4.14199 10.3827 4.51699 10.0077 4.97533 10.0077C5.43366 10.0077 5.80866 10.3827 5.80866 10.841C5.80866 11.2993 5.43366 11.6743 4.97533 11.6743ZM4.97533 8.34102C4.51699 8.34102 4.14199 7.96602 4.14199 7.50768C4.14199 7.04935 4.51699 6.67435 4.97533 6.67435C5.43366 6.67435 5.80866 7.04935 5.80866 7.50768C5.80866 7.96602 5.43366 8.34102 4.97533 8.34102ZM10.0003 11.466H7.50033C7.15866 11.466 6.87533 11.1827 6.87533 10.841C6.87533 10.4993 7.15866 10.216 7.50033 10.216H10.0003C10.342 10.216 10.6253 10.4993 10.6253 10.841C10.6253 11.1827 10.342 11.466 10.0003 11.466ZM10.0003 8.13268H7.50033C7.15866 8.13268 6.87533 7.84935 6.87533 7.50768C6.87533 7.16602 7.15866 6.88268 7.50033 6.88268H10.0003C10.342 6.88268 10.6253 7.16602 10.6253 7.50768C10.6253 7.84935 10.342 8.13268 10.0003 8.13268Z"
            fill="#3E3E3E"
          />
          <path
            d="M15.008 1.66602V2.91602C15.558 2.91602 16.083 3.14102 16.4663 3.51602C16.8663 3.92435 17.083 4.44935 17.083 4.99935V7.01602C17.083 7.63268 16.808 7.91602 16.183 7.91602H14.583V3.34102C14.583 3.10768 14.7747 2.91602 15.008 2.91602V1.66602ZM15.008 1.66602C14.083 1.66602 13.333 2.41602 13.333 3.34102V9.16602H16.183C17.4997 9.16602 18.333 8.33268 18.333 7.01602V4.99935C18.333 4.08268 17.958 3.24935 17.358 2.64102C16.7497 2.04102 15.9247 1.67435 15.008 1.66602C15.0163 1.66602 15.008 1.66602 15.008 1.66602Z"
            fill="#3E3E3E"
          />
        </svg>
        {t("Text.orderInvoice")}
      </h2>
      <div className="flex gap-2 items-center justify-between mb-3">
        <p className="text-lg text-secondrydark font-medium">
          {t("Text.subtotal", { count: invoice.item })}
        </p>

        <p className="text-lg text-secondrydark font-medium">
          {invoice?.sub_total} {"  "} {t("Text.SR")}
        </p>
      </div>
      {/* <div className="flex gap-2 items-center justify-between mb-3">
        {t("Text.shippingFee", { count: 2 })}
        <p className="text-lg text-success  font-medium">{invoice?.tax} </p>
      </div> */}
      <div className="flex gap-2 text-primary items-center justify-between mb-3">
        {t("Text.shippingFee", { count: invoice.item })}
        <p className="text-lg text-success  font-medium">
          {invoice?.shipping_cost} {"  "} {t("Text.SR")}
        </p>
      </div>
      {invoice?.commission > 0 && (
        <div className="flex gap-2 items-center justify-between mb-3 border-b-[1px] border-secondrydark pb-4">
          <span className="text-darkprimary">{t("Text.orderTax")}</span>
          <span className="font-semibold text-success">
            {invoice?.commission} {"  "}
            {invoice?.commissionType == "value" ? t("SR") : `%`}
          </span>
        </div>
      )}

      {invoice?.discount > 0 && (
        <div className="flex gap-2 items-center justify-between mb-3 border-b-[1px] border-secondrydark pb-4">
          {t("Text.discountt")}
          <p className="text-lg text-success font-medium">
            {invoice?.discount} {"  "}
            {t("SR")}
          </p>
        </div>
      )}
      <div className="h-0.5 bg-greynormal my-2"></div>

      <div className="flex gap-2 items-center justify-between mb-3">
        {t("Text.totalhavetax")}
        <p className="text-lg text-darkprimary font-bold">
          {/* {(
            +invoice?.sub_total +
            +(invoice?.shipping_cost ?? 0) +
            +(invoice?.commission ?? 0) -
            +(invoice?.discount ?? 0)
          ).toFixed(2)}{" "}
          {"  "} {t("Text.SR")} */}
          {invoice?.grand_total} {"  "} {t("Text.SR")}
        </p>
      </div>
    </div>
  );
}
