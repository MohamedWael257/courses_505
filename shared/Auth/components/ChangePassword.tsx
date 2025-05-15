"use client";

import Link from "next/link";

// Lib
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import SecondaryButton from "../../buttons/SecondaryButton";
import FormInput from "../../form-controls/FormInput";
import PasswordController from "../../form-controls/PasswordController";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ScrollArea } from "../../ui/scroll-area";

import { Form } from "@/shared/ui/form";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { AuthStage } from "@/components/Header";
import { UseMutate } from "@/utils/hooks/useMutate";
import { RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface VerifyCodeProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
}
const ChangePassword: React.FC<VerifyCodeProps> = ({
  setAuthStage,
  dialogOpen,
}) => {
  const t = useTranslations("");
  const locale = useLocale();

  const router = useRouter();
  const { storedValues } = useSelector(
    (state: RootState) => state.ForgetConfig
  );

  const formSchema = yup.object({
    current_password: yup.string().required("this_field_is_required"),
    password: yup.string().required("this_field_is_required"),
    password_confirmation: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null as any], "Passwords don't match"),
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
        dialogOpen(false);
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
  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      current_password: values?.current_password,
      password: values?.password,
      password_confirmation: values?.password_confirmation,
    };
    UpdateProfileMutate(finalOut, {
      onSuccess: () => {
        actions.setSubmitting(false);
      },
    });
  }

  return (
    <div className="flex flex-col gap-0 pt-8 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`md:h-[520px] flex flex-col pe-2`}>
          <div className="mb-3">
            <h3 className="text-[24px] font-normal">
              {t("Text.Set a new password")}
            </h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <PasswordController
                  // @ts-ignore
                  name="current_password"
                  label="old_password"
                  placeholder="old_password"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#F4F4F3]  outline-0	rounded-full border-none pe-10"
                />
                <PasswordController
                  // @ts-ignore
                  name="password"
                  label="new_password"
                  placeholder="new_password"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#F4F4F3]  outline-0	rounded-full border-none pe-10"
                />

                <PasswordController
                  // @ts-ignore
                  name="password_confirmation"
                  label="confirm_new_password"
                  placeholder="confirm_new_password"
                  className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#F4F4F3]  outline-0	rounded-full border-none pe-10"
                />
              </div>

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
  );
};

export default ChangePassword;
