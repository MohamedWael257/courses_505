// lib/axios.ts
import axios from "axios";
import Cookies from "js-cookie";
// import { redirect } from 'next/navigation';

const axiosInstanceGeneralClient = axios.create({
  baseURL: "https://doom.elsayed.aait-d.com/api/general/",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstanceGeneralClient.interceptors.request.use(
  (config) => {
    const locale = Cookies.get("NEXT_LOCALE") || "ar";
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstanceGeneralClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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

export default axiosInstanceGeneralClient;
