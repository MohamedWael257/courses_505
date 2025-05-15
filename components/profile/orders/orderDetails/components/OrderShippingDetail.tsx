"use client";
import { AuthStage } from "@/components/Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import FastShip from "@/assets/images/fast-ship.png";
import TimeShip from "@/assets/images/time-ship.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
type Props = {
  shippingDetails: any;
  status: any;
  orderId: any;
};

export default function OrderShippingDetail({
  status,
  shippingDetails,
  orderId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [authStage, setAuthStage] = useState<AuthStage>("shippingrate");
  const t = useTranslations("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4">
        {/* <div className="flex justify-between items-center mb-6"> */}
        <h2 className="text-xl font-bold mb-4 text-start">
          {t("Text.shippingDetails")}{" "}
        </h2>
        {/* {status == "delivered_to_customer" && (
            <button
              className="w-fit bg-secprimary p-2 rounded-xl flex gap-2 items-center justify-center text-primary border-[1px] border-primary text-base font-medium   leading-8"
              onClick={() => {
                setIsOpen(true);
                setAuthStage("shippingrate");
              }}
            >
              {t("BUTTONS.shippingRate")}
              <CiStar size={25} />
            </button>
          )} */}
        {/* </div> */}
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
          {shippingDetails?.shipping_type == "normal" ? (
            <ImageWithFallback
              src={TimeShip}
              width={500}
              height={500}
              alt="cash"
              className="w-8 h-8 object-contain"
            />
          ) : (
            <ImageWithFallback
              src={FastShip}
              width={500}
              height={500}
              alt="cash"
              className="w-8 h-8 object-contain"
            />
          )}
          <div>
            <div>
              <span className="text-lg text-darkprimary font-medium mb-2">
                {shippingDetails?.shipping_type == "normal"
                  ? t("Text.normalShipping")
                  : t("Text.quickShipping")}
                {"  "}
              </span>
              <span className="text-lg text-secondrydark font-medium mb-2">
                {shippingDetails?.shipping_type == "normal"
                  ? t("Text.normalShippingDesc")
                  : t("Text.quickShippingDesc")}
              </span>
            </div>
            <p className="text-xl text-primary font-semibold mb-2 text-start">
              {shippingDetails?.shipping_cost} {"  "} {t("Text.SR")}
            </p>
          </div>
        </div>
        {/* {status && (
          <div className="flex gap-2 items-center ">
            icon
            <div>
              <p className="text-lg text-darkprimary font-medium mb-2">
                {t("Text.shippingDate")}
              </p>
              <p className="text-lg text-darkprimary font-medium mb-2">
                {t("Text.shippingDateDesc")}
              </p>
            </div>
          </div>
        )} */}
      </div>
      <AppDialog
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        orderId={orderId}
      />
    </>
  );
}
