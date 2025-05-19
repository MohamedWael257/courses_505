/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import { Form } from "@/shared/ui/form";
import { ScrollArea } from "@/shared/ui/scroll-area";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { FaStar } from "react-icons/fa";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { UseMutate } from "@/utils/hooks/useMutate";
import { CiStar } from "react-icons/ci";
interface CourseRateFormProps {
  dialogOpen: (open: boolean) => void;
  orderId: any;
  rateable_id: any;
  refetch: any;
}
const CourseRateForm: React.FC<CourseRateFormProps> = ({
  dialogOpen,
  orderId,
  rateable_id,
  refetch,
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  // Form Schema Validation
  const formSchema = Yup.object({
    ratecontent: Yup.number().required(t("rate is a required field")),
    ratetrainner: Yup.number().required(t("rate is a required field")),
    rateplatform: Yup.number().required(t("rate is a required field")),
    review: Yup.string(),
  });

  // Default Form Values
  const defaultValues = {
    ratecontent: 0,
    ratetrainner: 0,
    rateplatform: 0,
    review: "",
  };
  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { setValue, watch } = form;
  const selectedRatecontent = watch("ratecontent");
  const selectedRatetrainner = watch("ratetrainner");
  const selectedRateplatform = watch("rateplatform");

  const { mutate: SendRateMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "rates",
    onSuccess: (responseData: any) => {
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      dialogOpen(false);
      refetch();
      // window.location.reload();
    },

    onError: (error: any) => {
      // @ts-ignore
      const errorMessage = error?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    },
  });
  // Form Submission Handler
  const handleSubmit = async (values: any, actions: any) => {
    // SendRateMutate({
    //   uuid: orderId,
    //   rateable_type: "course",
    //   rating: values?.ratecontent,
    //   rateable_id: rateable_id,
    //   review: values?.review,
    // });
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "تم",
    });
    dialogOpen(false);
  };
  return (
    <div className="flex flex-col gap-0 pt-4 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`md:h-[450px] flex flex-col pe-2`}>
          <h2 className="capitalize font-semibold lg:text-2xl text-xl text-center lg:leading-[50px]   leading-8 mb-3 ">
            تقييمك
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-darkprimary font-medium text-[18px] leading-[27px]">
                    قيم محتوي الدورة
                  </h2>
                  <div className="flex justify-center gap-1">
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatecontent >= 1
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratecontent", 1)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatecontent >= 2
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratecontent", 2)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatecontent >= 3
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratecontent", 3)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatecontent >= 4
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratecontent", 4)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatecontent == 5
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratecontent", 5)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-darkprimary font-medium text-[18px] leading-[27px]">
                    قيم المدرب
                  </h2>
                  <div className="flex justify-center gap-1">
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatetrainner >= 1
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratetrainner", 1)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatetrainner >= 2
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratetrainner", 2)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatetrainner >= 3
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratetrainner", 3)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatetrainner >= 4
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratetrainner", 4)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRatetrainner == 5
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("ratetrainner", 5)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-darkprimary font-medium text-[18px] leading-[27px]">
                    قيم المنصة{" "}
                  </h2>
                  <div className="flex justify-center gap-1">
                    <CiStar
                      size={30}
                      className={`${
                        selectedRateplatform >= 1
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("rateplatform", 1)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRateplatform >= 2
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("rateplatform", 2)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRateplatform >= 3
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("rateplatform", 3)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRateplatform >= 4
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("rateplatform", 4)}
                    />
                    <CiStar
                      size={30}
                      className={`${
                        selectedRateplatform == 5
                          ? "text-primary "
                          : "text-secondrydark "
                      }`}
                      onClick={() => setValue("rateplatform", 5)}
                    />
                  </div>
                </div>
                <FormTextarea
                  name="review"
                  label={"comment"}
                  className="md:h-[125px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-xl px-2 pe-5"
                  placeholder={"comment"}
                />
              </div>

              <div className="!pt-2">
                <CustomBtn
                  title={t("BUTTONS.send")}
                  buttonType="submit"
                  loader={LoadingComplete}
                  disabled={LoadingComplete}
                  button
                  className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
                />
              </div>
            </form>
          </Form>
        </div>
        {/* </div> */}
      </ScrollArea>
    </div>
  );
};

export default CourseRateForm;
