/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Custom500 from "@/shared/Custom500";
import Custom401 from "@/shared/Custom401";
import Custom403 from "@/shared/Custom403";
import Custom404 from "@/shared/Custom404";
import Custom400 from "@/shared/Custom400";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { useTranslations } from "next-intl";
import { notify } from "./../utils/providers/toast";
import { useDispatch } from "react-redux";
import { deleteCredentials } from "@/store/auth.slice";
type Props = {
  status: number;
};
export default function CustomError({ status }: Props) {
  const t = useTranslations();
  const dispatch = useDispatch();
  if (status === 401 || status === 422) {
    ShowAlertMixin({
      type: 15,
      icon: "error",
      title: t("session_expired"),
    });
    // dispatch(deleteCredentials());
    // window.location.replace("/auth/login");
  }
  return (
    <>
      {status === 400 ? (
        <Custom400 />
      ) : status === 403 ? (
        <Custom403 />
      ) : status === 404 ? (
        <Custom404 />
      ) : (
        <Custom500 />
      )}
    </>
  );
}
