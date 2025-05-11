"use client";
import BreadcrumbSlugs from "@/shared/Breadcrumbs/CustomBreadcrumbs";
import React from "react";
import FavouritsDetails from "@/components/favourits/FavouritsDetails";
import EmptyFavourits from "@/components/favourits/EmptyFavourits";
import FavouritsCard from "@/components/favourits/FavouritsCard";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
export default function FavouritsIndex({ paths, category }: any) {
  return (
    <>
      <GeneralClientAxios method="GET" url={`favorites`} params={{ category }}>
        {(data, refetch) => (
          <>
            <div className="bg-greynormal overflow-x-hidden">
              <div className=" container md:py-10 py-6">
                <BreadcrumbSlugs paths={paths} />
                {data?.products?.length > 0 ? (
                  <>
                    <FavouritsCard refetch={refetch} count={data?.count} />
                    <FavouritsDetails
                      refetch={refetch}
                      products={data?.products}
                      // pagination={data?.meta}
                      categories={data?.categories}
                      // currentPage={page}
                      defaultType={category}
                    />
                  </>
                ) : (
                  <EmptyFavourits />
                )}
              </div>
            </div>
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
