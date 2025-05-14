"use client";

import React from "react";
import showAlert from "@/shared/ShowAlert";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import Swal from "sweetalert2";
import { useLocale, useTranslations } from "next-intl";
import axiosInstance from "@/utils/axiosClient";
import { deleteCredentials } from "@/store/auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Success from "@/assets/images/success2.gif";
import { clearCart } from "@/store/cartStore.slice";
import { ClearFav } from "@/store/favourtis";
import { ClearCompare } from "@/store/comparisons";
import { handleLocationFetch } from "@/utils/helpers";
import Cookies from "js-cookie";
import { setLocation } from "@/store/locationSlice";
import { Delete } from "@/shared/Icons";

type Props = {
  setOpen?: any;
};

export default function DeleteAccountButton({ setOpen }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();
  const deleteItem = () => {
    showAlert(
      t,
      t("Delete Account"),
      t("delete_confirmation"),
      false,
      t("ok"),
      true,
      "warning",
      () => handleDeleteAccount() // Action on confirm
    );
  };
  const handleDeleteAccount = async () => {
    await axiosInstance
      .delete("profile")
      .then(async (res) => {
        Swal.fire({
          title: res?.data?.message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        // Perform dispatch actions concurrently
        await Promise.all([
          dispatch(deleteCredentials()),
          // GenereateGeustToken(),
          dispatch(clearCart()),
          dispatch(ClearFav()),
          dispatch(ClearCompare()),
          handleLocationFetch({ dispatch, setLocation, clientLocation: null }),
          Cookies.remove("guest"),
        ]);

        router.replace(`${locale == "ar" ? "/" : "/en"}`);
      })
      .catch((error) => {
        const errorMessage = error?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };
  return (
    <button
      onClick={() => {
        deleteItem();
        if (setOpen) {
          setOpen(false);
        }
      }}
      className="text-error flex gap-2 text-base font-normal   leading-8 items-center lg:px-3"
    >
      <Delete className="size-6" color={"#ef233c"} />

      {t("BUTTONS.deleteAccount")}
    </button>
  );
}
