"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React, { useState } from "react";
import Coupons from "@/assets/images/coupons.png";
import Teleport from "@/shared/Teleport/Teleport";

import CouponsForm from "@/components/appforms/CouponsForm";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
type Props = { refetch: any };

export default function CouponsAdd({ refetch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      <div className="p-4 bg-white rounded-xl mb-4">
        <div className="sm:flex justify-between gap-4 items-center ">
          <div className="flex items-center  gap-4">
            <ImageWithFallback
              src={Coupons}
              width={1790}
              height={900}
              className="w-[56px] h-[56px] object-contain  "
              alt="hero"
            />
            <div>
              <h2 className="capitalize font-bold lg:text-xl text-lg text-start lg:leading-[50px]   leading-8">
                {t("Text.couponsTitle")}
              </h2>
              <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start">
                {t("Text.couponsDesc")}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className=" w-fit   font-semibold text-base   leading-5 text-center bg-secprimary  whitespace-nowrap text-primary  transition-colors border-[1px] border-primary   px-10 py-3 rounded-2xl flex items-center gap-3 mt-4 sm:mt-0"
          >
            {t("BUTTONS.addvoucher")}
          </button>
        </div>
      </div>
      {isOpen && (
        <Teleport to="body">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-[90%] xl:w-[500px] max-w-[90%] xl:max-w-[60%] bg-white border-2 border-greynormal"
            >
              <div className="absolute top-0 end-0 w-full   flex items-center justify-start gap-3 bg-secprimary py-8 px-4">
                <ImageWithFallback
                  src={Coupons}
                  width={1790}
                  height={900}
                  className="w-[56px] h-[56px] object-contain  "
                  alt="hero"
                />
                <div>
                  <h2 className="capitalize font-bold lg:text-xl text-lg text-start lg:leading-[50px]   leading-8">
                    {t("Text.couponsTitle")}
                  </h2>
                  <h2 className="text-secondrydark  text-base font-medium   leading-7 text-start">
                    {t("Text.couponsDesc")}
                  </h2>
                </div>
              </div>
              <br />
              <CouponsForm refetch={refetch} setOpen={setIsOpen} />
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
}
