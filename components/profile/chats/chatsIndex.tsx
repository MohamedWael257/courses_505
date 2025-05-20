"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/utils/axiosClient";
import { MdPhotoCameraBack } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import ShowAlertMixin from "@/shared/ShowAlertMixin";
import ChatHeader from "@/components/profile/chats/ChatHeader";
import axios from "axios";
import ImageWithFallback from "@/shared/ImageWithFallback";
import { useTranslations } from "next-intl";
import EmptyChats from "./EmptyChats";
import LoaderWarper from "@/shared/Loader/LoaderWarper";
import UseSession from "@/store/UseSession";
import { SessionType } from "@/components/Header";
import { useSocketContext } from "@/utils/providers/SocketProvider";

interface Message {
  id: number;
  user_type: "client" | "admin";
  message: string;
  message_type: "text" | "image" | "video" | "file";
  created_at: number;
}

interface ChatResponse {
  chat: {
    id: number;
  };
  messages: Message[];
  pagination: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
}

interface ChatState {
  id: number;
  messages: {
    data: Message[];
    pagination: ChatResponse["pagination"];
  };
}

export default function ChatsIndex() {
  const t = useTranslations("");
  const [chat, setChat] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loadingFirstTime, setloadingFirstTime] = useState(true);

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingLoadMoreMessages, setLoadingLoadMoreMessages] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileAttachment, setFileAttachment] = useState<{
    str: string;
    type: string;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadingAttachment, setLoadingAttachment] = useState(false);

  const chatWrapper = useRef<HTMLDivElement>(null);

  // Fetch chat messages
  const getChat = useCallback(async () => {
    try {
      const response = await axiosInstance.get("chat");

      setChat({
        id: response.data.data.chat.id,
        messages: {
          data: response.data.data.messages,
          pagination: response.data.data.pagination,
        },
      });
      setloadingFirstTime(false);
    } catch (error) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: "Failed to fetch chat",
      });
      setloadingFirstTime(false);
    }
  }, []);

  const scrollToBottom = () => {
    if (chatWrapper.current) {
      chatWrapper.current.scrollTop = chatWrapper.current.scrollHeight;
    }
  };

  const handleChatScroll = () => {
    if (chatWrapper.current?.scrollTop === 0) {
      loadMoreMessages();
    }
  };

  const loadMoreMessages = async () => {
    if (!chat?.messages.pagination.next_page_url || loadingLoadMoreMessages)
      return;
    setLoadingLoadMoreMessages(true);

    try {
      const response = await axiosInstance.get(
        chat.messages.pagination.next_page_url
      );
      setChat((prev: any) => ({
        ...prev!,
        messages: {
          data: [...response.data.data.messages, ...prev!.messages.data],
          pagination: response.data.data.pagination,
        },
      }));
    } catch (error) {
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: "FFailed to load more messages",
      });
    } finally {
      setLoadingLoadMoreMessages(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    setLoadingAttachment(true);
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setFilePreview(URL.createObjectURL(uploadedFile));

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("model", "chats");

    let fileType = "file";
    if (uploadedFile.name.includes("mp4")) {
      fileType = "video";
    } else if (
      uploadedFile.name.includes("jpg") ||
      uploadedFile.name.includes("png")
    ) {
      fileType = "image";
    }
    formData.append("attachment_type", fileType);

    axios
      .post(
        "https://doom.elsayed.aait-d.com/api/general/attachments",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setUploadProgress(progress);
          },
        }
      )
      .then((response) => {
        setFileAttachment({
          str: response.data.data,
          type: fileType,
        });
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message;
        ShowAlertMixin({
          type: 15,
          icon: "error",
          title: errorMessage,
        });
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      })
      .finally(() => {
        setLoadingAttachment(false);
      });
  };

  const clearFile = () => {
    setFile(null);
    setFilePreview(null);
    setFileAttachment(null);
  };

  const sendMessage = async () => {
    // e.preventDefault();
    if ((!message && !fileAttachment) || loadingSend) return;

    setLoadingSend(true);
    const formData = new FormData();
    if (fileAttachment) {
      formData.append("message", fileAttachment.str);
      formData.append("message_type", fileAttachment.type);
    } else {
      formData.append("message", message);
      formData.append("message_type", "text");
    }

    try {
      const response = await axiosInstance.post<{ data: Message }>(
        "chat",
        formData
      );
      setChat((prev: any) => ({
        ...prev!,
        messages: {
          ...prev!.messages,
          data: [...prev!.messages.data, response.data.data],
        },
      }));
      setTimeout(scrollToBottom, 100);
      setMessage("");
      clearFile();
      scrollToBottom();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      ShowAlertMixin({
        type: 15,
        icon: "error",
        title: errorMessage,
      });
    } finally {
      setLoadingSend(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    sendMessage();
  };

  // Initial data fetch
  useEffect(() => {
    getChat();
  }, [getChat]);

  useEffect(() => {
    if (!loadingFirstTime && chat?.messages?.data?.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [loadingFirstTime]);

  const session = UseSession();
  const memoizedSession: SessionType | any = useMemo(() => session, [session]);
  const { subscribeSingleChat, unsubscribeSingleChat } = useSocketContext();
  // const chatSound = new Audio(
  //   "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
  // );
  useEffect(() => {
    const userId = memoizedSession?.id;
    if (userId && chat) {
      const handleNewMessage = (newMessage: Message) => {
        console.log("new chat message", newMessage);

        // setChat((prev: any) => ({
        //   ...prev,
        //   messages: {
        //     ...prev.messages,
        //     data: [...prev.messages.data, newMessage],
        //   },
        // }));

        // chatSound.play().catch((err) => {
        //   console.warn("🔇 Failed to play chat sound:", err);
        // });

        // setTimeout(scrollToBottom, 100);
      };

      subscribeSingleChat(chat.id.toString(), userId, handleNewMessage);
    }
    // Cleanup subscription when component unmounts
    return () => {
      if (userId && chat) {
        // console.log('Unsubscribing from notifications for user ID:', userObject.id);

        unsubscribeSingleChat(chat.id.toString(), userId);
      }
    };
  }, [
    chat?.id,
    memoizedSession?.id,
    subscribeSingleChat,
    unsubscribeSingleChat,
  ]);

  return (
    <>
      {loadingFirstTime ? (
        <div className="screen_loader lg:h-[calc(100vh-340px)] h-[calc(100vh-235px)] relative inset-0 bg-transparent dark:bg-[#060818] z-[1] grid place-content-center animate__animated">
          <LoaderWarper />
        </div>
      ) : (
        <div className="relative bg-white rounded-lg">
          <div className="container py-6">
            <ChatHeader />

            {/* <div className="min-h-[100vh] flex items-center justify-center gap-2 z-[-1]"> */}
            {/* Loading state or content */}
            {/* </div> */}
            {chat?.messages?.data?.length > 0 ? (
              <div
                ref={chatWrapper}
                className="scroll-smooth p-4 lg:h-[calc(100vh-340px)] h-[calc(100vh-235px)] relative overflow-y-auto hide-scrollbar bg-transparent"
                onScroll={handleChatScroll}
              >
                {loadingLoadMoreMessages && (
                  <div className="flex justify-center py-2">
                    <div className="input-box inline-block w-full relative mt-4">
                      <div className="w-full h-24 cursor-pointer relative outline-0 border-[1px] border-white bg-white rounded-lg p-3">
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
                  </div>
                )}

                {chat?.messages?.data
                  ?.sort(
                    (a: { created_at: string }, b: { created_at: string }) => {
                      const dateA = new Date(a.created_at);
                      const dateB = new Date(b.created_at);

                      return dateA.getTime() - dateB.getTime(); // Use getTime() for accurate comparison
                    }
                  )
                  ?.map((msg: any) => (
                    <div
                      key={msg?.id}
                      className={`relative flex ${
                        msg?.user_type == "client"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      {msg?.message && msg?.message_type == "image" && (
                        <div
                          className={` mb-3 p-1 rounded-lg ${
                            msg?.user_type == "client"
                              ? "flex justify-start"
                              : "flex justify-end"
                          } `}
                        >
                          <div
                            className={`relative w-fit p-4  bg-greynormal rounded-xl `}
                            // onClick={() => handleImageClick(msg?.ImageUrl)}
                          >
                            <ImageWithFallback
                              width={1000}
                              height={1000}
                              src={msg?.message}
                              alt="Chat Image"
                              className="w-[200px] mx-auto h-[300px] object-contain"
                            />
                          </div>
                          <p
                            className={`text-[12px] text-darkprimary font-medium  my-auto mx-3`}
                          >
                            {formatTime(msg?.created_at)}
                          </p>
                        </div>
                      )}
                      {msg?.message && msg?.message_type == "text" && (
                        <div
                          className={`flex lg:max-w-[400px] max-w-[300px]  ${
                            msg?.user_type == "client" ? "" : "flex-row-reverse"
                          } gap-3 items-center shadow mb-3 `}
                        >
                          <p
                            className={`py-3 px-4  break-words ${
                              msg?.user_type == "client"
                                ? "bg-primary text-white rounded-2xl rounded-br-none"
                                : "bg-secprimary text-darkprimary  rounded-2xl rounded-bl-none"
                            }`}
                          >
                            {msg?.message}
                          </p>
                          <p
                            className={`text-[12px] text-darkprimary font-medium `}
                          >
                            {formatTime(msg?.created_at)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <EmptyChats />
            )}

            <div className="bg-secprimary min-h-16 px-6 py-2 rounded-xl mt-5">
              <div className="flex items-center gap-4 relative">
                {filePreview ? (
                  <div className="relative flex-1 rounded-lg bg-primary bg-opacity-10 px-4 py-5">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-primary" /* Replace with your SVG component */
                      />
                      <span className="text-sm">{file?.name}</span>
                      <span className="text-sm font-semibold text-primary">
                        {uploadProgress}%
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-primary/20"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="w-full h-full border-none bg-transparent px-4 focus-visible:!outline-none"
                    placeholder={t("Text.chatInputPlaceholder")}
                    onKeyDown={(e) => {
                      handleKeyDown(e);
                    }}
                  />
                )}

                {/* <input
              type="text"
              className="w-full h-full border-none bg-transparent px-4 focus-visible:!outline-none"
              placeholder={t("Text.chatInputPlaceholder")}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            /> */}

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
                  onChange={handleFileUpload}
                  // onChange={handleImageChange}
                />
                <button
                  onClick={handleSendClick}
                  disabled={loadingAttachment || loadingSend}
                >
                  <AiOutlineSend
                    className="cursor-pointer text-primary bg-white rounded-full p-2"
                    size={45}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
