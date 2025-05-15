"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import FormInput from "@/shared/form-controls/FormInput";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import { Form } from "@/shared/ui/form";
import { UseMutate } from "@/utils/hooks/useMutate";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { useDispatch } from "react-redux";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import PasswordController from "@/shared/form-controls/PasswordController";

type Props = {
  setActiveUpdatePassword: any;
};
export default function PersonalPasswordForm({
  setActiveUpdatePassword,
}: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch();
  // Form Schema Validation

  const formSchema = Yup.object({
    current_password: Yup.string().required("this_field_is_required"),
    password: Yup.string().required("this_field_is_required"),
    password_confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null as any], "Passwords don't match"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate: UpdateProfileMutate, isLoading: LoadingComplete } = UseMutate(
    {
      endpoint: "profile/update-password",
      onSuccess: (responseData: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: responseData?.message,
        });
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
      method: "PATCH",
    }
  );
  async function handleSubmit(
    values: Yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      current_password: values?.current_password,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
    };
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "success",
    });
    // UpdateProfileMutate(finalOut, {
    //   onSuccess: () => {
    //     actions.setSubmitting(false);
    //   },
    // });
  }

  return (
    <>
      <Form {...form}>
        <form className="pt-2" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl leading-6 text-start font-medium text-darkprimaryprimary my-3">
              تغيير كلمة المرور
            </h2>
            <PasswordController
              // @ts-ignore
              name="current_password"
              label="old_password"
              placeholder="old_password"
              className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
            />
            <PasswordController
              // @ts-ignore
              name="password"
              label="new_password"
              placeholder="new_password"
              className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
            />

            <PasswordController
              // @ts-ignore
              name="password_confirmation"
              label="confirm_new_password"
              placeholder="confirm_new_password"
              className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
            />
          </div>
          <div className="!pt-2 w-full h-max flex justify-end ">
            <CustomBtn
              title={t("BUTTONS.confirm")}
              buttonType="submit"
              loader={LoadingComplete}
              disabled={LoadingComplete}
              button
              className="font-bold !w-[170px] rounded-full px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] !bg-white border !border-primary !text-primary"
            />
          </div>
        </form>
      </Form>
    </>
  );
}
