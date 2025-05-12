/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useTranslations, useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/shared/card/ProductCard";
import { Tabs } from "antd";

type Props = {
  products: any;
  categories: any;
  // pagination: any;
  // currentPage: any;
  defaultType: any;
  refetch: any;
};
export interface tabs {
  id: number;
  title: string;
  slug: string;
}
export default function FavouritsDetails({
  products,
  // pagination,
  defaultType,
  // currentPage,
  categories,
  refetch,
}: Props) {
  // const t = useTranslations();
  const locale = useLocale();
  const [active, setActive] = useState(defaultType || "");
  const router = useRouter();
  // const [filteredItems, setFilteredItems] = useState<any>();
  const tabs: tabs[] = [];
  categories.map((ele: any, index: number) =>
    // tabs.push({
    //   key: ele?.id,
    //   label: `(${ele?.product_count}) ${ele?.title}`,
    //   type: ele?.id,
    // })
    tabs.push({
      id: index,
      title: `(${ele?.product_count}) ${ele?.title}`,
      slug: ele?.id,
    })
  );
  // useEffect(() => {
  //   if (active) {
  //     const filtered = products.filter(
  //       (item: any) => item?.category?.id == active
  //     );
  //     setFilteredItems(filtered);
  //   } else {
  //     setFilteredItems(products);
  //   }
  // }, [active, products, defaultType]);

  return (
    <>
      <section className="py-4">
        <div className="w-full overflow-x-auto whitespace-nowrap mb-8">
          <div className="inline-flex gap-4 px-2 mb-4">
            {tabs.map((ele) => (
              <button
                key={ele.id}
                className={`whitespace-nowrap h-fit font-medium leading-6 ${
                  active == ele.slug
                    ? "text-primary border-2 border-primary"
                    : "text-dark border-2 border-subborder"
                } px-4 py-2 text-sm rounded-xl`}
                onClick={() => {
                  if (active == ele.slug) {
                    setActive("");
                    router.replace(
                      `${locale === "ar" ? "" : "/en"}/favourits?category=`,
                      { scroll: false }
                    );
                  } else {
                    setActive(ele.slug);
                    router.replace(
                      `${locale === "ar" ? "" : "/en"}/favourits?category=${
                        ele.slug
                      }`,
                      { scroll: false }
                    );
                  }
                }}
              >
                {ele?.title}
              </button>
            ))}
          </div>
        </div>

        {products && products?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {products?.map((ele: any, index: number) => {
              return (
                <ProductCard
                  productData={ele}
                  index={index}
                  key={`offer_${index}`}
                  refetch={refetch}
                />
              );
            })}
          </div>
        )}
        {/* {products && products.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={pagination?.per_page}
              totalItems={pagination?.total}
              totalPage={pagination?.last_page}
              currentPage={+currentPage}
              paginate={handlePaggination}
            />
          </div>
        )} */}
      </section>
    </>
  );
}
