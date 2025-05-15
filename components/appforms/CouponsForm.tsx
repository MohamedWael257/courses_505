/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import FormInput from "@/shared/form-controls/FormInput";
import { UseMutate } from "@/utils/hooks/useMutate";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Success from "@/assets/images/success2.gif";

type Props = {
  setOpen: any;
  refetch: any;
};

export default function CouponsForm({ refetch, setOpen }: Props) {
  const t = useTranslations("");
  const locale = useLocale();

  const [throwErrorCode, setThrowErrorCode] = useState(false);
  const [throwErrorCodeMessage, setThrowErrorCodeMessage] = useState("");

  const initialValues = {
    code: "",
  };

  const formSchema = Yup.object({
    code: Yup.string().required(t("phone_required")),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues,
  });
  const { mutate: CreatVouchersMutate, isLoading: LoadingComplete } = UseMutate(
    {
      endpoint: "vouchers",
      onSuccess: (responseData: any) => {
        Swal.fire({
          title: `${responseData?.message}`,
          timer: 3000,
          imageUrl: `${Success.src}`,
          showConfirmButton: false,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        setOpen(false);
        setThrowErrorCodeMessage("");
        setThrowErrorCode(false);
        refetch();
      },

      onError: (error: any) => {
        // @ts-ignore
        const errorMessage = error?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        setThrowErrorCodeMessage(error.response?.data?.message);
        setThrowErrorCode(true);
      },
    }
  );
  async function handleSubmit(values: Yup.InferType<typeof formSchema>) {
    await CreatVouchersMutate({ code: values.code });
  }
  return (
    <>
      <div className="flex flex-col gap-3 w-full p-4">
        <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
          <div className={`md:h-[300px] flex flex-col pe-2`}>
            <Form {...form}>
              <form
                className="p-4 rounded-xl mt-12 w-full"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormInput
                  throwErrorCode={throwErrorCode}
                  throwErrorCodeMessage={throwErrorCodeMessage}
                  name="code"
                  label="code"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder pe-10"
                  placeholder="code"
                />

                <div className="!pt-8 w-full h-max ">
                  <CustomBtn
                    title={t("BUTTONS.confirm")}
                    buttonType="submit"
                    loader={LoadingComplete}
                    disabled={LoadingComplete}
                    button
                    className="!w-full  !h-[56px] !rounded-full "
                  />
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
