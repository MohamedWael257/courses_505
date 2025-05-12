import React from "react";
import CheckoutCopmonent from "@/components/checkout/CheckoutCopmonent";
export default function page({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = searchParams.code || "";

  return (
    <div className="bg-white overflow-x-hidden">
      <div className="container">
        <CheckoutCopmonent code={code} />
      </div>
    </div>
  );
}
