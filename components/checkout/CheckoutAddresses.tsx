"use client";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import React from "react";
import EmptyAddresses from "../profile/addresses/EmptyAddresses";
import CheckoutAddressesDetials from "./CheckoutAddressesDetials";

export default function CheckoutAddresses({ setAuthStage, dialogOpen }: any) {
  return (
    <>
      <GeneralClientAxios method="GET" url={`locations`} changeLoadingProps>
        {(data, refetch) => (
          <>
            {data?.length > 0 ? (
              <CheckoutAddressesDetials
                setAuthStage={setAuthStage}
                setIsOpen={dialogOpen}
                addresses={data}
                refetch={refetch}
              />
            ) : (
              <EmptyAddresses
                setAuthStage={setAuthStage}
                setIsOpen={dialogOpen}
              />
            )}
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
