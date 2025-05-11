"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoProjectSymlink } from "react-icons/go";
import { useLocale, useTranslations } from "next-intl";
import EmptyWallet from "./EmptyWallet";
import { FaildWallet, SuccessWallet } from "@/shared/Icons";
import { ScrollArea } from "@/shared/ui/scroll-area";

type Props = {
  transactions: any;
  defaultType: any;
  refetch: any;
};

export default function WalletDetails({
  transactions,
  defaultType,
  refetch,
}: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const taps = [
    { id: 1, title: t("Text.deposit_wallet"), slug: "deposit" },
    { id: 2, title: t("Text.withdrawal_wallet"), slug: "withdrawal" },
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
                  : " text-dark border-2 border-subborder "
              }  px-6 py-4 text-sm rounded-xl`}
              onClick={() => {
                setActive(ele?.slug);
                Router.replace(
                  `${locale == "ar" ? "" : "/en"}/profile/wallet?type=${
                    ele?.slug
                  }`,
                  {
                    scroll: false,
                  }
                );
                //  refetch();
              }}
            >
              {ele?.title}
            </button>
          );
        })}
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        {transactions?.length > 0 ? (
          <>
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
                        <p className="text-lg text-text font-medium   leading-7">
                          {transaction.amount}
                        </p>
                        <p className="text-base  text-text font-normal   leading-5">
                          {transaction.created_at}
                        </p>
                      </div>
                    </div>
                    {/* <span
                    className={`px-5 py-3 rounded-2xl text-base ${
                      transaction.type == "deposit"
                        ? "bg-secsuccess text-success"
                        : "bg-[rgba(239,35,59,0.27)] text-error"
                    }`}
                  >
                    {transaction.status}
                  </span> */}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <EmptyWallet />
        )}
      </div>
    </>
  );
}
