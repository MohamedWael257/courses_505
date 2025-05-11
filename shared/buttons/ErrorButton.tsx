"use client";
import React from "react";
import LocalePath from "../LocalePath";
import { useTranslations } from "next-intl";
type Props = {
  title: string;
  link: string;
};

export default function ErrorButton({ title, link }: Props) {
  const t = useTranslations("");
  return (
    <div className="flex justify-center mt-5 bg-primary text-white px-16 py-4 rounded-xl">
      <LocalePath href={link} className="base-btn mx-2">
        {title}
      </LocalePath>
    </div>
  );
}
