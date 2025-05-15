"use client";
import React, { useState } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { FaRegEdit } from "react-icons/fa";
import PersonalAccountForm from "@/components/appforms/PersonalAccountForm";
import axios from "axios";
import ProfileImage from "@/assets/images/profile.png";

import { AuthStage, SessionType } from "@/components/Header";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import { Tabs, TabsProps } from "antd";
import PersonalPasswordForm from "@/components/appforms/PersonalPasswordForm";
import AppDialog from "@/shared/Dialogs/AppDialog";

type Props = {
  profile: SessionType | null;
  refetch: any;
};

export default function PersonalAccountDetails({ profile, refetch }: Props) {
  const [authStage, setAuthStage] = useState<AuthStage>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [defaultActiveKey, setDefaultActiveKey] = useState("1");
  const [activeUpdateData, setActiveUpdateData] = useState<boolean>(false);
  const [activeUpdatePassword, setActiveUpdatePassword] =
    useState<boolean>(false);

  const [nationalImageLoading, setNationalImageLoading] =
    useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<any>(profile?.image);
  console.log("🚀 ~ PersonalAccountDetails ~ imagePreview:", imagePreview);

  const [image, setImage] = useState(profile?.image || "");
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
      label: "المعلومات الشخصية",
      children: (
        <div className="bg-greynormal p-6 rounded-2xl border border-secprimary">
          {activeUpdateData ? (
            <div>
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
                      <ImageWithFallback
                        src={ProfileImage}
                        width={1000}
                        height={1000}
                        className="w-32 h-32 rounded-xl object-cover"
                        alt="profile image"
                      />
                      <label htmlFor="imageID">
                        <svg
                          className="bg-primary p-2 rounded-full"
                          width="40"
                          height="40"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.1349 1.19588C10.9246 0.726207 11.8986 0.711489 12.7018 1.15741C13.035 1.34238 13.3389 1.65304 13.7909 2.11506L13.9136 2.24045C14.3671 2.70347 14.6707 3.01335 14.8509 3.35212C15.2833 4.16485 15.2692 5.14805 14.8135 5.94772C14.6751 6.19049 14.4718 6.41596 14.1913 6.69408C14.0605 6.82368 13.9952 6.88848 13.9126 6.88831C13.83 6.88813 13.7641 6.82221 13.6322 6.69037L9.37139 2.42951C9.24228 2.3004 9.17772 2.23585 9.17652 2.15474C9.17532 2.07364 9.23729 2.00788 9.36124 1.87638C9.65268 1.56717 9.88416 1.345 10.1349 1.19588Z"
                            fill="white"
                          />
                          <path
                            d="M12.8638 7.89228C12.863 7.97622 12.7939 8.04275 12.6558 8.17582L7.43205 13.2071C6.51148 14.0941 5.9441 14.6408 5.22614 14.9212C4.50716 15.2021 3.72532 15.1815 2.46056 15.1481C2.44816 15.1478 1.76179 15.1298 1.60847 15.1042C1.43079 15.0745 1.21974 15.0064 1.05278 14.8169C0.887303 14.6291 0.844841 14.4124 0.834905 14.2341C0.826131 14.0767 0.882969 13.3496 0.883124 13.3476L0.883273 13.3457C0.969369 12.2385 1.02202 11.5613 1.28941 10.9459C1.55731 10.3293 2.01497 9.8336 2.76168 9.02482L7.9123 3.44437C8.04495 3.30065 8.11127 3.22879 8.19645 3.22709C8.28163 3.22538 8.35078 3.29453 8.48908 3.43282L12.6611 7.60488C12.7968 7.74052 12.8646 7.80834 12.8638 7.89228Z"
                            fill="white"
                          />
                          <path
                            d="M9.16537 13.833C8.79717 13.833 8.4987 14.1315 8.4987 14.4997C8.4987 14.8679 8.79718 15.1663 9.16537 15.1663H14.4987C14.8669 15.1663 15.1654 14.8679 15.1654 14.4997C15.1654 14.1315 14.8669 13.833 14.4987 13.833H9.16537Z"
                            fill="white"
                          />
                        </svg>
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
                profile={profile || null}
                setActiveUpdateData={setActiveUpdateData}
                setAuthStage={setAuthStage}
                setIsDialogOpen={setIsDialogOpen}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl leading-6 text-start font-medium text-darkprimaryprimary">
                  معلومات شخصية
                </h2>
                <button
                  className="flex gap-3 items-center bg-secprimary text-primary p-2 px-4 text-base rounded-full"
                  onClick={() => {
                    setActiveUpdateData(true);
                    setActiveUpdatePassword(false);
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.2039 0.794313C15.3885 0.0897993 16.8495 0.0677218 18.0543 0.7366C18.5541 1.01406 19.0099 1.48005 19.6879 2.17307L19.872 2.36114C20.5523 3.05567 21.0076 3.52051 21.278 4.02866C21.9265 5.24777 21.9054 6.72256 21.2218 7.92207C20.9369 8.42205 20.4682 8.87313 19.7683 9.54683L10.1497 18.8112C8.76885 20.1416 7.91774 20.9617 6.84081 21.3823C5.76232 21.8036 4.58966 21.7727 2.69246 21.7227L2.2055 21.71C1.92746 21.7028 1.64638 21.6955 1.41431 21.6568C1.14778 21.6123 0.83121 21.5101 0.580762 21.2259C0.332554 20.9442 0.26886 20.6191 0.253956 20.3517C0.240779 20.1152 0.262913 19.832 0.285158 19.5473L0.326074 19.022C0.455357 17.3594 0.53439 16.3431 0.935713 15.4194C1.33756 14.4944 2.02405 13.7509 3.14411 12.5377L12.6126 2.2791C13.2704 1.5659 13.7125 1.08656 14.2039 0.794313ZM17.3262 2.04805C16.5884 1.63846 15.6967 1.65172 14.9707 2.08354C14.6923 2.24909 14.4068 2.54677 13.6247 3.39413L13.5432 3.4825L18.6255 8.56488L18.6339 8.55682C19.4625 7.75877 19.7551 7.46624 19.9186 7.17934C20.3474 6.42702 20.3609 5.49847 19.9537 4.73319C19.7984 4.4413 19.5142 4.13994 18.709 3.31741C17.9028 2.49383 17.609 2.20504 17.3262 2.04805ZM4.34044 13.4532L12.525 4.58565L17.545 9.60564L9.23023 17.6141C7.68769 19.0998 7.05888 19.6868 6.29508 19.9851C5.53295 20.2828 4.68457 20.2743 2.56486 20.2188L2.28487 20.2115C2.12535 20.2073 1.99901 20.204 1.89052 20.1983C1.8343 20.1954 1.78808 20.192 1.74977 20.1884C1.75017 20.0681 1.76238 19.8981 1.7837 19.6244L1.8107 19.2779C1.95456 17.4314 2.02243 16.6824 2.31148 16.0171C2.59996 15.3531 3.09635 14.8011 4.34044 13.4532Z"
                      fill="#4F008C"
                    />
                    <path
                      d="M13 20.25C12.5858 20.25 12.25 20.5858 12.25 21C12.25 21.4142 12.5858 21.75 13 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21C21.75 20.5858 21.4142 20.25 21 20.25H13Z"
                      fill="#4F008C"
                    />
                  </svg>
                  تعديل
                </button>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-6">
                <ImageWithFallback
                  src={ProfileImage}
                  width={1000}
                  height={1000}
                  className="w-28 h-28 rounded-full object-cover"
                  alt="profile image"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      الاسم
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      محمد وائل
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      البريد الإلكتروني
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      ahmed16@gmail.com
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      رقم الهاتف
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      +966 123456789
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "تغيير كلمة المرور",
      children: (
        <div className="bg-greynormal p-6 rounded-2xl border border-secprimary">
          {activeUpdatePassword ? (
            <PersonalPasswordForm
              setActiveUpdatePassword={setActiveUpdatePassword}
            />
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl leading-6 text-start font-medium">
                  تغيير كلمة المرور
                </h2>
                <button
                  className="flex gap-3 items-center bg-secprimary text-primary p-2 px-4 text-base rounded-full"
                  onClick={() => {
                    setActiveUpdateData(false);
                    setActiveUpdatePassword(true);
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.2039 0.794313C15.3885 0.0897993 16.8495 0.0677218 18.0543 0.7366C18.5541 1.01406 19.0099 1.48005 19.6879 2.17307L19.872 2.36114C20.5523 3.05567 21.0076 3.52051 21.278 4.02866C21.9265 5.24777 21.9054 6.72256 21.2218 7.92207C20.9369 8.42205 20.4682 8.87313 19.7683 9.54683L10.1497 18.8112C8.76885 20.1416 7.91774 20.9617 6.84081 21.3823C5.76232 21.8036 4.58966 21.7727 2.69246 21.7227L2.2055 21.71C1.92746 21.7028 1.64638 21.6955 1.41431 21.6568C1.14778 21.6123 0.83121 21.5101 0.580762 21.2259C0.332554 20.9442 0.26886 20.6191 0.253956 20.3517C0.240779 20.1152 0.262913 19.832 0.285158 19.5473L0.326074 19.022C0.455357 17.3594 0.53439 16.3431 0.935713 15.4194C1.33756 14.4944 2.02405 13.7509 3.14411 12.5377L12.6126 2.2791C13.2704 1.5659 13.7125 1.08656 14.2039 0.794313ZM17.3262 2.04805C16.5884 1.63846 15.6967 1.65172 14.9707 2.08354C14.6923 2.24909 14.4068 2.54677 13.6247 3.39413L13.5432 3.4825L18.6255 8.56488L18.6339 8.55682C19.4625 7.75877 19.7551 7.46624 19.9186 7.17934C20.3474 6.42702 20.3609 5.49847 19.9537 4.73319C19.7984 4.4413 19.5142 4.13994 18.709 3.31741C17.9028 2.49383 17.609 2.20504 17.3262 2.04805ZM4.34044 13.4532L12.525 4.58565L17.545 9.60564L9.23023 17.6141C7.68769 19.0998 7.05888 19.6868 6.29508 19.9851C5.53295 20.2828 4.68457 20.2743 2.56486 20.2188L2.28487 20.2115C2.12535 20.2073 1.99901 20.204 1.89052 20.1983C1.8343 20.1954 1.78808 20.192 1.74977 20.1884C1.75017 20.0681 1.76238 19.8981 1.7837 19.6244L1.8107 19.2779C1.95456 17.4314 2.02243 16.6824 2.31148 16.0171C2.59996 15.3531 3.09635 14.8011 4.34044 13.4532Z"
                      fill="#4F008C"
                    />
                    <path
                      d="M13 20.25C12.5858 20.25 12.25 20.5858 12.25 21C12.25 21.4142 12.5858 21.75 13 21.75H21C21.4142 21.75 21.75 21.4142 21.75 21C21.75 20.5858 21.4142 20.25 21 20.25H13Z"
                      fill="#4F008C"
                    />
                  </svg>
                  تعديل
                </button>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-6">
                <ImageWithFallback
                  src={image || ProfileImage}
                  width={1000}
                  height={1000}
                  className="w-28 h-28 rounded-full object-cover"
                  alt="profile image"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      الاسم
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      محمد وائل
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      البريد الإلكتروني
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      ahmed16@gmail.com
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-start leading-5 text-[#656D72] my-3">
                      رقم الهاتف
                    </p>
                    <p className="text-darkprimaryprimary font-normal text-base leading-5 text-start">
                      +966 123456789
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={items}
        onChange={(key) => {
          setDefaultActiveKey(key);
          setActiveUpdateData(false);
          setActiveUpdatePassword(false);
        }}
        className="custom-tabs-wrapper"
      />
      <AppDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        authStage={authStage}
        setAuthStage={setAuthStage}
      />
    </>
  );
}
