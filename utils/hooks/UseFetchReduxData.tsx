// hooks/UseFetchReduxData.js
"use client";
import { getAllAddressesItems } from "@/store/address.slice";
import { getAllCartItems } from "@/store/cartStore.slice";
import { getAllComparisonsItems } from "@/store/comparisons";
import { getAllFavItems } from "@/store/favourtis";
import { getAllNotifications } from "@/store/notification.slice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseFetchReduxData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllAddressesItems());
    dispatch(getAllCartItems());
    dispatch(getAllComparisonsItems());
    dispatch(getAllNotifications());
    dispatch(getAllFavItems());
  }, [dispatch]);
};

export default UseFetchReduxData;
