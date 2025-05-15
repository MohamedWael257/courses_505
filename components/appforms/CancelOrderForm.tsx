/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import { Form } from "@/shared/ui/form";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Cancel from "@/assets/images/cancel.png";
import { ScrollArea } from "@/shared/ui/scroll-area";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import axiosInstance from "@/utils/axiosClient";
import Success from "@/assets/images/success2.gif";
import { useRouter } from "next/navigation";
import LocalePath from "@/shared/LocalePath";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface CancelOrderFormProps {
  dialogOpen: (open: boolean) => void;
  orderId: any;
  refetch: any;
}
const CancelOrderForm: React.FC<CancelOrderFormProps> = ({
  orderId,
  dialogOpen,
  refetch,
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  // Form Schema Validation
  const formSchema = Yup.object({
    reason: Yup.string().required(t("reason is a required field")),
  });

  // Default Form Values
  const defaultValues = {
    reason: "",
  };

  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Form Submission Handler
  const handleSubmit = async (values: any, actions: any) => {
    await axiosInstance
      .patch(`orders/${orderId}/cancel`)
      .then((res) => {
        Swal.fire({
          title: t("Messages.cancelOrderSuccessfully"),
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        dialogOpen(false);
        refetch();
        // window.location.reload();
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };

  return (
    <div className="flex flex-col gap-0 pt-8 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`md:h-[565px] flex flex-col pe-2`}>
          <div className="flex flex-col gap-3">
            <ImageWithFallback
              src={Cancel}
              width={1790}
              height={900}
              className="md:w-[150px] md:h-[150px] w-24 h-24 object-contain mx-auto  "
              alt="hero"
            />
            <h2 className="capitalize font-semibold lg:text-[34px] text-3xl text-center lg:leading-[50px]   leading-8 mb-3 ">
              {t("Text.CANCEL_ORDER")}
            </h2>
            <LocalePath
              href="/return-policy"
              className="text-secondrydark  text-lg font-medium   leading-7 text-center my-2"
            >
              {t("Text.CANCEL_ORDER_DESC")}
            </LocalePath>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormTextarea
                  name="reason"
                  label={"reason"}
                  className="md:h-[125px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-xl px-2 pe-5"
                  placeholder={"reason"}
                />
              </div>

              <div className="!pt-2">
                <CustomBtn
                  title={t("BUTTONS.confirm")}
                  buttonType="submit"
                  loader={false}
                  disabled={false}
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

export default CancelOrderForm;
