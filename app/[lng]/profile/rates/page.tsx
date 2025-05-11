/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import EmptyRates from "@/components/profile/rates/EmptyRates";
import RatesDetails from "@/components/profile/rates/RatesDetails";
import GeneralServerAxios from "@/shared/AxiosPage/GeneralServerAxios";

export default function page({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;

  return (
    <>
      <GeneralServerAxios method="GET" params={{ page }} url={`rates`}>
        {(data, meta) => (
          <>
            {data?.length > 0 ? (
              <RatesDetails
                current_page={page}
                paggination={meta}
                rates={data}
              />
            ) : (
              <EmptyRates />
            )}
          </>
        )}
      </GeneralServerAxios>
    </>
  );
}
