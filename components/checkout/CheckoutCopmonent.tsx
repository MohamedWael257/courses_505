/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutSummary from "./CheckoutSummary";
import axiosInstance from "@/utils/axiosClient";
import EmptyCart from "../cart/EmptyCart";
import Loader from "@/shared/Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { SessionType } from "../Header";
import UseSession from "@/store/UseSession";

type Props = {
  code: any;
};

export default function CheckoutCopmonent({ code }: Props) {
  const [data, setData] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const { location_id } = useSelector(
    (state: RootState) => state.locationConfig
  );
  const [shipping_type, setShipping_type] = useState<any>("");
  const [shipping_Value, setShipping_Value] = useState<any>("");

  const [payment_method, setPayment_method] = useState<any>("");
  const [settings, setSettings] = useState<any>(null);
  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  // const fetchData = async () => {
  //   try {
  //     const [response1, response2, response3] = await Promise.all([
  //       axiosInstance.get(`cart?code=${code}`),
  //       axiosInstanceGeneralClient.get("settings"),
  //       memoizedSession && axiosInstance.get(`locations`),
  //     ]);

  //     setData(response1.data); // or process both responses if necessary
  //     setSettings(response2.data.data); // or process both responses if necessary
  //     if (memoizedSession) {
  //       setLocations(response3?.data?.data);
  //     }
  //     //  setCoupons(response2.data.data); // or process both responses if necessary
  //   } catch (error: any) {
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "error",
  //       title: error?.response?.data?.message,
  //     });
  //   } finally {
  //     setIsLoadingFirstTime(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      {/* {isLoadingFirstTime ? (
        <Loader />
      ) : data?.data?.length > 0 ? (
        <> */}
      <div className="container py-8 grid lg:grid-cols-[2fr_1fr] gap-4 overflow-hidden">
        <div>
          <CheckoutDetails
            setPayment_method={setPayment_method}
            setShipping_type={setShipping_type}
            setShipping_Value={setShipping_Value}
            data={data}
            setting={setting}
            locations={locations}
            // refresh={fetchData}
          />
        </div>
        <CheckoutSummary
          location_id={location_id}
          payment_method={payment_method}
          shipping_type={shipping_type}
          shipping_Value={shipping_Value}
          data={data}
          code={code}
          locations={locations}
          memoizedSession={memoizedSession}
        />
      </div>
      {/* </>
       ) : (
         <EmptyCart />
       )} */}
    </>
  );
}
