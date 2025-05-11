"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalePath from "../LocalePath";
import { TiStar } from "react-icons/ti";
import ImageWithFallback from "../ImageWithFallback";
import book from "@/assets/test.jpg";
import { Cart5, Heart, RS } from "../Icons";
import CustomBtn from "../buttons/CustomBtn";

interface Props {
  bookData: any;
  index: any;
  refetch?: any;
  className?: string;
  border?: string;
}
export default function BooksCard({
  className,
  border,
  bookData,
  index,
  refetch,
}: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  // if (!courseData) return null;
  const favItems = useSelector(
    (state: RootState) => state.FavouritsConfig.allFavItems
  );
  const [isFavouriteState, setIsFavouriteState] = useState<boolean>(() => {
    if (favItems.length > 0) {
      return favItems.some((item: any) => item.id == bookData?.id);
    } else if (!favItems.length && !bookData?.is_favorite) {
      return false;
    }
  });
  return (
    <div
      // data-aos="zoom-in"
      className={`${
        className ? className : ""
      } col-span-1 bg-greynormal rounded-2xl p-5 relative overflow-hidden flex  gap-5`}
      key={`offer_${index}`}
    >
      <LocalePath href={`/books/${bookData?.slug}`}>
        <div
          className={`relative bg-white  rounded-2xl p-4 ${
            border ? border : ""
          }`}
        >
          <ImageWithFallback
            src={book}
            width={1790}
            height={900}
            className="w-52 h-64  object-cover rounded-2xl mb-4"
            // className="w-[169px] h-[206px] object-contain  "
            alt="hero"
            // style={{
            //   mixBlendMode: "multiply",
            // }}
          />
          <div
            style={{ boxShadow: "0px 0px 4px 2px #CACACA" }}
            className="absolute bottom-3 start-0 bg-white text-dark px-3 py-2 rounded-full text-sm font-medium flex gap-1 items-center"
          >
            <TiStar color="#FF8861" size={25} />
            {bookData?.rate.toFixed(1) || "4.5"}
            <span className="text-secondrydark">(30)</span>
          </div>
        </div>
      </LocalePath>
      <div className="absolute top-6 end-7 text-2xl font-bold flex gap-3">
        <Heart
          color={isFavouriteState ? "#4F008C " : ""}
          className={`border-2 size-10 border-greynormal p-2 rounded-full cursor-pointer ${
            isFavouriteState ? "bg-secprimary" : "bg-white"
          }`}
        />
      </div>
      <div className="flex flex-col gap-5 pt-2">
        <p className="text-base font-medium leading-4 text-start text-error">
          {bookData?.brand?.name || "كتاب ورقي"}
        </p>
        <p className="text-lg font-medium  leading-7 text-start text-text  line-clamp-2">
          الوحش الذي يسكنك يمكن أن يكون لطيفاً
        </p>
        <p className="w-fit text-base font-medium leading-4 text-start text-text bg-text/30 p-2 px-4 rounded-full">
          ملف
        </p>
        <div className="flex  gap-2 my-4">
          <span className="flex items-center text-base font-bold  leading-5 text-start text-secondrydark line-through">
            500
            <RS className="*:fill-secondrydark" />
          </span>
          <span className="flex items-center font-bold text-lg  leading-5 text-start text-primary">
            500
            <RS />
          </span>
        </div>
        <CustomBtn
          title={"اضف الي السلة"}
          buttonType="button"
          loader={false}
          disabled={false}
          button
          className=" !w-full !h-[56px] !rounded-full  !mt-[20px] !font-medium text-sm"
          rightIcon={<Cart5 className="size-6" />}
        />
      </div>
    </div>
  );
}
