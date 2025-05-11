// lib/axios.ts
import axios from "axios";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const axiosInstanceGeneralServer = axios.create({
  baseURL: process.env.VITE_BASE_GENERAL_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstanceGeneralServer.interceptors.request.use(
  async (config) => {
    const serverCookies = cookies();
    const Context_locale = await getLocale();
    const NEXT_LOCALE =
      Context_locale || serverCookies.get("NEXT_LOCALE")?.value || "ar";
    config.headers["Accept-Language"] = NEXT_LOCALE;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstanceGeneralServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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

export default axiosInstanceGeneralServer;
