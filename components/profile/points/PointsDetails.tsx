"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoProjectSymlink } from "react-icons/go";
import { useLocale, useTranslations } from "next-intl";
import { FaildWallet, SuccessWallet } from "@/shared/Icons";
import { ScrollArea } from "@/shared/ui/scroll-area";
type Props = {
  transactions: any;
  defaultType: any;
};

export default function PointsDetails({ transactions, defaultType }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const taps = [
    { id: 1, title: t("Text.deposit_points"), slug: "deposit" },
    { id: 2, title: t("Text.withdrawal_points"), slug: "withdrawal" },
  ];
  const [active, setActive] = useState(defaultType || "deposit");
  const Router = useRouter();

  return (
    <>
      <div className="buttons mb-8 w-full grid lg:grid-cols-2 gap-3">
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
                Router.replace(
                  `${locale == "ar" ? "" : "/en"}/profile/points?type=${
                    ele?.slug
                  }`,
                  {
                    scroll: false,
                  }
                );
              }}
            >
              {ele?.title}
            </button>
          );
        })}
      </div>
      <div className="p-4 bg-white rounded-lg shadow h">
        <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
          <div className={`h-[340px] flex flex-col pe-2`}>
            {transactions.map((transaction: any, index: number) => (
              <div
                // data-aos="fade-up"
                //data-aos-duration={`${index * 30}`}
                key={index}
                className={`flex items-center justify-between p-4 mb-2 border-dotted border-b border-b-greynormal  `}
              >
                <div className="flex gap-3 items-center">
                  <button
                    className={`p-3 bg-secsuccess rounded-full ${
                      transaction.type == "deposit"
                        ? "bg-secsuccess text-success"
                        : "bg-[rgba(239,35,59,0.27)] text-error"
                    }`}
                  >
                    {transaction.type == "deposit" ? (
                      <SuccessWallet className="size-7" />
                    ) : (
                      <FaildWallet className="size-7" />
                    )}
                  </button>
                  <div className="text-start">
                    <p className="text-lg text-darkprimary font-semibold   leading-7">
                      {transaction.title}
                    </p>
                    <p className="text-base  text-darkprimary font-normal   leading-5">
                      {transaction.created_at}
                    </p>
                  </div>
                </div>
                <span className={`text-base font-bold   leading-3 `}>
                  {transaction.type == "deposit" ? (
                    <>
                      {" + "} {t("Text.point", { count: transaction.amount })}
                    </>
                  ) : (
                    <>
                      {" - "} {t("Text.point", { count: transaction.amount })}
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
