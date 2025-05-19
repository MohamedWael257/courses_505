"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React, { useEffect, useState } from "react";
import Image from "@/assets/test.jpg";
import {
  Cart5,
  CertificateIcon,
  ClassesIcon,
  DateIcon2,
  ExamIcon,
  Heart,
  RS,
  SectionIcon,
  TimeIcon,
} from "@/shared/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { AddToFav, RemoveFromFav } from "@/store/favourtis";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { useLocale, useTranslations } from "next-intl";
import { addItem } from "@/store/cartStore.slice";
import { FaPlay } from "react-icons/fa";
import Teleport from "@/shared/Teleport/Teleport";
import AppModal from "@/shared/CustomModal/AppModal";
import PlayVideos from "@/shared/PlayVideos/PlayVideos";
import LocalePath from "@/shared/LocalePath";
import ArrowLeftIcon from "@/assets/icons/ArrowLeft";

type Props = {
  course: any;
};

export default function CourseDetialsCard({ course }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();

  const favItems = useSelector(
    (state: RootState) => state.FavouritsConfig.allFavItems
  );
  const [isFavouriteState, setIsFavouriteState] = useState<boolean>(() => {
    if (favItems.length > 0) {
      return favItems.some((item: any) => item.id == course?.id);
    } else if (!favItems.length && !course?.is_favorite) {
      return false;
    }
  });
  useEffect(() => {
    if (favItems.length > 0) {
      setIsFavouriteState(favItems.some((item: any) => item.id == course?.id));
    } else if (!favItems.length && !course?.is_favorite) {
      setIsFavouriteState(false);
    }
  }, [favItems, course?.id]);

  const handleFavouriteToggle = async (id: string): Promise<void> => {
    if (isFavouriteState) {
      try {
        // const { course } = await axiosInstance.delete(`favorites/${id}`);
        // if (course?.status === "success") {
        // await dispatch(getAllFavItems());
        dispatch(RemoveFromFav({ id: id }));

        //   ShowAlertMixin({
        //     type: 15,
        //     icon: "success",
        //     title: course?.message,
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
          title: error?.response?.course?.message,
        });
      }
    } else {
      try {
        // const { course } = await axiosInstance.post(`favorites`, {
        //   product_id: id,
        // });
        // if (course?.status === "success") {
        // await dispatch(getAllFavItems());
        dispatch(AddToFav({ id: id }));
        //   ShowAlertMixin({
        //     type: 15,
        //     icon: "success",
        //     title: course?.message,
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
          title: error?.response?.course?.message,
        });
      }
    }
  };
  const handleaddToCart = async (course: any) => {
    try {
      setAddToCartLoading(true);
      // const formcourse = new Formcourse();
      // formcourse.append("quantity", values?.quantity);
      // formcourse.append("book_detail_id", selectedbookId);
      // const response = await axiosInstance.post("/cart", formcourse);

      dispatch(
        addItem({
          id: course?.id,
          product: course,
          quantity: 1,
        })
      );
      // dispatch(getAllCartItems());
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: "success",
      });
    } catch (err: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: err?.response?.course?.message ?? "Failed to add item to cart",
      });
      console.log(err);
    } finally {
      setAddToCartLoading(false);
    }
  };
  return (
    <>
      <div className="container space-y-4 bg-white  xl:w-[450px] w-[350px] h-fit p-4 rounded-2xl border border-greynormal lg:absolute lg:top-12 xl:end-[225px] end-[50px]  z-50">
        <div className="relative">
          <ImageWithFallback
            src={Image}
            width={1790}
            height={900}
            className="w-full h-[250px] object-cover rounded-xl"
            alt="hero"
          />
          <div
            onClick={() => setOpenModal(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-primary p-4 rounded-full"
          >
            <FaPlay className=" cursor-pointer  " />
          </div>
        </div>
        <div className="flex  gap-2 ">
          <span className="flex items-center font-bold text-lg  leading-5 text-start text-primary">
            500
            <RS />
          </span>
          <span className="flex items-center text-base font-bold  leading-5 text-start text-secondrydark line-through">
            500
            <RS className="*:fill-secondrydark" />
          </span>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center gap-2">
            <SectionIcon />
            <p className="text-sm font-normal leading-8 text-start text-secondrytext">
              المهارات المهنية والأعمال
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TimeIcon />
            <p className="text-sm font-normal leading-8 text-start text-secondrytext">
              المدة 3 شهور
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClassesIcon />
            <p className="text-sm font-normal leading-8 text-start text-secondrytext">
              5 فصول{" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ExamIcon />
            <p className="text-sm font-normal leading-8 text-start text-secondrytext">
              6 إختبارات{" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CertificateIcon />
            <p className="text-sm font-normal leading-8 text-start text-secondrytext">
              شهاده إتمام{" "}
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center  gap-5">
          {course?.in_role ? (
            <LocalePath
              href={`/profile/courses/${course?.id}`}
              className="text-base flex items-center gap-2 font-normal leading-5 w-full bg-white text-primary  hover:bg-primary  hover:text-white border border-primary p-4 px-8 rounded-full transition-colors"
            >
              اذهب إلي الدورة
              <ArrowLeftIcon
                className={` ${locale === "ar" ? "" : "rotate-180"}`}
              />
            </LocalePath>
          ) : (
            <CustomBtn
              onClick={() => {
                handleaddToCart(course);
              }}
              title={t("BUTTONS.Add to cart")}
              buttonType="button"
              loader={addToCartLoading}
              disabled={addToCartLoading}
              button
              className=" !w-full !h-[56px] !rounded-full  !mt-[20px] !font-medium text-sm"
              rightIcon={<Cart5 className="size-6" />}
            />
          )}
          <button
            type="button"
            className={`${
              isFavouriteState ? "bg-secprimary" : "bg-greynormal"
            } custom-box-shadow-3 w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center p-2`}
            onClick={() => handleFavouriteToggle(course?.id)}
            disabled={addToCartLoading}
          >
            <Heart
              className={`size-6`}
              color={isFavouriteState ? "#4f008c" : ""}
            />
          </button>
        </div>
        <button
          type="button"
          className="text-base  font-normal leading-5 w-full bg-white text-primary  hover:bg-primary  hover:text-white border border-primary p-4 px-8 rounded-full transition-colors"
          onClick={() => {
            handleaddToCart(course);
          }}
          disabled={addToCartLoading}
        >
          شراء الآن
        </button>
        <div className="w-full bg-secsuccess  grid justify-center gap-2 p-4 rounded-2xl">
          <p className="text-sm font-medium leading-6 text-center text-darksuccess/70">
            يبدأ من
          </p>
          <p className="text-sm font-medium leading-6 text-center flex gap-2 text-darksuccess">
            <DateIcon2 />
            20 مارس 2024
          </p>
        </div>
      </div>
      {openModal && (
        <Teleport to="body">
          <AppModal
            onCancel={() => setOpenModal(false)}
            isModalVisible={openModal}
            centered
          >
            <PlayVideos src={course?.video_url} />
          </AppModal>
        </Teleport>
      )}
    </>
  );
}
