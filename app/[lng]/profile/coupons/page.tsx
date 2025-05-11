import CouponsIndex from "@/components/profile/coupons/CouponsIndex";
import React from "react";

export default function page({
  searchParams,
}: {
  searchParams: { filter ?: string };
}) {
  const filter  = searchParams.filter  || ""; // let page = 1;

  return (
    <>
      <CouponsIndex filter ={filter } />
    </>
  );
}
