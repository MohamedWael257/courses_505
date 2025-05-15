/* eslint-disable react-hooks/rules-of-hooks */

"use client";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import PasswordController from "@/shared/form-controls/PasswordController";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Form } from "@/shared/ui/form";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import { UseMutate } from "@/utils/hooks/useMutate";
import { RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { useEffect } from "react";
import Success from "@/assets/images/success2.gif";
import LocalePath from "@/shared/LocalePath";
export default function ChangePassword() {
  const t = useTranslations("");
  const locale = useLocale();

  const router = useRouter();
  const { storedValues } = useSelector(
    (state: RootState) => state.ForgetConfig
  );

  const formSchema = yup.object({
    password: yup.string().required("password_required"),
    password_confirmation: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null as any], "Passwords don't match"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate: ChangePasswordMutate, isLoading: LoadingComplete } =
    UseMutate({
      endpoint: "reset-password",
      onSuccess: (responseData: any) => {
        // @ts-ignore
        Swal.fire({
          title: responseData?.message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        setTimeout(() => {
          router.replace(`${locale == "ar" ? "" : "/en"}/auth/login`);
        }, 3500);
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
  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      email: storedValues?.email,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
      code: storedValues?.code,
    };
    Swal.fire({
      title: "success",
      timer: 3000,
      showConfirmButton: false,
      imageUrl: `${Success.src}`,
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
      },
      padding: "1rem",
    });
    setTimeout(() => {
      router.replace(`${locale == "ar" ? "" : "/en"}/auth/login`);
    }, 3500);
    // ChangePasswordMutate(finalOut);
  }
  // useEffect(() => {
  //   if (!storedValues?.email && !storedValues?.code) {
  //     router.replace(`${locale == "ar" ? "" : "/en"}/auth/login`);
  //   }
  // }, [storedValues?.email, storedValues?.code]);
  return (
    <>
      <div className="flex flex-col gap-3  md:w-[560px] h-fit p-4">
        <div className="mb-3">
          <h3 className="text-[24px] font-normal text-center">
            {t("Text.Set a new password")}
          </h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <PasswordController
                // @ts-ignore
                name="password"
                label="password"
                placeholder="password"
                className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
              />

              <PasswordController
                // @ts-ignore
                name="password_confirmation"
                label="password_confirmation"
                placeholder="password_confirmation"
                className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-7 pe-10"
              />
            </div>

            <div className="!pt-4 w-full h-max ">
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
        <p className="text-center mt-4 ">
          {t("validations.remember_passsord")} {"  "}
          <LocalePath
            href="/auth/login"
            className="font-semibold hover:underline py-1 text-primary"
          >
            {t("validations.login")}
          </LocalePath>
        </p>
      </div>
    </>
  );
}
