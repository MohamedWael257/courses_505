/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import OrdersDetails from "@/components/profile/orders/OrdersDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";

export default function page({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const status = searchParams.status || "active";
  const page = Number(searchParams?.page) || 1;
  return (
    <>
      <GeneralClientAxios method="GET" url={`orders`} params={{ status, page }}>
        {(data, refetch, _, meta) => (
          <OrdersDetails
            current_page={page}
            paggination={meta}
            orders={data}
            defaultType={status}
            refetch={refetch}
          />
        )}
      </GeneralClientAxios>
    </>
  );
}
