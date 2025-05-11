"use client";

import React, { useEffect } from "react";
import ShowAlertMixin from "../ShowAlertMixin";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteCredentials } from "@/store/auth.slice";
import { useLocale, useTranslations } from "next-intl";

export default function ErrorAxios() {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  useEffect(() => {
    ShowAlertMixin({
      type: 15,
      icon: "error",
      title: t("session_expired"),
    });

    dispatch(deleteCredentials());
    router.replace(`${locale == "ar" ? "" : "/en"}/auth/login`);
  }, [dispatch, locale, router, t]);

  return null; // or you can return a loading spinner or a message if needed
}
