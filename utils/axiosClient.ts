// lib/axios.ts
import ErrorAxios from "@/shared/AxiosPage/ErrorAxios";
import axios from "axios";
import Cookies from "js-cookie";
// import { redirect } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const NEXT_LOCALE = Cookies.get("NEXT_LOCALE") || "ar";
    // const guestToken = Cookies.get("guest");
    // const userToken = Cookies.get("token");
    // const storedCountry: any = Cookies.get("Country-Id");
    // let timeZoneCountryId = -1;
    // let countryId = -1;

    // if (storedCountry) {
    //   const countryObject = JSON.parse(storedCountry);
    //   timeZoneCountryId = countryObject?.id ?? -1;
    //   countryId = countryObject?.id ?? -1;
    // }
    // if (guestToken) {
    //   config.headers["guest"] = guestToken;
    // }
    // if (userToken) {
    //   config.headers.Authorization = `Bearer ${userToken}`;
    // }
    config.headers["Accept-Language"] = NEXT_LOCALE;
    // config.headers["Time-Zone-Country-Id"] = timeZoneCountryId;
    // config.headers["Country-Id"] = countryId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && (error.response.status === 401||error.response.status === 422)) {
    //   // Cookies.remove("token");
    //   // Cookies.remove("sessionToken");
    //   // Cookies.remove("guest");
    //   // const locale = Cookies.get("NEXT_LOCALE");
    //   // if (typeof window !== "undefined") {
    //   //   window.location.href =
    //   //     locale === "ar" ? "/ar/auth/login" : "/auth/login";
    //   // }
    //   ErrorAxios()
    // }
    // const serverCookies = Cookies;
    // const locale = serverCookies.get("NEXT_LOCALE");
    // if (error.response?.status === 401) {
    //   serverCookies.remove("sessionToken");
    //   serverCookies.remove("token");
    //   if (typeof window !== "undefined") {
    //     window.location.href = `${
    //       locale === "ar" ? "/auth/login" : "/en/auth/login"
    //     }`;
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
