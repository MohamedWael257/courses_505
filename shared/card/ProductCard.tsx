/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import LocalePath from "@/shared/LocalePath";
import { FaPlus } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import axiosInstance from "@/utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { AddToFav, RemoveFromFav } from "@/store/favourtis";
import { AppDispatch, RootState } from "@/store/store";
import { addItem } from "@/store/cartStore.slice";
import { AddToCompare, RemoveFromCompare } from "@/store/comparisons";
import { GreenDiscountIcon, Heart, Notificaation, Spinner } from "../Icons";
import ShowAlertMixin from "../ShowAlertMixin";
import ImageWithFallback from "../ImageWithFallback";

const ProductCard = ({ productData, index, refetch }: any) => {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  if (!productData) return null;
  const { items } = useSelector((state: RootState) => state.CartConfig);
  const favItems = useSelector(
    (state: RootState) => state.FavouritsConfig.allFavItems
  );
  const compareItems = useSelector(
    (state: RootState) => state.ComparisonsConfig.allComparisonsItems
  );
  // useEffect(() => {
  //   // dispatch(getAllCartItems());
  //   dispatch(getAllFavItems());
  //   dispatch(getAllComparisonsItems());
  // }, [dispatch]);

  const [isFavouriteState, setIsFavouriteState] = useState<boolean>(() => {
    if (favItems.length > 0) {
      return favItems.some((item: any) => item.id == productData?.id);
    } else if (!favItems.length && !productData?.is_favorite) {
      return false;
    }
  });
  useEffect(() => {
    if (favItems.length > 0) {
      setIsFavouriteState(
        favItems.some((item: any) => item.id == productData?.id)
      );
    } else if (!favItems.length && !productData?.is_favorite) {
      setIsFavouriteState(false);
    }
  }, [favItems, productData?.id]);
  // useEffect(() => {
  //   setIsFavouriteState(productData?.is_favorite);
  // }, [productData, productData?.is_favorite]);
  const handleFavouriteToggle = async (id: string): Promise<void> => {
    if (isFavouriteState) {
      try {
        const { data } = await axiosInstance.delete(`favorites/${id}`);
        if (data?.status === "success") {
          // await dispatch(getAllFavItems());
          await dispatch(RemoveFromFav({ id: id }));

          ShowAlertMixin({
            type: 15,
            icon: "success",
            title: data?.message,
          });
          // setIsFavouriteState(false);
          if (refetch) {
            refetch();
          }
        }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: error?.response?.data?.message,
        });
      }
    } else {
      try {
        const { data } = await axiosInstance.post(`favorites`, {
          product_id: id,
        });
        if (data?.status === "success") {
          // await dispatch(getAllFavItems());
          await dispatch(AddToFav({ id: id }));
          ShowAlertMixin({
            type: 15,
            icon: "success",
            title: data?.message,
          });
          // setIsFavouriteState(true);
          if (refetch) {
            refetch();
          }
        }
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
    // const in_cart = items.filter(
    //   (item: any) => item.id == productData?.default_detail
    // )[0];
    // // if (in_cart) {
    // //   const formData = new FormData();
    // //   formData.append("type", "increment");
    // //   await axiosInstance
    // //     .patch(`cart/${productData?.default_detail}`, formData)
    // //     .then((res: any) => {
    // //       ShowAlertMixin({
    // //         type: 15,
    // //         icon: "success",
    // //         title: res?.data?.message,
    // //       });
    // //       dispatch(
    // //         addItem({
    // //           id: productData?.default_detail,
    // //           product: productData,
    // //           quantity: 1,
    // //         })
    // //       );
    // //       // dispatch(getAllCartItems());
    // //     })
    // //     .catch((err: any) => {
    // //       ShowAlertMixin({
    // //         type: 15,
    // //         icon: "error",
    // //         title: err.response.data.message,
    // //       });
    // //     });
    // // } else {
    // if (productData?.quantity < in_cart?.product?.quantity) {
    const formData = new FormData();
    formData.append("quantity", "1");
    formData.append("product_detail_id", productData?.default_detail);
    await axiosInstance
      .post("cart", formData)
      .then((res: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res?.data?.message,
        });
        dispatch(
          addItem({
            id: productData?.default_detail,
            product: productData,
            quantity: 1,
          })
        );
        // dispatch(getAllCartItems());
      })
      .catch((err: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: err.response.data.message,
        });
      });
    // } else {
    //   if (in_cart?.product?.quantity > 0) {
    //     ShowAlertMixin({
    //       type: 15,
    //       icon: "error",
    //       title: t("validations.Only nubmer left in stock", {
    //         number: productData?.quantity,
    //       }),
    //     });
    //   }
    // }
    // }
  };

  const [isCompareState, setIsCompareState] = useState<boolean>(() => {
    if (compareItems.length > 0) {
      return compareItems.some((item: any) => item.id == productData?.id);
    } else if (!compareItems.length && !productData?.in_compare) {
      return false;
    }
  });
  useEffect(() => {
    if (compareItems.length > 0) {
      setIsCompareState(
        compareItems.some((item: any) => item.id == productData?.id)
      );
    } else if (!compareItems.length && !productData?.in_compare) {
      setIsCompareState(false);
    }
  }, [compareItems, productData?.id]);
  // useEffect(() => {
  //   setIsCompareState(productData?.in_compare);
  // }, [productData, productData?.in_compare]);
  const handleCompareToggle = async (id: string): Promise<void> => {
    if (isCompareState) {
      try {
        const { data } = await axiosInstance.delete(`comparisons/${id}`);
        if (data?.status === "success") {
          // await dispatch(getAllComparisonsItems());
          await dispatch(RemoveFromCompare({ id: id }));

          ShowAlertMixin({
            type: 15,
            icon: "success",
            title: data?.message,
          });
          if (refetch) {
            refetch();
          }
          // setIsCompareState(false);
        }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: error?.response?.data?.message,
        });
      }
    } else {
      try {
        const { data } = await axiosInstance.post(`comparisons`, {
          product_id: id,
        });
        if (data?.status === "success") {
          await dispatch(AddToCompare({ id: id }));

          // await dispatch(getAllComparisonsItems());
          ShowAlertMixin({
            type: 15,
            icon: "success",
            title: data?.message,
          });
          // setIsCompareState(true);
          if (refetch) {
            refetch();
          }
        }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: error?.response?.data?.message,
        });
      }
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="col-span-1 bg-white rounded-xl p-3 border border-greynormal relative overflow-hidden "
      key={`offer_${index}`}
    >
      <div className="flex justify-center items-center relative w-full h-[246px] mt-2">
        <LocalePath href={`/products/${productData?.slug}`}>
          <ImageWithFallback
            src={productData?.main?.media}
            width={1790}
            height={900}
            className="w-[169px] h-[170px] object-contain  "
            // className="w-[169px] h-[206px] object-contain  "
            alt="hero"
            // style={{
            //   mixBlendMode: "multiply",
            // }}
          />
        </LocalePath>

        {productData?.stock > 0 && (
          <button
            // disabled={true}
            onClick={() => {
              handleaddToCart(productData);
            }}
            className="absolute bottom-0 end-0 bg-primary text-white w-8 h-8 grid place-items-center rounded-lg cursor-pointer"
          >
            <FaPlus size={20} />
          </button>
        )}
        {productData?.rate > 0 && (
          <div className="absolute top-0 end-0 bg-secprimary text-primary px-3 py-2 rounded-full text-base font-medium flex gap-1 items-center">
            {productData?.rate.toFixed(1)}
            <TiStar size={25} />
          </div>
        )}
        <div className="absolute top-0 start-0  text-2xl font-bold flex gap-3">
          <Heart
            onClick={() => handleFavouriteToggle(productData?.id)}
            color={isFavouriteState ? "#4F008C " : ""}
            className={`border-2 size-10 border-greynormal p-2 rounded-lg cursor-pointer ${
              isFavouriteState ? "bg-secprimary" : ""
            }`}
          />

          <Spinner
            onClick={() => handleCompareToggle(productData?.id)}
            color={isCompareState ? "#4F008C" : ""}
            className={`border-2 size-10 border-greynormal p-2 rounded-lg cursor-pointer ${
              isCompareState ? "bg-secprimary" : ""
            }`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base font-normal   leading-4 text-start text-secondrydark">
          {productData?.brand?.name}
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium  leading-6 text-start text-text  line-clamp-1">
            {productData?.name}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: productData?.description,
            }}
            className="text-base font-normal line-clamp-1 leading-6 text-start text-secondrydark"
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex  gap-2">
          <span className=" font-bold text-lg  leading-5 text-start text-text">
            {productData?.price_after_discount > 0
              ? productData?.price_after_discount
              : productData?.price}{" "}
            {t("Text.SR")}
          </span>
          {productData?.price_after_discount > 0 && (
            <span className="text-base font-bold  leading-5 text-start text-secondrydark line-through">
              {productData?.price} {"  "}
              {t("Text.SR")}
            </span>
          )}
        </div>
      </div>
      <div
        className={`flex justify-between mt-3 ${
          locale === "en" ? "flex-wrap gap-2" : " flex-wrap gap-2"
        }`}
      >
        {productData?.discount && (
          <div className="flex gap-2 items-center bg-secsuccess border-dashed border-2 border-success text-xs font-bold   leading-5 text-start text-success px-2 py-1 rounded-md">
            <GreenDiscountIcon className="size-4" />
            {t("Text.discount", {
              count: `${productData?.discount}`,
              type: `${
                productData?.discount_type == "value" ? `${t("SR")}` : `%`
              }`,
            })}{" "}
          </div>
        )}
        {productData?.stock > 0 && (
          <div className="bg-secprimary flex gap-2 items-center border-dashed  border-2 border-primary text-xs font-bold   leading-5 text-start text-primary px-2 py-1 rounded-md">
            {t("Text.availablePiecescount", {
              count: productData?.stock,
            })}
          </div>
        )}
        {productData?.stock == 0 && (
          <>
            <div className="bg-secprimary border-dashed  border-2 border-primary text-xs font-bold   leading-5 text-start text-primary px-3 py-2 rounded-md">
              {t("validations.all stock is sold")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
