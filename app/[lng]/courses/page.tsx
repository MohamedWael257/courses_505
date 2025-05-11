import OffersFilter from "@/components/offers/OffersFilter";
import React from "react";
import OffersProductDetails from "@/components/offers/OffersProductDetails";
import CoursesTop from "@/components/courses/CoursesTop";
import CustomCard from "@/shared/card/CustomCard";

interface Props {
  searchParams: {
    levels?: string[] | string;
    types?: string[] | string;
    sections?: string[] | string;
    trainers?: string[] | string;
    rating?: string;
    minPrice?: number;
    maxPrice?: number;
    keywrod?: string;
    sort?: string;
    page?: string;
  };
}
export default function pages({ searchParams }: Props) {
  const levels = searchParams?.levels || [];
  const types = searchParams?.types || [];
  const sections = searchParams?.sections || [];
  const trainers = searchParams?.trainers || [];
  const page = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 0;
  const rating = Number(searchParams?.rating) || 0;
  const sort = searchParams?.sort || "";
  const keywrod = searchParams?.keywrod || "";

  return (
    <div className="overflow-hidden">
      <CustomCard
        title="طور مستقبلك خطوة بخطوة"
        description={`
        ابدأ رحلة تعلّم احترافية مع دورات مصممة لمواكبة سوق العمل، وتقدَّم
            بثقة نحو أهدافك.
        `}
        showIcons
      />
      <div
        className={`py-6 container grid xl:grid-cols-4 lg:grid-cols-2 gap-6`}
      >
        <OffersFilter
          levelsData={[]}
          levelsParams={levels}
          typesData={[]}
          typesParams={types}
          sectionsData={[]}
          sectionsParams={sections}
          trainersData={[]}
          trainersParams={trainers}
          minPriceParams={minPrice}
          maxPriceParams={maxPrice}
          minPriceData={""}
          maxPriceData={""}
          rateParams={rating}
          rateData={""}
        />
        <div data-aos="fade-right" className={`xl:col-span-3`}>
          <CoursesTop data={[]} />
          <OffersProductDetails
            data={[]}
            paggination={{}}
            current_page={page}
            type="course"
          />
        </div>
      </div>
    </div>
  );
}
