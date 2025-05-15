"use client";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";
import React from "react";
import FavouritsDetails from "@/components/favourits/FavouritsDetails";
import EmptyFavourits from "@/components/favourits/EmptyFavourits";
import FavouritsCard from "@/components/favourits/FavouritsCard";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
export default function FavouritsIndex({ paths, category }: any) {
  return (
    <>
      {/* <GeneralClientAxios method="GET" url={`favorites`} params={{ category }}>
        {(data, refetch) => (
          <> */}
      <div className=" overflow-x-hidden">
        <div className=" container md:py-10 py-6">
          <AppBreadCrumbs paths={paths} />
          {/* {data?.products?.length > 0 ? ( */}
          {/* <> */}
          <FavouritsCard />
          <FavouritsDetails
            refetch={null}
            products={[]}
            defaultType={category}
          />
          {/* </> */}
          {/* ) : ( */}
          {/* <EmptyFavourits /> */}
          {/* )} */}
        </div>
      </div>
      {/* </>
        )}
      </GeneralClientAxios> */}
    </>
  );
}
