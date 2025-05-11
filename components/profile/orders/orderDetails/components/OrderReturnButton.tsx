"use client";
import { AuthStage } from "@/components/Header";
import React, { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Spinner } from "@/shared/Icons";
import showAlert from "@/shared/ShowAlert";

import axiosInstance from "@/utils/axiosClient";
import Swal from "sweetalert2";
import Success from "@/assets/images/success2.gif";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getAllCartItems } from "@/store/cartStore.slice";
type Props = {
  orderId: any;
  refetch: any;
};

export default function OrderReturnButton({ orderId, refetch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("cancelorder");
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const returnOrders = (orderId: any) => {
    showAlert(
      t,
      t("Text.returnOrderTitle"),
      t("Text.returnOrderDesc"),
      false,
      t("BUTTONS.ok"),
      true,
      "warning",
      () => handelReturnOrders(orderId) // Action on confirm
    );
  };
  const handelReturnOrders = async (orderId: any) => {
    try {
      const { data } = await axiosInstance.post(`orders/${orderId}/re-order`);
      if (data.status == "success") {
        await Swal.fire({
          title: data?.message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        dispatch(getAllCartItems());
        router.push(`${locale == "ar" ? "" : "/en"}/cart`);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    }
  };
  const t = useTranslations("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4">
        <button
          className="w-full flex items-center justify-center gap-3 mb-4 p-4 rounded-xl text-white bg-primary text-xl font-medium   leading-8"
          onClick={() => handelReturnOrders(orderId)}
        >
          {t("BUTTONS.returnnOrder")}
          <Spinner color={"#ffffff"} className=" size-[25px]" />
        </button>
        {/* <button
          className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-primary text-primary bg-secprimary text-xl font-medium   leading-8"
          onClick={() => {
            setIsOpen(true);
            setAuthStage("returnorder");
          }}
        >
          {t("BUTTONS.returnOrder")}
           <CiStar size={25}/> 
        </button> */}
      </div>
      <AppDialog
        width={authStage == "returnorder" ? "w-[550px]" : ""}
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        orderId={orderId}
        refetch={refetch}
      />
    </>
  );
}
