"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import PasswordController from "../../form-controls/PasswordController";
import { Checkbox } from "../../ui/checkbox";
import PhoneNumber from "../../form-controls/PhoneNumber";
import { ScrollArea } from "../../ui/scroll-area";
import { AuthStage } from "@/components/Header";
import { Form } from "@/shared/ui/form";
import FormInput from "@/shared/form-controls/FormInput";

import CustomBtn from "@/shared/buttons/CustomBtn";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface EmailVerifyProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
}

const EmailVerify: React.FC<EmailVerifyProps> = ({
  setAuthStage,
  dialogOpen,
}) => {
  const [throwErrorPhone, setThrowErrorPhone] = useState(false);

  // Parse directions if they exist
  const t = useTranslations("");
  const locale = useLocale();

  const formSchema = yup.object({
    email: yup.string().required("this_field_is_required"),
  });

  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { setValue } = form;

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    // @ts-ignore
    // if (values.phone === "") {
    //   setThrowErrorPhone(true);
    //   return;
    // } else {
    //   setThrowErrorPhone(false);
    // }

    // try {
    //   const registerData: any = await register({
    //     ...values,
    //     // lat: parsedDirections?.latitude || null,
    //     // lng: parsedDirections?.longitude || null,
    //     device_token: "ssss",
    //     type: "ios",
    //   }).unwrap();

    //   dispatch(
    //     addForgetPassword({
    //       phone: values.phone,
    //       phone_code: values.phone_code,
    //     })
    //   );

    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: t("Successful operation"),
    });
    //   // router.replace('/auth/verify-code');
    setAuthStage("verify");
    // } catch (err: any) {
    //   notify("error", err?.data?.message);
    // }
  }

  return (
    <div className="flex flex-col gap-0 pt-8 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[450px] flex flex-col pe-2`}>
          <div className="mb-6">
            <h3 className="text-[24px] font-bold">{t("Text.verifyEmail")}</h3>
            <p className="text-[#A8A8A8] text-[14px]">
              {t("Text.verifyEmailDesc")}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8">
                <FormInput
                  name="email"
                  label="email"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#F4F4F3]  outline-0	rounded-[12px] border-none pe-10"
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
      </ScrollArea>
    </div>
  );
};

export default EmailVerify;
