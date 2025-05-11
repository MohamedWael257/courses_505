"use client";
import EmptyGifts from "@/components/profile/gifts/EmptyGifts";
import GiftsCard from "@/components/profile/gifts/GiftsCard";
import GiftsDetails from "@/components/profile/gifts/GiftsDetails";
import GeneralClientAxios from "@/shared/AxiosPage/GeneralClientAxios";
import React from "react";

export default function GiftsIndex({ current_page }: any) {
  return (
    <>
      <GeneralClientAxios method="GET" url={`gifts`}>
        {(data, refetch, _, meta) => (
          <>
            <GiftsCard />
            {data?.length > 0 ? (
              <GiftsDetails
                paggination={meta}
                current_page={current_page}
                refetch={refetch}
                gifts={data}
              />
            ) : (
              <EmptyGifts />
            )}
          </>
        )}
      </GeneralClientAxios>
    </>
  );
}
