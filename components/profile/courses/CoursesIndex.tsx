"use client";
import React, { useRef, useState } from "react";
import EmptyCourses from "./EmptyCourses";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { ArrowLeftIcon } from "lucide-react";
import course from "@/assets/test.jpg";
import { Tabs, TabsProps } from "antd";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Progress } from "@/shared/ui/progress";
import { FaArrowLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { RiArrowLeftSLine } from "react-icons/ri";
import { AuthStage } from "@/components/Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import AppPagination from "@/shared/Pagination/AppPagination";
import { updateURLParams } from "@/utils/helpers";

type Props = {
  courses: any;
  type: string;
  pagination: any;
  current_page: number;
};

export default function CoursesIndex({
  courses,
  type,
  pagination,
  current_page,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("");
  const [defaultActiveKey, setDefaultActiveKey] = useState(type || "1");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "الكل (3)",
    },
    {
      key: "2",
      label: "قيد التقدم (2)",
    },
    {
      key: "3",
      label: "أكتملت (1)",
    },
  ];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePaggination = (selectedPage: any) => {
    updateURLParams({ page: selectedPage }, router, pathname);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };
  return (
    <>
      <div ref={containerRef}>
        <h2 className="text-xl font-bold mb-4 text-start text-darkprimary   leading-8">
          الدورات
        </h2>
        <Tabs
          defaultActiveKey={defaultActiveKey}
          items={items}
          onChange={(key) => {
            setDefaultActiveKey(key);
            router.replace(
              `${locale == "ar" ? "" : "/en"}/profile/courses?type=${key}`,
              {
                scroll: false,
              }
            );
          }}
          className="custom-tabs-wrapper my-4"
        />
        {/* {data?.length > 0 ? (
        <> */}
        <div className="grid gap-6 items-center">
          {[...Array(3)].map((item: any, index) => (
            <div className="grid grid-cols-3 gap-4 items-center ">
              <div className="grid grid-cols-[auto_1fr] gap-4 items-center col-span-2">
                <ImageWithFallback
                  src={course}
                  width={900}
                  height={900}
                  className="w-[150px] h-[100px] object-cover rounded-2xl"
                  alt="hero"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium text-start text-darkprimary   leading-6 break-words">
                    كيفية بناء علامتك التجارية الدولية في مجال العمل الحر{" "}
                  </h2>
                  {/* <div className="text-base font-medium text-start text-secondrydark   leading-6 flex items-center gap-2">
                  <Progress
                    value={40}
                    bg="#03A853"
                    className="w-full !max-h-[6px]"
                  />
                  <p className="text-base font-medium text-start text-secondrydark   leading-6">
                    25/30
                  </p>
                </div> */}
                  <div className="text-base font-medium text-start text-secondrydark   leading-6 flex items-center gap-5">
                    <p className="text-base font-medium text-start text-secondrydark   leading-6">
                      25/25 درس مكتمل
                    </p>
                    <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                      <div className="flex items-center">
                        <CiStar size={20} className={`text-secondrydark `} />
                        <CiStar size={20} className={`text-secondrydark `} />
                        <CiStar size={20} className={`text-secondrydark `} />
                        <CiStar size={20} className={`text-secondrydark `} />
                        <CiStar size={20} className={`text-secondrydark `} />
                      </div>
                      <button
                        onClick={() => {
                          setIsDialogOpen(true);
                          setAuthStage("courserate");
                        }}
                        className="flex items-center text-primary   "
                      >
                        <p className="text-base font-medium text-start leading-6">
                          تقييم
                        </p>
                        <RiArrowLeftSLine
                          className={locale === "ar" ? "" : "rotate-180"}
                          size={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <LocalePath
                href={`/courses/${item?.id}`}
                className="text-center w-fit flex items-center justify-end gap-2 mx-auto px-5 py-3 bg-primary text-white font-medium rounded-full text-base shadow-md hover:bg-orange-600 transition duration-300"
              >
                اذهب إلي الدورة
                <ArrowLeftIcon className="w-6 h-6" />
              </LocalePath>
            </div>
          ))}
        </div>

        {/* </>
      ) : (
        <EmptyCourses />
      )} */}
        {courses && courses.length > 0 && (
          <div className="py-8">
            <AppPagination
              itemsPerPage={pagination?.per_page}
              totalItems={pagination?.total}
              totalPage={pagination?.last_page}
              currentPage={+current_page}
              paginate={handlePaggination}
            />
          </div>
        )}
      </div>
      <AppDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        orderId={null}
        rateable_id={null}
        refetch={null}
      />
    </>
  );
}
