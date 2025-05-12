import OffersFilter from "@/components/offers/OffersFilter";
import React from "react";
import OffersProductDetails from "@/components/offers/OffersProductDetails";
import CoursesTop from "@/components/courses/CoursesTop";
import CustomCard from "@/shared/card/CustomCard";
import CoursesRequest from "@/components/courses/CoursesRequest";
import Subscription from "@/components/Subscription";

interface Props {
  searchParams: {
    types?: string[] | string;
    sections?: string[] | string;
    rating?: string;
    minPrice?: number;
    maxPrice?: number;
    keywrod?: string;
    sort?: string;
    page?: string;
  };
}
export default function pages({ searchParams }: Props) {
  const types = searchParams?.types || [];
  const sections = searchParams?.sections || [];
  const page = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 0;
  const rating = Number(searchParams?.rating) || 0;
  const sort = searchParams?.sort || "";
  const keywrod = searchParams?.keywrod || "";

  return (
    <div className="overflow-hidden">
      <CustomCard
        title=" كتب صنعت لتضيف إليك"
        description={`
         ليس مجرد قراءة، بل أدوات عملية تعينك على التقدّم في مسارك المهني أو
            الأكاديمي. اختر من بين كتب متخصصة وملفات قابلة للتنفيذ الفوري.`}
        link
        linkText="اطلب ملف مخصص الآن"
        path="requestQuote"
        showIcons
      />
      <div
        className={`py-6 container grid xl:grid-cols-4 lg:grid-cols-2 gap-6`}
      >
        <OffersFilter
          typesData={[]}
          typesParams={types}
          sectionsData={[]}
          sectionsParams={sections}
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
            type="book"
          />
        </div>
      </div>
      <CoursesRequest />
      <Subscription />
    </div>
  );
}
