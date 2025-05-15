"use client";
import React, { useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";

import { useLocale, useTranslations } from "next-intl";
import CustomBtn from "@/shared/buttons/CustomBtn";
import styles from "@/shared/buttons/custom-btn.module.css";

import ImageWithFallback from "@/shared/ImageWithFallback";
import Teleport from "@/shared/Teleport/Teleport";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import axiosInstance from "@/utils/axiosClient";
import ShowAlertMixin from "@/shared/ShowAlertMixin";

const ChatInput = ({ refetch }: any) => {
  const t = useTranslations();
  const locale = useLocale();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImagePreview(e.target?.result as string);
        setShowImage(true);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setShowImage(false);
    }
    // Reset the file input value so the same file can be selected again
    e.target.value = "";
  };

  const sendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!message.trim() && !image) return;

    setUploading(true);
    setMessage("");
    setImage(null);
    setImagePreview(null);
    setShowImage(false);
    setUploading(false);
    const formData = new FormData();
    formData.append("message_type", "text");
    formData.append("message", message);
    await axiosInstance
      .post("chat", formData)
      .then((res) => {
        // Reset the file input value after sending
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        ShowAlertMixin({
          type: 15,
          icon: "success",
          title: res?.data?.message,
        });
        setUploading(false);
        setShowImage(false);
        setImagePreview(null);
        setImage(null);
        setMessage("");
        refetch();
      })
      .catch((error: any) => {
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: error?.response?.data?.message,
        });
        setUploading(false);
        setShowImage(false);
        setImagePreview(null);
        setImage(null);
        setMessage("");
        // Reset the file input value after error
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
      // window.scrollTo(0, 0);
    }
  };

  const handleSendClick = () => {
    sendMessage();
    // window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bg-secprimary min-h-16 px-6 py-2 rounded-xl mt-5">
        <div className="flex items-center gap-4 relative">
          <input
            type="text"
            className="w-full h-full border-none bg-transparent px-4 focus-visible:!outline-none"
            placeholder={t("Text.chatInputPlaceholder")}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          {/* 
          {imagePreview && showImage && (
            <Teleport to="body">
              <Dialog
                open={showImage}
                onOpenChange={(isOpen) => setShowImage(isOpen)}
              >
                <DialogContent
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="w-[90%] xl:w-[500px] max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark"
                >
                  <div className="p-8">
                    <div className="flex justify-center items-center">
                      <ImageWithFallback
                        width={1000}
                        height={1000}
                        src={imagePreview}
                        alt="Chat Image"
                        className="w-full h-full object-contain rounded-3xl"
                      />
                    </div>
                    <div className="!pt-4">
                      <CustomBtn
                        title={t("BUTTONS.send")}
                        buttonType="submit"
                        loader={uploading}
                        disabled={uploading}
                        button
                        onClick={handleSendClick}
                        className=" !w-full !h-[56px] !rounded-full  !mt-[20px]"
                      />
                    </div>
                    {uploading && (
                      <div className="mx-2 mt-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 135 135"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#4F008C"
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
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </Teleport>
          )} */}

          <label htmlFor="file">
            <MdPhotoCameraBack
              className="cursor-pointer text-darkprimary bg-white rounded-full p-2"
              size={45}
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/jpg"

            // onChange={handleImageChange}
          />
          <AiOutlineSend
            className="cursor-pointer text-primary bg-white rounded-full p-2"
            size={45}
            onClick={handleSendClick}
          />
        </div>
      </div>
    </>
  );
};

export default ChatInput;
