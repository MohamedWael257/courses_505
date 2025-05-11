/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutSummary from "./CheckoutSummary";
import axiosInstance from "@/utils/axiosClient";
import EmptyCart from "../cart/EmptyCart";
import Loader from "@/shared/Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import { SessionType } from "../Header";
import UseSession from "@/store/UseSession";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form } from "@/shared/ui/form";

type Props = {
  code: any;
};

export default function CheckoutCopmonent({ code }: Props) {
  const [data, setData] = useState<any>(null);
  const [locations, setLocations] = useState<any>(null);
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);

  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);
  const { location_id } = useSelector(
    (state: RootState) => state.locationConfig
  );
  const [shipping_type, setShipping_type] = useState<any>("");
  const [shipping_Value, setShipping_Value] = useState<any>("");

  const [payment_method, setPayment_method] = useState<any>("");
  const [settings, setSettings] = useState<any>(null);
  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
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
      shipping_type: yup.string().required("this_field_is_required"),
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
      city_id:"",
      location_id:"",
      address_id:"",
home_number:"",
room_number:"",
location_discription:"",
location_email:"",
location_defalut:"",
      payment_method: "",
        shipping_type: "",
      },
    });
  const { getvalues,setValue, watch } = form;
  const selectedTypeShipping = watch("shipping_type"); // Watch TypeVerify changes
  const selectedTypePayment = watch("payment_method"); // Watch TypeVerify changes
 
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
    // @ts-ignore
    // if (values.phone === "") {
    //   setThrowErrorPhone(true);
    //   return;
    // } else {
    //   setThrowErrorPhone(false);
    // }
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
      city_id:values?.city_id,
      location_id:values?.location_id,
      address_id:values?.address_id,
home_number:values?.home_number,
room_number:values?.room_number,
location_discription:values?.location_discription,
location_email:values?.location_email,
location_defalut:values?.location_defalut,
      payment_method: values?.payment_method,
        shipping_type: values?.shipping_type,
    };
    ShowAlertMixin({
      type: 15,
      icon: "success",
      title: "success",
    });
    router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
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
            setPayment_method={setPayment_method}
            setShipping_type={setShipping_type}
            setShipping_Value={setShipping_Value}
            data={data}
            setting={setting}
            locations={locations}
            // refresh={fetchData}
          />
        </div>
        <CheckoutSummary
          location_id={location_id}
          payment_method={payment_method}
          shipping_type={shipping_type}
          shipping_Value={shipping_Value}
          data={data}
          code={code}
          locations={locations}
          memoizedSession={memoizedSession}
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
