"use client";
import React from "react";
import WalletCard from "@/components/profile/wallet/WalletCard";
import WalletDetails from "@/components/profile/wallet/WalletDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import { RS } from "@/shared/Icons";
import { BiSolidError } from "react-icons/bi";

export default function WalletIndex() {
  return (
    <>
      {/* <GeneralClientAxios
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
          <> */}
      <div className="flex justify-between items-center mb-6">
        <h2>المحفظة</h2>
        <div className="bg-secprimary flex items-center gap-4 ps-5 p-4 rounded-full">
          <BiSolidError size={30} className="text-primary" />
          <h2 className="flex items-center gap-3 text-base  text-primary font-medium   leading-5 text-start">
            الحد الأدني للسحب 4000
            <RS />
          </h2>
        </div>
      </div>
      <WalletCard wallet={200} refetch={null} />
      <WalletDetails transactions={[]} refetch={null} />
      {/* </>
        )}
      </GeneralClientAxios> */}
    </>
  );
}
