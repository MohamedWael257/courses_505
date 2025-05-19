"use client";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { TbArrowNarrowLeft } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { TiStar } from "react-icons/ti";
import { UseFormSetValue, useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form";
import { useLocale, useTranslations } from "next-intl";
import { CgFormatSlash } from "react-icons/cg";

import { usePathname, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AddToFav, RemoveFromFav } from "@/store/favourtis";
import { AppDispatch, RootState } from "@/store/store";
import { addItem } from "@/store/cartStore.slice";
import { Cart5, Heart, RS, Share, Spinner } from "@/shared/Icons";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import QuantityControl from "./components/QuantityControl";
import AppBreadCrumbs from "@/shared/Breadcrumbs/AppBreadCrumbs";

interface MyFormValues {
  quantity: number;
}

export default function BooksDetails({ book }: { book: any }) {
  const pathname = usePathname();
  const t = useTranslations("");
  const [active, setActive] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const router = useRouter();
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const [isDialogShareOpen, setIsDialogShareOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { productCount, totalPrice } = useSelector(
    (state: RootState) => state.CartConfig
  );
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
      return favItems.some((item: any) => item.id == book?.id);
    } else if (!favItems.length && !book?.is_favorite) {
      return false;
    }
  });
  useEffect(() => {
    if (favItems.length > 0) {
      setIsFavouriteState(favItems.some((item: any) => item.id == book?.id));
    } else if (!favItems.length && !book?.is_favorite) {
      setIsFavouriteState(false);
    }
  }, [favItems, book?.id]);
  const handleFavouriteToggle = async (id: string): Promise<void> => {
    if (isFavouriteState) {
      try {
        // const { data } = await axiosInstance.delete(`favorites/${id}`);
        // if (data?.status === "success") {
        // await dispatch(getAllFavItems());
        await dispatch(RemoveFromFav({ id: id }));

        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: "success",
        });
        // setIsFavouriteState(false);
        // }
      } catch (error: any) {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: error?.response?.data?.message,
        });
      }
    } else {
      try {
        // const { data } = await axiosInstance.post(`favorites`, {
        //   book_id: id,
        // });
        // if (data?.status === "success") {
        // await dispatch(getAllFavItems());
        await dispatch(AddToFav({ id: id }));

        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: "success",
        });
        // setIsFavouriteState(true);
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

  const [selectedbookId, setSelectedbookId] = useState(
    book?.default_detail ?? ""
  );
  const [price, setPrice] = useState(book?.price ?? 500);

  const [price_after_discount, setPrice_after_discount] = useState(
    book?.price_after_discount ?? 500
  );
  const [discount_percentage, setDiscount_percentage] = useState(
    book?.discount ?? ""
  );
  const [discount_Type, setDiscount_Type] = useState(book?.discount_type ?? "");
  const [rate, setRate] = useState(book?.rate.toFixed(1) ?? 5);
  const [count, setCount] = useState(book?.stock || 10);
  const [initialCount, setInitialCount] = useState(1);

  const form = useForm<MyFormValues>({
    defaultValues: {
      quantity: 1,
    },
  });
  const { setValue }: { setValue: UseFormSetValue<any> } = form;

  async function onSubmit(values: any) {
    try {
      setAddToCartLoading(true);
      // const formData = new FormData();
      // formData.append("quantity", values?.quantity);
      // formData.append("book_detail_id", selectedbookId);
      // const response = await axiosInstance.post("/cart", formData);

      // dispatch(
      //   addItem({
      //     id: selectedbookId,
      //     product: book,
      //     quantity: values?.quantity,
      //   })
      // );
      // dispatch(getAllCartItems());
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: "success",
      });
      setTimeout(() => {
        form.reset();
        setInitialCount(1);
      }, 300);
      // setActiveSizeQuantity(0);
    } catch (err: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: err?.response?.data?.message ?? "Failed to add item to cart",
      });
      console.log(err);
    } finally {
      setAddToCartLoading(false);
    }
  }
  const paths = [
    { name: "الكتب والقوالب", href: "/" },
    { name: "الوحش الذي يسكن بداخلك" },
  ];

  return (
    <div
    // data-aos="fade-left"
    >
      <AppBreadCrumbs
        icon
        // TranslateTitle
        stopTranslate
        paths={paths}
      />
      {/* Title and Desc  */}
      <div className="flex flex-col gap-3 my-3">
        <p className="text-darkprimary text-3xl text-start font-semibold leading-[45px]">
          الوحش الذي يسكنك يمكن أن يكون لطيفاً
        </p>
        <div className="font-normal text-secondrydark leading-6 ">
          <p className={`${active ? "line-clamp-none" : "line-clamp-3"}`}>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق...
          </p>
          {active ? (
            <button
              className="text-primary underline"
              onClick={() => setActive(true)}
            >
              قراءة الاقل
            </button>
          ) : (
            <button
              className="text-primary underline"
              onClick={() => setActive(false)}
            >
              قراءة المزيد
            </button>
          )}
          {/* {book?.description} */}
        </div>
      </div>

      {/* Rates  */}
      <div className="mt-6 flex gap-2 items-center">
        <TiStar color="#FF8861" size={25} />
        <div className="   text-lg font-semibold flex gap-1 items-center">
          {rate.toFixed(1)}
          <span className="text-secondrydark">(30)</span>
        </div>
      </div>

      {/*  Price */}
      <div className="flex flex-col gap-2 my-4">
        <div className="flex  gap-2">
          <span
            className={`flex items-center font-bold text-lg    leading-5 text-start text-primary`}
          >
            {price_after_discount > 0 ? price_after_discount : price} <RS />
          </span>
          {price_after_discount > 0 && (
            <span className="flex items-center text-base font-bold   leading-5 text-start text-secondrydark line-through">
              {price} <RS className="*:fill-secondrydark" />
            </span>
          )}
        </div>
      </div>

      {/*  Features */}
      <div className="mt-4">
        <span className="text-secondrytext me-3 text-xl text-start font-semibold   leading-8">
          التصنيف:
        </span>
        <span>روايات</span>
      </div>
      {/*  Type */}

      <div className="mt-4">
        <span className="text-secondrytext me-3 text-xl text-start font-semibold   leading-8">
          النوع:
        </span>
        <span>كتاب ورقي</span>
      </div>
      {/* Add and Delete BUtton  */}
      {/* {count > 0 && ( */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          {/* Control */}
          <div className="mt-8 flex items-center  gap-5">
            <QuantityControl
              label={"Quantity"}
              count={count}
              initialCount={initialCount}
              setInitialCount={setInitialCount}
              setCount={setCount}
              setValue={setValue}
              className="!w-full flex justify-between sm:!w-max !rounded-full !border-primary"
            />

            <CustomBtn
              button
              title={t("BUTTONS.Add to cart")}
              className="!w-full !h-[56px] !rounded-full"
              disabled={addToCartLoading}
              loader={addToCartLoading}
              rightIcon={<Cart5 className="size-6" />}
            />
            <button
              type="button"
              className={`${
                isFavouriteState ? "bg-secprimary" : "bg-greynormal"
              } custom-box-shadow-3 w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center p-2`}
              onClick={() => handleFavouriteToggle(book?.id)}
              disabled={addLoading || removeLoading}
            >
              <Heart
                className={` size-6 bg-greynormadl roundded-xl pd-3`}
                color={isFavouriteState ? "#4f008c  " : ""}
              />
            </button>
          </div>
        </form>
      </Form>
      {/* )} */}
    </div>
  );
}
