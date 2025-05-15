"use client";
import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "@/shared/ImageWithFallback";
import Loader from "@/shared/Loader/Loader";
import { StaticImageData } from "next/image";
import Teleport from "@/shared/Teleport/Teleport";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { useLocale } from "next-intl";
import { format } from "date-fns";
import { Skeleton } from "@/shared/ui/skeleton";

type Chat = {
  id: number;
  user_type: string;
  message?: string;
  ImageUrl?: any;
  message_type: string;
  created_at: any;
  // timestamp: number;
};

type Props = {
  chats: Chat[];
  isLoading?: boolean;
};

export default function Chats({ chats, isLoading = false }: Props) {
  // const chatsEndRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);
  const locale = useLocale();
  const handleImageClick = (ImageUrl: string) => {
    setPreviewImage(ImageUrl);
    setShowImage(true);
  };

  // const scrollToBottom = () => {
  //   chatsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chats]);

  // if (isLoading) {
  //   return <Loader />;
  // }
  //   {
  //     "id": 2,
  //     "user_type": "client",
  //     "message": "test",
  //     "message_type": "text",
  //     "created_at": 1742379396
  // },
  return (
    <div className="chats p-4 h-[calc(100vh-128px)] overflow-y-auto bg-transparent">
      {chats &&
        chats.map((chat, index: number) => {
          return (
            <div
              className={`relative flex ${
                chat.user_type == "client" ? "justify-start" : "justify-end"
              }`}
              key={index}
            >
              <div>
                {chat.ImageUrl && (
                  <div
                    className={`shadow mb-3 p-1 rounded-lg ${
                      chat.user_type == "client"
                        ? "flex justify-start"
                        : "flex justify-end"
                    } `}
                  >
                    <div
                      className={`relative w-fit p-4  bg-greynormal rounded-xl `}
                      onClick={() => handleImageClick(chat.ImageUrl)}
                    >
                      <ImageWithFallback
                        width={1000}
                        height={1000}
                        src={chat.ImageUrl}
                        alt="Chat Image"
                        className="max-w-[200px] mx-auto  "
                      />
                    </div>
                    {/* {showImage && previewImage && (
                      <Teleport to="body">
                        <Dialog open={showImage} onOpenChange={setShowImage}>
                          <DialogContent
                            dir={locale === "ar" ? "rtl" : "ltr"}
                            className={`w-[90%] xl:w-[500px]
                              max-w-[90%] xl:max-w-[60%] bg-white border border-secondrydark `}
                          >
                            <div className="flex justify-center items-center">
                              <ImageWithFallback
                                width={1000}
                                height={1000}
                                src={previewImage}
                                alt="Chat Image"
                                className="w-full h-full object-contain rounded-3xl "
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </Teleport>
                    )} */}
                  </div>
                )}
                {chat.message && chat.message_type == "text" && (
                  <div
                    className={`flex lg:max-w-[400px] max-w-[300px]  ${
                      chat.user_type == "client" ? "" : "flex-row-reverse"
                    } gap-3 items-center shadow mb-3 `}
                  >
                    {isLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <>
                        <p
                          className={`py-3 px-4  ${
                            chat.user_type == "client"
                              ? "bg-primary text-white rounded-2xl rounded-br-none"
                              : "bg-secprimary text-darkprimary  rounded-2xl rounded-bl-none"
                          }`}
                        >
                          {chat.message}
                        </p>
                        {chat.created_at && (
                          <p className={`text-[11px] text-darkprimary`}>
                            {format(chat.created_at, "HH:mm")}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      {/* <div ref={chatsEndRef}></div> */}
    </div>
  );
}
