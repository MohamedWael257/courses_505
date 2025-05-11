import GiftsIndex from "@/components/profile/gifts/GiftsIndex";
import React from "react";

type Props = {
  searchParams: {
    page?: string;
  };
};
export default async function page({ searchParams }: Props) {
  const page = Number(searchParams?.page) || 1;
  return (
    <>
      <GiftsIndex current_page={page} />
    </>
  );
}
