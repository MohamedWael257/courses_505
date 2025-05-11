"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/store/locationSlice";
import { RootState } from "@/store/store";
import Loader from "./Loader/Loader";
import { handleLocationFetch } from "@/utils/helpers";
import { Skeleton } from "./ui/skeleton";

const LocationHandler = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => {
    return state.locationConfig.isLoading;
  });

  useEffect(() => {
    const clientLocation = Cookies.get("client_location");

    handleLocationFetch({ dispatch, setLocation, clientLocation });
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  // return null
  // if (isLoading) {
  //   return <Skeleton className="2xl:w-[300px] w-[160px] h-12" />;
  // }
};

export default LocationHandler;
