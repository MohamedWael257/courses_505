import CoursesIndex from "@/components/profile/courses/CoursesIndex";
import React from "react";

type Props = {
  searchParams: {
    type: string;
  };
};

export default function page({ searchParams }: Props) {
  const type = searchParams?.type;
  return (
    <div className="overflow-hidden bg-greynormal p-6 rounded-2xl border border-secprimary">
      <CoursesIndex courses={null} type={type} pagination={null} current_page={1} />
    </div>
  );
}
