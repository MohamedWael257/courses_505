/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale, useTranslations } from "next-intl";
import FormTextarea from "@/shared/form-controls/FormTextarea";
import UploadImage from "@/assets/images/add_photo_alternate_rounded.svg";
import ImageWithFallback from "@/shared/ImageWithFallback";
import CustomBtn from "@/shared/buttons/CustomBtn";
import Swal from "sweetalert2";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Success from "@/assets/images/success2.gif";
import { usePathname, useRouter } from "next/navigation";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import axios from "axios";
import { UseMutate } from "@/utils/hooks/useMutate";
import UseSession from "@/store/UseSession";
import { SessionType } from "../Header";

type Props = {
  setOpen: any;
  refetch?: any;
};

export default function QuestionsForm({ setOpen, refetch }: Props) {
  const t = useTranslations("");
  const pathname = usePathname();
  const locale = useLocale();
  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
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
  const formSchema = Yup.object({
    content: Yup.string().required(
      t("provide-questionier is a required field")
    ),
    image: Yup.mixed(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const { mutate: ContactMutate, isLoading: LoadingComplete } = UseMutate({
    endpoint: "contact-us",
    onSuccess: (responseData: any) => {
      Swal.fire({
        title: responseData?.message,
        timer: 3000,
        showConfirmButton: false,
        imageUrl: `${Success.src}`,
        customClass: {
          popup: "custom-popup-class",
          title: "custom-title-class",
        },
        padding: "1rem",
      });
      if (!pathname.includes("products") && refetch) {
        // window.location.reload();
        refetch();
      }
      setOpen(false);
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
  async function handleSubmit(values: Yup.InferType<typeof formSchema>) {
    const finalOut: any = {
      full_name: memoizedSession?.full_name,
      phone_code: memoizedSession?.phone_code,
      phone: memoizedSession?.phone,
      email: memoizedSession?.email,
      content: values?.content,
    };
    if (image) {
      finalOut["image"] = image;
    }
    await ContactMutate({ ...finalOut });
  }
  return (
    <>
      <div className="flex flex-col gap-3 w-full p-4">
        <ScrollArea className="grow " dir={locale === "en" ? "ltr" : "rtl"}>
          <div className={`md:h-[450px] flex flex-col pe-2`}>
            <div className="mb-3">
              <h3 className="text-[24px] font-normal text-start">
                {t("Text.provide-questionier")}
              </h3>
            </div>
            <Form {...form}>
              <form className="mt-2" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormTextarea
                  name="content"
                  label="provide-questionier"
                  className="md:h-[125px] w-full border-2 border-[#F3F6FC] outline-0 bg-[#fff] placeholder:text-[#2d2d2db2] rounded-xl px-2 pe-5"
                  placeholder="provide-questionier"
                  // showRequired
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
                <div className="!pt-4 w-full h-max flex justify-end">
                  <CustomBtn
                    title={t("BUTTONS.confirmation")}
                    buttonType="submit"
                    loader={LoadingComplete}
                    disabled={LoadingComplete}
                    button
                    className="!h-[56px] !rounded-full "
                  />
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
