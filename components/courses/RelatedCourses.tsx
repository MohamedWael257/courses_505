import CoursesCard from "@/shared/card/CoursesCard";
import LocalePath from "@/shared/LocalePath";
import React from "react";

type Props = { courses: any };

export default function RelatedCourses({ courses }: Props) {
  return (
    <section className="container py-16">
      <div className="flex gap-4 items-center mb-6">
        <div className=" flex-1" data-aos="fade-right">
          <h2 className="capitalize text-darkprimary font-bold lg:text-3xl text-xl text-start lg:leading-[50px]   leading-8">
            دورات أخري
          </h2>
        </div>
        <LocalePath
          className=" w-fit border p-3 border-primary rounded-full gap-2   font-semibold text-sm   leading-5 text-center whitespace-nowrap text-primary  transition-colors "
          href="/courses"
          data-aos="fade-left"
        >
          المزيد من الدورات
        </LocalePath>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((item, index) => (
          <CoursesCard
            className="!bg-white"
            courseData={item}
            index={index}
            key={`book_${index}`}
          />
        ))}
      </div>
    </section>
  );
}
