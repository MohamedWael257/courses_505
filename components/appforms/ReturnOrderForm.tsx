/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import { Form } from "@/shared/ui/form";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { ScrollArea } from "@/shared/ui/scroll-area";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import LocalePath from "@/shared/LocalePath";
import axios from "axios";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import UploadImage from "@/assets/images/add_photo_alternate_rounded.svg";
import axiosInstance from "@/utils/axiosClient";
import Success from "@/assets/images/success2.gif";
import { useRouter } from "next/navigation";

interface ReturnOrderFormProps {
  dialogOpen: (open: boolean) => void;
  orderId: any;
  refetch: any;
}
const ReturnOrderForm: React.FC<ReturnOrderFormProps> = ({
  orderId,
  dialogOpen,
  refetch,
}) => {
  const t = useTranslations("");
  const locale = useLocale();
  const [nationalImageLoading, setNationalImageLoading] =
    useState<boolean>(false);
  const router = useRouter();
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
      formData.append("model", "return_order_items");
      try {
        await axios
          .post(
            `https://doom.elsayed.aait-d.com/api/general/attachments`,
            formData,
            {
              headers: {
                model: "return_order_items",
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
              title: res.message,
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
  // Form Schema Validation
  const formSchema = Yup.object({
    reason: Yup.string().required(t("reason is a required field")),
    image: Yup.mixed().required(t("is a required field")),
  });

  // Default Form Values
  const defaultValues = {
    reason: "",
    image: image || "",
  };

  // Hook Form Initialization
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  // Form Submission Handler
  const handleSubmit = async (values: any, actions: any) => {
    const formData = new FormData();
    formData.append("uuid", orderId);
    formData.append("reason", values?.reason);
    if (values?.image) {
      formData.append("image[media]", values?.image);
    }

    await axiosInstance
      .post(`orders/return`, formData)
      .then((res: any) => {
        Swal.fire({
          title: res?.data?.message,
          timer: 3000,
          showConfirmButton: false,
          imageUrl: `${Success.src}`,
          customClass: {
            popup: "custom-popup-class",
            title: "custom-title-class",
          },
          padding: "1rem",
        });
        refetch();
        // window.location.reload();
        dialogOpen(false);
      })
      .catch((error: any) => {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
      });
  };

  return (
    <div className="flex flex-col gap-0 pt-6 w-full p-4">
      <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
        <div className={`h-[550px] flex flex-col pe-2`}>
          <div className="flex flex-col gap-3 my-4">
            <h2 className="capitalize font-semibold lg:text-[34px] text-3xl text-center lg:leading-[50px]   leading-8 mb-3 ">
              {t("Text.CANCEL_ORDER")}
            </h2>
            <div className="bg-greynormal px-4 py-3 rounded-xl  text-xs flex items-center gap-1.5">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0666 0.165625C8.28879 0.165625 6.55088 0.692814 5.07267 1.68053C3.59445 2.66824 2.44232 4.07211 1.76198 5.71462C1.08163 7.35712 0.903619 9.16448 1.25046 10.9082C1.5973 12.6518 2.4534 14.2535 3.71052 15.5106C4.96764 16.7677 6.56931 17.6238 8.31298 17.9707C10.0567 18.3175 11.864 18.1395 13.5065 17.4592C15.149 16.7788 16.5529 15.6267 17.5406 14.1485C18.5283 12.6703 19.0555 10.9323 19.0555 9.15451C19.0555 6.77051 18.1085 4.48415 16.4227 2.79841C14.737 1.11267 12.4506 0.165625 10.0666 0.165625ZM10.0665 17.0934C8.49478 17.0945 6.95808 16.6293 5.6508 15.7568C4.3435 14.8843 3.32439 13.6436 2.72241 12.1917C2.12044 10.7398 1.96265 9.142 2.26901 7.60042C2.57538 6.05884 3.33212 4.64277 4.4435 3.53139C5.55488 2.42001 6.97095 1.66326 8.51253 1.3569C10.0541 1.05054 11.6519 1.20832 13.1038 1.8103C14.5557 2.41228 15.7964 3.43139 16.6689 4.73868C17.5414 6.04596 18.0066 7.58267 18.0055 9.15438C18.0026 11.259 17.1652 13.2767 15.677 14.7649C14.1888 16.2531 12.1712 17.0905 10.0665 17.0934Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.2"
                />
                <path
                  d="M9.53867 7.2471L9.53868 7.2471C9.54048 7.10831 9.59688 6.97582 9.69567 6.87832C9.79445 6.78083 9.92766 6.72616 10.0664 6.72617L9.53867 7.2471ZM9.53867 7.2471V7.24839M9.53867 7.2471V7.24839M9.53867 7.24839V12.8873H9.53866M9.53867 7.24839L9.53866 12.8873M9.53866 12.8873L9.53868 12.8886M9.53866 12.8873L9.53868 12.8886M9.53868 12.8886C9.54048 13.0274 9.59688 13.1599 9.69566 13.2574M9.53868 12.8886L9.69566 13.2574M9.69566 13.2574C9.79445 13.3549 9.92766 13.4095 10.0664 13.4095L9.69566 13.2574ZM10.0665 13.4095C10.205 13.4095 10.3378 13.3545 10.4357 13.2566C10.5337 13.1586 10.5887 13.0258 10.5887 12.8873V7.24839C10.5887 7.10989 10.5337 6.97706 10.4357 6.87913C10.3378 6.78119 10.205 6.72617 10.0665 6.72617L10.0665 13.4095Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.2"
                />
                <path
                  d="M10.0668 5.79405C10.3552 5.79405 10.589 5.56025 10.589 5.27183C10.589 4.98342 10.3552 4.74961 10.0668 4.74961C9.77834 4.74961 9.54453 4.98342 9.54453 5.27183C9.54453 5.56025 9.77834 5.79405 10.0668 5.79405Z"
                  fill="#3E3E3E"
                  stroke="#3E3E3E"
                  strokeWidth="0.2"
                />
              </svg>
              {t("Text.returnOrderTitle")}
              <LocalePath
                href="/return-policy"
                className="text-primary textxl font-semibold   leading-4 underline"
              >
                {t("Text.returnOrderPolicy")}
              </LocalePath>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormTextarea
                  name="reason"
                  label={"reason"}
                  className="md:h-[150px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#9E9E9E] placeholder:font-normal placeholder:text-base"
                  placeholder={"reason"}
                />
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
                          <label
                            htmlFor="productImage"
                            className="cursor-pointer"
                          >
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
                          <label
                            htmlFor="productImage"
                            className="cursor-pointer"
                          >
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
              </div>

              <div className="!pt-2">
                <CustomBtn
                  title={t("BUTTONS.confirm")}
                  buttonType="submit"
                  loader={false}
                  disabled={false}
                  button
                  className=" !w-full !h-[56px] !rounded-[12px]  !mt-[20px]"
                />
              </div>
            </form>
          </Form>
        </div>
        {/* </div> */}
      </ScrollArea>
    </div>
  );
};

export default ReturnOrderForm;
