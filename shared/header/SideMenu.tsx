"use client";
import React, { useState, PropsWithChildren } from "react";
import "@/styles/side-menu.scss";
import { TimesIcon } from "../Icons";
import { IoMdClose } from "react-icons/io";

type Props = {
  title?: any;
  direction?: string;
  bg?: string;
  border?: string;
  width?: string;
  close: () => void;
};

const SideMenu = ({
  title = "",
  children,
  direction,
  bg,
  border,
  width = "",
  close,
}: PropsWithChildren<Props>) => {
  const [closing, setClose] = useState(false);

  function closeMeun() {
    setClose(true);

    setTimeout(() => close(), 300);
  }

  return (
    <div
      className={` fixed top-0 left-0 bg-[#00000071]  gap-5 w-screen h-screen z-[99999] `}
    >
      <div
        className={` ${direction ? `side_menu_${direction}` : "side_menu"} ${
          width ? `${width}` : ""
        } relative ${closing ? "closing" : ""}`}
      >
        <header
          className={`px-3 flex items-center justify-between  ${
            title
              ? "border-b-[1px] h-[90px] border-3 border-greynormal  pb-4 "
              : " h-[50px]"
          } ${bg}`}
        >
          {title && (
            <h3 className="capitalize font-bold text-2xl px-2">{title}</h3>
          )}

          <button
            className="hl-10 wk-10 bg-[#d9d9d9] text-darkprimary p-[8px_15px] rounded-lg text-lg font-normal flkex justify-end absolute top-6 end-4 z-40"
            type="button"
            onClick={closeMeun}
          >
            <IoMdClose size={30} />
          </button>
        </header>
        <div
          className={`${bg} side_menu_content`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
