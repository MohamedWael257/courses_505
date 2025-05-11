import CourseDetialsCard from "@/components/courses/CourseDetialsCard";
import CourseDetialsData from "@/components/courses/CourseDetialsData";
import CourseDetialsTop from "@/components/courses/CourseDetialsTop";
import RelatedCourses from "@/components/courses/RelatedCourses";
import { NoData } from "@/shared/NoData";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <div className="overflow-x-hidden relative">
        <CourseDetialsTop data={null} />
        <CourseDetialsData data={null} />
        <CourseDetialsCard course={null} />
        <div className="bg-greynormal">
          <RelatedCourses courses={null} />
        </div>
      </div>
    </>
  );
}
