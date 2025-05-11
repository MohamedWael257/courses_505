"use client";
import axiosInstanceClient from "@/utils/axiosClient";
import { AxiosError } from "axios";
import React, { useState, useEffect, useMemo } from "react";
import Custom404 from "../Custom404";
import Custom403 from "../Custom403";
import Custom500 from "../Custom500";
import Custom400 from "../Custom400";
import Custom401 from "../Custom401";
import ShowAlertMixin from "../ShowAlertMixin";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { deleteCredentials } from "@/store/auth.slice";
import Loader from "../Loader/Loader";
import LoaderSection from "../LoaderSection/LoaderSection";
import { useRouter } from "next/navigation";
import LoaderWarper from "../Loader/LoaderWarper";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface SingleRequest {
  method: Method;
  url: string;
  params?: Record<string, any>;
  changeLoadingProps?: boolean;
}

interface MultiRequest {
  requests: Array<{
    method: Method;
    url: string;
    key: string;
    params?: Record<string, any>;
    changeLoadingProps?: boolean;
  }>;
}

type GeneralClientAxiosProps = SingleRequest | MultiRequest;

function isMultiRequest(props: GeneralClientAxiosProps): props is MultiRequest {
  return "requests" in props;
}

export default function GeneralClientAxios({
  children,
  ...props
}: GeneralClientAxiosProps & {
  children: (
    data: any,
    refetch: () => void,
    loadingChildren: boolean,
    meta?: any
  ) => React.ReactNode;
}) {
  const [data, setData] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [refetchloading, setRefetchloading] = useState<boolean>(false);

  const [loadingChildren, setLoadingChildren] = useState<boolean>(false);

  const [error, setError] = useState<AxiosError | null>(null);
  const [changeLoading, setChangeLoading] = useState<boolean>(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();

  // Memoize params to detect changes
  const paramsString = useMemo(() => {
    if (isMultiRequest(props)) {
      return JSON.stringify(
        props.requests.map((req) => ({
          url: req.url,
          params: req.params,
          method: req.method,
        }))
      );
    }
    return JSON.stringify({
      url: props.url,
      params: props.params,
      method: props.method,
    });
  }, [props]);

  const fetchData = async () => {
    setError(null);
    try {
      if (isMultiRequest(props)) {
        const responses = await Promise.all(
          props.requests.map(({ method, url, params, changeLoadingProps }) => {
            if (changeLoadingProps) {
              setChangeLoading(true);
              setLoading(false);
            }
            const fullUrl =
              method === "GET" && params ? addQueryParams(url, params) : url;
            return method === "GET"
              ? axiosInstanceClient.get(fullUrl)
              : method === "POST"
              ? axiosInstanceClient.post(url, params)
              : method === "PUT"
              ? axiosInstanceClient.put(url, params)
              : method === "DELETE"
              ? axiosInstanceClient.delete(url, { data: params })
              : axiosInstanceClient.patch(url, params);
          })
        );

        const fetchedData = responses.reduce(
          (acc, response, index) => ({
            ...acc,
            [props.requests[index].key]: response.data.data,
          }),
          {}
        );
        const fetchedMeta = responses.reduce(
          (acc, response, index) => ({
            ...acc,
            [props.requests[index].key]: response.data.meta,
          }),
          {}
        );
        setData(fetchedData);
        setMeta(fetchedMeta);
      } else {
        const { method, url, params, changeLoadingProps } = props;
        const fullUrl =
          method === "GET" && params ? addQueryParams(url, params) : url;

        if (changeLoadingProps) {
          setChangeLoading(true);
          setLoading(false);
        }

        const res = await (method === "GET"
          ? axiosInstanceClient.get(fullUrl)
          : method === "POST"
          ? axiosInstanceClient.post(url, params)
          : method === "PUT"
          ? axiosInstanceClient.put(url, params)
          : method === "DELETE"
          ? axiosInstanceClient.delete(url, { data: params })
          : axiosInstanceClient.patch(url, params));

        setData(res.data.data);
        setMeta(res.data.meta);
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error);

      if (error.response?.status === 401 || error.response?.status === 422) {
        //   // ShowAlertMixin({
        //   //   type: 15,
        //   //   icon: "error",
        //   //   title: t("session_expired"),
        //   // });
        dispatch(deleteCredentials());
        // setTimeout(() => {
        //   router.replace(`${locale == "ar" ? "" : "/en"}/auth/login`);
        // }, 1000);
      }
    } finally {
      setLoading(false);
      setChangeLoading(false);
      setLoadingChildren(false);
      setRefetchloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paramsString]); // Re-fetch when params change

  const refetch = () => {
    // setRefetchloading(true);
    setLoadingChildren(true);
    fetchData();
  };

  if (loading) {
    return <Loader />;
  }
  if (refetchloading) {
    return (
      <div className="screen_loader h-[80vh] relative inset-0 bg-transparent dark:bg-[#060818] z-[1] grid place-content-center animate__animated">
        <LoaderWarper />
      </div>
    );
  }
  if (changeLoading) {
    return (
      <div className="screen_loader h-[80vh] relative inset-0 bg-transparent dark:bg-[#060818] z-[1] grid place-content-center animate__animated">
        <LoaderWarper />
      </div>
    );
  }

  if (error) {
    return (
      <>
        {(error.response?.status === 401 || error.response?.status === 422) && (
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

  return children(data, refetch, loadingChildren, meta);
}

function addQueryParams(url: string, params?: Record<string, any>): string {
  if (!params) return url;
  const query = new URLSearchParams(params as any).toString();
  return query ? `${url}?${query}` : url;
}
