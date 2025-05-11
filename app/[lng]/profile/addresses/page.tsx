import React from "react";
import AddressesIndex from "@/components/profile/addresses/AddressesIndex";

type Props = {
  searchParams: {
    page?: string;
  };
};
export default async function page({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  return (
    <>
      <AddressesIndex current_page={page} />
    </>
  );
}
