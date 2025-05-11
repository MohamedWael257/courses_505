"use client";
import React, { useState } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { AuthStage } from "@/components/Header";
import { CiStar } from "react-icons/ci";
import { useTranslations } from "next-intl";
type Props = {
  vendor: any;
  status: any;
  orderId: any;
  refetch: any;
};

export default function OrderProvider({
  status,
  vendor,
  orderId,
  refetch,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [authStage, setAuthStage] = useState<AuthStage>("providerrate");
  const t = useTranslations("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4 flex justify-between items-center">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center mb-4">
          <ImageWithFallback
            src={vendor?.logo?.media}
            width={1000}
            height={1000}
            className="2xl:h-14 2xl:w-14 w-10 h-10 rounded-full object-cover"
            alt="profile image"
          />
          <div>
            <p className="2xl:text-lg md:text-base text-sm text-secondrydark font-medium mb-2">
              {t("Text.vendor")}
            </p>
            <p className="2xl:text-2xl md:text-lg text-base text-dark font-medium mb-2 text-start">
              {vendor?.username}
            </p>
          </div>
        </div>
        {status == "delivered_to_customer" && (
          <button
            className="w-fit bg-secprimary p-2 rounded-xl flex gap-2 items-center justify-center text-primary border-[1px] border-primary text-base font-medium   leading-8"
            onClick={() => {
              setIsOpen(true);
              setAuthStage("providerrate");
            }}
          >
            {t("BUTTONS.providerRate")}
            <CiStar size={25} />
          </button>
        )}
      </div>
      <AppDialog
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        orderId={orderId}
        rateable_id={vendor?.id}
        refetch={refetch}
      />
    </>
  );
}
