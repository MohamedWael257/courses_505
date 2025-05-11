/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import PasswordController from "@/shared/form-controls/PasswordController";
import { Checkbox } from "@/shared/ui/checkbox";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { AuthStage } from "@/components/Header";
import { Form } from "@/shared/ui/form";
import FormInput from "@/shared/form-controls/FormInput";

import CustomBtn from "@/shared/buttons/CustomBtn";
import { useRouter } from "next/navigation";
import AppDialog from "@/shared/Dialogs/AppDialog";
import { RiArrowLeftSLine } from "react-icons/ri";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { UseMutate } from "@/utils/hooks/useMutate";
import { useDispatch } from "react-redux";
import { addForgetPassword } from "@/store/forget.slice";

export default function VerifyEmail() {
  const [authStage, setAuthStage] = useState<AuthStage>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Parse directions if they exist
  const t = useTranslations("");
  const locale = useLocale();

  const formSchema = yup.object({
    email: yup.string().required("email is a required field"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { setValue } = form;
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: SendMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "send",
    onSuccess: (responseData: any) => {
      // @ts-ignore
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      router.replace(
        `${locale == "ar" ? "" : "/en"}/auth/forget-password/verify-code-email`
      );
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
  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    const finalOut = {
      email: values?.email,
    };

    // await SendMutate(finalOut);
    router.replace(
      `${locale == "ar" ? "" : "/en"}/auth/forget-password/verify-code-email`
    );
    dispatch(
      addForgetPassword({
        email: values?.email,
      })
    );
  }
  return (
    <>
      <div className="flex flex-col gap-3  md:w-[560px] h-fit p-4">
        <div className="mb-3">
          <h3 className="text-[24px] font-bold mb-4 text-center">
            {t("Text.reset_password")}
          </h3>
          <p className="text-[#A8A8A8] text-[14px]">
            {t("Text.verifyIdentityDesc", { number: 17 })}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormInput
                name="email"
                label="email"
                className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
                placeholder="email"
                // leftIcon={<Email />}
              />
            </div>

            <div className="!pt-2">
              <CustomBtn
                title={t("BUTTONS.next")}
                buttonType="submit"
                loader={false}
                disabled={false}
                button
                className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
              />
            </div>
          </form>
        </Form>
      </div>
      <AppDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      />
    </>
  );
}
