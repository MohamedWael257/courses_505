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
interface ProviderRateFormProps {
  dialogOpen: (open: boolean) => void;
  orderId: any;
  refetch: any;
  rateable_id: any;
}
const ProviderRateForm: React.FC<ProviderRateFormProps> = ({
  dialogOpen,
  orderId,
  refetch,
  rateable_id,
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  // Form Schema Validation
  const formSchema = Yup.object({
    rate: Yup.number().required(t("rate is a required field")),
    review: Yup.string().required(t("comment is a required field")),
  });

  // Default Form Values
  const defaultValues = {
    rate: 0,
    review: "",
  };

  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { setValue, watch } = form;
  const selectedRate = watch("rate");

  const { mutate: SendRateMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "rates",
    onSuccess: (responseData: any) => {
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      refetch();
      dialogOpen(false);
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
    SendRateMutate({
      uuid: orderId,
      rateable_type: "vendor",
      rating: values?.rate,
      rateable_id: rateable_id,
      review: values?.review,
    });
  };
  return (
    <div className="flex flex-col gap-0 pt-12 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`md:h-[430px] flex flex-col pe-2`}>
          <h2 className="capitalize font-semibold lg:text-2xl text-xl text-center lg:leading-[50px]   leading-8 mb-3 ">
            {t("Text.PROVIDER_RATE")}
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex justify-center gap-3">
                  <FaStar
                    size={30}
                    className={`${
                      selectedRate >= 1 ? "text-primary " : "text-secondrydark "
                    }`}
                    onClick={() => setValue("rate", 1)}
                  />
                  <FaStar
                    size={30}
                    className={`${
                      selectedRate >= 2 ? "text-primary " : "text-secondrydark "
                    }`}
                    onClick={() => setValue("rate", 2)}
                  />
                  <FaStar
                    size={30}
                    className={`${
                      selectedRate >= 3 ? "text-primary " : "text-secondrydark "
                    }`}
                    onClick={() => setValue("rate", 3)}
                  />
                  <FaStar
                    size={30}
                    className={`${
                      selectedRate >= 4 ? "text-primary " : "text-secondrydark "
                    }`}
                    onClick={() => setValue("rate", 4)}
                  />
                  <FaStar
                    size={30}
                    className={`${
                      selectedRate == 5 ? "text-primary " : "text-secondrydark "
                    }`}
                    onClick={() => setValue("rate", 5)}
                  />
                </div>
                <FormTextarea
                  name="review"
                  label={"comment"}
                  className="md:h-[150px] resize-none w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base"
                  placeholder={"comment"}
                />
              </div>

              <div className="!pt-2">
                <CustomBtn
                  title={t("BUTTONS.confirm")}
                  buttonType="submit"
                  loader={LoadingComplete}
                  disabled={LoadingComplete}
                  button
                  className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
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

export default ProviderRateForm;
