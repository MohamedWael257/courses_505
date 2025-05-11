/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import OrderDetailsIndex from "@/components/profile/orders/orderDetails/OrderDetailsIndex";
export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <GeneralClientAxios method="GET" url={`orders/${slug}`}>
      {(data, refetch) => (
        <>
          <OrderDetailsIndex data={data} refetch={refetch} />
        </>
      )}
    </GeneralClientAxios>
  );
}
