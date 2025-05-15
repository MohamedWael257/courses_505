"use client";

import Link from "next/link";

// Lib
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PinInput from "react-pin-input";

// Chadcn component
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import ResendTheCode from "../../ResendCode/ResendCode";
import { ScrollArea } from "../../ui/scroll-area";
import { AuthStage } from "@/components/Header";
import { Form } from "@/shared/ui/form";

import CustomBtn from "@/shared/buttons/CustomBtn";
import { UseMutate } from "@/utils/hooks/useMutate";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

interface VerifyCodeProps {
  setAuthStage: (stage: AuthStage) => void;
  dialogOpen: (open: boolean) => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({
  setAuthStage,
  dialogOpen,
}) => {
  const [availableResetCode, setAvailableResetCode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(true);
  const [pinCodeValue, setPinCodeValue] = useState("");
  const locale = useLocale();
  const t = useTranslations("");
  const { storedValues } = useSelector(
    (state: RootState) => state.ForgetConfig
  );

  const formSchema = yup.object({
    code: yup
      .string()
      .required("code_required")
      .length(4, "The code must be equal 4 numbers"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const {
    formState: { errors },
  } = form;
  const { mutate: UpdatePhoneMutate, isLoading: LoadingCompleteUpdate } =
    UseMutate({
      endpoint: "profile/update-phone",
      onSuccess: (responseData: any) => {
        // @ts-ignore
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: responseData?.message,
        });
        dialogOpen(false);
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
  const { mutate: CheckCodeMutate, isLoading: LoadingCompleteCheck } =
    UseMutate({
      endpoint: "profile/check-code",
      onSuccess: (responseData: any) => {
        // @ts-ignore
        // ShowAlertMixin({
        //   type: 15,
        //   icon: "success",
        //   title: responseData?.message,
        // });
        // setAuthStage('welcome');
        // dialogOpen(false);
        UpdatePhoneMutate({
          code: pinCodeValue,
          phone: storedValues?.phone,
          phone_code: storedValues?.phone_code,
          _method: "patch",
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
      method: "POST",
    });
  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    // CheckCodeMutate({
    //   code: pinCodeValue,
    //   phone: storedValues?.phone,
    //   phone_code: storedValues?.phone_code,
    // });
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "success",
    });
  }

  // Resend Code
  const handleSendTime = async () => {
    //@ts-ignore
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: t("Successful operation"),
    });
    setTimerStarted(true);
    setAvailableResetCode(true);
  };

  return (
    <div className="flex flex-col gap-0 pt-8">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[400px] flex flex-col pe-2`}>
          <div className="mb-3">
            <h3 className="text-[24px] font-bold">
              {t("Text.verifyIdentityTitle")}
            </h3>
            <p className="text-[#A8A8A8] text-[14px]">
              <span className="text-[#191919]"></span>
              {t("validations.We have sent a 4-digit verification code to")}
              <bdi>{storedValues?.email}</bdi>
              {t("validations.Enter the code in the box below to continue")}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center justify-center gap-4 mt-10">
                <PinInput
                  length={4}
                  initialValue=""
                  onChange={(value, index) => {
                    setPinCodeValue(value);
                    form.setValue("code", value);
                  }}
                  type="numeric"
                  inputMode="number"
                  style={{ padding: "10px" }}
                  inputStyle={{
                    borderColor:
                      errors["code"] && errors["code"]?.message
                        ? "#ef233c"
                        : "#F4F4F4",
                    backgroundColor: "transparent",
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    borderWidth: "2px",
                  }}
                  inputFocusStyle={{
                    borderColor: "#E6E6E6",
                    backgroundColor: "white",
                  }}
                  placeholder="-"
                  autoSelect={true}
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                {errors["code"] && errors["code"]?.message && (
                  <p className="text-error text-sm font-bold leading-5">
                    {errors["code"]?.message}
                  </p>
                )}
                <ResendTheCode
                  action={handleSendTime}
                  available={availableResetCode}
                  timerStart={timerStarted}
                  setAvailableResetCode={setAvailableResetCode}
                  setTimerStarted={setTimerStarted}
                />

                <div className="!pt-2 w-full h-max ">
                  <CustomBtn
                    title={t("BUTTONS.confirm")}
                    buttonType="submit"
                    button
                    loader={false}
                    disabled={false}
                    className="!w-full  !h-[56px] !rounded-full "
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default VerifyCode;
