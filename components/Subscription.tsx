"use client";
import { HiOutlineMail } from "react-icons/hi";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import Swal from "sweetalert2";

type Props = {};

export default function Subscription({}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const hanldeSubscribe = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    Swal.fire({
      title: t("isCreatedSuccessfully"),
      text: t("contact"),
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/5039/2b6e/c9a44f6f2d7c0487aa1d84d114aba2be?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DV9x74L4FduLKXcH4uziljpmpZQMGeJ~pnEBtXHKe5Bvtv0z3AMaUVAlo4ZJbSq7FaojLjKl14q9zjaH~N0KiQzkDLktcX3NOlpLWZXuXxBbqJ8D44FtJyR1tPawQ7stqO8L3bC1vJcBDMzkaYc3lyAjmQFwU~6qo7XpRJeL1O9zrW3xWbYbmNktZ7uaqA5iPI9dBxNZxQGckI4r4~iOd~uAy~qTKuArnLhbRJ-gPLsc~kOYrcMYAzfY2ebnzqvCowNeVWTNBDoOZPNVPL-7ibe3LxvUjdYnxmyWwAO9rUWnQabnPc5Xf-In6G5smvZcOTYGgFt3~gKyexUkPuU9uw__",

      // imageUrl: `${badgecheck}`,
      // showCancelButton: show_cancel,
      // confirmButtonText: confirm_btn_txt || "buttons.confirm",
      // cancelButtonText: "buttons.cancel",
      customClass: {
        popup: "custom-popup-class", // Custom class for the popup
        title: "custom-title-class", // Custom class for the title
        // Add other classes as needed
      },
      padding: "1rem", // This is valid
    });
    setEmail("");
  };
  return (
    <div className="bg-greynormal">
      <div className="lg:h-[450px] h-[60vh] lg:w-[30%]  mx-auto text-center grid justify-celnter items-center relative">
        <div className="relative z-40 ">
          <h2
            className={`my-4  text-darkprimaryprimary font-medium text-4xl !leading-[55px] px-5 w-fit`}
          >
            اشترك واحصل علي آخر التحديثات
          </h2>

          <p className="my-4 text-darkprimaryprimary font-normal text-lg text-center  leading-8">
            اشترك ليصلك أهم الدورات، الكتب والقوالب وكل ما هو جديد
          </p>

          <div className="bg-white backdrop-blur-[24px] border-white my-4	 p-3 rounded-full overflow-hidden flex">
            <input
              className="mx-2 text-end w-full text-header bg-transparent p-1 px-8 outline-none border-none text-white placeholder:text-start"
              type="text"
              placeholder={"البريد الإلكتروني"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={hanldeSubscribe}
              className=" absolute top-4 start-4 "
            >
              <HiOutlineMail size={20} className="text-secondrydark" />
            </button>
            <button
              onClick={hanldeSubscribe}
              className="text-white bg-error/90 p-2 px-4 rounded-lg absolute top-0 end-0 h-full"
            >
              اشترك الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
