import WalletIndex from "@/components/profile/wallet/WalletIndex";
import React from "react";

type Props = {};

export default function page({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "deposit"; // let page = 1;
  return <WalletIndex type={type} />;
}
