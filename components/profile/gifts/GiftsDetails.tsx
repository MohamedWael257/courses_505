"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useTranslations, useLocale } from "next-intl";
import { UseMutate } from "@/utils/hooks/useMutate";

import GiftCard from "@/shared/card/GiftCard";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstance from "@/utils/axiosClient";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/auth.slice";
import Success from "@/assets/images/success2.gif";
import { ScrollArea } from "@/shared/ui/scroll-area";
import AppPagination from "@/shared/Pagination/AppPagination";

type Props = {
  gifts: any;
  refetch: any;
  current_page: any;
  paggination: any;
};

export default function GiftsDetails({
  gifts,
  refetch,
  paggination,
  current_page,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const UpdateProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");

      dispatch(updateUser(response.data.data));
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
    }
  };
  const { mutate: UseGiftMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "gifts/buy",
    onSuccess: (responseData) => {
      UpdateProfile();
      Swal.fire({
        title: t("Text.giftsDetailsSuccessTitle"),
        text: t("Text.giftsDetailsSuccessDesc"),
        showConfirmButton: false, // Hide confirm button
        imageUrl: `${Success.src}`,
        footer: `<p id="swal2-footer"> ${t("Text.goToMycoupons")} </p>`,
        customClass: {
          popup: "custom-popup-class",
          title: "custom-title-class",
          footer: "custom-footer-class",
        },
        padding: "1rem",
        didOpen: () => {
          // Get the footer link element
          const footerLink = document.getElementById("swal2-footer");

          if (footerLink) {
            footerLink.addEventListener("click", () => {
              setTimeout(() => {
                Swal.close(); // Hide the alert when clicking the footer
              }, 500);
              setTimeout(() => {
                router.push(`${locale == "ar" ? "" : "/en"}/profile/coupons`); // Redirect user
              }, 800);
            });
          }
        },
      });
      refetch();
    },

    onError: (error: any) => {
      // @ts-ignore
      const errorMessage = error?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    },
  });
  const handelUse = async (gift_id: string) => {
    const finalOut = {
      gift_id: gift_id,
    };
    UseGiftMutate({ ...finalOut });
  };

  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateURLParams = (params: { [key: string]: string | null }) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };
  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage });
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };
  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-2">
          {t("Text.giftsDetailsTitle")}
        </h2>
        <ScrollArea
          ref={containerRef}
          className="grow "
          dir={locale === "en" ? "ltr" : "rtl"}
        >
          <div className={`h-[340px] flex flex-col pe-2`}>
            {gifts.map((gift: any, index: number) => (
              <GiftCard
                LoadingComplete={LoadingComplete}
                handelUse={() => {
                  handelUse(gift?.id);
                }}
                gift={gift}
                index={index}
                key={index}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      {gifts && gifts.length > 0 && (
        <div className="py-8">
          <AppPagination
            itemsPerPage={paggination?.per_page}
            totalItems={paggination?.total}
            totalPage={paggination?.last_page}
            currentPage={+current_page}
            paginate={handlePaggination}
          />
        </div>
      )}
    </>
  );
}
