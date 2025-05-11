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
    amount: Yup.string().required(t("amount is a required field")),
  });

  // Default Form Values
  const defaultValues = {
    amount: "",
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
      <div className="flex justify-between p-4 rounded-xl wallet-card">
        <div className="flex flex-col gap-4">
          <h2 className=" text-2xl font-bold   leading-9 text-start">
            {memoizedSession?.full_name}
          </h2>
          <br />
          <p className="text-lg font-normal   leading-7 text-start">
            {t("Text.walletCurrent")}
          </p>
          <h2 className="text-start lg:text-4xl text-xl font-bold lg:leading-10   leading-6">
            {wallet} {t("Text.RS")}
          </h2>
          <button
            className="bg-[#FFFFFF2E] w-fit grid grid-cols-[auto_1fr] items-center gap-3 backdrop-blur-sm py-2 px-8 rounded-3xl text-xl  font-medium   leading-8 border-[1px] border-white mt-3"
            onClick={() => setIsDialogOpen(true)}
          >
            <ImageWithFallback
              src={Money}
              width={900}
              height={900}
              className="md:w-[20px] md:h-[20px] w-12 h-12 object-containn"
              alt="hero"
            />
            {t("BUTTONS.addWallet")}
          </button>
        </div>
        <ImageWithFallback
          src={Hand}
          width={1000}
          height={1000}
          alt="hand"
          className="md:w-56 md:h-64 w-40 h-40 object-cover"
        />
      </div>
      {isDialogOpen && (
        <Teleport to="body">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={`w-[90%] xl:w-[500px] max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark `}
            >
              <div className="flex flex-col gap-3 pt-8 w-full p-4">
                <ScrollArea
                  className="grow "
                  dir={locale === "en" ? "ltr" : "rtl"}
                >
                  <div className={`h-[300px] flex flex-col pe-2`}>
                    <h2 className="capitalize font-semibold lg:text-[34px] text-3xl text-center lg:leading-[50px]   leading-8 mb-3 ">
                      {t("Text.charge_wallet")}
                    </h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput
                          name="amount"
                          label="amount"
                          className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-[12px] border border-subborder pe-10"
                          placeholder="amount"
                          // leftIcon={<Email />}
                        />

                        <div className="!pt-2 z-[1] relative">
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
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
}
