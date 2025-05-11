"use client";
import React, { useState } from "react";
import ProfileImage from "@/assets/images/profile.png";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { FaRegEdit } from "react-icons/fa";
import PersonalAccountForm from "@/components/appforms/PersonalAccountForm";
import axios from "axios";

import { SessionType } from "@/components/Header";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Tabs, TabsProps } from "antd";

type Props = {
  profile: SessionType;
  refetch: any;
};

export default function PersonalAccountDetails({ profile, refetch }: Props) {
  const [defaultActiveKey, setDefaultActiveKey] = useState("1");
  const [activeUpdateData, setActiveUpdateData] = useState<boolean>(false);
  const [activeUpdatePassword, setActiveUpdatePassword] =
    useState<boolean>(false);

  const [nationalImageLoading, setNationalImageLoading] =
    useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<any>(profile?.image);
  console.log("🚀 ~ PersonalAccountDetails ~ imagePreview:", imagePreview);

  const [image, setImage] = useState(profile?.image);
  // const GeneralbaseURL = process.env.VITE_BASE_GENERAL_URL;
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNationalImageLoading(true);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("attachment_type", "image");
      formData.append("model", "users");
      try {
        await axios
          .post(
            `https://doom.elsayed.aait-d.com/api/general/attachments`,
            formData,
            {
              headers: {
                model: "users",
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
              title: res?.data?.message,
            });
            setNationalImageLoading(false);
            const fileInput = document.getElementById(
              "imageID"
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
            // form.reset();
          })
          .catch((err: any) => {
            ShowAlertMixin({
              type: 15,
              icon: "error",
              title: err?.response?.data.message,
            });
            setNationalImageLoading(false);
            const fileInput = document.getElementById(
              "imageID"
            ) as HTMLInputElement;
            if (fileInput) fileInput.value = "";
          });
      } catch (error: any) {
        console.log(error.message);
        setNationalImageLoading(false);
        setImagePreview(null);
        const fileInput = document.getElementById(
          "imageID"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <>
          {activeUpdateData ? (
            <>
              <div className="flex justify-start">
                <div className="relative">
                  {nationalImageLoading ? (
                    <div className="mx-2 mt-2 bg-white">
                      <svg
                        width="42"
                        height="42"
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
                  ) : (
                    <>
                      <img
                        src={imagePreview}
                        // width={1000}
                        // height={1000}
                        className="w-32 h-32 rounded-xl object-cover"
                        alt="profile image"
                      />
                      <label htmlFor="imageID">
                        <FaRegEdit
                          className="text-white cursor-pointer bg-primary p-2 rounded-full border-[1px] border-white absolute bottom-0 start-0 z-50"
                          size={40}
                        />
                      </label>

                      <input
                        type="file"
                        id="imageID"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                </div>
              </div>
              <PersonalAccountForm
                refetch={refetch}
                image={image}
                profile={profile}
              />
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center">
                <h2>معلومات شخصية</h2>
                <button
                  onClick={() => {
                    setActiveUpdateData(true);
                    setActiveUpdatePassword(false);
                  }}
                >
                  تعديل
                </button>
              </div>
              <div className="grid grid-cols-[auto_1fr]">
                image
                <div className="flex flex-col gap-3">
                  <div>
                    <p>الاسم</p>
                    <p>محمد وائل</p>
                  </div>
                  <div>
                    <p>البريد الإلكتروني</p>
                    <p>ahmed16@gmail.com</p>
                  </div>
                  <div>
                    <p>رقم الهاتف</p>
                    <p>+966 123456789</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: (
        <>
          {activeUpdatePassword ? (
            <>
              <div className="flex justify-start">
                <div className="relative">
                  {nationalImageLoading ? (
                    <div className="mx-2 mt-2 bg-white">
                      <svg
                        width="42"
                        height="42"
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
                  ) : (
                    <>
                      <img
                        src={imagePreview}
                        // width={1000}
                        // height={1000}
                        className="w-32 h-32 rounded-xl object-cover"
                        alt="profile image"
                      />
                      <label htmlFor="imageID">
                        <FaRegEdit
                          className="text-white cursor-pointer bg-primary p-2 rounded-full border-[1px] border-white absolute bottom-0 start-0 z-50"
                          size={40}
                        />
                      </label>

                      <input
                        type="file"
                        id="imageID"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                </div>
              </div>
              <PersonalAccountForm
                refetch={refetch}
                image={image}
                profile={profile}
              />
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center">
                <h2>تغيير كلمة المرور</h2>
                <button
                  onClick={() => {
                    setActiveUpdateData(false);
                    setActiveUpdatePassword(true);
                  }}
                >
                  تعديل
                </button>
              </div>
              <div className="grid grid-cols-[auto_1fr]">
                image
                <div className="flex flex-col gap-3">
                  <div>
                    <p>الاسم</p>
                    <p>محمد وائل</p>
                  </div>
                  <div>
                    <p>البريد الإلكتروني</p>
                    <p>ahmed16@gmail.com</p>
                  </div>
                  <div>
                    <p>رقم الهاتف</p>
                    <p>+966 123456789</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={items}
        onChange={(key) => setDefaultActiveKey(key)}
        className="custom-tabs-wrapper"
      />
    </>
  );
}
