"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Delete, RS } from "../Icons";
import course from "@/assets/test.jpg";
import ImageWithFallback from "../ImageWithFallback";
import CartProductQuantity from "../CartProductQuantity";

export default function CartCard({
  cartData,
  handleDecreaseQuantity,
  handleAddToCart,
  handleRemoveFromCart,
  loading,
  index,
}: any) {
  const t = useTranslations("");
  const [initialCount, setInitialCount] = useState<any>(
    cartData?.quantity ? +cartData?.quantity : 1
  );
  const [edit, setEdit] = useState<any>(false);

  return (
    <>
      <div
        //data-aos-duration={`${index * 30}`}
        key={index}
        className="grid md:grid-cols-[1.5fr_1fr] gap-3 min-h-[200px] bg-white justify-between items-center p-3 border-b-[3px] border-b-greynormal  "
        // className="flex min-h-[200px] bg-white justify-between items-center p-3 rounded-xl "
      >
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          {/* <ImageWithFallback */}
          <ImageWithFallback
            src={course}
            alt="course"
            // src={
            //   cartData?.product?.media?.length > 0
            //     ? cartData?.product?.media[0]?.media
            //     : cartData?.product?.main?.media
            // }
            // alt={`${cartData?.product?.name}`}
            width={800}
            height={800}
            className="w-[150px] h-[100px] object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium leading-8 text-start text-darkprimary">
              كيفية بناء علامتك التجارية الدولية في مجال العمل الحر
            </p>
            {index >= 2 && (
              <h2 className="text-base font-normal leading-5 text-start text-secondrydark">
                6 إختبارات - 25 درس - 5 فصول
              </h2>
            )}
            {index >= 2 ? (
              <CartProductQuantity
                quantity={cartData?.quantity || 1}
                loading={loading}
                decrease={() =>
                  handleDecreaseQuantity(cartData, cartData?.quantity)
                }
                AddToCart={() => handleAddToCart(cartData, cartData?.quantity)}
              />
            ) : (
              <> {"   "}</>
            )}
          </div>
        </div>

        <div className="flex h-full md:flex-col md:items-end md:justify-evenly  md:flex-nowrap flex-wrap md:gap-2 gap-[10px_30px] md:my-2 my-4">
          <div className="flex items-center gap-2">
            <span className=" flex items-center font-bold text-lg    leading-5 text-start text-primary">
              {/* {cartData?.product?.price_after_discount > 0
                ? cartData?.product?.price_after_discount
                : cartData?.product?.price}{" "}
              {t("Text.SR")} */}
              500
              <RS />
            </span>
            {/* {cartData?.product?.price_after_discount > 0 && ( */}
            <span className="flex items-center text-base font-bold     leading-5 text-start text-secondrydark line-through">
              {/* {cartData?.product?.price} {"  "}
                {t("Text.SR")} */}
              500 <RS className="*:fill-secondrydark" />
            </span>
            {/* )} */}
          </div>

          <button
            className="flex items-center gap-3 text-secondrydark"
            onClick={() => handleRemoveFromCart(cartData)}
          >
            <Delete color={"#8d8d8d"} className="size-5" />
            حذف
          </button>
        </div>
      </div>
    </>
  );
}
