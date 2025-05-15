"use client";
import React from "react";
import showAlert from "@/shared/ShowAlert";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { BsTrash } from "react-icons/bs";
import { UseMutate } from "@/utils/hooks/useMutate";

import { useDispatch } from "react-redux";
import { DeleteAllFavItems } from "@/store/favourtis";
import { AppDispatch } from "@/store/store";
import { Delete } from "@/shared/Icons";

export default function DeletFavouritsButton({ refetch }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const deleteItem = () => {
    showAlert(
      t,
      t("Text.deleteFavourits"),
      t("Text.deleteFavouritsDesc"),
      false,
      t("BUTTONS.confirm"),
      true,
      "warning",
      () => dispatch(DeleteAllFavItems({ refetch: refetch && refetch }))
    );
  };

  return (
    <>
      <button
        onClick={deleteItem}
        className=" w-fit flex items-center gap-2 p-4 rounded-2xl  font-semibold text-base   leading-5 text-center whitespace-nowrap text-darkprimary border-[1px] border-subborder  transition-colors  mt-4 sm:mt-0"
        //   data-aos="fade-left"
      >
        <Delete color={"#3E3E3E"} className="size-6" />
        {t("Text.deleteFavourits")}
      </button>
    </>
  );
}
