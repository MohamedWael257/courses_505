import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Courses from "@/components/home/Courses";
import ChooseUS from "@/components/home/ChooseUS";
import Books from "@/components/home/Books";
import Stories from "@/components/home/Stories";
import JoinUS from "@/components/home/JoinUS";
import Subscription from "@/components/Subscription";
// import Files from "@/components/home/Files";

export default async function page() {
  return (
    <>
      <div className="overflow-hidden">
        <HeroSection slider={null} />
        <Courses courses={[]} />
        <ChooseUS data={[]} />
        <Courses courses={[]} />
        {/* <Files files={[]} /> */}
        <Books books={[]} />
        <Stories stories={[]} />
        <JoinUS />
        <Subscription />
      </div>
    </>
  );
}
