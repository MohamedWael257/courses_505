"use client";
import { AuthStage } from "@/components/Header";
import AppDialog from "@/shared/Dialogs/AppDialog";
import ImageWithFallback from "@/shared/ImageWithFallback";
import React, { useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { useTranslations } from "next-intl";
type Props = {
  products: any;
  status: any;
  vendor: any;
  orderId: any;
  refetch: any;
  // productId: any;
};

export default function OrderProducts({
  products,
  status,
  vendor,
  orderId,
  refetch,
}: // productId,
Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [authStage, setAuthStage] = useState<AuthStage>("cancelorder");
  const t = useTranslations("");
  const [rateable_id, setRateable_id] = useState<any>("");
  const [productId, setProductId] = useState<any>("");
  return (
    <>
      <div className="bg-white p-4 rounded-lg mb-4">
        <h2 className="text-lg text-darkprimary font-bold mb-4 text-start">
          {t("Text.products", { count: `${products?.length}` })}
        </h2>

        {products?.map((ele: any, index: number) => {
          console.log(+ele?.is_rated);

          return (
            <div
              key={index}
              className="border-b-[1px] pb-3 mb-3 border-greynormal"
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 mb-2 ">
                <div className="bg-greynormal p-3 rounded-xl flex justify-center items-center">
                  <ImageWithFallback
                    src={ele?.image?.media}
                    alt={"image"}
                    width={800}
                    height={800}
                    className="w-[80px] h-[80px] object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-base font-normal   leading-4 text-start text-secondrydark">
                    {vendor?.username}
                  </p>
                  <p className="text-lg font-medium   leading-6 line-clamp-1 text-start text-darkprimary">
                    {ele?.brand?.name}
                  </p>
                  <p className="text-base font-normal    leading-4 text-start text-secondrydark">
                    {ele?.name}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-lg text-darkprimary font-semibold   leading-5">
                      {ele?.price_after_discount > 0
                        ? ele?.price_after_discount
                        : ele?.unit_price}{" "}
                      {t("Text.SR")}
                    </p>
                    {ele?.price_after_discount > 0 && (
                      <p className="text-lg text-secondrydark font-normal line-through">
                        {ele?.unit_price} {"  "}
                        {t("Text.SR")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {status == "delivered_to_customer" && (
                <div className="flex gap-3">
                  {+ele?.is_refundable == 1 && +ele?.is_returned == 0 && (
                    <button
                      className="w-full p-2 rounded-xl flex gap-2 items-center justify-center text-secondrydark border-[1px] border-secondrydark text-base font-medium   leading-8"
                      onClick={() => {
                        setIsOpen(true);
                        setProductId(ele?.uuid);
                        setAuthStage("cancelproduct");
                      }}
                    >
                      {t("BUTTONS.refund")}
                      <IoSwapHorizontal size={25} />
                    </button>
                  )}
                  {+ele?.is_rated == 0 && (
                    <button
                      className="w-full bg-secprimary p-2 rounded-xl flex gap-2 items-center justify-center text-primary border-[1px] border-primary text-base font-medium   leading-8"
                      onClick={async () => {
                        await setRateable_id(ele?.product_id);
                        setIsOpen(true);
                        setAuthStage("productrate");
                      }}
                    >
                      {t("BUTTONS.productRate")}
                      <CiStar size={25} />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* {productId && ( */}
      <AppDialog
        width={authStage == "cancelproduct" ? "w-[600px]" : ""}
        setIsDialogOpen={setIsOpen}
        isDialogOpen={isOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
        productId={productId}
        rateable_id={rateable_id}
        orderId={orderId}
        refetch={refetch}
      />
      {/* )} */}
    </>
  );
}
