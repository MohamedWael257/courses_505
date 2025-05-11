"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { TbArrowNarrowUp } from "react-icons/tb";

import "@/styles/scroll-btn.scss";

const ScrollBtn = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const t = useTranslations();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, []);
  return (
    <>
      <button
        onClick={goToTop}
        type="button"
        className={`back-to-top ${showTopButton ? "active" : ""}`}
      >
        <TbArrowNarrowUp />
        <span>{t("Text.top")}</span>
      </button>
    </>
  );
};

export default ScrollBtn;
