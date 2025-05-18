import React from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import LocalePath from "@/shared/LocalePath";
import { ArrowLeftIcon } from "lucide-react";
import course from "@/assets/test.jpg";
import EmptyDownloads from "./EmptyDownloads";

type Props = {
  data: any;
};

export default function DownloadsIndex({ data }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-start text-darkprimary   leading-8">
        التنزيلات (0)
      </h2>
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
                <p className="text-base font-medium text-start text-secondrydark   leading-6">
                  0/30 درس مكتمل
                </p>
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
        <EmptyDownloads />
      )} */}
    </div>
  );
}
