"use client";
import { AuthStage } from "@/components/Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
type Props = {
  orderId: any;
  refetch: any;
};

export default function OrderCancelButton({ orderId, refetch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("cancelorder");
  const t = useTranslations("");
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <button
        className="w-full p-4 rounded-xl text-error border-[1px] border-error text-xl font-medium   leading-8"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("BUTTONS.cancelOrder")}
      </button>

      <AppDialog
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        orderId={orderId}
        refetch={refetch}
      />
    </div>
  );
}
