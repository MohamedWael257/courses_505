/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import FormInput from "@/shared/form-controls/FormInput";
import PhoneNumber from "@/shared/form-controls/PhoneNumber";
import ImageWithFallback from "@/shared/ImageWithFallback";
import UploadImage from "@/assets/images/add_photo_alternate_rounded.svg";
import { Form } from "@/shared/ui/form";
import axios from "axios";
import { UseMutate } from "@/utils/hooks/useMutate";
import CustomBtn from "@/shared/buttons/CustomBtn";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

export default function QuestionsForm() {
  const t = useTranslations("");
  const [nationalImageLoading, setNationalImageLoading] =
    useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<any>("");
  const [image, setImage] = useState("");
  const GeneralbaseURL = process.env.VITE_BASE_GENERAL_URL;
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNationalImageLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("attachment_type", "image");
      formData.append("model", "contacts");
      try {
        await axios
          .post(
            `https://doom.elsayed.aait-d.com/api/general/attachments`,
            formData,
            {
              headers: {
                model: "contacts",
                attachment_type: "image",
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            }
          )
          .then((res: any) => {
            setImage(res.data.data);
            ShowAlertMixin({
              type: 15,
              icon: "success",
              title: res.data.message,
            });
            setNationalImageLoading(false);
            const fileInput = document.getElementById(
              "productImage"
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            // form.reset();
          })
          .catch((err: any) => {
            ShowAlertMixin({
              type: 15,
              icon: "error",
              title: err?.response?.data?.message,
            });
            setNationalImageLoading(false);
            const fileInput = document.getElementById(
              "productImage"
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
          });
      } catch (error: any) {
        console.log(error.message);
        setNationalImageLoading(false);
        const fileInput = document.getElementById(
          "productImage"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    }
  };
  // Validation Schema
  const formSchema = Yup.object({
    full_name: Yup.string().required(t("name is a required field")),
    email: Yup.string().email().required(t("email is a required field")),
    content: Yup.string().required(t("message is a required field")),
    image: Yup.string(),
    phone: Yup.string().required("phone_required"),
    phone_code: Yup.string(),
  });

  // Initialize useForm Hook
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone_code: "",
      phone: "",
      email: "",
      content: "",
      image: "",
    },
  });
  const { mutate: ContactMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "contact-us",
    onSuccess: (responseData: any) => {
      ShowAlertMixin({
        type: 15,
        icon: "success",
        title: responseData?.message,
      });
      // methods.reset();
    },

    onError: (error: any) => {
      // @ts-ignore
      const errorMessage = error?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    },
  });
  // Form Submit Handler
  const handleSubmit = async (values: any, actions: any) => {
    const finalOut: any = {
      full_name: values?.full_name,
      phone_code: values?.phone_code,
      phone: values?.phone,
      email: values?.email,
      content: values?.content,
    };
    if (image) {
      finalOut["image"] = image;
    }
    await ContactMutate({ ...finalOut });
  };

  // Handle Image Upload

  return (
    <div className="lg:w-1/2 flex justify-start py-4">
      <Form {...methods}>
        <form
          className=" rounded-xl  lg:mt-0 mt-12  w-full"
          onSubmit={methods.handleSubmit(handleSubmit)}
        >
          {/* Name Field */}
          <FormInput
            name="full_name"
            label={t("fullname")}
            className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder pe-10"
            placeholder={t("fullname")}
            showRequired
          />

          {/* Email Field */}
          <FormInput
            name="email"
            label={t("email")}
            className="h-16  placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base bg-[#fff]  outline-0	rounded-full border border-subborder pe-10"
            placeholder={t("email")}
            showRequired
          />

          {/* Phone Number Field */}
          <PhoneNumber
            label={t("phoneNumber")}
            placeholder={t("phoneNumber")}
            country="sa"
            showRequired
          />

          {/* Message Field */}
          <FormTextarea
            name="content"
            label={"message"}
            className="md:h-[125px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-xl px-2 pe-5"
            placeholder={"message"}
            showRequired
          />

          {/* Upload Image Section */}
          {nationalImageLoading ? (
            <div className="input-box inline-block w-full relative mt-4">
              <div className="w-full h-24 cursor-pointer relative outline-0 border-[1px] border-greynormal bg-greynormal rounded-lg p-3">
                <div className="upload-box flex justify-center items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 135 135"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#4F008C "
                  >
                    <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 67 67"
                        to="360 67 67"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="input-box inline-block w-full relative mt-4">
              <div className="w-full h-24 cursor-pointer relative outline-0 border-[1px] border-greynormal bg-greynormal rounded-lg p-3">
                {imagePreview ? (
                  <div className="upload-box flex justify-center items-center">
                    <label htmlFor="productImage" className="cursor-pointer">
                      <ImageWithFallback
                        width={50}
                        height={50}
                        src={imagePreview}
                        className="w-[50px] h-[50px] mx-auto"
                        alt="Upload"
                      />
                      <p>{t("Text.UPLOAD_PRODUCT_IMAGE")}</p>
                    </label>

                    <input
                      type="file"
                      id="productImage"
                      accept="image/png, image/jpeg, image/jpg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                ) : (
                  <div className="upload-box flex justify-center items-center">
                    <label htmlFor="productImage" className="cursor-pointer">
                      <ImageWithFallback
                        width={50}
                        height={50}
                        src={UploadImage}
                        className="w-[50px] h-[50px] mx-auto"
                        alt="Upload"
                      />
                      <p className="font-semibold text-sm text-[#9E9E9E">
                        {t("Text.UPLOAD_PRODUCT_IMAGE")}
                      </p>
                    </label>

                    <input
                      type="file"
                      id="productImage"
                      accept="image/png, image/jpeg, image/jpg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Submit Button */}
          <div className="!pt-2 w-full h-max ">
            <CustomBtn
              title={t("BUTTONS.confirm")}
              buttonType="submit"
              loader={LoadingComplete}
              disabled={LoadingComplete}
              button
              className="rounded-2xl font-bold lg:w-[200px] w-full px-14 text-center !h-[56px] !mt-[30px] md:!mt-[56px] bg-primary text-white"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
