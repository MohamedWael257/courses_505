// lib/axios.ts
import axios from "axios";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const axiosInstanceServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstanceServer.interceptors.request.use(
  async (config) => {
    const serverCookies = cookies();
    const Context_locale = await getLocale();
    const NEXT_LOCALE =
      Context_locale || serverCookies.get("NEXT_LOCALE")?.value || "ar";
    // const guestToken = serverCookies.get("guest")?.value;
    // const userToken = serverCookies.get("token")?.value;
    // const storedCountry: any = serverCookies.get("Country-Id")?.value;
    // let timeZoneCountryId = -1;
    // let countryId = -1;

    // if (storedCountry) {
    //   const countryObject = JSON.parse(storedCountry);
    //   timeZoneCountryId = countryObject?.id ?? -1;
    //   countryId = countryObject?.id ?? -1;
    // }
    // if (guestToken && !userToken) {
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
axiosInstanceServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   cookies().delete("token");
    //   cookies().delete("sessionToken");
    //   cookies().delete("guest");
    //   const locale = cookies().get("NEXT_LOCALE");
    //   if (typeof window !== "undefined") {
    //     redirect(locale?.value === "ar" ? "/ar/auth/login" : "/auth/login");
    //   }
    // }
    // const serverCookies = cookies();
    // const locale = serverCookies.get("NEXT_LOCALE");
    // if (error.response?.status === 401) {
    //   serverCookies.delete("sessionToken");
    //   serverCookies.delete("token");
    //   if (typeof window !== "undefined") {
    //     redirect(locale?.value === "ar" ? "/auth/login" : "/en/auth/login");
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstanceServer;
