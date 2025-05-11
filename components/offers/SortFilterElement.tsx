"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox, Dropdown, MenuProps } from "antd";
import { useTranslations } from "next-intl";
import { ArrowUpIcon } from "@/shared/Icons";

const SortFilterElement = () => {
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const sortData: { key: string; value: string }[] = [
    { key: "name_asc", value: t("Sort.name_asc") },
    { key: "name_desc", value: t("Sort.name_desc") },
    { key: "price_asc", value: t("Sort.price_asc") },
    { key: "price_desc", value: t("Sort.price_desc") },
    { key: "most_sold", value: t("Sort.most_sold") },
    { key: "newest", value: t("Sort.newest") },
  ];
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  const handleSortChange = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (selectedSort === key) {
      newSearchParams.delete("sort");
      setSelectedSort(null);
    } else {
      newSearchParams.set("sort", key);
      setSelectedSort(key);
    }
    newSearchParams.set("page", "1");

    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });

    // router.push(`?${newSearchParams.toString()}`);
  };

  const items: MenuProps["items"] = sortData.map(({ key, value }) => ({
    key,
    label: (
      <Checkbox
        checked={selectedSort === key}
        onChange={() => handleSortChange(key)}
        className="sort-checkbox"
      >
        {value}
      </Checkbox>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="cursor-pointer flex items-center justify-between px-4 text-sm font-medium py-3 min-w-[192px] text-secondrydark bg-white border border-[#eeee] rounded-full">
        {selectedSort ? t(`Sort.${selectedSort}`) : t("Text.sort_by")}
        <ArrowUpIcon className="rotate-180 text-secondrydark" />
      </div>
    </Dropdown>
  );
};

export default SortFilterElement;
