"use client";
import React from "react";
import CouponsAdd from "./CouponsAdd";
import CouponsDetails from "./CouponsDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";

type Props = {
  filter: string;
};

export default function CouponsIndex({ filter }: Props) {
  return (
    <>
      <GeneralClientAxios method="GET" url="vouchers" params={{ filter }}>
        {(data, refetch) => (
          <>
            <CouponsAdd refetch={refetch} />
            <br />
            <CouponsDetails
              coupons={data}
              refetch={refetch}
              defaultType={filter}
              // loading={loadingChildren}
            />
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
