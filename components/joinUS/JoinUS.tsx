"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import FormCheckbox from "@/shared/form-controls/FormCheckbox";
import FormUpload from "@/shared/form-controls/FormUpload";

export default function JoinUS() {
  const t = useTranslations("");
  const locale = useLocale();
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
    trader_name: "",
    nationality: "",
    image: "",
    email: "",
    phone: "",
    phone_code: "",
    experiences: "",
    level: "",
    spieciality: "",
    cv: "",
    gender: "",
    agree: false,
  };
  const formSchema = Yup.object({
    trader_name: Yup.string().required(t("trader_name is a required field")),
    nationality: Yup.string().required(t("nationality is a required field")),
    image: Yup.string().required(t("image is a required field")),
    email: Yup.string().required(t("email is a required field")),
    phone: Yup.string().required(t("phone_required")),
    phone_code: Yup.string(),
    experiences: Yup.string().required(t("experiences is a required field")),
    spieciality: Yup.string().required(t("spieciality is a required field")),
    cv: Yup.string().required(t("cv is a required field")),
    level: Yup.string().required(t("level is a required field")),
    gender: Yup.string().required(t("gender is a required field")),
    agree: Yup.boolean().required(t("agree is a required field")),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues,
  });

  const { setValue, getValues, watch } = form;
  const selectedGender = watch("gender");
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
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <div className="containerr lg:px-16 px-4 !mb-24 mt-12">
        <div className="grid lg:grid-cols-2 lg:gap-20 gap-8 mt-8">
          <div>
            <h2 className=" text-2xl text-darkprimary font-bold !leading-[56px] text-start mb-4">
              انضم لنا كمدرب{" "}
            </h2>
            <p className=" text-lg text-darkprimary font-medium !leading-[30px] text-start ">
              انضم إلى فريقنا من المدرّبين المتميزين وساهم في إحداث فرق حقيقي في
              حياة المتعلّمين من خلال مشاركة معرفتك وخبراتك العملية، عبر منصة
              توفر لك الأدوات والدعم اللازم لتقديم محتوى احترافي يليق بك.
            </p>
            {setting?.phones?.map((ele: any, index: number) => {
              return (
                <div
                  key={index}
                  className="mt-6 grid grid-cols-[auto_1fr] items-center">
                  <FaLocationDot
                    size={35}
                    className="mx-4 text-error border-[1px] border-error/[.15] rounded-full p-2"
                  />
                  <div>
                    <p className=" text-base text-darkprimary font-normal leading-6 text-start">
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
                    <p className=" text-base text-darkprimary font-normal leading-6 text-start">
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
                    <p className=" text-base text-darkprimary font-normal leading-6 text-start">
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
                  name="trader_name"
                  label="trader_name"
                  className="h-14 placeholder:text-[#2d2d2db2]  placeholder:font-[13px] outline-0	border-[1px] border-[#F3F6FC] rounded-full pe-5"
                  placeholder="trader_name"
                />
                <FormSelect
                  name="nationality"
                  label="nationality"
                  placeholder="nationality"
                  options={[]}
                  disabled={false}
                />
                <FormUpload
                  model="users"
                  type_file="image"
                  uploadText={"قم برفع صورة"}
                  name="image"
                  maxCount={1}
                  label="image"
                  initialFileList={[]}
                />
                <PhoneNumber label="phone" placeholder="phone" country="sa" />
                <FormInput
                  name="email"
                  label="email"
                  className="h-14 placeholder:text-[#2d2d2db2]  placeholder:font-[13px] outline-0	border-[1px] border-[#F3F6FC] rounded-full pe-5"
                  placeholder="email"
                />
                <FormInput
                  name="experiences"
                  label="experiences"
                  className="h-14 placeholder:text-[#2d2d2db2]  placeholder:font-[13px] outline-0	border-[1px] border-[#F3F6FC] rounded-full pe-5"
                  placeholder="experiences"
                />
                <div className="flex flex-col gap-3 my-3">
                  <label className="text-sm font-medium">
                    {t("Text.gender")}
                  </label>

                  <RadioGroup
                    dir={`${locale == "ar" ? "rtl" : "ltr"}`}
                    value={selectedGender}
                    onValueChange={(value) => setValue("gender", value)}
                    className="grid lg:grid-cols-2 gap-4"
                  >
                    <div
                      className={`flex items-center gap-2 space-x-2 bg-white border-[1px]  p-4 rounded-full ${
                        selectedGender == "male"
                          ? "border-primary"
                          : "border-greynormal"
                      }`}
                      onClick={() => setValue("gender", "male")}
                    >
                      <RadioGroupItem value="male" id="male" />

                      <label htmlFor="male" className="text-sm">
                        {t("Text.male")}
                      </label>
                    </div>
                    <div
                      className={`flex items-center gap-2 space-x-2 bg-white border-[1px]   p-4 rounded-full ${
                        selectedGender == "female"
                          ? "border-primary"
                          : "border-greynormal"
                      }`}
                      onClick={() => setValue("gender", "female")}
                    >
                      <RadioGroupItem value="female" id="female" />
                      <label htmlFor="female" className="text-sm">
                        {t("Text.female")}
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                <FormSelect
                  name="level"
                  label="level"
                  placeholder="level"
                  options={[]}
                  disabled={false}
                />
                <FormSelect
                  name="spieciality"
                  label="spieciality"
                  placeholder="spieciality"
                  options={[]}
                  disabled={false}
                />
                <FormUpload
                  model="users"
                  type_file="document"
                  uploadText={"قم برفع ملف"}
                  name="cv"
                  maxCount={1}
                  label="cv"
                  initialFileList={[]}
                />
                <div className="flex items-center gap-3 mt-4">
                  <FormCheckbox
                    id="is_default"
                    name="is_default"
                    onCheckedChange={(checked) => {
                      setValue("agree", checked === true);
                    }}
                    label={
                      <div className="flex gap-2 items-center">
                        <span>الموافقة علي</span>
                        <span className="text-primary">الشروط والأحكام </span>
                        <span>و</span>
                        <span className="text-primary">سياسة الخصوصية</span>
                      </div>
                    }
                  />
                </div>
                <div className="!pt-4">
                  <CustomBtn
                    title={t("BUTTONS.send")}
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
      {/* )} */}
    </>
  );
}
