"use client";
import React from "react";
import WalletCard from "@/components/profile/wallet/WalletCard";
import WalletDetails from "@/components/profile/wallet/WalletDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";

type Props = {
  type: any;
};

export default function WalletIndex({ type }: Props) {
  return (
    <>
      <GeneralClientAxios
        method="GET"
        url="wallet"
        requests={[
          { method: "GET", url: "wallet", key: "wallet" },
          {
            method: "GET",
            url: `wallet/transactions`,
            key: "transactions",
            params: { type },
          },
        ]}
      >
        {(data, refetch) => (
          <>
            <WalletCard wallet={data?.wallet?.balance} refetch={refetch} />
            {/* {data?.transactions?.length > 0 ? ( */}
            <WalletDetails
              transactions={data?.transactions}
              defaultType={type} // Fixed typo from 'defaultType' to 'defaultType'
              refetch={refetch}
            />
            {/* ) : ( */}
            {/* <EmptyWallet /> */}
            {/* )} */}
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
