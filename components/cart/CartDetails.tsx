"use client";
import React, { useEffect, useState } from "react";
import OrderCard from "@/shared/card/CartCard";
import axiosInstance from "@/utils/axiosClient";
import { useRouter } from "next/navigation";
import LoaderSection from "@/shared/LoaderSection/LoaderSection";
import EmptyCart from "./EmptyCart";
import {
  addItem,
  decreaseItemQuantity,
  removeItem,
} from "@/store/cartStore.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import debounce from "debounce";

import CartCard from "@/shared/card/CartCard";
import Loader from "@/shared/Loader/Loader";

export default function CartDetails() {
  const [data, setData] = useState<any>(null);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);

  const fetchCartData = async () => {
    setIsLoading(true);
    setIsFetching(true);
    setIsError(false);
    try {
      const response = await axiosInstance.get("cart");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
      setIsLoadingFirstTime(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [decrementLoading, incrementLoading]);
  const [loadingRemoveCoupon, setLoadingRemoveCoupon] = useState(false);
  // Local state to store the cart data
  const [cartData, setCartData] = useState<any>(null);

  // Update cartData when the API data changes
  useEffect(() => {
    if (data) {
      setCartData(data?.data); // Assuming data has a "data" field that contains the necessary information
      setLoadingRemoveCoupon(false);
    }
  }, [data]);

  //Increment
  const incrementQuantity = async (itemId: any) => {
    setIncrementLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", "increment");

      const response = await axiosInstance.patch(`cart/${itemId}`, formData);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    } finally {
      setIncrementLoading(false);
    }
  };
  const debouncedAddToCart = debounce(async (item) => {
    await incrementQuantity(item?.id);
  }, 300);
  const handleAddToCart = (item: any) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(addItem(updatedItem));

    debouncedAddToCart(updatedItem);

    // Check if validCouponDiscount is true
    // if (validCouponDiscount) {
    //   setLoadingRemoveCoupon(true);
    //   setValidCouponDiscount(false);
    //   setCouponCode("");
    //   notify(
    //     "error",
    //     t("The coupon has been cancelled due to changes in the item quantity")
    //   );
    //   setCartData(data?.data);
    //   return;
    // }
  };

  //Decrement
  const decrementQuantity = async (itemId: any) => {
    setDecrementLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", "decrement");

      const response = await axiosInstance.patch(`cart/${itemId}`, formData);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    } finally {
      setDecrementLoading(false);
    }
  };
  const debouncedDecreaseQuantity = debounce(async (item) => {
    await decrementQuantity(item?.id);
  }, 300);
  const removeFromCart = async (itemId: any) => {
    try {
      const response = await axiosInstance.delete(`cart/${itemId}`);
    } catch (error: any) {
      console.error("Error removing item from cart:", error);
      // notify("error", error?.response?.data?.message);
    } finally {
    }
  };
  const handleRemoveFromCart = async (id: any) => {
    dispatch(removeItem(id));

    // if (validCouponDiscount) {
    //   setLoadingRemoveCoupon(true);
    //   setValidCouponDiscount(false);
    //   setCouponCode("");
    //   notify(
    //     "error",
    //     t("The coupon has been cancelled due to changes in the item quantity")
    //   );
    //   setCartData(data?.data);
    //   return;
    // }

    await removeFromCart(id);
  };
  const handleDecreaseQuantity = (item: any, quantity: number) => {
    if (quantity > 1) {
      const updatedItem = { ...item, quantity: quantity - 1 };
      dispatch(decreaseItemQuantity(updatedItem));

      debouncedDecreaseQuantity(updatedItem);

      // Check if validCouponDiscount is true
      //   if (validCouponDiscount) {
      //     setLoadingRemoveCoupon(true);

      //     setValidCouponDiscount(false);
      //     setCouponCode("");
      //     notify(
      //       "error",
      //       t("The coupon has been cancelled due to changes in the item quantity")
      //     );
      //     setCartData(data?.data);
      //     return;
      //   }
    } else {
      handleRemoveFromCart(item?.id);
    }
  };

  return (
    <>
      {isLoadingFirstTime ? (
        <Loader />
      ) : data?.data?.length > 0 ? (
        <div className="h-fit grid  gap-4 mb-4">
          {cartData?.map((ele: any, index: number) => {
            return (
              <CartCard
                Key={index}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleAddToCart={handleAddToCart}
                cartData={ele}
                index={index}
                loading={
                  incrementLoading ||
                  decrementLoading ||
                  isLoading ||
                  isFetching
                }
              />
            );
          })}
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
