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
  profile: SessionType;
  refetch: any;
};
export default function PersonalAccountForm({
  profile,
  image,
  refetch,
}: Props) {
  const t = useTranslations("");
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("phoneVerify");
  const locale = useLocale();
  const dispatch = useDispatch();
  // Form Schema Validation

  const formSchema = Yup.object({
    image: Yup.string(),
    full_name: Yup.string().required(t("name is a required field")),
    email: Yup.string().email().required(t("email is a required field")),
    birthday: Yup.string().required(t("date_of_birth is a required field")),
    gender: Yup.string().required(t("gender is a required field")),
    phone: Yup.string(),
    phone_code: Yup.string(),
    password: Yup.string(),
  });
  function convertDate(dateString: string) {
    const arabicMonthMapping: Record<string, string> = {
      يناير: "01",
      فبراير: "02",
      مارس: "03",
      أبريل: "04",
      مايو: "05",
      يونيو: "06",
      يوليو: "07",
      أغسطس: "08",
      سبتمبر: "09",
      أكتوبر: "10",
      نوفمبر: "11",
      ديسمبر: "12",
    };

    const englishMonthMapping: Record<string, string> = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    // Handle different formats (e.g., "2024 يناير 05" or "2024 January 05")
    const [year, monthName, day] = dateString.split(" ");

    // Try both mappings
    const month =
      arabicMonthMapping[monthName] || englishMonthMapping[monthName];

    if (!month) return dateString; // fallback in case month name not found

    return `${year}-${month.padStart(2, "0")}-${day}`;
  }

  // Default Form Values
  const defaultValues = {
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    password: "**************",
    birthday: profile?.birthday ? convertDate(profile?.birthday) : "",
    // birthday: profile?.birthday
    //   ? convertDate(profile?.birthday) + "T22:00:00.000Z"
    //   : "",
    gender: profile?.gender || "",
    image: "",
    phone: profile?.phone || "",
    phone_code: profile?.phone_code || "",
  };

  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const formatLocalDate = (date: any) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Extract necessary functions from useForm
  const { setValue, watch } = form;
  const selectedGender = watch("gender"); // Watch gender changes
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
      birthday: formatLocalDate(new Date(values?.birthday)),
      gender: values?.gender,
      image: image,
    };
    if (finalOut["image"].includes("https")) {
      delete finalOut["image"];
    }
    UpdateProfileMutate({ ...finalOut });
  };

  return (
    <>
      <Form {...form}>
        <form className="pt-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormInput
            name="full_name"
            label={"fullname"}
            className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
            placeholder={"fullname"}
            showRequired
          />
          <FormInput
            name="email"
            label={"email"}
            className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
            placeholder={"email"}
            showRequired
          />

          {/* Radio Group for Gender Selection */}
          <div className="flex flex-col gap-3 my-3">
            <label className="text-sm font-medium">{t("Text.gender")}</label>

            <RadioGroup
              dir={`${locale == "ar" ? "rtl" : "ltr"}`}
              value={selectedGender}
              onValueChange={(value) => setValue("gender", value)}
              className="grid lg:grid-cols-2 gap-4"
            >
              <div
                className={`flex items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-lg ${
                  selectedGender == "male"
                    ? "border-primary"
                    : "border-greynormal"
                }`}
              >
                <RadioGroupItem value="male" id="male" />

                <label htmlFor="male" className="text-sm">
                  {t("Text.male")}
                </label>
              </div>
              <div
                className={`flex items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-lg ${
                  selectedGender == "female"
                    ? "border-primary"
                    : "border-greynormal"
                }`}
              >
                <RadioGroupItem value="female" id="female" />
                <label htmlFor="female" className="text-sm">
                  {t("Text.female")}
                </label>
              </div>
            </RadioGroup>
          </div>
          <FormInputDate
            name="birthday"
            label={"date_of_birth"}
            className="h-16 !w-full  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder px-7 pe-10"
            placeholder={"date_of_birth"}
            showRequired
            rightIcon={
              <>
                <DateIcon className="size-6" />
              </>
            }
          />
          {/* <FormInput
            name="birthday"
            label={"date_of_birth"}
            className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
            placeholder={"date_of_birth"}
            showRequired
          /> */}
          <div className="relative my-2">
            <PhoneNumber
              label={"phoneNumber"}
              placeholder={"phoneNumber"}
              country="sa"
              disabled
              // showRequired
            />
            <div
              onClick={() => {
                setAuthStage("phoneVerify");
                setIsOpen(true);
              }}
              className="text-primary cursor-pointer text-base font-normal absolute top-0 end-0   leading-8"
            >
              {t("Text.change_phone")}
            </div>
          </div>
          <div className="relative my-2">
            <FormInput
              name="password"
              label="password"
              placeholder="password"
              className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
              disabled
            />
            <div
              onClick={() => {
                setAuthStage("change-password");
                setIsOpen(true);
              }}
              className="text-primary cursor-pointer text-base font-normal absolute top-0 end-0   leading-8"
            >
              {t("validations.Change password")}
            </div>
          </div>

          <div className="!pt-2 z-[1] relative">
            <CustomBtn
              title={t("BUTTONS.save_changes")}
              buttonType="submit"
              loader={LoadingComplete}
              disabled={LoadingComplete}
              button
              className="rounded-2xl font-bold w-fit px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-primary text-white"
            />
          </div>
        </form>
      </Form>
      <AppDialog
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      />
    </>
  );
}
