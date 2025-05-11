import React from "react";
import { toast } from "react-toastify";
import { FaCopy, FaLink } from "react-icons/fa";

type Props = { title?: string; text?: any };

export default function ButtonShared({ title, text }: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title ?? "Sharing Title",
          text: text ?? "Sharing Text",
          url: window.location.href,
        });
        toast.info("select where you want to share");
      } catch (error: any) {
        console.log(error);

        // toast.error("An error occurred while sharing:", error);
      }
    } else {
      console.log("error");
      const shareUrl = `mailto:?subject=Sharing Title&body=Sharing text: ${window.location.href}`;
      window.location.href = shareUrl;
    }
  };
  return (
    <FaCopy
      onClick={handleShare}
      size={50}
      className="cursor-pointer mx-4 my-4 bg-grey text-primary border-[1px] border-primary rounded-full p-3"
    />
  );
}
