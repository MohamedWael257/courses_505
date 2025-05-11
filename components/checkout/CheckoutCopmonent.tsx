/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutSummary from "./CheckoutSummary";
import axiosInstance from "@/utils/axiosClient";
import EmptyCart from "../cart/EmptyCart";
import Loader from "@/shared/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { SessionType } from "../Header";
import UseSession from "@/store/UseSession";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form } from "@/shared/ui/form";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";
import Success from "@/assets/images/success2.gif";
import { clearCart } from "@/store/cartStore.slice";

type Props = {
  code: any;
};

export default function CheckoutCopmonent({ code }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const { location_id } = useSelector(
    (state: RootState) => state.locationConfig
  );

  const formSchema = yup.object({
    full_name: yup
      .string()
      .required("name is a required field")
      .matches(/^(\S+\s)+\S+(\S|$)/, "The value must be two words")
      .max(250, "The full name must be less than 250 characters"),
    email: yup
      .string()
      .email("invalid_email_address")
      .required("email is a required field"),
    phone: yup.string().required("phone_required"),

    phone_code: yup.string(),
    country_id: yup.string().required("country is a required field"),
    level: yup.string().required("level is a required field"),
    payment_method: yup.string().required("this_field_is_required"),
    location: yup.string().required("this_field_is_required"),
    addtional_phone: yup.string().required("this_field_is_required"),
    addtional_phone_code: yup.string().required("this_field_is_required"),
    city_id: yup.string().required("this_field_is_required"),
    location_id: yup.string().required("this_field_is_required"),
    address_id: yup.string().required("this_field_is_required"),
    location_name: yup.string().required("this_field_is_required"),
    location_number: yup.string().required("this_field_is_required"),
    room_number: yup.string().required("this_field_is_required"),
    location_discription: yup.string().required("this_field_is_required"),
    location_email: yup.string().required("this_field_is_required"),
    location_defalut: yup.string().required("this_field_is_required"),
  });
  const form = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      phone_code: "",
      country_id: "",
      level: "",

      location: "",
      addtional_phone: "",
      addtional_phone_code: "",
      city_id: "",
      location_id: "",
      address_id: "",
      location_name: "",
      location_number: "",
      room_number: "",
      location_discription: "",
      location_email: "",
      location_defalut: "",

      payment_method: "",
    },
  });
  const { getValues, setValue, watch } = form;

  //  const { mutate: RegisterMutate, isLoading: LoadingComplete } = UseMutate({
  //   endpoint: "complete-register",
  //   onSuccess: (responseData: any) => {
  //     // setTimeout(() => {
  //     //   setIsDialogOpen(true);
  //     //   setAuthStage("TypeVerifyCodeRegister");
  //     // }, 300);
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "success",
  //       title: responseData?.message,
  //     });
  //     router.replace(`${locale == "ar" ? "" : "/en"}/auth/verify-code-email`);
  //   },

  //   onError: (error: any) => {
  //     // @ts-ignore
  //     const errorMessage = error?.message;
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "error",
  //       title: errorMessage,
  //     });
  //   },
  // });
  // const fetchData = async () => {
  //   try {
  //     const [response1, response2, response3] = await Promise.all([
  //       axiosInstance.get(`cart?code=${code}`),
  //       axiosInstanceGeneralClient.get("settings"),
  //       memoizedSession && axiosInstance.get(`locations`),
  //     ]);

  //     setData(response1.data); // or process both responses if necessary
  //     setSettings(response2.data.data); // or process both responses if necessary
  //     if (memoizedSession) {
  //       setLocations(response3?.data?.data);
  //     }
  //     //  setCoupons(response2.data.data); // or process both responses if necessary
  //   } catch (error: any) {
  //     ShowAlertMixin({
  //       type: 15,
  //       icon: "error",
  //       title: error?.response?.data?.message,
  //     });
  //   } finally {
  //     setIsLoadingFirstTime(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  async function onSubmit(
    values: yup.InferType<typeof formSchema>,
    actions: any
  ) {
    const finalOut = {
      full_name: values?.full_name,
      email: values?.email,
      phone: values?.phone,
      phone_code: values?.phone_code,
      country_id: values?.country_id,
      level: values?.level,
      location: values?.location,
      addtional_phone: values?.addtional_phone,
      addtional_phone_code: values?.addtional_phone_code,
      city_id: values?.city_id,
      location_id: values?.location_id,
      address_id: values?.address_id,
      location_name: values?.location_name,
      location_number: values?.location_number,
      room_number: values?.room_number,
      location_discription: values?.location_discription,
      location_email: values?.location_email,
      location_defalut: values?.location_defalut,
      payment_method: values?.payment_method,
    };
    Swal.fire({
      title: "res?.data?.message",
      showConfirmButton: false,
      imageUrl: `${Success.src}`,
      footer: `<p id="swal2-footer"> ${t("Text.goToMyOrders")}</p>`,
      customClass: {
        popup: "custom-popup-class",
        title: "custom-title-class",
        footer: "custom-footer-class",
      },
      padding: "1rem",
      didOpen: () => {
        const footerLink = document.getElementById("swal2-footer");

        if (footerLink) {
          footerLink.addEventListener("click", () => {
            Swal.close();
            router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
            dispatch(clearCart());
          });
        }
      },
    });
    setTimeout(() => {
      Swal.close();
      router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
      dispatch(clearCart());
    }, 3000);
    setIsLoading(false);
  }
  return (
    <>
      {/* {isLoadingFirstTime ? (
        <Loader />
      ) : data?.data?.length > 0 ? (
        <> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="container py-8 grid lg:grid-cols-[2fr_1fr] gap-4 overflow-hidden">
            <div>
              <CheckoutDetails
                data={data}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                form={form}
                // refresh={fetchData}
              />
            </div>
            <CheckoutSummary
              isLoading={false}
              location_id={location_id}
              data={data}
              code={code}
              locations={locations}
              memoizedSession={memoizedSession}
              getValues={getValues}
              setValue={setValue}
              watch={watch}
              form={form}
            />
          </div>
        </form>
      </Form>
      {/* </>
       ) : (
         <EmptyCart />
       )} */}
    </>
  );
}
