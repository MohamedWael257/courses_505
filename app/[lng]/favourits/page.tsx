import React from "react";
import FavouritsIndex from "@/components/favourits/FavouritsIndex";
export default function page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const paths = [{ name: "home", href: "/" }, { name: "favourits" }];
  const category = searchParams.category || ""; // let page = 1;

  return (
    <>
      <FavouritsIndex paths={paths} category={category} />
    </>
  );
}
