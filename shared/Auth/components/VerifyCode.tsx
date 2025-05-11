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
    code: yup.string().required("this_field_is_required"),
  });
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
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
    CheckCodeMutate({
      code: pinCodeValue,
      phone: storedValues?.phone,
      phone_code: storedValues?.phone_code,
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
          <div className="mb-6">
            <h3 className="text-[24px] font-bold">
              {t("Text.verifyIdentity")}
            </h3>
            <p className="text-[#A8A8A8] text-[14px]">
              <span className="text-[#191919]">
                {t("Text.We have sent a 4-digit verification code to")}
              </span>
              <bdi> *** *** *** {String(storedValues?.phone).slice(-2)}</bdi>
              {t("Text.verifyIdentityDesc2")}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center justify-center gap-8 mt-10">
                <PinInput
                  length={5}
                  initialValue=""
                  onChange={(value, index) => {
                    setPinCodeValue(value);
                  }}
                  type="numeric"
                  inputMode="number"
                  style={{ padding: "10px" }}
                  inputStyle={{
                    borderColor: "transparent",
                    backgroundColor: "#F4F4F4",
                    width: "72px",
                    height: "72px",
                    borderRadius: "12px",
                  }}
                  inputFocusStyle={{
                    borderColor: "#E6E6E6",
                    backgroundColor: "white",
                  }}
                  autoSelect={true}
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />

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
                    loader={LoadingCompleteUpdate || LoadingCompleteCheck}
                    disabled={LoadingCompleteUpdate || LoadingCompleteCheck}
                    className="!w-full  !h-[56px] !rounded-[12px] "
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
