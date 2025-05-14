import WalletIndex from "@/components/profile/wallet/WalletIndex";
import React from "react";

type Props = {};

export default function page() {
  return (
    <div className="bg-greynormal p-6 rounded-2xl border border-secprimary">
      <WalletIndex  />
    </div>
  );
}
