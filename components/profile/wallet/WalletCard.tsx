"use client";
import React, { useMemo, useState } from "react";
import WalletBG from "@/assets/images/walletbg.png";
import Hand from "@/assets/images/hand.png";

import ImageWithFallback from "@/shared/ImageWithFallback";
import "./WalletCard.scss";
import Money from "@/assets/flags/money-add.svg";
import { useLocale, useTranslations } from "next-intl";
import { UseMutate } from "@/utils/hooks/useMutate";
import Teleport from "@/shared/Teleport/Teleport";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { useForm } from "react-hook-form";
import FormInput from "@/shared/form-controls/FormInput";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { ScrollArea } from "@/shared/ui/scroll-area";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/shared/ui/form";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/auth.slice";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { RS } from "@/shared/Icons";
import FormTextarea from "@/shared/form-controls/FormTextarea";

type Props = {
  wallet: any;
  refetch: any;
};

export default function WalletCard({ wallet, refetch }: Props) {
  const t = useTranslations("");
  const locale = useLocale();
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { mutate: DepositMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "wallet/deposit",
    onSuccess: (responseData: any) => {
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      setIsDialogOpen(false);
      refetch();
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
  const formSchema = Yup.object({
    bank_name: Yup.string().required(t("is a required field")),
    bank_number: Yup.string().required(t("is a required field")),
    iban_number: Yup.string().required(t("is a required field")),
    amount: Yup.string().required(t("is a required field")),
    reason: Yup.string().required(t("is a required field")),
  });

  // Default Form Values
  const defaultValues = {
    bank_name: "",
    bank_number: "",
    iban_number: "",
    amount: "",
    reason: "",
  };

  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const onSubmit = async (values: any, actions: any) => {
    const finalOut = {
      amount: values?.amount,
    };
    DepositMutate(finalOut).then((res) => {
      dispatch(updateUser(finalOut));
    });
  };
  return (
    <>
      <div className="flex flex-col gap-4 p-4 rounded-xl bg-primary relative z-50 overflow-hidden">
        <div className="absolute top-0 end-[4.8rem] h-full w-1/2 z-1">
          <svg
            width="559"
            height="240"
            viewBox="0 0 559 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="106"
              cy="119"
              r="211"
              fill="#DFBFE3"
              fill-opacity="0.1"
            />
            <circle
              cx="247"
              cy="130"
              r="211"
              fill="#DFBFE3"
              fill-opacity="0.1"
            />
            <circle
              cx="348"
              cy="130"
              r="211"
              fill="#DFBFE3"
              fill-opacity="0.1"
            />
          </svg>
        </div>

        <h2 className=" text-2xl font-bold   leading-9 text-start text-white">
          أحمد محمد{" "}
        </h2>
        <br />
        <p className="text-lg font-normal   leading-7 text-start text-white">
          رصيدك الحالي{" "}
        </p>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center justify-start gap-2 lg:text-3xl text-lg font-bold lg:leading-10   leading-6 text-white">
            {wallet} <RS className="*:fill-white" />
          </h2>

          <button
            className="bg-white text-primary w-fit grid grid-cols-[auto_1fr] items-center gap-3 backdrop-blur-sm py-2 px-8 rounded-2xl text-xl  font-medium   leading-8 border-[1px] border-white mt-3"
            onClick={() => setIsDialogOpen(true)}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6619 10.5253C19.9548 10.8182 19.9548 11.293 19.6619 11.5859L17.4624 13.7854C17.1695 14.0783 16.6946 14.0783 16.4018 13.7854C16.1089 13.4925 16.1089 13.0177 16.4018 12.7248L18.6012 10.5253C18.8941 10.2324 19.369 10.2324 19.6619 10.5253Z"
                fill="#4F008C"
              />
              <path
                d="M15.5852 14.5795C15.8781 14.8724 15.8781 15.3473 15.5852 15.6402L14.6065 16.6189C14.3137 16.9118 13.8388 16.9118 13.5459 16.6189C13.253 16.326 13.253 15.8511 13.5459 15.5582L14.5246 14.5795C14.8175 14.2866 15.2923 14.2866 15.5852 14.5795Z"
                fill="#4F008C"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.439 2.64434C12.2981 0.78522 15.3123 0.785221 17.1714 2.64434L21.8557 7.32858C23.7148 9.1877 23.7148 12.2019 21.8557 14.061L14.6667 21.25H20.5C20.9142 21.25 21.25 21.5858 21.25 22C21.25 22.4142 20.9142 22.75 20.5 22.75H4.5C4.08579 22.75 3.75 22.4142 3.75 22C3.75 21.5858 4.08579 21.25 4.5 21.25H7.72292L3.14434 16.6714C1.28522 14.8123 1.28522 11.7981 3.14434 9.93895L10.439 2.64434ZM11.4996 3.705C12.6307 2.57389 14.3861 2.44755 15.6567 3.32599L3.82597 15.1567C2.94755 13.8861 3.0739 12.1307 4.205 10.9996L11.4996 3.705ZM8.88924 20.295L4.84909 16.2548L16.7549 4.34912L20.795 8.38924C22.0683 9.66257 22.0683 11.7271 20.795 13.0004L13.5004 20.295C12.2271 21.5683 10.1626 21.5683 8.88924 20.295Z"
                fill="#4F008C"
              />
            </svg>
            سحب
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <Teleport to="body">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={`w-[90%] xl:w-[650px] max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark `}
            >
              <div className="flex flex-col gap-3 pt-3 w-full p-4">
                <ScrollArea
                  className="grow "
                  dir={locale === "en" ? "ltr" : "rtl"}
                >
                  <div className={`h-[600px] flex flex-col pe-2`}>
                    <div className="mb-3">
                      <h3 className="text-[24px] font-bold grid grid-cols-[auto_1fr] gap-2">
                        {t("Text.charge_wallet")}
                      </h3>
                    </div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                          <FormInput
                            name="bank_name"
                            label="bank_name"
                            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
                            placeholder="bank_name"
                            // leftIcon={<Email />}
                          />
                          <FormInput
                            name="bank_number"
                            label="bank_number"
                            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
                            placeholder="bank_number"
                            // leftIcon={<Email />}
                          />
                          <FormInput
                            name="iban_number"
                            label="iban_number"
                            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
                            placeholder="iban_number"
                            // leftIcon={<Email />}
                          />
                          <FormInput
                            name="amount"
                            label="amount"
                            className="h-14 placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder px-4  pe-10"
                            placeholder="amount"
                            // leftIcon={<Email />}
                          />
                          <FormTextarea
                            name="reason"
                            label="reason_withdrawal"
                            className="md:h-[125px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-xl px-2 pe-5"
                            placeholder="reason_withdrawal"
                            // leftIcon={<Email />}
                          />
                        </div>
                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setIsDialogOpen(false)}
                            type="button"
                            disabled={LoadingComplete}
                            className="rounded-full font-bold w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-white hover:bg-primary hover:text-white transition-colors text-primary border border-primary"
                          >
                            {t("BUTTONS.cancel")}
                          </button>
                          <CustomBtn
                            title={t("BUTTONS.confirm")}
                            buttonType="submit"
                            loader={LoadingComplete}
                            disabled={LoadingComplete}
                            button
                            className="!rounded-full font-bold !w-[177px] px-12s  text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-primary text-white"
                          />
                        </div>
                      </form>
                    </Form>
                  </div>
                </ScrollArea>
              </div>
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
}
