// 'use client'
import { useState } from "react";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { revalidateTag } from "next/cache";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { useDispatch } from "react-redux";
import { deleteCredentials } from "@/store/auth.slice";

type UseMutateProps<ResponseType> = {
  endpoint: string;
  method?: "POST" | "DELETE" | "PUT" | "PATCH"; // Adding the method property
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: unknown) => void;
  formData?: boolean; // Add formData property
  customHeaders?: Record<string, string>;
};

export function UseMutate<ResponseType>({
  endpoint,
  method = "POST", // Setting a default value for the method
  onSuccess,
  onError,
  formData, // Destructure formData
  customHeaders, // Add customHeaders to the props
}: UseMutateProps<ResponseType>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseType | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const t = useTranslations();

  const userToken = Cookies.get("token");
  const guestToken = Cookies.get("guest");

  const token = userToken;
  const authorizationHeader = `Bearer ${token}`;
  const locale = useLocale();
  const dispatch = useDispatch();
  const language = locale === "ar" ? "ar" : "en";

  // const storedCountry = Cookies.get("Country-Id");
  // let timeZoneCountryId = "-1";
  // let countryId = "";

  // if (storedCountry) {
  //   const countryObject = JSON.parse(storedCountry);
  //   timeZoneCountryId = countryObject.id;
  //   countryId = countryObject.id;
  // }
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const mutate = async (values: any, p0?: { onSuccess: () => void }) => {
    setIsLoading(true);
    try {
      let body;
      let contentType;

      if (formData) {
        body = values;
        contentType = "application/json; charset=utf-8";
      } else {
        body = JSON.stringify(values);
        contentType = "application/json; charset=utf-8";
      }

      // const requestConfig: RequestInit = {
      //   method,
      //   headers: {
      //     Authorization: authorizationHeader,
      //     "Accept-Language": language == "ar" ? "ar" : "",
      //     "Content-Type": contentType,
      //     "Time-Zone-Country-Id": timeZoneCountryId,
      //     "Country-Id": countryId,
      //     guest: `${guestToken}`,
      //     // ...customHeaders,
      //   },
      //   body,
      // };

      const requestConfig: RequestInit = {
        method,
        headers: {
          "Accept-Language": language,
          "Content-Type": contentType,
          // "Time-Zone-Country-Id": timeZoneCountryId,
          // "Country-Id": countryId,
          ...customHeaders, // Spread custom headers if provided
          ...(userToken ? { Authorization: authorizationHeader } : {}),
          ...(guestToken ? { guest: guestToken } : {}),
        },
        body,
      };
      const response = await fetch(`${BaseUrl}${endpoint}`, requestConfig);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }

      const responseData = await response.json();
      setData(responseData);

      if (onSuccess) onSuccess(responseData);
    } catch (err: any) {
      setError(err);
      if (onError) {
        onError(err);
        if (err.response?.status === 401 || err.response?.status === 422) {
          ShowAlertMixin({
            type: 15,
            icon: "error",
            title: t("session_expired"),
          });
          dispatch(deleteCredentials());
          // setTimeout(() => {
          //   window.location.replace(`/${locale}/login`);
          // }, 500);
        }
      } else {
        console.error("An error occurred:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, mutate };
}
