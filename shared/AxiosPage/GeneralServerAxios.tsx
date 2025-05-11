import axiosInstanceServer from "@/utils/axios";
import { AxiosError } from "axios";
import React from "react";
import Custom404 from "../Custom404";
import Custom403 from "../Custom403";
import Custom500 from "../Custom500";
import Custom400 from "../Custom400";
import Custom401 from "../Custom401";
import { cookies } from "next/headers";
import ShowAlertMixin from "../ShowAlertMixin";
import axiosInstanceGeneralServer from "@/utils/axiosGeneral";
import { getLocale } from "next-intl/server";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface SingleRequest {
  method: Method;
  url: string;
  params?: Record<string, any>; // Accept query parameters
}

interface MultiRequest {
  requests: Array<{
    method: Method;
    url: string;
    key: string;
    params?: Record<string, any>;
  }>;
}

type GeneralServerAxiosProps = SingleRequest | MultiRequest;

function isMultiRequest(props: GeneralServerAxiosProps): props is MultiRequest {
  return "requests" in props;
}

export default async function GeneralServerAxios({
  children,
  ...props
}: GeneralServerAxiosProps & {
  children: (data: any, meta?: any) => React.ReactNode;
}) {
  try {
    if (isMultiRequest(props)) {
      const responses = await Promise.all(
        props.requests.map(({ method, url, params }) => {
          const fullUrl = method === "GET" ? addQueryParams(url, params) : url;
          return method === "GET"
            ? axiosInstanceServer.get(fullUrl)
            : method === "POST"
            ? axiosInstanceServer.post(url, params)
            : method === "PUT"
            ? axiosInstanceServer.put(url, params)
            : method === "DELETE"
            ? axiosInstanceServer.delete(url, { data: params })
            : axiosInstanceServer.patch(url, params);
        })
      );

      const data = responses.reduce(
        (acc, response, index) => ({
          ...acc,
          [props.requests[index].key]: response.data,
        }),
        {}
      );
      // const meta = responses.reduce(
      //   (acc, response, index) => ({
      //     ...acc,
      //     [props.requests[index].key]: response.data,
      //   }),
      //   {}
      // );
      return <>{children(data)}</>;
    } else {
      const { method, url, params } = props;
      const fullUrl = method === "GET" ? addQueryParams(url, params) : url;

      const res = await (method === "GET"
        ? axiosInstanceServer.get(fullUrl)
        : method === "POST"
        ? axiosInstanceServer.post(url, params)
        : method === "PUT"
        ? axiosInstanceServer.put(url, params)
        : method === "DELETE"
        ? axiosInstanceServer.delete(url, { data: params })
        : axiosInstanceServer.patch(url, params));
      return <>{children(res.data.data, res.data.meta)}</>;

      // return <>{children(res.data.data)}</>;
    }
  } catch (error: any) {
    // if (error instanceof AxiosError) {
    //   return (
    //     <div className="error">
    //       {error.response?.data?.message ||
    //         error.message ||
    //         "An error occurred"}
    //     </div>
    //   );
    // }
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 422)
    ) {
      cookies().delete("token");
      cookies().delete("sessionToken");
      // const locale = await getLocale();
      // ShowAlertMixin({
      //   type: 15,
      //   icon: "error",
      //   title: error.response?.data?.message,
      // });
      // setTimeout(() => {
      //   window.location.href = `${locale == "ar" ? "" : "/en"}/auth/login}`;
      // }, 1000);
    }
    return (
      <>
        {(error.response?.status === 403 || error.response?.status === 401) && (
          <Custom401 />
        )}

        {/* Status: ({error.response?.status}) {error.message} */}
        {error.response?.status === 400 && <Custom400 />}
        {error.response?.status === 404 && <Custom404 />}
        {error.response?.status === 500 && <Custom500 />}
        {error.response?.status === 403 && <Custom403 />}
      </>
    );
  }
}

/**
 * Function to append query parameters to a URL for GET requests.
 */
function addQueryParams(url: string, params?: Record<string, any>): string {
  if (!params) return url;
  const query = new URLSearchParams(params as any).toString();
  return query ? `${url}?${query}` : url;
}

export const getHeaderData = async () => {
  try {
    const [categoriesRes, settingRes] = await Promise.all([
      axiosInstanceGeneralServer.get(`categories?level=1`),
      axiosInstanceGeneralServer.get("settings"),
    ]);

    return {
      categories: categoriesRes.data.data,
      settings: settingRes.data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { error: error?.message, categories: null, settings: null }; // Return empty on error
  }
};
