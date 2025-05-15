/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { Form } from "@/shared/ui/form";
import { AuthStage } from "@/components/Header";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import PasswordController from "@/shared/form-controls/PasswordController";
import AppDialog from "@/shared/Dialogs/AppDialog";
import LocalePath from "@/shared/LocalePath";
import { UseMutate } from "@/utils/hooks/useMutate";
import { saveCredentials } from "@/store/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import Success from "@/assets/images/success2.gif";
import { addForgetPassword } from "@/store/forget.slice";
import Cookies from "js-cookie";
import FormInput from "@/shared/form-controls/FormInput";
const Login: React.FC = () => {
  const [authStage, setAuthStage] = useState<AuthStage>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("");
  const router = useRouter();
  const locale = useLocale();
  const formSchema = yup.object({
    email: yup
      .string()
      .email("invalid_email_address")
      .required("email is a required field"),
    password: yup.string().required("password_required"),
  });
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: LoginMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "login",
    onSuccess: async (responseData: any) => {
      if (responseData?.data) {
        if (+responseData.data.is_verify == 0) {
          dispatch(
            addForgetPassword({
              phone: responseData.data?.phone,
              phone_code: responseData.data?.phone_code,
              email: responseData.data?.email,
            })
          );
          router.replace(
            `${locale == "ar" ? "" : "/en"}/auth/verify-code-phone`
          );
        } else {
          await Swal.fire({
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
          await dispatch(saveCredentials(responseData.data));
          Cookies.remove("guest");
          router.replace(`${locale == "ar" ? "/" : "/en"}`);
        }
      }
    },
    onError: (error: any) => {
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
      email: values?.email,
      password: values?.password,
    };
    await Swal.fire({
      title: "message",
      timer: 3000,
      showConfirmButton: false,
      imageUrl: `${Success.src}`,
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
      },
      padding: "1rem",
    });
    router.replace(`${locale == "ar" ? "/" : "/en"}`);

    // LoginMutate(finalOut);
  }
  return (
    <>
      <div className="flex flex-col gap-3 md:w-[560px] h-fit p-4">
        <div className="mb-3">
          <h3 className="text-[24px] font-normal text-center">
            {t("Auth.be_login")}
          </h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormInput
                name="email"
                label="email"
                className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
                placeholder="email"
              />
              <PasswordController
                // @ts-ignore
                name="password"
                label="password"
                placeholder="password"
                className="h-16 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
              />
            </div>
            <div className="!pt-2">
              <div className="flex justify-end ">
                <button
                  onClick={() => {
                    router.replace(
                      `${
                        locale == "ar" ? "" : "/en"
                      }/auth/forget-password/verify-email`
                    );
                    // setAuthStage("TypeVerifyCode");
                    // setIsDialogOpen(true);
                  }}
                  type="button"
                  className="text-primary py-1 "
                >
                  {t("validations.forget_passsord")}
                </button>
              </div>

              <CustomBtn
                title={t("BUTTONS.login")}
                buttonType="submit"
                loader={false}
                disabled={false}
                button
                className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
              />
            </div>
          </form>
        </Form>
        <p className="text-start mt-4 ">
          {t("validations.don't_have_an_account")} {"  "}
          <LocalePath
            href={"/auth/register"}
            className="font-semibold hover:underline py-1 text-primary"
          >
            {t("validations.login_now")}
          </LocalePath>
        </p>
      </div>
      <AppDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      />
    </>
  );
};

export default Login;
