import Image from "next/image";
import React, { useState } from "react";
import LocalePath from "../LocalePath";
import { IoLocationOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { FaRegBuilding } from "react-icons/fa";
import { useTranslations } from "next-intl";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
interface Media {
  id: string;
  type: string;
  media: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  unit_count: number;
  num_of_buildings: number;
  project_medias: Media[];
}
type Props = {
  projects: Project[];
};
const ITEMS_PER_PAGE = 6;
export default function NewPaggination({ projects }: Props) {
  const t = useTranslations();

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.unshift(
        <button
          key={i}
          className={`w-12 h-12 font-medium text-lg    leading-7 text-center rounded-full border-2 border-primary ${
            currentPage === i
              ? "bg-primary text-white"
              : "text-primary bg-white"
          }`}
          onClick={() => handlePaggination(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  const handlePaggination = (i: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
    setTimeout(() => {
      setCurrentPage(i);
    }, 500); // Adjust the timeout duration as needed
    // setCurrentPage(i);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth scrolling
      });
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 500);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smooth scrolling
      });
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 500);
    }
  };
  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8 mt-8">
        {currentItems?.map((ele, index: number) => {
          const firstImage = ele.project_medias.find(
            (img) => img?.type === "image"
          );
          return (
            <div
              key={ele.id}
              className="2xl:w-[400px] xl:w-[22rem] lg:w-[400px] w-full lg:h-[700px] h-96 rounded-lg overflow-hidden  relative"
            >
              {firstImage && (
                <Image
                  key={firstImage.id}
                  width={400}
                  height={700}
                  className="2xl:w-[400px] xl:w-[22rem] lg:w-[400px] w-full lg:h-[700px] h-96 object-cover"
                  src={firstImage.media}
                  alt="Project image"
                />
              )}
              {/* <Image
                width={400}
                height={700}
                className="w-[400px] h-[700px] object-cover"
                src={ele?.project_medias[randomIndex]?.media}
                alt="image"
              /> */}
              <button className=" font-normal text-base   leading-6 text-center border-[1px] border-grey absolute top-4 left-8 py-3 px-6 backdrop-blur-[24px] rounded-full">
                {t("Home.available sell")}
              </button>

              <LocalePath
                className="flex  font-normal text-base text-white   leading-6 text-center bg-primary absolute bottom-4 right-8  px-8 py-2 backdrop-blur-[24px] rounded-lg"
                href={`/our-projects/${ele.id}`}
              >
                {/* <button className="flex  font-normal text-base text-white   leading-6 text-center bg-primary absolute bottom-4 right-8  px-8 py-2 backdrop-blur-[24px] rounded-lg"> */}
                {t("Home.details more")}
                {/* <FaArrowLeft className="mx-4" size={25} /> */}
                {/* </button> */}
              </LocalePath>
              <div className="absolute bottom-24  text-white  w-[90%] h-12 transition-[0.5s_height] hover:h-28 overflow-hidden px-2">
                <p className=" font-bold text-2xl   leading-10 mb-2 text-starts">
                  {t("Home.show doom")}
                </p>
                <div className="flex justify-between">
                  <p className="flex">
                    <IoLocationOutline className="mx-1" size={25} />
                    {ele.location}
                  </p>
                  <p className="flex">
                    <GoHome size={25} />
                    <p className="mx-1">{ele.unit_count}</p>
                    {t("Home.room")}
                  </p>
                  <p className="flex">
                    <BsBuildings size={25} />
                    <p className="mx-1">{ele.num_of_buildings}</p>
                    {t("Home.building")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* {totalPages > 1 && (
        <div className="mt-8 p-4 flex justify-evenly items-center">
          <button
            className={`p-2 rounded-full border-2 border-primary ${
              currentPage === totalPages
                ? "bg-primary text-white cursor-not-allowed"
                : "text-primary bg-white"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight size={30} />
          </button>
          {renderPagination()}
          <button
            className={`p-2 rounded-full border-2 border-primary ${
              currentPage === 1
                ? "bg-primary text-white cursor-not-allowed"
                : "text-primary bg-white"
            }`}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardArrowLeft size={30} />
          </button>
        </div>
      )} */}
    </div>
  );
}
