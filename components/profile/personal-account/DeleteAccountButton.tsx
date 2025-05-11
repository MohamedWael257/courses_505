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

type Props = {};

export default function DeleteAccountButton({}: Props) {
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
    <>
      <div className="sm:flex gap-4 items-center mb-4">
        <div className=" flex-1 mb-3">
          <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8">
            {t("Text.deleteAccount")}
          </h2>
          <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start">
            {t("Text.deleteAccountDesc")}
          </h2>
        </div>
        <button
          onClick={deleteItem}
          className="text-center w-fit px-12 py-3 bg-white text-error font-medium rounded-lg border-[1px] border-error"
        >
          {t("BUTTONS.deleteAccount")}
        </button>
      </div>
    </>
  );
}
