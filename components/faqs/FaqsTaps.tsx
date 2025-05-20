"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  defaultType: string;
};

export default function FaqsTaps({ defaultType }: Props) {
  const t = useTranslations("");
  const [active, setActive] = useState(defaultType);
  const router = useRouter();
  const locale = useLocale();
  const taps = [
    { id: 1, title: "أسئلة عامة", slug: "أسئلة عامة" },
    { id: 2, title: "أسئلة الطلاب", slug: "أسئلة الطلاب" },
    { id: 3, title: "أسئلة المدربين", slug: "أسئلة المدربين" },
    { id: 4, title: "الدفع والمحفظة", slug: "الدفع والمحفظة" },
    {
      id: 5,
      title: "المنتجات الرقمية والكتب",
      slug: "المنتجات الرقمية والكتب",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {taps.map((ele) => {
          return (
            <button
              key={ele?.id}
              className={` cursor-pointer font-medium   leading-6  ${
                active == ele?.slug ? " text-error  " : " text-darkprimary  "
              } text-start  text-sm rounded-xl`}
              onClick={() => {
                setActive(ele?.slug);
                router.replace(
                  `${locale == "ar" ? "" : "/en"}/faqs?filter=${ele?.slug}`,
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
    </>
  );
}
