"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const t = useTranslations("validations");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(t("copied"));
      setIsDisabled(true);

      setTimeout(() => {
        setCopySuccess("");
        setIsDisabled(false);
      }, 2000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        className="copy-button text-success px-4 py-2 rounded w-full"
        disabled={isDisabled}
      >
        {copySuccess ? copySuccess : t("Copy the code")}
      </button>
    </div>
  );
};

export default CopyToClipboard;
