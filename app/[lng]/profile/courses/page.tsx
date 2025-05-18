import CoursesIndex from "@/components/profile/courses/CoursesIndex";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="overflow-hidden bg-greynormal p-6 rounded-2xl border border-secprimary">
      <CoursesIndex data={null} />
    </div>
  );
}
