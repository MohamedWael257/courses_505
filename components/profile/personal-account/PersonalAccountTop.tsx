"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { SessionType } from "@/components/Header";

type Props = {
  profile: SessionType;
};

export default function PersonalAccountTop({ profile }: Props) {
  const t = useTranslations("");
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-text mb-2 text-start">
        {t("Text.personalAccount")}
      </h2>
      {profile?.birthday && (
        <p className=" mx-auto text-start mb-6">
          {t("Text.personalAccountDesc", { date: profile.birthday })}
        </p>
      )}
    </div>
  );
}
