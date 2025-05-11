"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProviderStore from "@/utils/providers/ProviderStore";
import { Skeleton } from "./ui/skeleton";

const LocationText = ({ className }: { className: string }) => {
  return (
    <ProviderStore>
      <LocationDisplay className={className} />
    </ProviderStore>
  );
};

const LocationDisplay = ({ className }: { className: string }) => {
  const { location, isLoading } = useSelector((state: RootState) => {
    return {
      location: state.locationConfig.location_description,
      isLoading: state.locationConfig.isLoading,
    };
  });

  return (
    <>
      {/* <div className="flex items-center gap-20"> */}
      <div className={` ${className ? className : ""}`}>
        {/* ? <Skeleton className="2xl:w-[300px] w-[160px] h-12"/> */}
        {/* "Skeleton" */}
        {isLoading ? (
          <Skeleton className="2xl:w-[300px] w-[200px] h-10" />
        ) : location && !isLoading ? (
          location
        ) : (
          <button
            onClick={() =>
              window.alert(
                "To enable location:\n1. Click the lock icon next to the URL bar.\n2. Go to site settings.\n3. Allow Location access."
              )
            }
            className="2xl:w-[300px] w-[200px] cursor-pointer text-start"
          >
            Allow to get your location...
          </button>
        )}
      </div>
      {/* <LocalePath href="/account/addresses" className="text-primary underline"> */}
      {/* تعديل */}
      {/* </LocalePath> */}
      {/* </div> */}
    </>
  );
};

export default LocationText;
