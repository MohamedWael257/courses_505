"use client";
import { CiHeadphones } from "react-icons/ci";
import React, { useState } from "react";
import Teleport from "@/shared/Teleport/Teleport";
import QuestionsForm from "@/components/appforms/QuestionsForm";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/shared/ui/dialog";

export default function OrderQuestionierButton({ refetch }: { refetch: any }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      <div className="bg-white rounded-xl p-4">
        <h2 className="capitalize font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8 mb-3 ">
          {t("Text.orderQuestionier")}
        </h2>

        <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start">
          {t("Text.orderQuestionierDesc")}
        </h2>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="w-full mt-4 flex items-center justify-center gap-3 p-4 rounded-xl border border-primary text-primary bg-secprimary text-xl font-medium   leading-8"
        >
          {t("BUTTONS.contactUs")}
          <CiHeadphones size={30} />
        </button>
      </div>
      {open && (
        <Teleport to="body">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-[90%] xl:w-[600px] max-w-[90%] xl:max-w-[60%] bg-white border-2 border-greynormal"
            >
              <QuestionsForm refetch={refetch} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
}
