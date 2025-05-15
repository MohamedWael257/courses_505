"use client";
import React, { useEffect, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import LocalePath from "../LocalePath";
import { Cart4, Cart5, Heart, RS } from "../Icons";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { TiStar } from "react-icons/ti";
import course from "@/assets/test.jpg";
import CustomBtn from "../buttons/CustomBtn";
import { addItem } from "@/store/cartStore.slice";
import { AddToFav, RemoveFromFav } from "@/store/favourtis";
import ShowAlertMixin from "../ShowAlertMixin";
interface Props {
  data: any;
  index: any;
  refetch?: any;
  type?: "course" | "book";
}
export default function StoreCard({ data, index, refetch, type }: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  // if (!data) return null;
  const favItems = useSelector(
    (state: RootState) => state.FavouritsConfig.allFavItems
  );
  const [isFavouriteState, setIsFavouriteState] = useState<boolean>(() => {
    if (favItems.length > 0) {
      return favItems.some((item: any) => item.id == data?.id);
    } else if (!favItems.length && !data?.is_favorite) {
      return false;
    }
  });
  useEffect(() => {
    if (favItems.length > 0) {
      setIsFavouriteState(favItems.some((item: any) => item.id == data?.id));
    } else if (!favItems.length && !data?.is_favorite) {
      setIsFavouriteState(false);
    }
  }, [favItems, data?.id]);
  const handleFavouriteToggle = async (id: string): Promise<void> => {
    if (isFavouriteState) {
      try {
        // const { data } = await axiosInstance.delete(`favorites/${id}`);
        // if (data?.status === "success") {
        // await dispatch(getAllFavItems());
        dispatch(RemoveFromFav({ id: id }));

        //   ShowAlertMixin({
        //     type: 15,
        //     icon: "success",
        //     title: data?.message,
        //   });
        //   // setIsFavouriteState(false);
        //   if (refetch) {
        //     refetch();
        //   }
        // }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: error?.response?.data?.message,
        });
      }
    } else {
      try {
        // const { data } = await axiosInstance.post(`favorites`, {
        //   product_id: id,
        // });
        // if (data?.status === "success") {
        // await dispatch(getAllFavItems());
        dispatch(AddToFav({ id: id }));
        //   ShowAlertMixin({
        //     type: 15,
        //     icon: "success",
        //     title: data?.message,
        //   });
        //   // setIsFavouriteState(true);
        //   if (refetch) {
        //     refetch();
        //   }
        // }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: error?.response?.data?.message,
        });
      }
    }
  };

  const handleaddToCart = async (productData: any) => {
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "success",
    });
    // const formData = new FormData();
    // formData.append("quantity", "1");
    // formData.append("product_detail_id", productData?.default_detail);
    // await axiosInstance
    //   .post("cart", formData)
    // .then((res: any) => {
    // ShowAlertMixin({
    //   type: 15,
    //   icon: "success",
    //   title: res?.data?.message,
    // });
    // dispatch(
    //   addItem({
    //     id: productData?.default_detail,
    //     product: productData,
    //     quantity: 1,
    //   })
    // );
    // dispatch(getAllCartItems());
    // })
    // .catch((err: any) => {
    //   ShowAlertMixin({
    //     type: 15,
    //     icon: "error",
    //     title: err.response.data.message,
    //   });
    // });
  };
  return (
    <div
      // data-aos="zoom-in"
      className="col-span-1 bg-greynormal rounded-xl p-5 relative overflow-hidden "
      key={`offer_${index}`}
    >
      {/* <div className="flex justify-center items-center relative w-full h-[246px] mt-2"> */}
      {/* <LocalePath href={`/${type}s/${data?.slug}`}> */}
      <LocalePath href={`/${type}s/${data?.id}`}>
        <div className="relative">
          <ImageWithFallback
            src={course}
            width={1790}
            height={900}
            className={`w-full ${
              type == "course" ? "h-[220px]" : "h-[280px]"
            } object-cover rounded-xl mb-4`}
            // className="w-[169px] h-[206px] object-contain  "
            alt="hero"
            // style={{
            //   mixBlendMode: "multiply",
            // }}
          />
          <div className="absolute bottom-3 start-0 bg-white text-darkprimary px-3 py-2 rounded-full text-sm font-medium flex gap-1 items-center">
            <TiStar color="#FF8861" size={25} />
            {data?.rate.toFixed(1) || "4.5"}
            <span className="text-secondrydark">(30)</span>
          </div>
        </div>
      </LocalePath>

      <div className="absolute top-6 start-7 text-2xl font-bold flex gap-3">
        <Heart
          onClick={() => handleFavouriteToggle(data?.id)}
          color={isFavouriteState ? "#4F008C " : ""}
          className={` ${
            isFavouriteState ? "*:fill-[#4F008C] " : ""
          } border-2 size-10 border-greynormal p-2 rounded-full cursor-pointer bg-white`}
        />
      </div>
      {/* </div> */}
      {type == "course" ? (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium leading-4 text-start text-error">
              {data?.brand?.name || "المهارات المهنية والأعمال"}
            </p>
            <div className="text-lg font-medium  leading-7 text-start text-darkprimary  line-clamp-2">
              <p>كيفية بناء علامتك التجارية الدولية في مجال العمل الحر</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 my-3">
            <p className="w-fit text-base font-medium leading-4 text-start text-darkprimary bg-text/30 p-2 px-4 rounded-full">
              غير أكاديمي
            </p>
            <p className="w-fit text-base font-medium leading-4 text-start text-primary bg-secprimary p-2 px-4  rounded-full">
              مسجلة{" "}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium leading-4 text-start text-error">
              كتاب ورقي
            </p>
            <p className="text-lg font-medium  leading-7 text-start text-darkprimary  line-clamp-2">
              الوحش الذي يسكنك يمكن أن يكون لطيفاً
            </p>
            <p className="w-fit text-base font-medium leading-4 text-start text-darkprimary bg-text/30 p-2 px-4 rounded-full">
              ملف
            </p>
            <div className="flex  gap-2 my-4">
              <span className="flex items-center font-bold text-lg  leading-5 text-start text-primary">
                500
                <RS />
              </span>
              <span className="flex items-center  text-base font-bold  leading-5 text-start text-secondrydark line-through">
                500
                <RS className="*:fill-secondrydark" />
              </span>
            </div>
          </div>
        </>
      )}
      {type == "course" && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={course}
              width={1790}
              height={900}
              className="w-12 h-12 object-cover rounded-full"
              // className="w-[169px] h-[206px] object-contain  "
              alt="hero"
              // style={{
              //   mixBlendMode: "multiply",
              // }}
            />
            <span className=" font-medium text-base  leading-5 text-start text-primary">
              محمد وائل
            </span>
          </div>
          <div className="flex  gap-2">
            <span className="flex items-center text-base font-bold  leading-5 text-start text-secondrydark line-through">
              500
              <RS className="*:fill-secondrydark" />
            </span>
            <span className="flex items-center font-bold text-lg  leading-5 text-start text-primary">
              500
              <RS />
            </span>
          </div>
        </div>
      )}

      <CustomBtn
        onClick={() => {
          handleaddToCart(data);
        }}
        title={"اضف الي السلة"}
        buttonType="button"
        loader={false}
        disabled={false}
        button
        className=" !w-full !h-[56px] !rounded-full  !mt-[20px] !font-medium text-sm"
        rightIcon={<Cart5 className="size-6" />}
      />
    </div>
  );
}
