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
import { AuthStage, SessionType } from "../Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import Swal from "sweetalert2";
import FormInputDate from "@/shared/form-controls/FormDate";
import { UseMutate } from "@/utils/hooks/useMutate";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/auth.slice";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import Success from "@/assets/images/success2.gif";
import { DateIcon } from "@/shared/Icons";
import axiosInstance from "@/utils/axiosClient";

type Props = {
  image: string;
  profile: SessionType | null;
  refetch: any;
  setActiveUpdateData: any;
  setIsDialogOpen: any;
  setAuthStage: any;
};
export default function PersonalAccountForm({
  profile,
  image,
  refetch,
  setActiveUpdateData,
  setAuthStage,
  setIsDialogOpen,
}: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const dispatch = useDispatch();
  // Form Schema Validation

  const formSchema = Yup.object({
    image: Yup.string(),
    full_name: Yup.string().required(t("name is a required field")),
    email: Yup.string().email().required(t("email is a required field")),
    phone: Yup.string(),
    phone_code: Yup.string(),
  });

  // Default Form Values
  const defaultValues = {
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    image: "",
    phone: profile?.phone || "",
    phone_code: profile?.phone_code || "",
  };

  // Hook Form Initialization
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Extract necessary functions from useForm
  const UpdateProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");

      dispatch(updateUser(response.data.data));
      window.location.reload();
    } catch (error: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: error?.response?.data?.message,
      });
    } finally {
    }
  };
  const { mutate: UpdateProfileMutate, isLoading: LoadingComplete } = UseMutate(
    {
      endpoint: "profile/update",
      onSuccess: (responseData: any) => {
        Swal.fire({
          title: `${responseData?.message}`,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        UpdateProfile();
        refetch();
        // form.reset();
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
      method: "PUT",
    }
  );
  // Form Submission Handler
  const handleSubmit = async (values: any, actions: any) => {
    const finalOut: any = {
      full_name: values?.full_name,
      email: values?.email,
      // password: values?.password,
      gender: values?.gender,
      image: image,
    };
    if (finalOut["image"].includes("https")) {
      delete finalOut["image"];
    }
    ShowAlertMixin({
      icon: "success",
      type: 15,
      title: "success",
    });

    setActiveUpdateData(false);
    setTimeout(() => {
      setAuthStage("verify");
      setIsDialogOpen(true);
    }, 500);
    // UpdateProfileMutate({ ...finalOut });
  };

  return (
    <>
      <Form {...form}>
        <form className="pt-2" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl leading-6 text-start font-medium text-darkprimary my-3">
              معلومات شخصية
            </h2>
            <FormInput
              name="full_name"
              label={"fullname"}
              className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
              placeholder={"fullname"}
            />
            <FormInput
              name="email"
              label={"email"}
              className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
              placeholder={"email"}
            />

            <PhoneNumber
              label={"phoneNumber"}
              placeholder={"phoneNumber"}
              country="sa"
              // showRequired
            />

            <div className="flex justify-end items-center gap-2">
              <button
                disabled={LoadingComplete}
                className="rounded-full font-bold w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-white hover:bg-primary hover:text-white transition-colors text-primary border border-primary"
              >
                {t("BUTTONS.cancel")}
              </button>
              <CustomBtn
                title={t("BUTTONS.save_changes")}
                buttonType="submit"
                loader={LoadingComplete}
                disabled={LoadingComplete}
                button
                className="!rounded-full font-bold !w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-primary text-white"
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
