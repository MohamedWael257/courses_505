"use client";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axiosClient"; // Adjust the import according to your project structure
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { deleteCredentials } from "@/store/auth.slice";
import Custom400 from "@/shared/Custom400";
import Custom403 from "@/shared/Custom403";
import Custom404 from "@/shared/Custom404";
import Custom500 from "@/shared/Custom500";

type useFetchPops_TP = {
  endpoint: string;
  enabled?: boolean;
  general?: boolean;
  select?: (data: any) => any;
  onError?: (err: any) => void;
  onSuccess?: (data: any) => void;
};

function useFetch<T>({
  endpoint,
  enabled = true,
  general = false,
  select,
  onError: originalOnError,
  onSuccess,
}: useFetchPops_TP) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const userToken = Cookies.get("token");
  // const storedCountry = Cookies.get("Country-Id");
  // let timeZoneCountryId = "-1";
  // let countryId = "";

  // if (storedCountry) {
  //   const countryObject = JSON.parse(storedCountry);
  //   timeZoneCountryId = countryObject.id;
  //   countryId = countryObject.id;
  // }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const GeneralbaseURL = process.env.VITE_BASE_URL;

  const locale = useLocale();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorComponent, setErrorComponent] = useState<React.ReactNode | null>(
    null
  );

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Accept-Language": locale === "ar" ? "ar" : "en",
        "Content-Type": "application/json; charset=utf-8",
        // "Time-Zone-Country-Id": timeZoneCountryId,
        // "Country-Id": countryId,
      },
    };

    try {
      const response = await axiosInstance.get<T>(
        `${general ? GeneralbaseURL : baseURL}${endpoint}`,
        config
      );
      const result = select ? select(response.data) : response.data;
      setData(result);
      setIsSuccess(true);
      setErrorComponent(null); // Clear any previous error component
      if (onSuccess) onSuccess(result);
    } catch (err: any) {
      setError(err);
      handleError(err);
      if (originalOnError) originalOnError(err);
    } finally {
      setLoading(false);
    }
  }, [enabled, endpoint, locale, onSuccess, originalOnError, userToken]);

  const handleError = (err: any) => {
    const message = err?.response?.data?.message || t("no_data");
    ShowAlertMixin({
      type: 15,
      icon: "error",
      title: message,
    });

    switch (err.response?.status) {
      case 400:
        setErrorComponent(<Custom400 />);
        break;
      case 401:
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: t("session_expired"),
        });
        dispatch(deleteCredentials());
        window.location.replace("/auth/login");
        break;
      case 403:
        setErrorComponent(<Custom403 />);
        break;
      case 404:
        setErrorComponent(<Custom404 />);
        break;
      default:
        setErrorComponent(<Custom500 />);
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    setIsSuccess(false);
    setError(null);
    setErrorComponent(null); // Reset error component on refetch
    fetchData();
  };

  return {
    data,
    isError: !!error,
    isLoading: loading,
    isSuccess,
    refetch,
    errorComponent, // Expose the error component for rendering
  };
}

export default useFetch;
