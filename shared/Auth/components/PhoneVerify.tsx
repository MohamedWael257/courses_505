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
import { addForgetPassword } from "@/store/forget.slice";
import { useDispatch, useSelector } from "react-redux";
import { UseMutate } from "@/utils/hooks/useMutate";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface RegisterFormProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  setAuthStage,
  dialogOpen,
}) => {
  const [throwErrorPhone, setThrowErrorPhone] = useState(false);
  // Parse directions if they exist
  const t = useTranslations("");
  const locale = useLocale();

  const formSchema = yup.object({
    phone: yup.string().required("this_field_is_required"),
    phone_code: yup.string(),
  });

  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      phone: "",
      phone_code: "",
    },
  });

  const dispatch = useDispatch();
  const { setValue } = form;
  const { mutate: EditPhoneMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "profile/edit-phone",
    onSuccess: (responseData: any) => {
      // @ts-ignore
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      setAuthStage("verify");
      // router.replace('/');
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
    method: "POST",
  });
  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    // @ts-ignore
    if (values.phone === "") {
      setThrowErrorPhone(true);
      return;
    } else {
      setThrowErrorPhone(false);
    }

    try {
      const finalOut = {
        phone: values?.phone,
        phone_code: values?.phone_code,
      };
      await EditPhoneMutate(finalOut, {
        onSuccess: () => {
          actions.setSubmitting(false);
        },
      });
      dispatch(
        addForgetPassword({
          phone: values.phone,
          phone_code: values.phone_code,
        })
      );
    } catch (err: any) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: err?.data?.message,
      });
    }
  }

  return (
    <div className="flex flex-col gap-0 pt-8 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[300px] flex flex-col pe-2`}>
          <div className="mb-3">
            <h3 className="text-[24px] font-bold my-2">
              {t("Text.verifyPhone")}
            </h3>
            <p className="text-[#A8A8A8] text-[14px]">
              {t("Text.verifyIdentityDesc", { number: 17 })}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <PhoneNumber
                  throwErrorPhone={throwErrorPhone}
                  country="sa"
                  label={"phoneNumber"}
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
      </ScrollArea>
    </div>
  );
};

export default RegisterForm;
