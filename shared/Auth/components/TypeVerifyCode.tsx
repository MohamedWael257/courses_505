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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ScrollArea } from "../../ui/scroll-area";
import PhoneNumber from "../../form-controls/PhoneNumber";
import { useState } from "react";
import { AuthStage } from "@/components/Header";
import { Form } from "@/shared/ui/form";
import CustomBtn from "@/shared/buttons/CustomBtn";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import { UseMutate } from "@/utils/hooks/useMutate";

interface TypeVerifyCodeProps {
  dialogOpen: (open: boolean) => void;
}
const TypeVerifyCode: React.FC<TypeVerifyCodeProps> = ({ dialogOpen }) => {
  const t = useTranslations("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [throwErrorPhone, setThrowErrorPhone] = useState(false);
  const locale = useLocale();

  const formSchema = yup.object({
    type: yup.string().required("this_field_is_required"),
  });
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      type: "",
    },
  });
  const { setValue, watch } = form;
  const selectedTypeVerify = watch("type"); // Watch TypeVerify changes

  async function onSubmit(values: any) {
    if (values?.type == "email") {
      router.replace(
        `${locale == "ar" ? "" : "/en"}/auth/forget-password/verify-email`
      );
      dialogOpen(false);
    } else if (values?.type == "phone") {
      router.replace(
        `${locale == "ar" ? "" : "/en"}/auth/forget-password/verify-phone`
      );
      dialogOpen(false);
    }
  }

  // Resend Code
  const handleSendTime = async () => {};

  return (
    <div className="flex flex-col gap-0 pt-8 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[425px] flex flex-col pe-2 mt-3`}>
          <div className="mb-6">
            <div className="mb-6">
              <h3 className="text-[24px] font-bold">نسيت كلمة المرور </h3>
              <p className="text-[#A8A8A8] text-[14px]">
                حدد تفاصيل الاتصال التي يجب أن نستخدمها لإعادة تعيين كلمة المرور
                الخاصة بك{" "}
              </p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <RadioGroup
                dir={`${locale == "ar" ? "rtl" : "ltr"}`}
                value={selectedTypeVerify}
                onValueChange={(value) => setValue("type", value)}
                className="grid  gap-4"
              >
                <div
                  className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-lg ${
                    selectedTypeVerify == "phone"
                      ? "border-primary"
                      : "border-greynormal"
                  }`}
                  onClick={() => setValue("type", "phone")}
                >
                  <label htmlFor="phone">
                    <div className="flex gap-3 items-center">
                      <FaWhatsapp
                        size={40}
                        className="p-2 bg-secprimary rounded-xl text-darkprimary"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-[#A8A8A8] text-[14px]">
                          {t("Text.sendViaPhone")}
                        </p>
                        <h3 className="text-xl font-bold">**************</h3>
                      </div>
                    </div>
                  </label>
                  <RadioGroupItem value="phone" id="phone" />
                </div>
                <div
                  className={`flex justify-between items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-lg ${
                    selectedTypeVerify == "email"
                      ? "border-primary"
                      : "border-greynormal"
                  }`}
                  onClick={() => setValue("type", "email")}
                >
                  <label htmlFor="email">
                    <div className="flex gap-3 items-center">
                      <AiOutlineMail
                        size={40}
                        className="p-2 bg-secprimary rounded-xl text-darkprimary"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-[#684b4b] text-[14px]">
                          {t("Text.sendViaEmail")}
                        </p>
                        <h3 className="text-xl font-bold">example@gmail.com</h3>
                      </div>
                    </div>
                  </label>
                  <RadioGroupItem value="email" id="email" />
                </div>
              </RadioGroup>
              <div className="!pt-2 z-[1] relative">
                <CustomBtn
                  title={t("BUTTONS.next")}
                  buttonType="submit"
                  disabled={false}
                  loader={false}
                  button
                  className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
                />
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TypeVerifyCode;
