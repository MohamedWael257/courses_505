"use client";
import React, { useState } from "react";
import { useLocale } from "next-intl";
import { Dialog, DialogContent } from "../ui/dialog";
import VerifyCode from "../Auth/components/VerifyCode";
import ChangePassword from "../Auth/components/ChangePassword";
import Teleport from "../Teleport/Teleport";
import TypeVerifyCode from "../Auth/components/TypeVerifyCode";
import PhoneVerify from "../Auth/components/PhoneVerify";
import EmailVerify from "../Auth/components/EmailVerify";
import TypeVerifyCodeRegister from "../Auth/components/TypeVerifyCodeRegister";
import Welcome from "../Auth/components/Welcome";
import LocationForm from "@/components/appforms/LocationForm";
import CancelProductForm from "@/components/appforms/CancelProductForm";
import CancelOrderForm from "@/components/appforms/CancelOrderForm";
import ProductRateForm from "@/components/appforms/ProductRateForm";
import ProviderRateForm from "@/components/appforms/ProviderRateForm";
import ShippingRateForm from "@/components/appforms/ShippingRateForm";
import CheckoutAddresses from "@/components/checkout/CheckoutAddresses";
import ReturnOrderForm from "@/components/appforms/ReturnOrderForm";
import CourseRateForm from "@/components/appforms/CourseRateForm";
const AppDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  authStage,
  setAuthStage,
  width,
  refetch,
  refresh,
  orderId,
  productId,
  padding = true,
  rateable_id,
}: any) => {
  const locale = useLocale();

  return (
    <>
      {isDialogOpen && (
        <Teleport to="body">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={`${!padding && "!p-0"} w-[90%] ${
                width ? `xl-${width}` : "xl:w-[500px]"
              } max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark `}
              showCloseButton={authStage !== "welcome"}
            >
              {authStage === "verify" && (
                <VerifyCode
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                />
              )}
              {authStage === "TypeVerifyCode" && (
                <TypeVerifyCode dialogOpen={setIsDialogOpen} />
              )}
              {authStage === "TypeVerifyCodeRegister" && (
                <TypeVerifyCodeRegister dialogOpen={setIsDialogOpen} />
              )}

              {authStage === "welcome" && (
                <Welcome
                  dialogOpen={setIsDialogOpen}
                  isDialogOpen={isDialogOpen}
                />
              )}

              {authStage === "change-password" && (
                <ChangePassword
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                />
              )}
              {authStage === "phoneVerify" && (
                <PhoneVerify
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                />
              )}
              {authStage === "emailVerify" && (
                <EmailVerify
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                />
              )}
              {authStage === "locationData" && (
                <CheckoutAddresses
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                />
              )}

              {authStage === "location" && (
                <LocationForm
                  setAuthStage={setAuthStage}
                  dialogOpen={setIsDialogOpen}
                  refetch={refetch}
                  refresh={refresh}
                />
              )}

              {authStage === "cancelorder" && (
                <CancelOrderForm
                  orderId={orderId}
                  dialogOpen={setIsDialogOpen}
                  refetch={refetch}
                />
              )}
              {authStage === "returnorder" && (
                <ReturnOrderForm
                  orderId={orderId}
                  dialogOpen={setIsDialogOpen}
                  refetch={refetch}
                />
              )}
              {authStage === "cancelproduct" && (
                <CancelProductForm
                  dialogOpen={setIsDialogOpen}
                  productId={productId}
                  refetch={refetch}
                />
              )}

              {authStage === "productrate" && (
                <ProductRateForm
                  dialogOpen={setIsDialogOpen}
                  orderId={orderId}
                  rateable_id={rateable_id}
                  refetch={refetch}
                />
              )}
              {authStage === "providerrate" && (
                <ProviderRateForm
                  dialogOpen={setIsDialogOpen}
                  orderId={orderId}
                  rateable_id={rateable_id}
                  refetch={refetch}
                />
              )}
              {authStage === "shippingrate" && (
                <ShippingRateForm
                  dialogOpen={setIsDialogOpen}
                  orderId={orderId}
                />
              )}
              {authStage === "courserate" && (
                <CourseRateForm
                  dialogOpen={setIsDialogOpen}
                  orderId={orderId}
                  rateable_id={rateable_id}
                  refetch={refetch}
                />
              )}
            </DialogContent>
          </Dialog>
        </Teleport>
      )}
    </>
  );
};

export default AppDialog;
