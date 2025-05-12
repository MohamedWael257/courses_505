"use client";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { SessionType } from "../Header";
import UseSession from "@/store/UseSession";
import CheckoutPersonalForm from "./CheckoutPersonalForm";
import CheckoutLocationForm from "./CheckoutLocationForm";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import Image from "@/assets/test.jpg";
type Props = {
  data: any;
  form: any;
  setValue: any;
  watch: any;
  getValues: any;
  // refresh: any;
};

export default function CheckoutDetails({
  data,
  form,
  getValues,
  setValue,
  watch,
}: // refresh,
Props) {
  const locale = useLocale();
  const t = useTranslations();

  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const selectedTypePayment = watch("payment_method"); // Watch TypeVerify changes

  return (
    <>
      {/* Order */}
      <div>
        <div>
          <h2 className="capitalize text-text font-bold lg:text-2xl text-xl text-start lg:leading-[50px]   leading-8  mb-4">
            {t("Text.order")}
          </h2>

          <div className="bg-white shadow-md rounded-xl h-fit p-4">
            <h2 className="text-base font-bold  leading-5 text-start text-secondrydark">
              {t("Text.orderProducts", { count: data?.data?.length })}
            </h2>
            <div className="h-0.5 bg-greynormal my-4"></div>
            {/* <div className="w-full overflow-x-auto whitespace-nowrap mb-8"> */}
            <div className="flexx grid lg:grid-cols-3 md:grid-cols-2 gap-4 px-2 mb-4 ">
              {/* {data?.data?.map((ele: any, index: number) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  //data-aos-duration={`${index * 30}`}
                  className="grid grid-cols-[auto_1fr] items-center gap-2"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={ele?.product?.main?.media}
                      alt={"ele?.product"}
                      width={800}
                      height={800}
                      className="w-[100px] h-[80px] object-cover rounded-2xl"
                    />
                    <p className="bg-greynormal w-6 h-6 grid place-content-center rounded-full absolute top-0 start-2 shadow-card-shadow">
                      X{ele?.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base font-normal   leading-4 text-start text-secondrydark">
                      {ele?.product?.vendor?.username}
                    </p>
                    <h2 className="text-sm font-normal   leading-5 text-start text-text ">
                      {ele?.product?.name}
                    </h2>
                   
                    <p className=" font-bold text-base    leading-5 text-start text-text">
                      {ele?.product?.price}
                      {"  "} {t("SR")}
                    </p>
                  </div>
                </div>
              ))} */}
              {[...Array(5)].map((ele, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  //data-aos-duration={`${index * 30}`}
                  className="grid grid-cols-[auto_1fr] items-center gap-2"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={Image}
                      alt={"ele?.product"}
                      width={800}
                      height={800}
                      className="w-[120px] h-[80px] object-cover rounded-2xl"
                    />
                    <p className="bg-primary text-base font-medium text-white w-6 h-6 grid place-content-center rounded-full absolute top-0 start-0 shadow-card-shadow">
                      2
                    </p>
                  </div>
                  <h2 className="text-sm font-normal  leading-6 line-clamp-2 text-start text-text ">
                    كيفية بناء علامتك التجارية الدولية في مجال العمل الحر{" "}
                  </h2>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>
        <br />

        {/* Personal Data */}
        <CheckoutPersonalForm />
        <br />
        {/* location Dataa*/}
        <CheckoutLocationForm />
        <br />

        {/* payment type */}
        <CheckoutPaymentForm
          setValue={setValue}
          selectedTypePayment={selectedTypePayment}
        />
      </div>
    </>
  );
}
