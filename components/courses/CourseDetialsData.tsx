"use client";
import React, { useState } from "react";
import {
  Accordion as SharedAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import ImageWithFallback from "@/shared/ImageWithFallback";
import course from "@/assets/test.jpg";
import { TiStar } from "react-icons/ti";
import { Rate, Tabs, TabsProps } from "antd";
import { useTranslations } from "next-intl";
import { DateIcon, ExamIcon } from "@/shared/Icons";
import { useRouter } from "next/navigation";

type Props = {
  data: any;
};

export default function CourseDetialsData({ data }: Props) {
  const t = useTranslations("");
  const [defaultActiveKey, setDefaultActiveKey] = useState("Tab-1");
  const router = useRouter();
  const [step, setStep] = useState(0);
  const desc = [
    t("Text.terrible"),
    t("Text.bad"),
    t("Text.normal"),
    t("Text.good"),
    t("Text.wonderful"),
  ];
  const items: TabsProps["items"] = [
    {
      key: "Tab-1",
      label: "عن الدورة",
    },
    {
      key: "Tab-2",
      label: "الأهداف",
    },
    {
      key: "Tab-3",
      label: "محتوي الدورة",
    },
    {
      key: "Tab-4",
      label: "المواعيد المتاحة",
    },
    {
      key: "Tab-5",
      label: "عن المدرب",
    },
    {
      key: "Tab-6",
      label: "تقييم الدوره",
    },
  ];
  return (
    <div className=" flex justify-start relative container md:py-10 py-6">
      <div className="lg:w-[60%] space-y-6 overflow-auto">
        <Tabs
          defaultActiveKey={defaultActiveKey}
          items={items}
          onChange={(key) => {
            setDefaultActiveKey(key);
            router.push(`#${key}`);
          }}
          className="custom-tabs-wrapper"
        />
        <div id="Tab-1" className="flex flex-col gap-5">
          <h2 className="text-darkprimary font-medium text-2xl text-start leading-8">
            عن الدورة
          </h2>
          <p className="text-secondrytext font-normal text-sm leading-8 text-start">
            تم تصميم هذه الدورة خصيصًا لمساعدتك على دخول عالم العمل الحر بخطوات
            واضحة وعملية، دون الحاجة لخبرة سابقة. ستتعرّف من خلالها على الأدوات
            الأساسية، طرق تسعير الخدمات، كيفية بناء ملف تعريفي احترافي، والتعامل
            مع العملاء باحترافية. هذه الدورة تركز على الجانب التطبيقي وتناسب كل
            من يرغب في بدء مسيرته كمستقل على منصات العمل الحر أو تطوير نشاطه
            الحالي.
          </p>
        </div>
        <div id="Tab-2" className="flex flex-col gap-5">
          <h2 className="text-darkprimary font-medium text-2xl text-start leading-8">
            الأهداف
          </h2>
          <ul className="list-disc ps-4">
            <li className="text-secondrytext font-normal text-sm leading-8 text-start">
              فهم مفاهيم العمل الحر ومتطلباته
            </li>
            <li className="text-secondrytext font-normal text-sm leading-8 text-start">
              التعرّف على أبرز منصات العمل الحر وكيفية التسجيل فيها
            </li>
            <li className="text-secondrytext font-normal text-sm leading-8 text-start">
              تعلم كيفية بناء بروفايل مميز يجذب العملاء
            </li>
            <li className="text-secondrytext font-normal text-sm leading-8 text-start">
              استراتيجيات تسعير الخدمات والتفاوض بثقة
            </li>
            <li className="text-secondrytext font-normal text-sm leading-8 text-start">
              نصائح عملية لإدارة الوقت وتحقيق دخل ثابت
            </li>
          </ul>
        </div>
        <div id="Tab-3" className="flex flex-col gap-5">
          <h2 className="text-darkprimary font-medium text-2xl text-start leading-8">
            محتوي الدورة
          </h2>
          <p className="text-secondrytext font-normal text-sm leading-8 text-start">
            6 إختبارات - 25 درس - 5 فصول
          </p>
          {[...Array(3)].map((item, index) => (
            <SharedAccordion
              type="single"
              className="bg-transparent my-2"
              collapsible
              key={index}
            >
              <AccordionItem
                value={`الفصل الأول: الانطلاقة نحو العمل الحر`}
                className="bg-white  border-2 border-[#F3F3F3] w-full px-2 rounded-lg transition-[2s_height]"
              >
                <AccordionTrigger
                  showIcon
                  className=" w-full  font-medium text-start   leading-6 text-base text-darkprimary"
                >
                  الفصل الأول: الانطلاقة نحو العمل الحر
                </AccordionTrigger>

                <AccordionContent className="text-secondrytext px-4 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      className="bg-greynormal p-2 rounded-full"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.0886 11.5369L13.007 11.4864C12.3503 11.0801 11.7993 10.7392 11.3422 10.5275C10.8786 10.3128 10.35 10.1508 9.7988 10.3209C9.43447 10.4333 9.1108 10.6443 8.85518 10.9251C8.48329 11.3337 8.36071 11.8676 8.30525 12.4013C8.24997 12.9332 8.24998 13.6203 8.25 14.457V14.543C8.24998 15.3797 8.24997 16.0668 8.30525 16.5987C8.36071 17.1324 8.48329 17.6664 8.85518 18.0749C9.1108 18.3557 9.43447 18.5667 9.7988 18.6791C10.35 18.8492 10.8786 18.6872 11.3422 18.4725C11.7993 18.2608 12.3503 17.9199 13.007 17.5137L13.0886 17.4632C13.7703 17.0415 14.3387 16.6899 14.7505 16.3623C15.1745 16.0251 15.5479 15.6265 15.6821 15.071C15.7726 14.6965 15.7726 14.3035 15.6821 13.929C15.5479 13.3735 15.1745 12.9749 14.7505 12.6377C14.3387 12.3101 13.7703 11.9585 13.0886 11.5369ZM9.96446 11.9348C10.0477 11.8434 10.1442 11.7841 10.2411 11.7542C10.2497 11.7515 10.3484 11.7203 10.7118 11.8886C11.0766 12.0576 11.5502 12.349 12.2593 12.7877C12.9916 13.2407 13.4829 13.5461 13.8168 13.8116C14.1466 14.074 14.2069 14.2102 14.2241 14.2814C14.2586 14.4243 14.2586 14.5757 14.2241 14.7186C14.2069 14.7898 14.1466 14.9261 13.8168 15.1884C13.4829 15.454 12.9916 15.7594 12.2593 16.2124C11.5502 16.6511 11.0766 16.9425 10.7118 17.1114C10.3484 17.2797 10.2497 17.2486 10.2411 17.2458C10.1442 17.2159 10.0477 17.1567 9.96446 17.0652C9.92653 17.0235 9.8442 16.8958 9.79721 16.4436C9.75097 15.9987 9.75 15.3904 9.75 14.5C9.75 13.6097 9.75097 13.0013 9.79721 12.5564C9.8442 12.1043 9.92653 11.9765 9.96446 11.9348Z"
                        fill="#656D72"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.9428 1.75H12.0572C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50272 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.7521 22.25 11.9428V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H11.9428C9.75214 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V11.9428C1.74999 9.75212 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50272 5.31137 2.11568 6.68802 1.93059C8.03144 1.74998 9.75212 1.74999 11.9428 1.75ZM6.8879 3.41722C5.67757 3.57994 4.95462 3.88853 4.42157 4.42157C3.90909 4.93406 3.60408 5.62208 3.4367 6.75H6.5759L8.65575 3.2836C7.98627 3.30737 7.40315 3.34794 6.8879 3.41722ZM3.25 12C3.25 10.4889 3.25071 9.26404 3.30067 8.25H20.6993C20.7493 9.26404 20.75 10.4889 20.75 12C20.75 14.2604 20.7484 15.8802 20.5828 17.1121C20.4201 18.3224 20.1115 19.0454 19.5784 19.5784C19.0454 20.1115 18.3224 20.4201 17.1121 20.5828C15.8802 20.7484 14.2604 20.75 12 20.75C9.73963 20.75 8.11979 20.7484 6.8879 20.5828C5.67757 20.4201 4.95462 20.1115 4.42157 19.5784C3.88853 19.0454 3.57994 18.3224 3.41722 17.1121C3.25159 15.8802 3.25 14.2604 3.25 12ZM19.5784 4.42157C20.0909 4.93406 20.3959 5.62208 20.5633 6.75H15.3252L17.3079 3.44548C18.4016 3.61465 19.0748 3.91792 19.5784 4.42157ZM12 3.25C13.461 3.25 14.6544 3.25067 15.6484 3.29586L13.5759 6.75H8.32519L10.4235 3.25282C10.9117 3.2501 11.4359 3.25 12 3.25Z"
                        fill="#656D72"
                      />
                    </svg>
                    5 دروس مسجلة
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="bg-greynormal p-2 rounded-full"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.5 7.25C10.2574 7.25 9.25 8.25736 9.25 9.5C9.25 10.7426 10.2574 11.75 11.5 11.75C12.7426 11.75 13.75 10.7426 13.75 9.5C13.75 8.25736 12.7426 7.25 11.5 7.25ZM10.75 9.5C10.75 9.08579 11.0858 8.75 11.5 8.75C11.9142 8.75 12.25 9.08579 12.25 9.5C12.25 9.91421 11.9142 10.25 11.5 10.25C11.0858 10.25 10.75 9.91421 10.75 9.5Z"
                        fill="#656D72"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.94425 3.25H10.0557C11.6583 3.24998 12.9373 3.24997 13.9404 3.38483C14.9767 3.52415 15.8301 3.81966 16.5052 4.4948C17.1803 5.16994 17.4758 6.02335 17.6152 7.05961C17.6299 7.16937 17.6431 7.28243 17.6548 7.39886C18.2507 6.91834 18.7699 6.52349 19.2246 6.24876C19.9087 5.83551 20.6936 5.54159 21.4829 5.93287C22.2616 6.31888 22.5231 7.11573 22.6364 7.91652C22.7501 8.72045 22.75 9.81122 22.75 11.1546V12.8454C22.75 14.1888 22.7501 15.2796 22.6364 16.0835C22.5231 16.8843 22.2616 17.6812 21.4829 18.0672C20.6936 18.4584 19.9087 18.1645 19.2246 17.7513C18.7699 17.4765 18.2507 17.0817 17.6548 16.6012C17.6431 16.7176 17.6299 16.8306 17.6152 16.9404C17.4758 17.9767 17.1803 18.8301 16.5052 19.5052C15.8301 20.1803 14.9767 20.4758 13.9404 20.6152C12.9373 20.75 11.6583 20.75 10.0557 20.75H8.94426C7.34166 20.75 6.0627 20.75 5.05961 20.6152C4.02335 20.4758 3.16994 20.1803 2.4948 19.5052C1.81966 18.8301 1.52415 17.9767 1.38483 16.9404C1.24997 15.9373 1.24998 14.6583 1.25 13.0558V10.9443C1.24998 9.34167 1.24997 8.0627 1.38483 7.05961C1.52415 6.02335 1.81966 5.16994 2.4948 4.4948C3.16994 3.81966 4.02335 3.52415 5.05961 3.38483C6.0627 3.24997 7.34166 3.24998 8.94425 3.25ZM17.75 10.9443C17.75 10.3394 17.75 9.78063 17.7428 9.26539C18.7458 8.43824 19.4491 7.86566 20.0003 7.53266C20.5867 7.17841 20.7558 7.24662 20.8167 7.27681C20.8882 7.31226 21.0519 7.42477 21.1511 8.12661C21.2482 8.81267 21.25 9.79609 21.25 11.2181V12.7819C21.25 14.2039 21.2482 15.1874 21.1511 15.8734C21.0519 16.5753 20.8882 16.6878 20.8167 16.7232C20.7558 16.7534 20.5867 16.8216 20.0003 16.4674C19.4491 16.1344 18.7458 15.5618 17.7428 14.7346C17.75 14.2194 17.75 13.6606 17.75 13.0557V10.9443ZM5.25949 4.87145C4.38955 4.98841 3.90544 5.20547 3.55546 5.55546C3.20547 5.90544 2.98841 6.38955 2.87145 7.25949C2.75159 8.15099 2.75 9.32888 2.75 11V13C2.75 14.6711 2.75159 15.849 2.87145 16.7405C2.98841 17.6104 3.20547 18.0946 3.55546 18.4445C3.90544 18.7945 4.38955 19.0116 5.25949 19.1285C6.15099 19.2484 7.32888 19.25 9 19.25H10C11.6711 19.25 12.849 19.2484 13.7405 19.1285C14.6104 19.0116 15.0946 18.7945 15.4445 18.4445C15.7945 18.0946 16.0116 17.6104 16.1285 16.7405C16.2484 15.849 16.25 14.6711 16.25 13V11C16.25 9.32888 16.2484 8.15099 16.1285 7.25949C16.0116 6.38955 15.7945 5.90544 15.4445 5.55546C15.0946 5.20547 14.6104 4.98841 13.7405 4.87145C12.849 4.75159 11.6711 4.75 10 4.75H9C7.32888 4.75 6.15099 4.75159 5.25949 4.87145Z"
                        fill="#656D72"
                      />
                    </svg>
                    5 دروس أونلاين
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="bg-greynormal p-2 rounded-full"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.9949 4.74697C18.2227 3.9747 17.5838 3.33569 17.0126 2.91271C16.411 2.46719 15.7739 2.17604 15.0176 2.26611C14.0175 2.3852 13.2606 3.04905 12.7143 3.68743C12.2972 4.17473 11.925 4.74577 11.6292 5.19948C11.5539 5.31501 11.4836 5.42297 11.4187 5.51997C10.1991 6.71966 9.06391 7.11894 7.84867 7.2378L7.81043 7.24154C7.12159 7.3089 6.55051 7.36474 6.10476 7.45223C5.65128 7.54123 5.20709 7.68299 4.85624 8.00456C4.52064 8.31215 4.34167 8.6948 4.21703 9.10412C4.0998 9.48911 4.00997 9.97297 3.90524 10.5371L2.50174 18.0955C2.37759 18.7638 2.26935 19.3465 2.2524 19.8118C2.23437 20.3069 2.31043 20.8448 2.73266 21.267C3.15489 21.6893 3.6928 21.7654 4.18785 21.7473C4.65316 21.7304 5.23577 21.6221 5.90403 21.498L13.4621 20.0944C14.0262 19.9897 14.51 19.8998 14.895 19.7826C15.3042 19.658 15.6869 19.479 15.9944 19.1435C16.316 18.7927 16.4578 18.3485 16.5468 17.895C16.6344 17.4492 16.6903 16.8781 16.7578 16.1891L16.7615 16.1509C16.8806 14.935 17.2805 13.8 18.4819 12.5794C18.5783 12.5149 18.6855 12.4451 18.8001 12.3704C19.2538 12.0746 19.8249 11.7024 20.3122 11.2853C20.9506 10.739 21.6144 9.9821 21.7335 8.98205C21.8236 8.22569 21.5324 7.58858 21.0869 6.987C20.6639 6.41585 20.0249 5.7769 19.2527 5.0047L18.9949 4.74697ZM18.0973 11.0369C18.5186 10.762 18.9469 10.4795 19.3368 10.1457C19.8877 9.67427 20.1929 9.23404 20.244 8.80468C20.2701 8.58531 20.2152 8.33039 19.8815 7.87971C19.5329 7.40901 18.975 6.84838 18.1496 6.02297L17.9766 5.84998C17.1512 5.02457 16.5906 4.46673 16.1199 4.11814C15.6692 3.78438 15.4143 3.72947 15.1949 3.75559C14.7656 3.80672 14.3253 4.11192 13.8539 4.66278C13.5202 5.05261 13.2377 5.48084 12.9628 5.90201L18.0973 11.0369ZM11.9794 7.03987C10.6625 8.16185 9.3543 8.59769 7.99468 8.73067C7.25785 8.80274 6.75969 8.8523 6.39365 8.92414C6.02712 8.99608 5.91337 9.07038 5.86975 9.11036C5.81089 9.16431 5.73707 9.26162 5.65198 9.54106C5.56225 9.83574 5.48687 10.2356 5.3726 10.851L3.9868 18.3141C3.93093 18.615 3.88363 18.8715 3.84633 19.0929L8.52674 14.4125C8.28057 14.0163 8.12328 13.5766 8.04917 13.1201C7.98279 12.7112 8.26043 12.3259 8.66929 12.2596C9.07815 12.1932 9.46341 12.4708 9.52978 12.8797C9.59789 13.2992 9.77587 13.6624 10.0566 13.9432C10.3374 14.224 10.7007 14.402 11.1202 14.4701C11.529 14.5365 11.8067 14.9217 11.7403 15.3306C11.6739 15.7394 11.2887 16.0171 10.8798 15.9507C10.4233 15.8766 9.9836 15.7193 9.5874 15.4731L4.90722 20.1533C5.12848 20.116 5.38482 20.0688 5.68547 20.0129L13.1482 18.6271C13.7635 18.5128 14.1634 18.4374 14.458 18.3477C14.7374 18.2626 14.8347 18.1888 14.8887 18.1299C14.9286 18.0863 15.0029 17.9726 15.0749 17.606C15.1468 17.2399 15.1965 16.7416 15.2687 16.0047C15.4018 14.6449 15.838 13.3375 16.9599 12.0208L11.9794 7.03987Z"
                        fill="#656D72"
                      />
                    </svg>
                    3 مهام
                  </div>
                  <div className="flex items-center gap-2">
                    <ExamIcon className="*:fill-[#656D72] bg-greynormal p-2 rounded-full size-10" />
                    1 اختبار
                  </div>
                </AccordionContent>
              </AccordionItem>
            </SharedAccordion>
          ))}
        </div>
        <div id="Tab-4" className="flex flex-col gap-5">
          <h2 className="text-darkprimary font-medium text-2xl text-start leading-8">
            المواعيد المتاحة{" "}
          </h2>
          <div className="grid gap-6">
            {[...Array(3)].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-greynormal"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-lg text-darkprimary leading-7 text-start">
                    المجموعة الأولي
                  </h2>
                  <p className="text-sm font-normal leading-6 text-start text-error bg-error/[0.15] p-3 rounded-full">
                    متبقي 6 مقاعد
                  </p>
                </div>
                <div className="flex gap-2 items-center my-4 text-base text-start font-normal leading-6">
                  <DateIcon />
                  <p>22 مارس 2025 - 25 إبريل 2025</p>
                </div>
                <SharedAccordion
                  type="single"
                  className="bg-[#E8FAFB] my-2 rounded-2xl"
                  collapsible
                  key={index}
                >
                  <AccordionItem
                    value={`الفصل الأول: الانطلاقة نحو العمل الحر`}
                    className="bg-[#E8FAFB]  border-2 border-[#E8FAFB] !text-success w-full px-2 rounded-2xl transition-[2s_height]"
                  >
                    <AccordionTrigger
                      iconColor="#139299"
                      className=" w-full  font-medium text-start   leading-6 text-base  text-[#0B575B]"
                    >
                      مواعيد الدروس الاونلاين
                    </AccordionTrigger>

                    <AccordionContent className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl">
                        <p className="text-[#139299]">السبت</p>
                        <p className="text-[#0B575B]">01:00 م</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl">
                        <p className="text-[#139299]">السبت</p>

                        <p className="text-[#0B575B]">01:00 م</p>
                      </div>
                      <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl">
                        <p className="text-[#139299]">السبت</p>
                        <p className="text-[#0B575B]">01:00 م</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </SharedAccordion>
              </div>
            ))}
          </div>
        </div>
        <div id="Tab-5" className="flex flex-col gap-5">
          <h2 className="text-darkprimary font-medium text-2xl text-start leading-8">
            عن المدرب
          </h2>
          <div className="bg-greynormal p-4  px-8 rounded-2xl mt-3">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4 my-5">
              <ImageWithFallback
                src={course}
                width={1790}
                height={900}
                className="w-12 h-12 object-cover rounded-full"
                alt="hero"
              />
              <span className="text-darkprimary font-medium text-base  leading-5 text-start">
                محمد وائل
              </span>
            </div>
            <p className="my-4 text-darkprimary font-medium text-base leading-8 text-start">
              متخصص في ريادة الأعمال والعمل الحر، عمل كـ Freelancer على منصات
              عالمية ومحلية، وقد ساعد مئات المبتدئين على بدء رحلتهم وتحقيق أول
              دخل مستقل.
            </p>
          </div>
        </div>
        <div id="Tab-6" className="flex flex-col gap-5">
          <div className="my-6 flex gap-2 items-center">
            <TiStar color="#FF8861" size={25} />
            <div className="   text-lg font-semibold flex gap-1 items-center">
              {data?.rate.toFixed(1) || "4.5 تقييم"}
              <span className="text-secondrydark">(30)</span>
            </div>
          </div>
          {[...Array(3)].map((item, index) => (
            <div
              key={index}
              className="rate-card border-b-2 border-b-greynormal pb-4"
            >
              <div className="flex gap-2 items-center">
                <ImageWithFallback
                  src={course}
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-full object-cover"
                  alt="profile image"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <h2 className="capitalize font-semibold lg:text-xl text-lg text-start leading-4 mb-3 ">
                      طه الدسوقي
                    </h2>
                    <div className="flex gap-2">
                      <Rate
                        tooltips={desc}
                        className="!text-[#FF8861]"
                        allowHalf
                        disabled
                        defaultValue={3}
                        value={3}
                      />
                    </div>
                  </div>
                  <p className="text-secondrydark  text-base font-medium   leading-7 text-start">
                    09 نوفمبر 2022
                  </p>
                </div>
              </div>

              <p className="text-secondrydark  text-base font-medium   leading-7 text-start lg:w-[80%] mt-4">
                بدأت أطبق الخطوات بعد أول وحدة، والنتيجة كانت أول مشروع مدفوع
                خلال أسبوع
              </p>
            </div>
          ))}
          <button className="font-medium text-sm leading-5 text-center  border border-primary bg-white hover:bg-primary text-primary hover:text-white transition-colors p-3 px-5 rounded-full w-fit m-[12px_auto]">
            عرض المزيد
          </button>
        </div>
      </div>
    </div>
  );
}
