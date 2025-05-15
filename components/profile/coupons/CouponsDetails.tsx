"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyCoupons from "./EmptyCoupons";
import { useTranslations, useLocale } from "next-intl";
import CouponCard from "@/shared/card/CouponCard";
import { ScrollArea } from "@/shared/ui/scroll-area";
type Props = {
  coupons: any;
  defaultType: any;
  refetch: any;
  // loading: boolean;
};
export default function CouponsDetails({
  coupons,
  defaultType,
  refetch,
}: // loading,
Props) {
  const t = useTranslations("");
  const taps = [
    { id: 1, title: t("Text.is_not_used"), slug: "" },
    { id: 1, title: t("Text.is_used"), slug: "is_used" },
    { id: 1, title: t("Text.expired"), slug: "expired" },
  ];
  const [active, setActive] = useState(defaultType || "");
  const router = useRouter();
  const locale = useLocale();
  return (
    <>
      <div className="p-4 rounded-xl bg-white">
        <div className="buttons mb-8 w-full grid lg:grid-cols-3 gap-3">
          {taps.map((ele) => {
            return (
              <button
                key={ele?.id}
                className={` h-fit mt-3 font-medium   leading-6 grid place-content-center  bg-white ${
                  active == ele?.slug
                    ? " text-primary border-2 border-primary "
                    : " text-darkprimary border-2 border-subborder "
                }  px-6 py-4 text-sm rounded-xl`}
                onClick={() => {
                  setActive(ele?.slug);
                  router.replace(
                    `${locale == "ar" ? "" : "/en"}/profile/coupons?filter=${
                      ele?.slug
                    }`,
                    {
                      scroll: false,
                    }
                  );
                  refetch();
                }}
              >
                {ele?.title}
              </button>
            );
          })}
        </div>
        {/* {loading ? (
          <div className="flex justify-center items-center min-h-[560px]">
            <LoaderWarper />
          </div>
        ) : (
          <> */}
        {coupons.length > 0 ? (
          <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
            <div className={`h-[560px] flex flex-col pe-2`}>
              <div className="p-4 bg-white rounded-lg shadow grid gap-4">
                {coupons.map((coupon: any, index: number) => (
                  <CouponCard
                    type={active}
                    key={index}
                    index={index}
                    coupon={coupon}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <EmptyCoupons />
        )}
        {/* </>
        )} */}
      </div>
    </>
  );
}
