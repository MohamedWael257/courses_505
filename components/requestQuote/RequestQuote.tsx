"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form";
import FormInput from "@/shared/form-controls/FormInput";
import FormSelect from "@/shared/form-controls/FormSelect";
import axiosInstance from "@/utils/axiosClient";
import { notify } from "@/utils/providers/toast";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import { FaLocationDot } from "react-icons/fa6";
import Loader from "@/shared/Loader/Loader";
import CustomBtn from "@/shared/buttons/CustomBtn";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axiosInstanceGeneralClient from "@/utils/axiosClientGeneral";
import Success from "@/assets/images/success2.gif";

export default function RequestQuote() {
  const t = useTranslations("");

  const [optionsListFiles, setOptionsListFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState([]);

  const setting = settings?.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  const transformLevelData = (data: any) => {
    return data.map((level: any) => ({
      label: level.name || `level ${level.id}`, // Use `name` if available, otherwise use a default
      value: level.id.toString(), // Convert id to string if needed
    }));
  };

  // // Fetch levels
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     setLoading(true);
  //     try {
  //       const [response1, response2] = await Promise.all([
  //         axiosInstance.get("settings"),
  //         axiosInstance.get("files"),
  //       ]);
  //       const transformedCityData = transformLevelData(response2.data.data);
  //       setSettings(response1.data.data);
  //       setOptionsListFiles(transformedCityData);
  //     } catch (error: any) {
  //       const errorMessage = error?.response?.data?.message;
  //       ShowAlertMixin({
  //         type: 15,
  //         icon: "error",
  //         title: errorMessage,
  //       });
  //       setLoading(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCountries();
  // }, []); // Ensure locale is included in the dependencies if it can change

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    phone_code: "",
    file_id: "",
    order_details: "",
  };
  const formSchema = Yup.object({
    name: Yup.string().required(t("name is a required field")),
    email: Yup.string().required(t("email is a required field")),
    phone: Yup.string().required(t("phone_required")),
    phone_code: Yup.string(),
    file_id: Yup.string().required(t("file is a required field")),
    order_details: Yup.string().required(
      t("order_details is a required field")
    ),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues,
  });
  const handleSubmit = async (values: any, actions: any) => {
    Swal.fire({
      title: " لقد تلقينا رسالتك",
      text: "فريقنا سوف يتواصل معك قريباً",
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
            // router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
            // dispatch(clearCart());
          });
        }
      },
    });
    setTimeout(() => {
      Swal.close();
      // router.replace(`${locale == "ar" ? "" : "/en"}/profile/orders`);
      // dispatch(clearCart());
    }, 3000);
    form.reset();
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="containerr lg:px-16 px-4 !mb-24 mt-12">
          <div className="grid lg:grid-cols-2 lg:gap-20 gap-8 mt-8">
            <div>
              <h2 className=" text-2xl text-dark font-bold !leading-[56px] text-start mb-4">
                هل لديك طلب خاص؟{" "}
              </h2>
              <p className=" text-lg text-darkprimary font-medium !leading-[30px] text-start ">
                املأ البيانات المطلوبة لتحديد نوع الملف، محتواه، وصيغة التسليم
                المناسبة لك. فريقنا سيقوم بمراجعة طلبك والبدء في تنفيذه بدقة
                واحترافية.{" "}
              </p>
              {setting?.phones?.map((ele: any, index: number) => {
                return (
                  <div className="mt-6 grid grid-cols-[auto_1fr] items-center">
                    <FaLocationDot
                      size={35}
                      className="mx-4 text-error border-[1px] border-error/[.15] rounded-full p-2"
                    />
                    <div>
                      <p className=" text-base text-dark font-normal leading-6 text-start">
                        {setting?.location}
                      </p>
                    </div>
                  </div>
                );
              })}

              {setting?.phones?.map((ele: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="my-3 grid grid-cols-[auto_1fr] items-center"
                  >
                    <FaPhoneAlt
                      size={35}
                      className="mx-4 text-error border-[1px] border-error/[.15] rounded-full p-2"
                    />
                    <div>
                      <p className=" text-base text-text font-normal leading-6 text-start">
                        {ele?.phone} {"  "} {ele?.phone_code} {" + "}
                      </p>
                    </div>
                  </div>
                );
              })}
              {setting?.emails?.map((ele: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[auto_1fr] items-center my-3"
                  >
                    <MdOutlineEmail
                      size={35}
                      className="mx-4 text-error border-[1px] border-error/[.15] rounded-full p-2"
                    />
                    <div>
                      <p className=" text-base text-text font-normal leading-6 text-start">
                        {ele}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-2 bg-natural p-8 rounded-xl">
                  <FormInput
                    name="name"
                    label="name"
                    className="h-16 placeholder:text-[#2d2d2db2]  placeholder:font-[13px] outline-0	border-[1px] border-[#F3F6FC] rounded-full pe-5"
                    placeholder="name"
                  />

                  <FormInput
                    name="email"
                    label="email"
                    className="h-16 placeholder:text-[#2d2d2db2]  placeholder:font-[13px] outline-0	border-[1px] border-[#F3F6FC] rounded-full pe-5"
                    placeholder="email"
                  />

                  <PhoneNumber
                    className="rounded-full"
                    label="phone"
                    placeholder="phone"
                    country="sa"
                  />
                  <FormSelect
                    name="file_id"
                    label="file"
                    placeholder="file"
                    options={[]}
                    disabled={false}
                  />
                  <FormTextarea
                    name="order_details"
                    label="order_details"
                    className="md:h-[200px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-2xl"
                    placeholder="order_details"
                  />
                  <div className="!pt-4">
                    <CustomBtn
                      title={t("BUTTONS.confirm")}
                      buttonType="submit"
                      loader={false}
                      disabled={false}
                      button
                      className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
