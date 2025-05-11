"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion as SharedAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { useTranslations } from "next-intl";
import { InputNumber, Slider } from "antd";
import { Checkbox } from "@/shared/ui/checkbox";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
type Category = {
  id: number;
  slug: string;
  name: string;
  count: number;
};

type Props = {
  sectionsData?: any;
  levelsData?: any;
  typesData?: any;
  trainersData?: any;
  typesParams?: any;
  sectionsParams?: any;
  levelsParams?: any;
  trainersParams?: any;
  minPriceParams?: any;
  minPriceData?: any;
  maxPriceParams?: any;
  maxPriceData?: any;
  rateParams?: any;
  rateData?: any;
  // slug?: any;
};

export default function OffersFilter({
  sectionsData,
  levelsData,
  typesData,
  trainersData,
  typesParams,
  sectionsParams,
  levelsParams,
  trainersParams,
  minPriceParams,
  minPriceData,
  maxPriceParams,
  maxPriceData,
  rateParams,
  rateData,
}: // slug,
Props) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("");
  const levels: Category[] = [];
  levelsData?.map((ele: any) =>
    levels?.push({
      id: ele?.id,
      slug: ele?.id,
      name: ele?.title,
      count: ele?.product_count,
    })
  );

  const types: Category[] = [];
  typesData?.map((ele: any) =>
    types?.push({
      id: ele?.id,
      slug: ele?.id,
      name: ele?.name,
      count: ele?.product_count,
    })
  );
  const sections: Category[] = [];
  sectionsData?.map((ele: any) =>
    sections?.push({
      id: ele?.id,
      slug: ele?.id,
      name: ele?.name,
      count: ele?.product_count,
    })
  );
  const trainers: Category[] = [];
  trainersData?.map((ele: any) =>
    trainers?.push({
      id: ele?.id,
      slug: ele?.id,
      name: ele?.name,
      count: ele?.product_count,
    })
  );
  const [selectedlevels, setSelectedlevels] = useState<string[]>(() => {
    if (!sectionsParams) return [];
    return Array.isArray(sectionsParams)
      ? sectionsParams.map(Number)
      : sectionsParams.split(",").filter(Boolean).map(Number);
  });

  const [selectedtypes, setSelectedtypes] = useState<string[]>(() => {
    if (!levelsParams) return [];
    return Array.isArray(levelsParams)
      ? levelsParams.map(Number)
      : levelsParams.split(",").filter(Boolean).map(Number);
  });

  const [selectedsections, setSelectedsections] = useState<string[]>(() => {
    if (!levelsParams) return [];
    return Array.isArray(levelsParams)
      ? levelsParams.map(Number)
      : levelsParams.split(",").filter(Boolean).map(Number);
  });
  const [selectedtrainers, setSelectedtrainers] = useState<string[]>(() => {
    if (!levelsParams) return [];
    return Array.isArray(levelsParams)
      ? levelsParams.map(Number)
      : levelsParams.split(",").filter(Boolean).map(Number);
  });

  const [minValue, setMinValue] = useState<number>(
    minPriceParams || minPriceData || 1
  );
  const [maxValue, setMaxValue] = useState<number>(
    maxPriceParams || maxPriceData || 1000
  );
  const [rate, setRate] = useState<number>(Number(rateParams) || 1);

  const minRate = 1;
  const maxRate = 5;

  const updateURLParams = (params: { [key: string]: string | null }) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
      newSearchParams.delete("page");
    });
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });

    // window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const handleApplyPriceFilter = () => {
    updateURLParams({
      minPrice: minValue.toString(),
      maxPrice: maxValue.toString(),
    });
  };

  const handleApplyRateFilter = (newRate: number) => {
    updateURLParams({
      rating: newRate.toString(),
    });
  };

  const toggleSelection = (
    slug: string,
    selectedList: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    type: string
  ) => {
    let newSelectedList: string[];

    // if (slug === "all") {
    //   newSelectedList = selectedList.includes("all") ? [] : ["all"];
    // } else {
    //   if (selectedList.includes("all")) {
    //     newSelectedList = [slug];
    //   }
    // else {
    newSelectedList = selectedList.includes(slug)
      ? selectedList.filter((item) => item !== slug)
      : [...selectedList, slug];
    // }
    // }
    const newSearchParams = new URLSearchParams(window.location.search);

    setSelected(newSelectedList);

    if (newSelectedList.length > 0) {
      newSearchParams.set(type, newSelectedList.join(","));
    } else {
      newSearchParams.delete(type);
    }
    newSearchParams.delete("page");
    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });

    // window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const resetFilters = () => {
    setMinValue(minPriceData);
    setMaxValue(maxPriceData);
    setSelectedlevels([]);
    setSelectedtypes([]);
    setSelectedtrainers([]);
    setSelectedsections([]);

    setRate(1);

    updateURLParams({
      minPrice: null,
      maxPrice: null,
      levels: null,
      types: null,
      sections: null,
      trainers: null,
      rating: null,
      page: null,
    });
  };

  const renderFilterSection = (
    items: Category[],
    selectedItems: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    type: string,
    title: string
  ) => (
    <>
      <SharedAccordion type="single" collapsible>
        <AccordionItem
          value={title}
          className="bg-transparent w-full border-none px-2 rounded-lg transition-[2s_height]"
        >
          <AccordionTrigger
            iconColor="#000000"
            iconWidth="6"
            className="text-lg font-medium   leading-7 text-start text-text"
          >
            {title}
          </AccordionTrigger>
          {items.map((item) => (
            <AccordionContent key={item.slug}>
              <div
                className="flex justify-between items-center"
                onClick={() =>
                  toggleSelection(item.slug, selectedItems, setSelected, type)
                }
              >
                <div className="flex items-center cursor-pointer">
                  <Checkbox
                    checked={selectedItems.includes(item.slug)}
                    onCheckedChange={() =>
                      toggleSelection(
                        item.slug,
                        selectedItems,
                        setSelected,
                        type
                      )
                    }
                  />
                  <span className="ms-2">{item.name}</span>
                </div>
                <p>({item.count})</p>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </SharedAccordion>
      <div className="line bg-greynormal w-full h-0.5 my-3"></div>
    </>
  );

  return (
    <div
      data-aos="fade-left"
      className="p-4 rounded-xl bg-greynormal border border-secondrydark 2xl:col-span-1 xl:col-span-1 h-fit"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium   leading-7 text-start text-darkprimary">
          {t("Text.filter")}
        </h2>
        <button
          onClick={resetFilters}
          className="bg-primary py-2 px-4 rounded-full text-white text-sm font-medium text-center  leading-4"
        >
          {t("BUTTONS.reset")}
        </button>
      </div>
      <div className="line bg-greynormal w-full h-0.5 my-3"></div>
      {sections?.length > 0 &&
        renderFilterSection(
          sections,
          selectedsections,
          setSelectedsections,
          "sections",
          t("Text.sections")
        )}
      {levels?.length > 0 &&
        renderFilterSection(
          levels,
          selectedlevels,
          setSelectedlevels,
          "levels",
          t("Text.levels")
        )}
      {types?.length > 0 &&
        renderFilterSection(
          types,
          selectedtypes,
          setSelectedtypes,
          "types",
          t("Text.types")
        )}{" "}
      {trainers?.length > 0 &&
        renderFilterSection(
          trainers,
          selectedtrainers,
          setSelectedtrainers,
          "trainers",
          t("Text.trainers")
        )}
      {/* {minPriceData > 0 && maxPriceData > 0 && ( */}
      <SharedAccordion type="single" collapsible>
        <AccordionItem
          value={t("Text.price")}
          className="bg-transparent w-full border-none px-2 rounded-lg transition-[2s_height]"
        >
          <AccordionTrigger
            iconColor="#000000"
            iconWidth="6"
            className="text-lg font-medium   leading-7 text-start text-text"
          >
            {t("Text.price")}
          </AccordionTrigger>
          <AccordionContent>
            <Slider
              min={1}
              max={1000}
              range
              value={[minValue, maxValue]}
              onChange={(value) => {
                setMinValue(value[0]);
                setMaxValue(value[1]);
                // handleApplyPriceFilter();
              }}
              onChangeComplete={(value) => {
                setMinValue(value[0]);
                setMaxValue(value[1]);
                handleApplyPriceFilter();
              }}
              tooltip={{ open: false }}
            />
            <div className="flex item-center mt-4 gap-3">
              <div>
                <p className="text-text text-base ms-2 mb-1 inline-block   leading-6 text-start font-medium">
                  {t("Text.from")}
                </p>
                <InputNumber
                  min={1}
                  max={1000}
                  value={minValue}
                  controls={false}
                  onChange={(value) => {
                    if (value) {
                      setMinValue(value);
                      handleApplyPriceFilter();
                    }
                  }}
                  suffix={t("Text.SR")}
                  className="no-arrows !border-[#EEEEEE] bg-white text-secondrytext !rounded-xl !w-full"
                />
              </div>

              <div>
                <p className="text-text text-base ms-2 mb-1 inline-block   leading-6 text-start font-medium">
                  {t("Text.to")}
                </p>
                {/* <div className="border border-greynormal  p-2 rounded-lg flex justify-between items-center"> */}
                <InputNumber
                  min={minPriceData}
                  max={maxPriceData}
                  value={maxValue}
                  controls={false}
                  onChange={(value) => {
                    if (value) {
                      setMaxValue(value);
                      handleApplyPriceFilter();
                    }
                  }}
                  suffix={t("Text.SR")}
                  className="no-arrows !border-[#EEEEEE] bg-white !text-secondrytext !rounded-xl !w-full"
                />
                {/* </div> */}
              </div>

              {/* <button onClick={handleApplyPriceFilter} className="app-btn">
                {t("BUTTONS.apply")}
              </button> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </SharedAccordion>
      {/* )} */}
      {/* {renderFilterSection(
        colors,
        selectedColors,
        setSelectedColors,
        "colors",
        t("Text.colors")
      )} */}
      {rateData > 0 && (
        <SharedAccordion type="single" collapsible>
          <AccordionItem
            value={t("Text.rating")}
            className="bg-transparent w-full border-none px-2 rounded-lg transition-[2s_height]"
          >
            <AccordionTrigger
              iconColor="#000000"
              iconWidth="6"
              className="text-lg font-medium   leading-7 text-start text-text"
            >
              {t("Text.rating")}
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="rating-slider-container"
                style={{ width: "100%" }}
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span style={{ fontSize: "14px", color: "#FFA500" }}>
                    {rate} {t("Text.stars")}
                  </span>
                  <p>({rateData})</p>
                </div>
                <Slider
                  min={minRate}
                  max={maxRate}
                  step={0.5}
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                    handleApplyRateFilter(rate);
                  }}
                  tooltip={{ open: false }}
                />
                <div className="flex justify-between mt-2.5">
                  <span className="text-xs text-[#666]">
                    {minRate} {t("Text.stars")}
                  </span>
                  <span className="text-xs text-[#666]">
                    {maxRate} {t("Text.stars")}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </SharedAccordion>
      )}
    </div>
  );
}
