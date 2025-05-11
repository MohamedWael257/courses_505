"use client";
import { RiLogoutCircleRLine } from "react-icons/ri";
import React from "react";
import showAlert from "@/shared/ShowAlert";
import Swal from "sweetalert2";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosClient";
import { deleteCredentials } from "@/store/auth.slice";

import { clearCart, getAllCartItems } from "@/store/cartStore.slice";
import { ClearFav, getAllFavItems } from "@/store/favourtis";
import { ClearCompare, getAllComparisonsItems } from "@/store/comparisons";
import Cookies from "js-cookie";
import { handleLocationFetch } from "@/utils/helpers";
import { setLocation } from "@/store/locationSlice";
import Success from "@/assets/images/success2.gif";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { AppDispatch } from "@/store/store";

type Props = {
  setOpen?: any;
};

export default function LogoutButton({ setOpen }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("");
  const logout = () => {
    showAlert(
      t,
      t("Text.logoutTitle"),
      t("Text.logoutDesc"),
      false,
      t("BUTTONS.ok"),
      true,
      "warning",
      () => handelLogout() // Action on confirm
    );
  };
  // function GenereateGeustToken() {
  //   const stringSpace =
  //     "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const stringLength = stringSpace.length;
  //   let randomString = "";

  //   for (let i = 0; i < 128; i++) {
  //     randomString += stringSpace[Math.floor(Math.random() * stringLength)];
  //   }
  //   Cookies.set("guest", randomString);
  // }
  const handelLogout = async () => {
    try {
      const { data } = await axiosInstance.post("logout");
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
  return (
    <button
      onClick={() => {
        logout();
        if (setOpen) {
          setOpen(false);
        }
      }}
      className="text-error flex gap-2 text-lg font-medium   leading-8 items-center lg:px-3"
    >
      <RiLogoutCircleRLine size={25} />
      {t("NAV.logout")}
    </button>
  );
}
